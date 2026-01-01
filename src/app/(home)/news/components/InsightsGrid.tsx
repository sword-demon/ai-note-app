import type { MonthlyData, DeepDiveData, MonthlyItem } from '../types'; // 导入类型定义

// 洞察网格组件的属性接口
interface InsightsGridProps {
  activeCategoryFilter: string; // 当前激活的分类筛选
  setActiveCategoryFilter: (category: string) => void; // 设置分类筛选的函数
  monthlyData: MonthlyData; // 月度数据
  deepDiveData: DeepDiveData; // 深度洞察数据
  setModalItem: (item: MonthlyItem | null) => void; // 设置模态框显示项目的函数
}

// Top 20 洞察网格组件
export default function InsightsGrid({
  activeCategoryFilter,
  setActiveCategoryFilter,
  monthlyData,
  deepDiveData,
  setModalItem
}: InsightsGridProps) {
  // 从月度数据中提取所有 Top 20 项目
  const allItems: Array<MonthlyItem & { month: number }> = [];
  Object.keys(monthlyData).forEach((m: string) => {
    const monthKey = Number(m);
    const items = monthlyData[monthKey];
    if (items) {
      items.forEach(item => {
        if (item.isTop20) {
          allItems.push({ ...item, month: monthKey });
        }
      });
    }
  });

  // 根据分类筛选过滤项目
  const filtered = activeCategoryFilter === 'all'
    ? allItems
    : allItems.filter(i => i.category === activeCategoryFilter);

  // 根据分类返回对应的颜色样式
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI':
        return 'text-orange-600 bg-orange-50'; // AI 分类：橙色
      case 'Dev':
        return 'text-blue-600 bg-blue-50'; // 开发生态：蓝色
      case 'Tech':
        return 'text-green-600 bg-green-50'; // 硬科技：绿色
      case 'Society':
        return 'text-purple-600 bg-purple-50'; // 社会与政策：紫色
      default:
        return 'text-stone-500 bg-stone-100'; // 默认：灰色
    }
  };

  // 筛选器按钮配置
  const filterButtons = [
    { label: '全部', value: 'all' },
    { label: '人工智能', value: 'AI' },
    { label: '开发生态', value: 'Dev' },
    { label: '硬科技 & 科学', value: 'Tech' },
    { label: '社会与政策', value: 'Society' }
  ];

  return (
    <section id="insights" className="py-16 bg-stone-100 border-t border-stone-200">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 标题和描述区域 */}
        <div className="mb-12 text-center md:text-left">
          <h3 className="text-2xl font-bold text-stone-900 mb-3">
            年度 Top 20：最具代表性的变革
          </h3>
          <p className="text-stone-600 max-w-3xl">
            我们从全年 60 个热点中筛选出了 20 个对未来技术格局影响最为深远的事件。点击卡片查看其核心内容回顾及未来影响预测。
          </p>
        </div>

        {/* 分类筛选器 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
          {filterButtons.map(({ label, value }) => {
            const isActive = activeCategoryFilter === value; // 判断是否为当前激活的筛选项
            
            return (
              <button
                key={value}
                onClick={() => setActiveCategoryFilter(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-stone-800 text-white shadow-sm' // 激活状态样式
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-orange-500 hover:text-orange-600' // 默认状态样式
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* 洞察卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => {
            const data = deepDiveData[item.id]; // 获取深度洞察数据
            
            return (
              <div
                key={item.id}
                onClick={() => setModalItem(item)}
                className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  {/* 分类标签和月份 */}
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">{item.month}月</span>
                  </div>
                  
                  {/* 标题 */}
                  <h4 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                    {item.title}
                  </h4>
                  
                  {/* 内容预览 */}
                  <div className="text-sm text-stone-500 mb-4 line-clamp-3">
                    {data ? data.content.substring(0, 60) + '...' : '点击查看详情...'}
                  </div>
                </div>
                
                {/* 底部信息 */}
                <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-stone-400">🔥 {item.points}</span>
                  <span className="text-sm font-medium text-orange-600 flex items-center gap-1 group">
                    深度解读 <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

