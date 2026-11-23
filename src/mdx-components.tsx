import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ClickableImage } from "@/components/ImagePreview";
import { Linkcard } from "@/components/Linkcard";
import { Mermaid } from "@/components/Mermaid";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Linkcard,
    Mermaid,
    // 覆盖默认的 img 标签，使所有 markdown 图片都支持点击放大预览
    img: ClickableImage,
    // 确保 components 参数中的 img 不会覆盖我们的 ClickableImage
    ...(components &&
      Object.fromEntries(
        Object.entries(components).filter(([key]) => key !== "img"),
      )),
  };
}
