# 我的双栏目博客（GitHub Pages）

- **栏目**: 知识分享(`posts/knowledge/`)、生活记录(`posts/life/`)
- **写作格式**: Markdown + YAML front matter（标题、日期、标签）
- **托管**: GitHub Pages（根目录直出，无需构建）
- **数据源模式**: 默认 GitHub API，可切换本地 JSON 索引

## 目录结构

```
/index.html
/post.html
/config.js
/styles/main.css
/scripts/{utils.js,dataSource.js,main.js,post.js}
/posts/
  knowledge.json
  life.json
  /knowledge/ YYYY-MM-DD-标题.md
  /life/      YYYY-MM-DD-标题.md
/images/
```

## 写作规范

- 文件名建议：`YYYY-MM-DD-文章标题.md`
- 每篇文章开头必须包含 front matter，例如：

```markdown
---
title: 一篇文章标题
date: 2025-10-20
tags: [标签1, 标签2]
---

这里写正文内容...
```

## 配置

编辑 `config.js`：

```js
window.BLOG_CONFIG = {
  owner: 'feng1201',
  repo: 'my_blog',
  branch: 'main',
  siteTitle: '我的博客',
  siteSubtitle: '用文字记录，向知识致敬',
  ownerName: 'feng1201',
  mode: 'github', // 或 'local'
  contentBasePath: 'posts',
  knowledgeDir: 'posts/knowledge',
  lifeDir: 'posts/life'
};
```

- `mode: 'github'`：首页通过 GitHub Contents API 自动扫描 `posts/knowledge/` 和 `posts/life/` 并拉取 `.md` 文章；
- `mode: 'local'`：首页读取 `posts/knowledge.json` 与 `posts/life.json` 中列出的文件路径。

## 使用方式

- 首页“知识分享/生活记录”标签切换，直接渲染整篇文章流，无需进入详情页。
- 通过地址栏 `#life` 直接打开“生活记录”栏目。

## 部署到 GitHub Pages

1) 仓库 Settings → Pages：
- Deploy from branch: `main`
- Folder: `/ (root)`

2) 推送代码（安全做法：避免在命令或日志中回显令牌）：

```bash
# 在你的本地终端执行（不要把令牌粘贴到聊天或日志）
cd blog
git init
git add -A
git commit -m "init blog"
# 设定远端（无需把令牌写进 URL）
git remote add origin https://github.com/feng1201/my_blog.git

# 使用临时 askpass（令牌仅在本机使用，不留痕）
export GITHUB_TOKEN=<你的令牌>
cat > .git-askpass.sh << 'EOF'
#!/usr/bin/env bash
echo "$GITHUB_TOKEN"
EOF
chmod +x .git-askpass.sh
GIT_ASKPASS=$PWD/.git-askpass.sh git push -u origin main --force
rm -f .git-askpass.sh
unset GITHUB_TOKEN
```

> 若仓库已有历史，直接同步文件后 `git add/commit/push` 即可。

## 本地 JSON 模式示例

- `posts/knowledge.json`
```json
[
  "posts/knowledge/2025-10-20-示例-知识分享.md"
]
```
- `posts/life.json`
```json
[
  "posts/life/2025-10-20-示例-生活记录.md"
]
```

## 常见问题

- 若 GitHub API 请求受限，请稍后再试或切换到 `mode: 'local'`。
- 若图片未显示，请确认图片路径与文件存在（也可将图片放在 `images/` 下）。
