# AI Note App

一个基于 Next.js 和 Fumadocs 构建的现代化 AI 笔记应用,集成了文档管理和博客功能。

## 特性

- **文档系统**: 基于 Fumadocs 的强大文档框架,支持 MDX 内容编写
- **博客功能**: 内置博客系统,支持文章管理和展示
- **全文搜索**: 集成 Orama 搜索引擎,提供快速的内容检索
- **响应式设计**: 使用 Tailwind CSS 4 构建,完美适配各种设备
- **TypeScript**: 全栈 TypeScript 支持,提供类型安全
- **现代化工具链**: 使用 Biome 进行代码检查和格式化

## 技术栈

- **框架**: Next.js 16 (App Router)
- **内容管理**: Fumadocs MDX
- **样式**: Tailwind CSS 4
- **包管理**: Bun
- **搜索**: Orama
- **代码质量**: Biome (linting + formatting)
- **UI 组件**: Fumadocs UI

## 快速开始

### 安装依赖

```bash
bun install
```

### 开发服务器

```bash
bun run dev
```

访问 http://localhost:3000 查看应用。

### 生产构建

```bash
bun run build
bun start
```

## 项目结构

### 核心目录

```
├── app/
│   ├── (home)/          # 首页路由组
│   │   ├── page.tsx     # 首页
│   │   └── blog/        # 博客路由
│   ├── docs/            # 文档系统
│   │   ├── layout.tsx   # 文档布局
│   │   └── [[...slug]]/ # 动态文档页面
│   └── api/search/      # 搜索 API
├── content/
│   ├── docs/            # 文档 MDX 文件
│   └── blog/            # 博客 MDX 文件
├── src/
│   └── lib/
│       ├── source.ts    # 内容源适配器
│       └── layout.shared.tsx # 共享布局配置
└── source.config.ts     # Fumadocs MDX 配置
```

### 重要文件

| 文件 | 说明 |
| --- | --- |
| `src/lib/source.ts` | 内容源适配器,提供 `loader()` 接口访问文档和博客内容 |
| `src/lib/layout.shared.tsx` | 共享布局选项,定义应用标题和导航 |
| `source.config.ts` | Fumadocs MDX 配置,定义内容集合和 frontmatter 模式 |
| `app/api/search/route.ts` | 搜索 API 端点 |

### 路由说明

| 路由 | 说明 |
| --- | --- |
| `app/(home)` | 首页路由组,包含主页和博客 |
| `app/docs` | 文档系统的布局和页面 |
| `app/api/search/route.ts` | 搜索功能的 API 路由 |

## 内容管理

### 添加文档

1. 在 `content/docs/` 目录创建 `.mdx` 文件
2. 添加 frontmatter:
   ```yaml
   ---
   title: 文档标题
   description: 文档描述
   ---
   ```
3. 编写 MDX 内容
4. 文档会自动出现在 `/docs` 路由

### 添加博客文章

1. 在 `content/blog/` 目录创建 `.mdx` 文件
2. 添加必需的 frontmatter:
   ```yaml
   ---
   title: 文章标题
   description: 文章描述
   author: 作者名
   date: 2024-01-01
   ---
   ```
3. 编写文章内容
4. 文章会自动出现在 `/blog` 路由

## 可用命令

```bash
# 开发服务器
bun run dev

# 生产构建
bun run build

# 启动生产服务器
bun start

# 类型检查
bun run types:check

# 代码检查
bun run lint

# 代码格式化
bun run format
```

## 自定义配置

### 修改导航和布局

编辑 `src/lib/layout.shared.tsx` 中的 `baseOptions()` 函数来修改应用标题和导航链接。

### 自定义 MDX 组件

在 `src/mdx-components.tsx` 的 `getMDXComponents()` 中添加自定义组件。

### 配置搜索

搜索配置位于 `src/app/api/search/route.ts`,可以修改语言和其他选项。

## 学习资源

- [Next.js 文档](https://nextjs.org/docs) - 学习 Next.js 功能和 API
- [Fumadocs 文档](https://fumadocs.dev) - 了解 Fumadocs 框架
- [Fumadocs MDX 介绍](https://fumadocs.dev/docs/mdx) - MDX 内容系统详解
- [Tailwind CSS](https://tailwindcss.com) - 样式框架文档
