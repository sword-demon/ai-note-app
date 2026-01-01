'use client'; // 标记为客户端组件

import { useEffect } from 'react'; // 导入 useEffect hook
import type { MonthlyItem, DeepDiveData } from '../types'; // 导入类型定义

// 模态框组件的属性接口
interface InsightModalProps {
  modalItem: MonthlyItem | null; // 当前显示的项目（null 表示模态框关闭）
  deepDiveData: DeepDiveData; // 深度洞察数据
  onClose: () => void; // 关闭模态框的函数
}

// 洞察详情模态框组件
export default function InsightModal({
  modalItem,
  deepDiveData,
  onClose
}: InsightModalProps) {
  // 使用 useEffect 处理模态框打开时的滚动锁定
  // 注意：useEffect 必须在所有条件判断之前调用
  useEffect(() => {
    if (modalItem) {
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
    }
    
    // 清理函数：组件卸载或 modalItem 变化时恢复滚动
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalItem]);

  // 如果没有选中项目，不显示模态框
  if (!modalItem) return null;

  // 获取该项目的深度洞察数据
  const data = deepDiveData[modalItem.id];
  if (!data) return null; // 如果没有数据，不显示

  // 处理背景点击事件（点击背景关闭模态框）
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* 模态框内容容器 */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* 模态框头部：固定在顶部 */}
        <div className="p-6 border-b border-stone-100 flex justify-between items-start sticky top-0 bg-white z-10">
          <div>
            {/* 分类标签 */}
            <span className="text-xs font-bold tracking-wider uppercase text-orange-600 mb-1 block">
              {modalItem.category}
            </span>
            {/* 标题 */}
            <h3 className="text-2xl font-bold text-stone-900 leading-tight">
              {modalItem.title}
            </h3>
          </div>
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-800 p-1 transition-colors"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        
        {/* 模态框内容区域 */}
        <div className="p-6 space-y-6">
          {/* 发生时间 */}
          <div>
            <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
              📅 发生时间
            </h4>
            <p className="text-stone-800">
              2025年 {modalItem.month}月
            </p>
          </div>
          
          {/* 内容深度回顾 */}
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
            <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
              📖 内容深度回顾
            </h4>
            <p className="text-stone-700 leading-relaxed">
              {data.content}
            </p>
          </div>
          
          {/* 对未来的影响 */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <h4 className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-2">
              🚀 对未来的影响
            </h4>
            <p className="text-stone-800 leading-relaxed">
              {data.impact}
            </p>
          </div>
        </div>
        
        {/* 模态框底部：固定在底部 */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 text-right sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-800 text-white rounded hover:bg-stone-700 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}

