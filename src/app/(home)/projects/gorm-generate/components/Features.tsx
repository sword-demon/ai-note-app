import { Eyebrow, Section } from "./Section";

const features = [
  {
    label: "DIALECT",
    title: "两种方言",
    body: "MySQL 与 PostgreSQL，含 COMMENT ON 列注释；方言和脚本不匹配时直接提示。",
  },
  {
    label: "OUTPUT",
    title: "三层产物，可选缓存",
    body: "model、repository、service 各就各位；打开缓存开关后，再生成一层 Redis 装饰器与 TTL。",
  },
  {
    label: "PREVIEW",
    title: "按表勾选，按层预览",
    body: "勾选只过滤预览与导出，不会触发重新生成。",
  },
  {
    label: "EXPORT",
    title: "导出到项目目录",
    body: "单文件复制、一键复制全部，或直接写盘；同名文件先确认，拒绝软链接。",
  },
  {
    label: "CONFIG",
    title: "配置收在标题栏",
    body: "module path、缓存 TTL、tinyint(1) 映射都在一处；底部给出对应的 go get 命令。",
  },
  {
    label: "IDEMPOTENT",
    title: "字节级幂等",
    body: "相同输入产生完全相同的输出，生成物可以放心进版本库。",
  },
];

export function Features() {
  return (
    <Section>
      <Eyebrow>03 / Capabilities</Eyebrow>
      <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        少写样板，保留该写的业务
      </h2>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-xl border border-fd-border bg-fd-card p-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fd-foreground/70">
              {feature.label}
            </p>
            <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-7 text-fd-foreground/75">
              {feature.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
