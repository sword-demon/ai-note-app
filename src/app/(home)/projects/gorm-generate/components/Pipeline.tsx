const steps = [
  {
    index: "01",
    title: "解析",
    body: "sqlparser 读入 DDL，得到表、列、注释与方言信息。",
  },
  {
    index: "02",
    title: "校验",
    body: "方言必须与脚本一致；只接受 CREATE TABLE 与 COMMENT ON。",
  },
  {
    index: "03",
    title: "渲染",
    body: "按层生成 model、repository、service 与可选缓存。",
  },
  {
    index: "04",
    title: "导出",
    body: "先规划路径、检查冲突，再一次性写盘。",
  },
];

export function Pipeline() {
  return (
    <section className="border-t border-fd-border py-14 md:py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fd-foreground/60">
            01 / How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            一次编译，四步走完
          </h2>
        </div>
        <p className="max-w-md font-mono text-xs leading-6 text-fd-foreground/60">
          ddl → tables → plan → internal/*
        </p>
      </div>
      <ol className="mt-9 grid gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.index} className="bg-fd-background p-6">
            <span className="font-mono text-xs text-fd-foreground/60">
              {step.index}
            </span>
            <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-fd-foreground/75">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
