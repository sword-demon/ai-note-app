const limits = [
  "只解析 CREATE TABLE 与 COMMENT ON，其他 DDL 不会进入生成流程。",
  "方言必须与脚本一致：MySQL 脚本配 MySQL，PostgreSQL 配 PostgreSQL。",
  "不生成 DTO、事务封装、关联预加载，也不支持自定义模板。",
  "安装包未签名，仓库也没有自动化端到端测试。",
];

export function Limits() {
  return (
    <section className="border-t border-fd-border py-14 md:py-20">
      <div className="grid gap-8 rounded-xl border border-fd-border bg-fd-card p-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:p-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fd-foreground/60">
            03 / Boundaries
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            它不做什么
          </h2>
          <p className="mt-4 text-sm leading-7 text-fd-foreground/75">
            这些边界是刻意保留的：生成器只负责把表结构稳定地映射成分层骨架，业务规则仍由你写。
          </p>
        </div>
        <ul className="divide-y divide-fd-border border-t border-fd-border">
          {limits.map((limit) => (
            <li
              key={limit}
              className="flex gap-3 py-3 text-sm leading-7 text-fd-foreground/80"
            >
              <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-brand" />
              <span>{limit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
