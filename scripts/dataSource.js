window.DataSource = (function () {
  const cfg = window.BLOG_CONFIG || {};

  async function listGithub(dirPath) {
    const { owner, repo, branch } = cfg;
    if (!owner || !repo) throw new Error('请在 config.js 中设置 owner 与 repo');
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}?ref=${encodeURIComponent(branch || 'main')}`;
    const res = await fetch(api, { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store' });
    if (!res.ok) throw new Error(`GitHub API 列表失败: ${res.status}`);
    const data = await res.json();
    return data
      .filter((it) => it.type === 'file' && /\.md$/i.test(it.name))
      .map((it) => ({ name: it.name, path: it.path, rawUrl: it.download_url }));
  }

  async function listLocal(indexPath) {
    const res = await fetch(indexPath, { cache: 'no-store' });
    if (!res.ok) throw new Error(`本地索引读取失败: ${res.status}`);
    const data = await res.json();
    return data.map((p) => (typeof p === 'string' ? { name: p.split('/').pop(), path: p, rawUrl: p } : { name: p.name, path: p.path, rawUrl: p.rawUrl || p.path }));
  }

  async function listPosts(type) {
    const dir = type === 'life' ? cfg.lifeDir : cfg.knowledgeDir;
    if ((cfg.mode || 'github') === 'github') {
      return listGithub(dir);
    }
    const indexPath = `${cfg.contentBasePath}/${type}.json`;
    return listLocal(indexPath);
  }

  async function getPostContent(post) {
    const res = await fetch(post.rawUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error(`读取文章失败: ${res.status}`);
    return await res.text();
  }

  return { listPosts, getPostContent };
})();


