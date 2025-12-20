import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';
import lastModified from 'fumadocs-mdx/plugins/last-modified';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      // 添加自定义字段
      preview: z.string().optional(),
      index: z.boolean().default(false),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
      // 提取链接引用以便更好的内部链接处理
      extractLinkReferences: true,
    },
  },
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional(),
    }),
  },
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
  }),
});

export default defineConfig({
  plugins: [
    // 自动添加最后修改时间
    lastModified(),
  ],
  mdxOptions: {
    // MDX options
    remarkCodeTabOptions: {
      parseMdx: true,
    },
  },
});
