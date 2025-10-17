# 个人博客 - GitHub版本

这是一个基于GitHub Pages的简单博客，可以直接在GitHub上编辑和发布。

## 🚀 快速开始

### 1. 创建GitHub仓库
1. 在GitHub上创建新仓库，命名为 `my-blog` 或其他名称
2. 上传这个文件夹中的所有文件
3. 在仓库设置中启用GitHub Pages

### 2. 访问博客
- 你的博客地址将是: `https://你的用户名.github.io/仓库名`
- 例如: `https://fengninghui.github.io/my-blog`

### 3. 编辑博客
- 直接在GitHub网页上编辑 `index.html` 文件
- 修改后提交，网站会自动更新
- 无需本地环境，随时随地都能更新

## ✨ 功能特性

- ✅ **在线编辑**: 直接在GitHub上编辑
- ✅ **自动部署**: 提交后自动更新网站
- ✅ **响应式设计**: 手机电脑都能完美显示
- ✅ **多媒体支持**: 文字、图片、表格
- ✅ **翻译功能**: 一键翻译内容
- ✅ **免费托管**: GitHub Pages完全免费

## 📝 如何添加新文章

在 `index.html` 中找到现有的文章块：

```html
<article class="post">
    <h2 class="post-title">文章标题</h2>
    <div class="post-meta">发布时间: 2025年10月17日</div>
    <div class="post-content">
        <p>文章内容...</p>
    </div>
</article>
```

复制这个块，修改标题、日期和内容，然后保存提交即可。

## 🖼️ 如何添加图片

1. 将图片上传到GitHub仓库的 `images` 文件夹
2. 在文章中使用: `<img src="images/图片名.jpg" alt="描述">`

## 📊 如何添加表格

```html
<table>
    <tr>
        <th>列标题1</th>
        <th>列标题2</th>
    </tr>
    <tr>
        <td>内容1</td>
        <td>内容2</td>
    </tr>
</table>
```

## 🌐 部署步骤

1. **Fork或下载** 这个项目
2. **上传到GitHub** 你的仓库
3. **启用Pages**: 仓库设置 → Pages → Source选择main分支
4. **访问网站**: 几分钟后就能通过GitHub Pages链接访问

## 📱 优势对比

| 特性 | GitHub版本 | Django CMS版本 |
|------|------------|----------------|
| 部署难度 | ⭐ 简单 | ⭐⭐⭐ 复杂 |
| 维护成本 | 免费 | 需要服务器 |
| 编辑方式 | 网页直接编辑 | 需要登录后台 |
| 访问速度 | 全球CDN加速 | 依赖服务器 |
| 移动编辑 | ✅ 支持 | ❌ 需要电脑 |

## 🔗 相关链接

- [GitHub Pages文档](https://pages.github.com/)
- [Markdown语法](https://guides.github.com/features/mastering-markdown/)
- [HTML基础教程](https://www.w3schools.com/html/)

---

**推荐**: 如果你想要简单易用的博客，选择GitHub版本；如果需要复杂的内容管理功能，使用Django CMS版本。
