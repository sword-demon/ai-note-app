import { ProjectCtas } from "./ProjectCtas";
import { Eyebrow, Section } from "./Section";

const packageRows = [
  { chip: "aarch64", label: "Apple Silicon（M 系列）" },
  { chip: "x64", label: "Intel 芯片" },
];

const gatekeeperSteps = [
  "打开 .dmg，把应用拖进“应用程序”。",
  "在“应用程序”里右键点击图标，选择“打开”。",
  "若仍被拦截，到“系统设置 → 隐私与安全性”点“仍要打开”。",
];

export function DownloadSection() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <Eyebrow>Download</Eyebrow>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            下载，然后粘一张表
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-8 text-fd-foreground/75">
            只发布 macOS 版本，安装包按芯片架构区分。只下载
            <code className="mx-1 rounded bg-fd-muted px-1.5 py-0.5 font-mono text-[13px] text-fd-foreground">
              .dmg
            </code>
            文件，并且只从本项目的 GitHub Releases 下载，不要使用第三方镜像。
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ProjectCtas />
          </div>
          <ul className="mt-7 divide-y divide-fd-border border-y border-fd-border">
            {packageRows.map((row) => (
              <li
                key={row.chip}
                className="flex items-center justify-between gap-4 py-3 text-sm"
              >
                <span className="text-fd-foreground">{row.label}</span>
                <code className="rounded border border-fd-border px-2 py-0.5 font-mono text-xs text-fd-foreground">
                  {row.chip}
                </code>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-fd-border bg-fd-card p-6">
          <h3 className="text-sm font-semibold">未签名应用的首次打开</h3>
          <p className="mt-2 text-sm leading-7 text-fd-foreground/75">
            当前安装包没有 Apple 开发者签名，macOS
            会默认拦截。按下面三步放行即可，不需要关闭 Gatekeeper。
          </p>
          <ol className="mt-4 space-y-3">
            {gatekeeperSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-7">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-fd-border font-mono text-[11px] text-fd-foreground">
                  {index + 1}
                </span>
                <span className="text-fd-foreground/80">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
