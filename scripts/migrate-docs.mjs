#!/usr/bin/env node
/**
 * VitePress 到 Fumadocs 文档迁移脚本
 *
 * 功能:
 * 1. 将 .md 文件转换为 .mdx 格式
 * 2. 转换 frontmatter 为 Fumadocs 格式
 * 3. 保持原有目录结构
 * 4. 不修改源文件
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 配置路径
const SOURCE_DIR = '/Users/wxvirus/WebStormProjects/vitepressDocs/docs';
const TARGET_DIR = join(__dirname, '../content/docs');

// 需要排除的文件
const EXCLUDE_FILES = ['index.md'];

/**
 * 解析 frontmatter
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: content };
  }

  const frontmatterText = match[1];
  const body = content.slice(match[0].length);

  // 解析 YAML frontmatter (简单实现)
  const frontmatter = {};
  const lines = frontmatterText.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();

    if (key && value) {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content: body };
}

/**
 * 转换为 Fumadocs frontmatter
 */
function convertToFumadocsFrontmatter(frontmatter, filepath) {
  const fumadocsFrontmatter = {};

  // 提取标题
  if (frontmatter.title) {
    fumadocsFrontmatter.title = frontmatter.title;
  }

  // 提取描述
  if (frontmatter.description) {
    fumadocsFrontmatter.description = frontmatter.description;
  }

  // 如果没有 title,从内容的第一个标题提取或使用文件名
  if (!fumadocsFrontmatter.title) {
    const filename = basename(filepath, '.md');
    fumadocsFrontmatter.title = filename.replace(/_/g, ' ');
  }

  return fumadocsFrontmatter;
}

/**
 * 从内容中提取第一个标题作为 title
 */
function extractTitleFromContent(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * 生成 MDX frontmatter
 */
function generateMdxFrontmatter(frontmatter) {
  const lines = [];
  lines.push('---');

  if (frontmatter.title) {
    lines.push(`title: ${frontmatter.title}`);
  }

  if (frontmatter.description) {
    lines.push(`description: ${frontmatter.description}`);
  }

  lines.push('---');
  lines.push('');

  return lines.join('\n');
}

/**
 * 处理单个文件
 */
function processFile(sourcePath, targetPath) {
  try {
    // 读取文件内容
    const content = readFileSync(sourcePath, 'utf-8');

    // 解析 frontmatter
    const { frontmatter, content: body } = parseFrontmatter(content);

    // 转换为 Fumadocs frontmatter
    const fumadocsFrontmatter = convertToFumadocsFrontmatter(frontmatter, sourcePath);

    // 如果没有 title,尝试从内容中提取
    if (!fumadocsFrontmatter.title) {
      const titleFromContent = extractTitleFromContent(body);
      if (titleFromContent) {
        fumadocsFrontmatter.title = titleFromContent;
      }
    }

    // 生成新的 MDX 内容
    const mdxFrontmatter = generateMdxFrontmatter(fumadocsFrontmatter);
    const mdxContent = mdxFrontmatter + body;

    // 创建目标目录
    const targetDir = dirname(targetPath);
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    // 写入文件
    writeFileSync(targetPath, mdxContent, 'utf-8');

    console.log(`✓ ${relative(SOURCE_DIR, sourcePath)} -> ${relative(TARGET_DIR, targetPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ 处理文件失败: ${sourcePath}`, error.message);
    return false;
  }
}

/**
 * 遍历目录
 */
function walkDirectory(dir, callback) {
  const files = readdirSync(dir);

  for (const file of files) {
    const filepath = join(dir, file);
    const stat = statSync(filepath);

    if (stat.isDirectory()) {
      // 跳过 public 目录
      if (file === 'public') continue;

      walkDirectory(filepath, callback);
    } else if (stat.isFile() && extname(file) === '.md') {
      // 跳过排除的文件
      if (EXCLUDE_FILES.includes(file)) continue;

      callback(filepath);
    }
  }
}

/**
 * 主函数
 */
function main() {
  console.log('开始迁移文档...\n');
  console.log(`源目录: ${SOURCE_DIR}`);
  console.log(`目标目录: ${TARGET_DIR}\n`);

  let successCount = 0;
  let failCount = 0;

  // 遍历并处理所有 .md 文件
  walkDirectory(SOURCE_DIR, (sourcePath) => {
    // 计算相对路径
    const relativePath = relative(SOURCE_DIR, sourcePath);

    // 生成目标路径 (.md -> .mdx)
    const targetPath = join(TARGET_DIR, relativePath.replace(/\.md$/, '.mdx'));

    // 处理文件
    if (processFile(sourcePath, targetPath)) {
      successCount++;
    } else {
      failCount++;
    }
  });

  console.log(`\n迁移完成!`);
  console.log(`成功: ${successCount} 个文件`);
  console.log(`失败: ${failCount} 个文件`);
}

// 运行主函数
main();
