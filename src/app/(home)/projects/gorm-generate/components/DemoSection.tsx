import { highlight } from "fumadocs-core/highlight";
import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
} from "fumadocs-ui/components/codeblock";
import { DEMO_CONFIG, DEMO_FILES, DEMO_SQL } from "../data/demo";

const panelHeight = "h-[320px] max-h-[320px] lg:h-[460px] lg:max-h-[460px]";

const configItems = [
  DEMO_CONFIG.dialect,
  `module ${DEMO_CONFIG.modulePath}`,
  `cache ${DEMO_CONFIG.cache ? "on" : "off"}`,
  `TTL ${DEMO_CONFIG.cacheTtlSeconds}s`,
  `tinyint(1) → ${DEMO_CONFIG.tinyintOne}`,
];

export async function DemoSection() {
  const sqlNode = await highlight(DEMO_SQL, { lang: "sql" });
  const fileNodes = await Promise.all(
    DEMO_FILES.map(async (file) => ({
      ...file,
      node: await highlight(file.lines.join("\n"), { lang: file.language }),
    })),
  );

  return (
    <section className="border-t border-fd-border py-14 md:py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fd-foreground/60">
            01 / Demo
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            左边是输入，右边是结果
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-fd-foreground/70">
          同一张 users 表，同一份生成配置。切换右侧文件，看每一层实际长什么样。
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-fd-border bg-fd-card px-4 py-3 font-mono text-[11px]">
        <span className="text-fd-foreground/70">生成配置</span>
        {configItems.map((item) => (
          <span key={item} className="text-fd-foreground">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div className="min-w-0">
          <CodeBlock
            title="schema.sql"
            viewportProps={{
              className: panelHeight,
              "aria-label": "MySQL 建表语句示例",
            }}
          >
            {sqlNode}
          </CodeBlock>
        </div>

        <div className="min-w-0">
          <CodeBlockTabs
            defaultValue="model"
            className="my-0 border-fd-border bg-fd-card"
          >
            <div className="border-b border-fd-border px-2">
              <CodeBlockTabsList aria-label="生成文件">
                {DEMO_FILES.map((file) => (
                  <CodeBlockTabsTrigger
                    key={file.kind}
                    value={file.kind}
                    className="py-3 font-mono text-xs text-fd-foreground data-[state=active]:text-fd-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-fd-foreground"
                  >
                    {file.label}
                  </CodeBlockTabsTrigger>
                ))}
              </CodeBlockTabsList>
            </div>
            {fileNodes.map((file) => (
              <CodeBlockTab
                key={file.kind}
                value={file.kind}
                forceMount
                className="data-[state=inactive]:hidden"
              >
                <CodeBlock
                  title={file.path}
                  viewportProps={{
                    className: panelHeight,
                    "aria-label": `${file.path} 生成结果`,
                  }}
                >
                  {file.node}
                </CodeBlock>
              </CodeBlockTab>
            ))}
          </CodeBlockTabs>
        </div>
      </div>

      <p className="mt-4 font-mono text-[11px] text-fd-foreground/70">
        示例逐字取自仓库 fixture；缓存层仅在开关打开时生成。
      </p>
    </section>
  );
}
