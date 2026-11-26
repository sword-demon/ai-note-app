import type { Metadata } from "next";
import { DownloadSection } from "./components/DownloadSection";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Limits } from "./components/Limits";
import { Pipeline } from "./components/Pipeline";
import { SiteFooter } from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "gorm-generate — SQL DDL 转 GORM 分层代码",
  description:
    "粘贴 MySQL 或 PostgreSQL 的建表语句，离线生成 model、repository、service 与可选 Redis 缓存。Tauri 2 + Rust，仅发布 macOS 版。",
};

export default function Page() {
  return (
    <div lang="zh-CN" className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-page px-4 pb-16">
        <Hero />
        <Pipeline />
        <Features />
        <Limits />
        <DownloadSection />
      </div>
      <SiteFooter />
    </div>
  );
}
