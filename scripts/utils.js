window.utils = (function () {
  function parseFrontMatter(markdown) {
    if (!markdown.startsWith('---')) {
      return { meta: {}, content: markdown };
    }
    const end = markdown.indexOf('\n---', 3);
    if (end === -1) {
      return { meta: {}, content: markdown };
    }
    const fmBlock = markdown.slice(3, end + 1);
    let meta = {};
    try {
      meta = (window.jsyaml || window.jsYaml || window.jsYAML)?.load(fmBlock.trim()) || {};
    } catch (e) {
      console.warn('YAML front matter 解析失败:', e);
    }
    const content = markdown.slice(end + 4).replace(/^\n+/, '');
    return { meta, content };
  }

  function formatDate(input) {
    if (!input) return '';
    const d = typeof input === 'string' ? new Date(input) : input;
    if (Number.isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function parseDateFromFileName(name) {
    // 期望格式：YYYY-MM-DD-标题.md
    const m = name.match(/^(\d{4})-(\d{2})-(\d{2})-/);
    if (!m) return null;
    const d = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function slugFromFileName(name) {
    return name.replace(/\.md$/i, '').toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, '-');
  }

  function sanitizeHtml(html) {
    return window.DOMPurify ? window.DOMPurify.sanitize(html) : html;
  }

  function setSiteMeta(cfg) {
    const titleEl = document.getElementById('site-title');
    const subEl = document.getElementById('site-subtitle');
    const yearEl = document.getElementById('year');
    const ownerEl = document.getElementById('owner');
    if (titleEl) titleEl.textContent = cfg.siteTitle || '我的博客';
    if (subEl) subEl.textContent = cfg.siteSubtitle || '';
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (ownerEl) ownerEl.textContent = cfg.ownerName || '';
    document.title = cfg.siteTitle || document.title;
  }

  return {
    parseFrontMatter,
    formatDate,
    parseDateFromFileName,
    slugFromFileName,
    sanitizeHtml,
    setSiteMeta,
  };
})();

'use strict';

function $(selector) { return document.querySelector(selector); }
function $all(selector) { return Array.from(document.querySelectorAll(selector)); }

function setSiteBasics() {
  const cfg = window.BLOG_CONFIG || {};
  const title = cfg.siteTitle || '我的博客';
  const subtitle = cfg.siteSubtitle || '';
  const owner = cfg.ownerName || '';
  const year = new Date().getFullYear();
  const st = document.getElementById('site-title');
  if (st) st.textContent = title;
  const ss = document.getElementById('site-subtitle');
  if (ss) ss.textContent = subtitle;
  const o = document.getElementById('owner');
  if (o) o.textContent = owner;
  const y = document.getElementById('year');
  if (y) y.textContent = year;
}

function parseFrontMatter(markdown) {
  // 支持以 --- 分隔的 YAML front matter
  if (markdown.startsWith('---')) {
    const end = markdown.indexOf('\n---');
    if (end !== -1) {
      const yamlText = markdown.slice(3, end + 1);
      const body = markdown.slice(end + 4).replace(/^\n+/, '');
      let data = {};
      try { data = jsyaml.load(yamlText) || {}; } catch (e) { console.warn('YAML 解析失败', e); }
      return { data, content: body };
    }
  }
  return { data: {}, content: markdown };
}

function markdownToHtml(markdown) {
  const html = marked.parse(markdown, { mangle: false, headerIds: true });
  return DOMPurify.sanitize(html);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${da}`;
  } catch { return dateStr; }
}

function getQuery(param) {
  const u = new URL(location.href);
  return u.searchParams.get(param);
}

function slugifyTitle(title) {
  return (title || '').trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
}

window.BlogUtils = {
  $, $all, setSiteBasics, parseFrontMatter, markdownToHtml, formatDate, getQuery, slugifyTitle
};


