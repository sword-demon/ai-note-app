# 文档迁移脚本

这个目录包含了用于从 VitePress 迁移文档到 Fumadocs 的工具脚本。

## 脚本说明

### 1. migrate-docs.mjs

**功能**: 将 VitePress 的 .md 文件转换为 Fumadocs 的 .mdx 格式

**使用方法**:
```bash
node scripts/migrate-docs.mjs
```

**功能特性**:
- 自动解析 VitePress frontmatter
- 转换为 Fumadocs frontmatter 格式
- 保持原有目录结构
- 不修改源文件
- 自动提取标题

**配置**:
- `SOURCE_DIR`: VitePress 文档源目录
- `TARGET_DIR`: Fumadocs 目标目录
- `EXCLUDE_FILES`: 需要排除的文件列表

### 2. fix-mdx-issues.mjs

**功能**: 修复 MDX 文件中的常见问题

**使用方法**:
```bash
node scripts/fix-mdx-issues.mjs
```

**修复内容**:
1. **图片路径**: `/public/image.png` → `/image.png`
2. **代码语言标识符**: 转换不支持的语言标识为标准格式
   - `Plain` → `text`
   - `Shell` → `bash`
   - `CSS` → `css`
   - `JavaScript` → `javascript`
   - `PowerShell` → `powershell`
   - 等等...

**支持的语言映射**:
- Plain/plain → text
- Shell/shell/Bash → bash
- PowerShell/Powershell → powershell
- CSS → css
- Markdown/markdown → markdown/md
- JavaScript/Javascript → javascript
- TypeScript/Typescript → typescript
- Python → python
- Java → java
- Go → go
- Rust → rust
- C → c
- Cpp → cpp
- JSON → json
- YAML → yaml
- XML → xml
- HTML → html
- SQL → sql

### 3. convert-vitepress-containers.mjs

**功能**: 转换 VitePress 容器语法为 Fumadocs Callout 组件

**使用方法**:
```bash
node scripts/convert-vitepress-containers.mjs
```

**转换规则**:
- `:::danger 标题` → `<Callout type="error" title="标题">`
- `:::info 标题` → `<Callout type="info" title="标题">`
- `:::tip 标题` → `<Callout type="tip" title="标题">`
- `:::warning 标题` → `<Callout type="warning" title="标题">`
- `:::details 标题` → `<Callout type="note" title="标题">`
- `:::note 标题` → `<Callout type="note" title="标题">`

**支持的容器类型**:
- info → info
- tip → tip
- warning → warning
- danger → error
- details → note
- note → note

## 完整迁移流程

### 步骤 1: 迁移文档

```bash
# 迁移所有 .md 文件为 .mdx
node scripts/migrate-docs.mjs
```

### 步骤 2: 复制图片资源

```bash
# 复制 VitePress public 目录到 Fumadocs
cp -r /path/to/vitepress/docs/public/* /path/to/fumadocs/public/
```

### 步骤 3: 修复问题

```bash
# 修复图片路径和代码语言标识符
node scripts/fix-mdx-issues.mjs
```

### 步骤 4: 转换容器语法

```bash
# 转换 VitePress 容器为 Fumadocs Callout
node scripts/convert-vitepress-containers.mjs
```

### 步骤 5: 启动开发服务器

```bash
# 测试文档是否正常渲染
npm run dev
```

## 常见问题

### Q: 为什么图片无法显示?

A: 确保图片路径是 `/image.png` 而不是 `/public/image.png`,并且图片文件已复制到 `public/` 目录。

### Q: 为什么代码高亮报错?

A: 检查代码块的语言标识符是否为标准格式(小写),运行 `fix-mdx-issues.mjs` 自动修复。

### Q: 如何添加新的语言映射?

A: 编辑 `fix-mdx-issues.mjs` 中的 `LANGUAGE_MAP` 对象,添加新的映射关系。

### Q: 迁移后的文档在哪里?

A: 默认在 `content/docs/` 目录下,保持与源文件相同的目录结构。

## 注意事项

1. **源文件不变**: 所有脚本都不会修改源文件,只会创建新文件或修改目标文件
2. **增量修复**: `fix-mdx-issues.mjs` 只会修复有问题的文件,不会重复修复
3. **VitePress 特殊语法**: `:::` 容器等特殊语法需要手动检查和转换

## 扩展脚本

如果需要添加更多功能,可以参考现有脚本的结构:

```javascript
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// 1. 读取文件
const content = readFileSync(filepath, 'utf-8');

// 2. 处理内容
const processedContent = yourProcessingFunction(content);

// 3. 写回文件
writeFileSync(filepath, processedContent, 'utf-8');
```

## 相关文档

- [迁移报告](../MIGRATION.md) - 完整的迁移记录和统计
- [Fumadocs 文档](https://fumadocs.vercel.app/) - Fumadocs 官方文档
- [VitePress 文档](https://vitepress.dev/) - VitePress 官方文档
