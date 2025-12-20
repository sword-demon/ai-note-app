# 迁移过程中遇到并修复的问题

本文档记录了从 VitePress 迁移到 Fumadocs 过程中遇到的所有问题及解决方案。

## 问题列表

### ✅ 1. 图片路径问题

**症状**:
```
Module not found: Can't resolve '../../public/image-xxx.png'
```

**原因**:
MDX 编译器尝试将 `../../public/image.png` 作为模块导入,但这个相对路径不正确。

**解决方案**:
- 将所有图片路径从 `/public/xxx.png` 或 `../../public/xxx.png` 改为 `/xxx.png`
- 创建自动修复脚本 `fix-mdx-issues.mjs`

**影响文件**: 6 个文件

**修复代码**:
```javascript
// 修复 Markdown 图片语法
content = content.replace(/!\[([^\]]*)\]\(\.\.\/\.\.\/public\/([^)]+)\)/g, '![$1](/$2)');
content = content.replace(/!\[([^\]]*)\]\(\/public\/([^)]+)\)/g, '![$1](/$2)');
```

---

### ✅ 2. 代码语言标识符不支持

**症状**:
```
ShikiError: Language `Plain` is not included in this bundle
ShikiError: Language `Shell` is not included in this bundle
ShikiError: Language `CSS` is not included in this bundle
ShikiError: Language `JavaScript` is not included in this bundle
```

**原因**:
Shiki 语法高亮器不支持大写或非标准的语言标识符。

**解决方案**:
创建语言映射表,将不支持的标识符转换为标准格式:

| 原标识符 | 转换后 |
|---------|--------|
| Plain | text |
| Shell | bash |
| CSS | css |
| JavaScript | javascript |
| PowerShell | powershell |
| Markdown | markdown |

**影响文件**: 16 个文件

**修复代码**:
```javascript
const LANGUAGE_MAP = {
  'Plain': 'text',
  'Shell': 'bash',
  'CSS': 'css',
  'JavaScript': 'javascript',
  'PowerShell': 'powershell',
  // ...
};

content = content.replace(/```(\w+)/g, (match, lang) => {
  if (LANGUAGE_MAP[lang]) {
    return '```' + LANGUAGE_MAP[lang];
  }
  return match;
});
```

---

### ✅ 3. VitePress 容器语法不支持

**症状**:
```markdown
:::danger 重点
内容
:::
```
上述语法在 Fumadocs 中不被识别。

**原因**:
VitePress 使用 `:::` 容器语法,Fumadocs 使用 Callout 组件。

**解决方案**:
转换为 Fumadocs Callout 组件:

| VitePress | Fumadocs |
|-----------|----------|
| `:::danger 标题` | `<Callout type="error" title="标题">` |
| `:::info` | `<Callout type="info">` |
| `:::tip` | `<Callout type="tip">` |
| `:::warning` | `<Callout type="warning">` |

**影响文件**: 4 个文件

**修复代码**:
```javascript
const containerRegex = /^:::(\w+)(?:\s+(.+?))?\s*\n([\s\S]*?)\n:::/gm;

content = content.replace(containerRegex, (match, type, title, body) => {
  const calloutType = TYPE_MAP[type.toLowerCase()] || 'info';
  const titleAttr = title ? ` title="${title.trim()}"` : '';
  return `<Callout type="${calloutType}"${titleAttr}>\n${body.trim()}\n</Callout>`;
});
```

---

### ✅ 4. 自定义 Linkcard 组件未定义

**症状**:
```
Error: Expected component `Linkcard` to be defined
```

**原因**:
VitePress 文档使用了自定义的 Linkcard 组件,但 Fumadocs 中没有定义。

**解决方案**:
1. 创建等效的 React 组件 `src/components/Linkcard.tsx`
2. 在 `src/mdx-components.tsx` 中注册组件

**影响文件**: 1 个文件

**组件代码**:
```tsx
// src/components/Linkcard.tsx
export function Linkcard({ url, title, description, logo }: LinkcardProps) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      {/* ... */}
    </Link>
  );
}

// src/mdx-components.tsx
import { Linkcard } from '@/components/Linkcard';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Linkcard,
    ...components,
  };
}
```

---

### ✅ 5. MDX 花括号解析错误

**症状**:
```
ReferenceError: js is not defined
```

发生在包含 `{js,ts,tsx,jsx}` 的表格单元格中。

**原因**:
MDX 将花括号 `{}` 视为 JavaScript 表达式,尝试执行其中的代码。

**错误示例**:
```markdown
| globs | ... | "src/**/*.{js,ts,tsx,jsx}" |
```

**解决方案**:
使用反引号包裹包含花括号的内容,让 MDX 将其视为代码:

```markdown
| globs | ... | `"src/**/*.{js,ts,tsx,jsx}"` |
```

**影响文件**: 1 个文件 (cursor_rules.mdx)

**其他解决方案**:
- 转义花括号: `\{js,ts,tsx,jsx\}`
- 使用 HTML 实体: `&#123;js,ts,tsx,jsx&#125;`

---

### ✅ 6. metadataBase 警告

**症状**:
```
⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000".
```

**原因**:
Next.js 需要 metadataBase 来正确生成 Open Graph 和 Twitter 卡片的绝对 URL。

**解决方案**:
在 `src/app/layout.tsx` 中添加 metadata export:

```tsx
export const metadata: Metadata = {
  title: {
    default: 'AI Note App',
    template: '%s | AI Note App',
  },
  description: 'AI 学习笔记和技术文档',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
};
```

**配置说明**:
- 开发环境: 使用 `http://localhost:3000`
- Vercel 部署: 自动使用 `VERCEL_URL` 环境变量
- 自定义域名: 设置 `NEXT_PUBLIC_SITE_URL` 环境变量

**影响**: 全局配置,无需修改任何文档文件

**相关文件**:
- `src/app/layout.tsx` - 添加 metadata export
- `.env.example` - 环境变量示例

---

## 自动化修复脚本

### 1. migrate-docs.mjs
- 迁移 .md 文件为 .mdx
- 转换 frontmatter 格式

### 2. fix-mdx-issues.mjs
- 修复图片路径
- 转换代码语言标识符

### 3. convert-vitepress-containers.mjs
- 转换 VitePress 容器为 Callout 组件

### 4. fix-mdx-curly-braces.mjs
- 检测并修复表格中的花括号问题

## 修复统计

| 问题类型 | 影响范围 | 状态 |
|---------|----------|------|
| 图片路径 | 6 个文件 | ✅ 已修复 |
| 代码语言 | 16 个文件 | ✅ 已修复 |
| 容器语法 | 4 个文件 | ✅ 已修复 |
| 自定义组件 | 1 个文件 | ✅ 已修复 |
| 花括号转义 | 1 个文件 | ✅ 已修复 |
| metadataBase 警告 | 全局配置 | ✅ 已修复 |

## 经验总结

### 1. MDX 与 Markdown 的区别
- MDX 中的花括号 `{}` 被视为 JavaScript 表达式
- 在表格或普通文本中使用花括号时,需要转义或用代码块包裹
- 反引号 `` ` `` 可以防止 MDX 解析特殊字符

### 2. 图片路径规范
- Fumadocs 中图片应放在 `public/` 目录
- MDX 中引用时使用 `/image.png` 而不是 `/public/image.png`
- 相对路径 `../../public/` 会导致模块解析错误

### 3. 语法高亮器配置
- Shiki 只支持标准的小写语言标识符
- 大写或自定义标识符需要映射为标准格式
- 使用 `text` 作为纯文本的通用标识符

### 4. 自定义组件
- VitePress 的自定义组件需要在 Fumadocs 中重新实现为 React 组件
- 组件需要在 `mdx-components.tsx` 中注册
- 保持组件 API 一致性可以减少文档修改

### 5. 容器语法转换
- VitePress 容器可以映射到 Fumadocs Callout
- 保留原有的标题和类型信息
- 注意容器嵌套和格式

## 推荐的迁移流程

1. **运行迁移脚本**: `node scripts/migrate-docs.mjs`
2. **复制资源**: `cp -r vitepress/public/* fumadocs/public/`
3. **修复路径和语言**: `node scripts/fix-mdx-issues.mjs`
4. **转换容器**: `node scripts/convert-vitepress-containers.mjs`
5. **检查花括号**: `node scripts/fix-mdx-curly-braces.mjs`
6. **启动开发服务器**: `npm run dev`
7. **浏览所有页面**: 检查是否有渲染错误
8. **修复个别问题**: 根据错误提示手动修复特殊情况

## 常见错误及快速修复

| 错误信息 | 原因 | 修复方法 |
|---------|------|---------|
| `Module not found: Can't resolve '../../public/xxx'` | 图片路径错误 | 改为 `/xxx` |
| `ShikiError: Language XXX is not included` | 不支持的语言标识符 | 改为小写或标准标识符 |
| `Expected component XXX to be defined` | 自定义组件未定义 | 创建并注册组件 |
| `ReferenceError: xxx is not defined` | 花括号被当作 JS 执行 | 用反引号包裹或转义 |
| `⚠ metadataBase property in metadata export is not set` | 缺少元数据基础 URL | 在 layout.tsx 添加 metadata export |

---

**更新时间**: 2025-12-21
**状态**: 所有问题已修复
**测试结果**: 所有页面返回 200 状态码
