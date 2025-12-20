#!/usr/bin/env node
/**
 * 修复 MDX 文件的常见问题
 *
 * 1. 修复图片路径: /public/image.png -> /image.png
 * 2. 修复代码块语言标识: Plain -> text, Shell -> bash
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_DIR = join(__dirname, '../content/docs');

// 语言映射表 (大写 -> 小写或正确的标识符)
const LANGUAGE_MAP = {
  'Plain': 'text',
  'plain': 'text',
  'Shell': 'bash',
  'shell': 'bash',
  'Bash': 'bash',
  'PowerShell': 'powershell',
  'Powershell': 'powershell',
  'CSS': 'css',
  'Markdown': 'markdown',
  'markdown': 'md',
  'Javascript': 'javascript',
  'JavaScript': 'javascript',
  'Typescript': 'typescript',
  'TypeScript': 'typescript',
  'Python': 'python',
  'Java': 'java',
  'Go': 'go',
  'Rust': 'rust',
  'C': 'c',
  'Cpp': 'cpp',
  'JSON': 'json',
  'YAML': 'yaml',
  'XML': 'xml',
  'HTML': 'html',
  'SQL': 'sql',
};

/**
 * 修复图片路径
 */
function fixImagePaths(content) {
  // 修复 Markdown 图片语法: ![alt](../../public/image.png) -> ![alt](/image.png)
  content = content.replace(/!\[([^\]]*)\]\(\.\.\/\.\.\/public\/([^)]+)\)/g, '![$1](/$2)');

  // 修复 Markdown 图片语法: ![alt](/public/image.png) -> ![alt](/image.png)
  content = content.replace(/!\[([^\]]*)\]\(\/public\/([^)]+)\)/g, '![$1](/$2)');

  // 修复 HTML img 标签: <img src="../../public/image.png" /> -> <img src="/image.png" />
  content = content.replace(/src="\.\.\/\.\.\/public\/([^"]+)"/g, 'src="/$1"');

  // 修复 HTML img 标签: <img src="/public/image.png" /> -> <img src="/image.png" />
  content = content.replace(/src="\/public\/([^"]+)"/g, 'src="/$1"');

  return content;
}

/**
 * 修复代码块语言标识
 */
function fixCodeLanguages(content) {
  // 匹配代码块: ```language
  const codeBlockRegex = /```(\w+)/g;

  content = content.replace(codeBlockRegex, (match, lang) => {
    if (LANGUAGE_MAP[lang]) {
      return '```' + LANGUAGE_MAP[lang];
    }
    return match;
  });

  return content;
}

/**
 * 修复单个文件
 */
function fixFile(filepath) {
  try {
    let content = readFileSync(filepath, 'utf-8');
    const originalContent = content;

    // 修复图片路径
    content = fixImagePaths(content);

    // 修复代码语言
    content = fixCodeLanguages(content);

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
  console.log('开始修复 MDX 文件...\n');
  console.log(`目录: ${DOCS_DIR}\n`);

  let fixedCount = 0;
  let totalCount = 0;

  walkDirectory(DOCS_DIR, (filepath) => {
    totalCount++;
    if (fixFile(filepath)) {
      fixedCount++;
    }
  });

  console.log(`\n修复完成!`);
  console.log(`总计: ${totalCount} 个文件`);
  console.log(`修复: ${fixedCount} 个文件`);
  console.log(`跳过: ${totalCount - fixedCount} 个文件`);
}

main();
