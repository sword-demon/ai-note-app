# CLAUDE.md

这个文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

这是一个基于 Next.js 和 Fumadocs 构建的 AI 笔记应用,包含文档和博客功能。Fumadocs 是一个文档框架,提供了 MDX 内容管理、搜索和 UI 组件。

## 核心架构

### 内容系统 (Fumadocs MDX)

项目使用 Fumadocs MDX 系统管理内容:

- **配置文件**: `source.config.ts` 定义两个内容集合:
  - `docs`: 文档内容 (`content/docs/`)
  - `blog`: 博客文章 (`content/blog/`)，包含 `author` 和 `date` 字段

- **Source Adapter**: `src/lib/source.ts` 暴露两个 loader:
  - `source`: 文档 loader (baseUrl: `/docs`)
  - `blog`: 博客 loader (baseUrl: `/blog`)
  - 这些 loader 使用 `fumadocs-mdx:collections/server` 虚拟模块加载内容

- **编译过程**:
  1. MDX 文件在 `content/` 目录编写
  2. `fumadocs-mdx` 在构建时将其编译为 `.source/` 目录下的 TypeScript 集合
  3. 通过路径别名 `fumadocs-mdx:collections/*` 访问编译后的集合

### 路由结构

- `app/(home)/`: 首页路由组
  - `page.tsx`: 首页
  - `blog/`: 博客路由
    - `page.tsx`: 博客列表
    - `[slug]/page.tsx`: 单篇博客文章
  - `layout.tsx`: 首页布局

- `app/docs/`: 文档布局和页面
  - `layout.tsx`: 使用 `DocsLayout` 和 `source.pageTree`
  - `[[...slug]]/page.tsx`: 动态文档页面,使用 catch-all 路由

- `app/api/search/route.ts`: 搜索 API 端点 (使用 Orama 搜索引擎)

### 共享配置

- `src/lib/layout.shared.tsx`: `baseOptions()` 函数返回应用标题和导航链接
  - 标题: "AI Note"
  - 导航: Blog 链接

### 类型系统

- 路径别名 `@/*` 映射到 `./src/*`
- Fumadocs 集合路径别名 `fumadocs-mdx:collections/*` 映射到 `.source/*`
- 严格模式启用

## 开发命令

```bash
# 开发服务器 (http://localhost:3000)
bun run dev

# 生产构建
bun run build

# 启动生产服务器
bun start

# 类型检查 (包含 MDX 编译、Next.js 类型生成和 TypeScript 检查)
bun run types:check

# Linting (使用 Biome)
bun run lint

# 格式化代码 (使用 Biome)
bun run format
```

## 工作流程

### 添加新文档

1. 在 `content/docs/` 创建 `.mdx` 文件
2. 添加 frontmatter (title, description 等)
3. 运行 `bun run dev` - postinstall hook 自动运行 `fumadocs-mdx`
4. 文档会自动出现在 `/docs` 路由

### 添加新博客文章

1. 在 `content/blog/` 创建 `.mdx` 文件
2. 添加必需的 frontmatter:
   ```yaml
   ---
   title: 标题
   description: 描述
   author: 作者名
   date: YYYY-MM-DD
   ---
   ```
3. 文章会自动出现在 `/blog` 路由

### 修改导航和布局

- 编辑 `src/lib/layout.shared.tsx` 中的 `baseOptions()` 函数
- 修改会同时影响文档和首页布局

### 自定义 MDX 组件

- 在 `src/mdx-components.tsx` 的 `getMDXComponents()` 中添加自定义组件
- 默认使用 `fumadocs-ui/mdx` 的组件

### 搜索功能

- 搜索自动从 `source` loader 生成
- 语言配置在 `src/app/api/search/route.ts` (当前为 English)
- 使用 Orama 搜索引擎

## 技术栈

- **框架**: Next.js 16 (App Router)
- **内容**: Fumadocs MDX
- **样式**: Tailwind CSS 4
- **代码质量**: Biome (linting + formatting)
- **UI**: Fumadocs UI (文档组件)
- **搜索**: Orama (通过 Fumadocs Core)
