#!/usr/bin/env node
/**
 * 转换 VitePress 容器语法为 Fumadocs Callout 组件
 *
 * VitePress 格式:
 * :::danger 标题
 * 内容
 * :::
 *
 * Fumadocs 格式:
 * <Callout type="danger" title="标题">
 * 内容
 * </Callout>
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_DIR = join(__dirname, '../content/docs');

// VitePress 容器类型映射到 Fumadocs Callout 类型
const TYPE_MAP = {
  'info': 'info',
  'tip': 'tip',
  'warning': 'warning',
  'danger': 'error',
  'details': 'note',
  'note': 'note',
};

/**
 * 转换 VitePress 容器为 Fumadocs Callout
 */
function convertContainers(content) {
  // 匹配 VitePress 容器: :::type title\n内容\n:::
  const containerRegex = /^:::(\w+)(?:\s+(.+?))?\s*\n([\s\S]*?)\n:::/gm;

  content = content.replace(containerRegex, (match, type, title, body) => {
    // 映射类型
    const calloutType = TYPE_MAP[type.toLowerCase()] || 'info';

    // 构建 Callout 组件
    const titleAttr = title ? ` title="${title.trim()}"` : '';

    return `<Callout type="${calloutType}"${titleAttr}>\n${body.trim()}\n</Callout>`;
  });

  return content;
}

/**
 * 处理单个文件
 */
function processFile(filepath) {
  try {
    let content = readFileSync(filepath, 'utf-8');
    const originalContent = content;

    // 转换容器
    content = convertContainers(content);

    // 如果内容有变化,则写回文件
    if (content !== originalContent) {
      writeFileSync(filepath, content, 'utf-8');
      console.log(`✓ 已转换: ${filepath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`✗ 转换失败: ${filepath}`, error.message);
    return false;
  }
}

/**
 * 递归遍历目录
 */
function walkDirectory(dir, callback) {
  const files = readdirSync(dir);

  for (const file of files) {
    const filepath = join(dir, file);
    const stat = statSync(filepath);

    if (stat.isDirectory()) {
      walkDirectory(filepath, callback);
    } else if (stat.isFile() && extname(file) === '.mdx') {
      callback(filepath);
    }
  }
}

/**
 * 主函数
 */
function main() {
  console.log('开始转换 VitePress 容器...\n');
  console.log(`目录: ${DOCS_DIR}\n`);

  let convertedCount = 0;
  let totalCount = 0;

  walkDirectory(DOCS_DIR, (filepath) => {
    totalCount++;
    if (processFile(filepath)) {
      convertedCount++;
    }
  });

  console.log(`\n转换完成!`);
  console.log(`总计: ${totalCount} 个文件`);
  console.log(`转换: ${convertedCount} 个文件`);
  console.log(`跳过: ${totalCount - convertedCount} 个文件`);
}

main();
