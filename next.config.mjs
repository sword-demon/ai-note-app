import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  // 启用更详细的日志记录
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // 优化外部包处理
  serverExternalPackages: [
    'shiki',
  ],

  // 可选:添加重定向规则
  // async redirects() {
  //   return [
  //     // 添加你的重定向规则
  //   ];
  // },

  // 可选:添加重写规则
  // async rewrites() {
  //   return [
  //     // 添加你的重写规则
  //   ];
  // },
};

export default withMDX(config);
