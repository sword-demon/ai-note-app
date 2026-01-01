// 月度项目的类型定义
export interface MonthlyItem {
  id: number; // 唯一标识符
  title: string; // 标题
  points: number; // 热度积分
  category: string; // 分类（AI、Dev、Tech、Society、Business）
  isTop20: boolean; // 是否是年度 Top 20
  month?: number; // 月份（用于展示）
}

// 月度数据的类型定义：键为月份数字，值为项目数组
export type MonthlyData = Record<number, MonthlyItem[]>;

// 深度洞察数据的类型定义
export interface DeepDiveItem {
  content: string; // 内容深度回顾
  impact: string; // 对未来的影响
}

// 深度洞察数据集合的类型定义：键为项目 ID，值为洞察内容
export interface DeepDiveData {
  [id: number]: DeepDiveItem;
}

