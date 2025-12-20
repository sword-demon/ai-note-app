#!/usr/bin/env node
/**
 * 修复 MDX 文件中的花括号转义问题
 *
 * 在 MDX 中,花括号 {} 被视为 JavaScript 表达式
 * 需要在表格、普通文本等地方转义花括号
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_DIR = join(__dirname, '../content/docs');

/**
 * 转义表格中的花括号
 * 在表格单元格中,将 {xxx} 转义为 \{xxx\}
 */
function escapeCurlyBracesInTables(content) {
  // 分行处理
  const lines = content.split('\n');
  const result = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 检测是否在表格中(表格行包含 |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;

      // 在表格行中转义花括号
      // 匹配不在代码块中的花括号
      let processedLine = line;

      // 转义表格单元格中的花括号,但保留代码块中的
      // 匹配模式: | cell content {something} more content |
      processedLine = processedLine.replace(/\|([^|]*)\{([^}]+)\}([^|]*)\|/g, (match, before, inside, after) => {
        // 检查是否在代码块中(` ` 包围)
        const beforeBackticks = (before.match(/`/g) || []).length;
        const afterBackticks = (after.match(/`/g) || []).length;

        // 如果前后反引号数量都是偶数,说明不在代码块中,需要转义
        if (beforeBackticks % 2 === 0 && afterBackticks % 2 === 0) {
          return `|${before}\\{${inside}\\}${after}|`;
        }

        return match;
      });

      result.push(processedLine);
    } else {
      // 如果连续两行都不是表格行,认为表格结束
      if (inTable && !line.trim().startsWith('|')) {
        inTable = false;
      }
      result.push(line);
    }
  }

  return result.join('\n');
}

/**
 * 处理单个文件
 */
function processFile(filepath) {
  try {
    let content = readFileSync(filepath, 'utf-8');
    const originalContent = content;

    // 转义表格中的花括号
    content = escapeCurlyBracesInTables(content);

    // 如果内容有变化,则写回文件
    if (content !== originalContent) {
      writeFileSync(filepath, content, 'utf-8');
      console.log(`✓ 已修复: ${filepath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`✗ 修复失败: ${filepath}`, error.message);
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
  console.log('开始修复 MDX 花括号转义...\n');
  console.log(`目录: ${DOCS_DIR}\n`);

  let fixedCount = 0;
  let totalCount = 0;

  walkDirectory(DOCS_DIR, (filepath) => {
    totalCount++;
    if (processFile(filepath)) {
      fixedCount++;
    }
  });

  console.log(`\n修复完成!`);
  console.log(`总计: ${totalCount} 个文件`);
  console.log(`修复: ${fixedCount} 个文件`);
  console.log(`跳过: ${totalCount - fixedCount} 个文件`);
}

main();
