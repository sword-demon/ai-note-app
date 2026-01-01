'use client'; // 客户端组件

import { useState, useEffect } from 'react'; // 导入 React hooks
import Image from 'next/image'; // 导入 Next.js 图片组件

// 图片预览模态框组件
export function ImagePreviewModal({
  src,
  alt,
  onClose
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  // 使用 useEffect 处理键盘 ESC 关闭和滚动锁定
  useEffect(() => {
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
    
    // 添加 ESC 键监听
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // 清理函数
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // 处理背景点击关闭
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
        aria-label="关闭预览"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* 图片容器 */}
      <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* 图片说明 */}
      {alt && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm max-w-2xl text-center">
          {alt}
        </div>
      )}

      {/* 提示文本 */}
      <div className="absolute top-4 left-4 text-white/60 text-sm">
        点击图片外区域或按 ESC 关闭
      </div>
    </div>
  );
}

// 可点击的图片组件：用于 MDX 中覆盖默认的 img 标签
export function ClickableImage({
  src,
  alt = '',
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  // 状态：是否显示预览模态框
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 如果没有 src，返回 null
  if (!src) return null;

  return (
    <>
      {/* 可点击的图片 */}
      <span className="inline-block cursor-zoom-in relative group my-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          {...props}
          onClick={() => setIsPreviewOpen(true)}
          className="rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
        />
        {/* 悬停时显示放大提示 */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-stone-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            点击放大
          </div>
        </div>
      </span>

      {/* 图片预览模态框 */}
      {isPreviewOpen && (
        <ImagePreviewModal
          src={src}
          alt={alt}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  );
}

