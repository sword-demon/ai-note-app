"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

// Mermaid 的配置是全局状态，按顺序初始化和渲染，避免多张图的主题互相覆盖。
let renderQueue = Promise.resolve();
let renderSequence = 0;

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "default";
  const [result, setResult] = useState<{
    chart: string;
    theme: string;
    svg?: string;
    error?: string;
  }>();
  const current =
    result?.chart === chart && result.theme === theme ? result : undefined;

  useEffect(() => {
    let cancelled = false;

    renderQueue = renderQueue.then(async () => {
      if (cancelled) return;
      const container = document.createElement("div");

      try {
        const { default: mermaid } = await import("mermaid");
        if (cancelled) return;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          suppressErrorRendering: true,
          theme,
        });
        // 保留布局测量能力，同时隐藏 Mermaid 生成的临时节点。
        container.style.cssText =
          "position:fixed;visibility:hidden;pointer-events:none;top:0;left:0";
        document.body.append(container);
        // 快速切回原主题时，旧 SVG 可能仍可见；每次渲染使用独立 ID。
        const { svg } = await mermaid.render(
          `mermaid-${id}-${++renderSequence}`,
          chart,
          container,
        );
        if (!cancelled) setResult({ chart, theme, svg });
      } catch (error) {
        if (!cancelled) {
          setResult({
            chart,
            theme,
            error: error instanceof Error ? error.message : "未知渲染错误",
          });
        }
      } finally {
        container.remove();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id, theme]);

  if (current?.error) {
    return (
      <div className="not-prose my-6 rounded-lg border p-4">
        <p role="alert" className="text-sm text-fd-muted-foreground">
          Mermaid 图表渲染失败，请检查图表语法。
        </p>
        <details className="mt-2 text-sm">
          <summary className="cursor-pointer">查看源码和错误信息</summary>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap">
            {current.error}
          </pre>
          <pre className="mt-2 overflow-x-auto">{chart}</pre>
        </details>
      </div>
    );
  }

  if (!current?.svg) {
    return (
      <output className="my-6 block text-sm text-fd-muted-foreground">
        正在加载图表…
      </output>
    );
  }

  return (
    <section
      aria-label="Mermaid 图表"
      // biome-ignore lint/a11y/noNoninteractiveTabindex: 横向滚动区域需要支持键盘聚焦和滚动。
      tabIndex={0}
      className="not-prose my-6 max-w-full overflow-x-auto rounded-lg border p-4 [&_svg]:mx-auto"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG 由 Mermaid strict 模式生成并清理。
      dangerouslySetInnerHTML={{ __html: current.svg }}
    />
  );
}
