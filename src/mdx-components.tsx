import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Linkcard } from '@/components/Linkcard';
import { ClickableImage } from '@/components/ImagePreview';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Linkcard,
    // 覆盖默认的 img 标签，使所有 markdown 图片都支持点击放大预览
    img: ClickableImage,
    ...components,
  };
}
