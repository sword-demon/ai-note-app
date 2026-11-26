import { ProjectCtas } from "./ProjectCtas";
import { Eyebrow } from "./Section";

const chips = [
  "MySQL / PostgreSQL",
  "model · repository · service",
  "可选 Redis 缓存",
  "完全离线",
];

export function Hero() {
  return (
    <section className="relative isolate pt-14 pb-12 md:pt-20 md:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 -z-10 size-72 rounded-full bg-brand/10 blur-3xl"
      />
      <Eyebrow>Tauri 2 · Rust core · 100% local</Eyebrow>
      <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.12] tracking-tight md:text-6xl">
        把建表语句，
        <br className="hidden sm:block" />
        编译成{" "}
        <span className="relative whitespace-nowrap">
          GORM 分层代码
          <span
            aria-hidden
            className="absolute inset-x-0 -bottom-1 h-1.5 rounded-full bg-brand"
          />
        </span>
      </h1>
      <p className="mt-6 max-w-xl text-[15px] leading-8 text-fd-foreground/75">
        粘贴 MySQL 或 PostgreSQL 的 DDL，离线生成 model、repository、service
        与可选的 Redis
        缓存。不连数据库，不发网络请求；相同输入得到字节级相同的输出。
      </p>
      <ul className="mt-7 flex flex-wrap gap-2 font-mono text-[11px] tracking-wide">
        {chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-fd-border bg-fd-card/60 px-3 py-1.5 text-fd-foreground"
          >
            {chip}
          </li>
        ))}
      </ul>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ProjectCtas />
      </div>
      <p className="mt-3 font-mono text-xs text-fd-foreground/60">
        Apple Silicon 与 Intel 各有安装包 · 未签名，首次打开需手动放行
      </p>
    </section>
  );
}
