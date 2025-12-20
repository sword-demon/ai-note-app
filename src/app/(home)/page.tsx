import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export default function HomePage() {
  return (
    <main className="text-landing-foreground pt-4 pb-6 dark:text-landing-foreground-dark md:pb-12">
      {/* Hero Section */}
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px]">
        {/* Background Image */}
        <Image
          src="/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-30 dark:opacity-20"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-brand/10 to-transparent" />

        <div className="flex flex-col relative z-10 px-4 size-full md:p-12 max-md:items-center max-md:text-center justify-center">
          <p className="mt-12 text-xs text-brand font-medium rounded-full p-2 border border-brand/50 w-fit">
            AI 驱动的笔记应用
          </p>
          <h1 className="text-4xl my-8 leading-tight font-medium xl:text-5xl xl:mb-12">
            构建优秀的
            <br className="md:hidden" /> 文档,
            <br />
            你的 <span className="text-brand">风格</span>.
          </h1>
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit">
            <Link
              href="/docs"
              className="inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors bg-brand text-brand-foreground hover:bg-brand-200 max-sm:text-sm"
            >
              开始使用
            </Link>
            <Link
              href="/blog"
              className="inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent max-sm:text-sm"
            >
              查看博客
            </Link>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2">
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
          AI Note 是一个基于{' '}
          <span className="text-brand font-medium">React.js</span> 和{' '}
          <span className="text-brand font-medium">Next.js</span> 的智能笔记应用,
          为开发者和内容创作者提供强大的文档管理功能。
        </p>

        {/* Feature Cards */}
        <FeatureCard
          title="强大的 MDX 支持"
          description="使用 MDX 编写文档,结合 Markdown 的简洁性和 React 组件的强大功能。"
        />

        <FeatureCard
          title="智能搜索"
          description="集成全文搜索功能,快速找到你需要的内容。"
        />

        <FeatureCard
          title="响应式设计"
          description="完美适配各种设备,无论是手机、平板还是桌面。"
        />

        <FeatureCard
          title="主题定制"
          description="支持深色模式和浅色模式,提供优秀的阅读体验。"
        />

        {/* Call to Action */}
        <div className="col-span-full rounded-2xl text-sm p-6 bg-brand-secondary text-brand-secondary-foreground shadow-lg text-center">
          <h2 className="text-2xl font-medium mb-4">准备开始了吗?</h2>
          <p className="mb-6 text-brand-secondary-foreground/80">
            探索强大的文档管理功能,让你的内容更有条理。
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/docs"
              className="inline-flex justify-center px-6 py-3 rounded-full font-medium tracking-tight transition-colors bg-brand text-brand-foreground hover:bg-brand-200"
            >
              阅读文档
            </Link>
            <Link
              href="/blog"
              className="inline-flex justify-center px-6 py-3 rounded-full font-medium tracking-tight transition-colors border bg-fd-card text-fd-foreground hover:bg-fd-accent"
            >
              查看博客
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl text-sm p-6 border bg-fd-card shadow-lg">
      <h3 className="text-xl font-medium tracking-tight mb-4">{title}</h3>
      <p className="text-fd-muted-foreground">{description}</p>
    </div>
  );
}
