"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonBaseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors";
const buttonSecondaryStyles =
  "border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground";

export function CopyMarkdownButton({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(buttonBaseStyles, buttonSecondaryStyles)}
      aria-label="Copy Markdown"
    >
      {copied ? (
        <>
          <Check className="size-4" />
          已复制
        </>
      ) : (
        <>
          <Copy className="size-4" />
          Copy Markdown
        </>
      )}
    </button>
  );
}

export function OpenButton({ url }: { url: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(buttonBaseStyles, buttonSecondaryStyles)}
        aria-label="Open"
      >
        Open
        <ChevronDown
          className={cn("size-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 min-w-[200px] rounded-xl border bg-fd-popover shadow-lg z-10">
          <div className="p-1">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-fd-accent transition-colors"
            >
              <ExternalLink className="size-4" />
              在新标签页打开
            </a>
            <a
              href={`https://github.com/sword-demon/ai-note-app/blob/main/content/docs${url.replace(
                "/docs",
                ""
              )}.mdx`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-fd-accent transition-colors"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              在 GitHub 上查看
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
