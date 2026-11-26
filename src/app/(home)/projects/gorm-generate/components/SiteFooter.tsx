const REPO_URL = "https://github.com/sword-demon/gorm-generate";

export function SiteFooter() {
  return (
    <footer className="border-t border-fd-border px-4 py-8">
      <div className="mx-auto flex w-full max-w-page flex-col gap-3 text-sm text-fd-foreground/70 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.18em]">
          gorm-generate · only macOS
        </p>
        <a
          className="underline decoration-fd-border underline-offset-4 transition-colors hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-foreground"
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/sword-demon/gorm-generate
        </a>
      </div>
    </footer>
  );
}
