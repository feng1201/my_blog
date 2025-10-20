document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.BLOG_CONFIG || {};
  const { setSiteMeta, parseFrontMatter, formatDate, parseDateFromFileName, slugFromFileName, sanitizeHtml } = window.utils;
  setSiteMeta(cfg);

  const tabKnowledge = document.getElementById('tab-knowledge');
  const tabLife = document.getElementById('tab-life');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const emptyEl = document.getElementById('empty');
  const listEl = document.getElementById('post-list');

  function setActiveTab(type) {
    if (type === 'life') {
      tabLife.classList.add('active');
      tabKnowledge.classList.remove('active');
    } else {
      tabKnowledge.classList.add('active');
      tabLife.classList.remove('active');
    }
  }

  async function renderFeed(type) {
    window.location.hash = type === 'life' ? '#life' : '#knowledge';
    setActiveTab(type);
    loadingEl.hidden = false;
    errorEl.hidden = true;
    emptyEl.hidden = true;
    listEl.innerHTML = '';

    try {
      const posts = await window.DataSource.listPosts(type);
      if (!posts.length) {
        emptyEl.hidden = false;
        return;
      }

      posts.sort((a, b) => {
        const da = parseDateFromFileName(a.name) || new Date(0);
        const db = parseDateFromFileName(b.name) || new Date(0);
        return db - da;
      });

      for (const p of posts) {
        const md = await window.DataSource.getPostContent(p);
        const { meta, content } = parseFrontMatter(md);
        const html = sanitizeHtml(marked.parse(content));
        const title = meta.title || p.name.replace(/\.md$/i, '');
        const date = meta.date || parseDateFromFileName(p.name) || null;
        const tags = Array.isArray(meta.tags) ? meta.tags : (typeof meta.tags === 'string' ? meta.tags.split(/[,\s]+/).filter(Boolean) : []);
        const slug = slugFromFileName(p.name);

        const li = document.createElement('li');
        const article = document.createElement('article');
        article.className = 'post-content';
        article.id = `${type}-${slug}`;

        const header = document.createElement('header');
        const h2 = document.createElement('h2');
        h2.className = 'post-title';
        h2.textContent = title;
        const metaP = document.createElement('p');
        metaP.className = 'post-meta';
        const dateStr = formatDate(date);
        metaP.textContent = [dateStr, tags.length ? `标签: ${tags.join(' / ')}` : ''].filter(Boolean).join(' · ');
        header.appendChild(h2);
        header.appendChild(metaP);

        const section = document.createElement('section');
        section.innerHTML = html;

        article.appendChild(header);
        article.appendChild(section);
        li.appendChild(article);
        listEl.appendChild(li);
      }
    } catch (e) {
      console.error(e);
      errorEl.hidden = false;
    } finally {
      loadingEl.hidden = true;
    }
  }

  tabKnowledge.addEventListener('click', () => renderFeed('knowledge'));
  tabLife.addEventListener('click', () => renderFeed('life'));

  const initial = (window.location.hash || '').toLowerCase() === '#life' ? 'life' : 'knowledge';
  renderFeed(initial);
});


