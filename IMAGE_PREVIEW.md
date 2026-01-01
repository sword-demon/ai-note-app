# 图片预览功能说明

## 功能概述

为所有 Markdown/MDX 文档中的图片添加了点击放大预览功能。

## 特性

### ✨ 核心功能
- ✅ 点击任何 markdown 图片即可放大预览
- ✅ 全屏模态框展示
- ✅ 支持点击背景关闭
- ✅ 支持 ESC 键关闭
- ✅ 显示图片 alt 说明文字
- ✅ 平滑的动画过渡效果

### 🎨 用户体验
- **悬停提示**：鼠标悬停在图片上时显示"点击放大"提示
- **鼠标样式**：图片上的鼠标显示为放大镜样式 (`cursor-zoom-in`)
- **缩放动画**：悬停时图片轻微放大 (scale 1.02)
- **阴影效果**：悬停时增强阴影
- **滚动锁定**：预览时锁定背景页面滚动

### 🔧 技术实现

#### 组件结构
```
src/components/ImagePreview.tsx
├── ImagePreviewModal      # 全屏预览模态框组件
└── ClickableImage        # 可点击的图片组件
```

#### 集成方式
通过 `src/mdx-components.tsx` 覆盖默认的 `img` 标签：

```tsx
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: ClickableImage,  // 所有 markdown 图片自动应用
    ...components,
  };
}
```

## 使用方法

### 在 Markdown 中
无需任何特殊语法，所有标准 markdown 图片语法都自动支持：

```markdown
![图片描述](/path/to/image.png)
```

### 在 MDX 中
同样支持标准 markdown 图片语法：

```mdx
![React 架构图](/react-architecture.png)
```

也支持 HTML 语法（但建议使用 markdown 语法）：

```mdx
<img src="/image.png" alt="描述" />
```

## 测试页面

以下页面已包含图片，可直接测试：

1. `/docs/backend/ai/n8n_crawl4ai` - 包含 11 张图片
2. `/docs/backend/ai/cursor_zhihu_chrome_extension` - 包含多张截图
3. `/docs/backend/ai/coze_workflow` - 包含工作流图片
4. `/docs/front/React/react_native` - 包含示例图片
5. `/docs/backend/ai/animal_video` - 包含视频截图

## 样式定制

### 修改动画时长
在 `src/app/global.css` 中调整：

```css
.duration-200 {
  animation-duration: 200ms; /* 淡入动画 */
}

.duration-300 {
  animation-duration: 300ms; /* 缩放动画 */
}
```

### 修改背景透明度
在 `ImagePreviewModal` 组件中调整：

```tsx
className="bg-black/90"  // 90% 不透明度
```

### 修改悬停缩放比例
在 `ClickableImage` 组件中调整：

```tsx
className="hover:scale-[1.02]"  // 悬停时放大 2%
```

## 技术细节

### 键盘事件
- **ESC 键**：关闭预览
- **自动清理**：组件卸载时自动移除事件监听

### 滚动管理
- 预览打开时：`document.body.style.overflow = 'hidden'`
- 预览关闭时：`document.body.style.overflow = 'auto'`

### 性能优化
- 使用 CSS 动画代替 JavaScript 动画
- 懒加载：只有点击时才渲染模态框
- 事件委托：避免为每张图片添加多个监听器

## 浏览器兼容性

- ✅ Chrome / Edge (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ 移动端浏览器

## 已知限制

1. **SVG 图片**：支持，但某些复杂 SVG 可能需要特殊处理
2. **外部图片**：支持，但可能受 CORS 限制

## 技术说明

### 图片优化兼容性

组件自动处理两种 src 格式：
- **字符串格式**: `src="/image.png"` （标准 markdown）
- **对象格式**: `src={{ src: '/_next/...', width: 1200, ... }}` （Next.js/fumadocs 优化）

当 fumadocs 的默认 img 组件将图片转换为对象时，ClickableImage 会自动提取 `src.src` 字符串，确保图片正常显示和预览。

## 未来改进

可选的增强功能：

- [ ] 添加图片缩放控制 (放大/缩小按钮)
- [ ] 添加多图浏览 (上一张/下一张)
- [ ] 添加图片下载功能
- [ ] 添加图片旋转功能
- [ ] 支持触摸手势 (移动端)
- [ ] 添加图片加载进度条

## 开发者提示

### 调试模式
在组件中添加 console.log 查看状态：

```tsx
console.log('Preview opened:', { src, alt });
```

### 禁用预览功能
如果需要禁用某张图片的预览，可以使用 HTML 语法并添加特定类：

```html
<img src="/image.png" alt="不可预览" className="no-preview" />
```

然后在 `ClickableImage` 中检查该类。

---

**维护者**: AI Note 开发团队  
**最后更新**: 2026-01-01

