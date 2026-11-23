import { SidebarTrigger } from "fumadocs-ui/components/sidebar/base";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { PanelLeft } from "lucide-react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <HomeLayout {...baseOptions()}>
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions()}
        links={[]}
        nav={{
          component: (
            <div className="sticky top-14 z-30 border-b bg-fd-background/80 backdrop-blur-sm [grid-area:header] md:hidden">
              <SidebarTrigger className="flex h-12 w-full items-center gap-2 px-4 text-sm">
                <PanelLeft className="size-4" />
                文档目录
              </SidebarTrigger>
            </div>
          ),
        }}
        containerProps={{
          className:
            "[--fd-banner-height:3.5rem] [--fd-docs-height:calc(100dvh-3.5rem)] max-md:layout:[--fd-header-height:3rem]",
        }}
      >
        {children}
      </DocsLayout>
    </HomeLayout>
  );
}
