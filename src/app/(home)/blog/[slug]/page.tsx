import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { blog } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { cn } from "@/lib/cn";

const buttonVariants = {
  base: "inline-flex items-center justify-center rounded-full font-medium transition-colors",
  sm: "px-4 py-2 text-sm",
  secondary: "border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent",
};

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  const Mdx = page.data.body;

  return (
    <article className="flex flex-col mx-auto w-full max-w-[800px] px-4 py-8">
      {/* 作者和日期信息 */}
      <div className="flex flex-row gap-4 text-sm mb-8">
        <div>
          <p className="mb-1 text-fd-muted-foreground">作者</p>
          <p className="font-medium">{page.data.author}</p>
        </div>
        <div>
          <p className="mb-1 text-sm text-fd-muted-foreground">发布于</p>
          <p className="font-medium">
            {page.data.date ? new Date(page.data.date).toDateString() : ''}
          </p>
        </div>
      </div>

      {/* 标题和描述 */}
      <h1 className="text-3xl font-semibold mb-4">{page.data.title}</h1>
      <p className="text-fd-muted-foreground mb-8">{page.data.description}</p>

      {/* 内容 */}
      <div className="prose min-w-0 flex-1">
        <div className="flex flex-row gap-2 mb-8 not-prose">
          <Link
            href="/blog"
            className={cn(
              buttonVariants.base,
              buttonVariants.sm,
              buttonVariants.secondary,
            )}
          >
            返回
          </Link>
        </div>

        <InlineTOC items={page.data.toc} />
        <Mdx components={getMDXComponents()} />
      </div>
    </article>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description ?? "AI Note 博客文章",
  };
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => {
    // 从 URL 中提取 slug: /blog/slug-name -> slug-name
    const slug = page.url.split('/').pop() || '';
    return { slug };
  });
}
