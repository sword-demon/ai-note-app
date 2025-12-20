import Link from "next/link";
import Image from "next/image";
import { blog } from "@/lib/source";

export default function Page() {
  const posts = [...blog.getPages()].sort(
    (a, b) => {
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
      return dateB - dateA;
    },
  );

  return (
    <main className="mx-auto w-full max-w-page px-4 pb-12 md:py-12">
      {/* Banner Section */}
      <div className="relative dark mb-8 aspect-[3.2] p-8 md:p-12 rounded-2xl overflow-hidden">
        <Image
          src="/blog-banner-lofi.jpg"
          priority
          alt="Blog Banner"
          fill
          className="absolute inset-0 size-full object-cover z-0"
        />
        <div className="relative z-10">
          <h1 className="mb-4 text-3xl text-landing-foreground font-mono font-medium">
            AI Note 博客
          </h1>
          <p className="text-sm font-mono text-landing-foreground-200">
            最新的更新和技术分享
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="flex flex-col bg-fd-card rounded-2xl border shadow-sm p-4 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <p className="font-medium">{post.data.title}</p>
            <p className="text-sm text-fd-muted-foreground line-clamp-2">
              {post.data.description}
            </p>

            <p className="mt-auto pt-4 text-xs text-brand">
              {post.data.date ? new Date(post.data.date).toDateString() : ''}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
