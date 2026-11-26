import { Download, Github } from "lucide-react";
import { RELEASES_URL, REPO_URL } from "../data/links";

const ctaClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-brand-ink transition-colors motion-reduce:transition-none hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-foreground";

export function ProjectCtas() {
  return (
    <>
      <a
        className={ctaClass}
        href={RELEASES_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Download className="size-4" aria-hidden />
        下载 macOS 版
      </a>
      <a
        className={ctaClass}
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="size-4" aria-hidden />在 GitHub 查看
      </a>
    </>
  );
}
