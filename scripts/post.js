document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.BLOG_CONFIG || {};
  const { setSiteMeta, parseFrontMatter, formatDate, sanitizeHtml } = window.utils;
  setSiteMeta(cfg);

  const titleEl = document.getElementById('post-title');
  const metaEl = document.getElementById('post-meta');
  const contentEl = document.getElementById('post-content');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');

  async function init() {
    const url = new URL(window.location.href);
    const raw = url.searchParams.get('raw');
    const name = url.searchParams.get('name');
    if (!raw) {
      titleEl.textContent = '未指定文章';
      return;
    }
    try {
      const res = await fetch(raw, { cache: 'no-store' });
      if (!res.ok) throw new Error(`加载失败 ${res.status}`);
      const md = await res.text();
      const { meta, content } = parseFrontMatter(md);
      titleEl.textContent = meta.title || name || '未命名文章';
      metaEl.textContent = [formatDate(meta.date || null), Array.isArray(meta.tags) ? meta.tags.join(' / ') : ''].filter(Boolean).join(' · ');
      const html = sanitizeHtml(marked.parse(content));
      contentEl.innerHTML = html;
    } catch (e) {
      console.error(e);
      errorEl.hidden = false;
    } finally {
      loadingEl.hidden = true;
    }
  }

  init();
});


