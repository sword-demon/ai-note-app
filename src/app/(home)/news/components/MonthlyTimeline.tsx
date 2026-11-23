import type { MonthlyData } from "../types"; // 导入类型定义

// 月度时间轴组件的属性接口
interface MonthlyTimelineProps {
  currentMonth: number; // 当前选中的月份
  setCurrentMonth: (month: number) => void; // 设置当前月份的函数
  monthlyData: MonthlyData; // 月度数据
}

// 月度时间轴组件：显示 12 个月的按钮和每月 Top 5 内容
export default function MonthlyTimeline({
  currentMonth,
  setCurrentMonth,
  monthlyData,
}: MonthlyTimelineProps) {
  // 月份名称数组
  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  // 获取当前月份的数据
  const data = monthlyData[currentMonth];
  // 计算当月总热度积分
  const totalPoints = data.reduce((acc, item) => acc + item.points, 0);

  // 格式化数字（添加千位分隔符）
  const formatNum = (num: number) => new Intl.NumberFormat("en-US").format(num);

  return (
    <section id="timeline" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 标题和描述区域 */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-stone-900 mb-3">
            月度时间轴：2025 足迹
          </h3>
          <p className="text-stone-600 max-w-2xl">
            点击下方月份，查看当月 Hacker News 热度最高的 5
            个话题。这些话题构成了 2025
            年技术界的底色，从早期的模型发布到年终的架构反思。
          </p>
        </div>

        {/* 月份选择器：水平滚动按钮 */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 scrollbar-hide">
          {monthNames.map((name, index) => {
            const mIdx = index + 1; // 月份索引（1-12）
            const isActive = mIdx === currentMonth; // 判断是否为当前选中月份

            return (
              <button
                type="button"
                key={mIdx}
                onClick={() => setCurrentMonth(mIdx)}
                className={`flex-shrink-0 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-orange-600 text-white border-orange-600" // 激活状态样式
                    : "bg-white text-stone-600 border-stone-200 hover:border-orange-400" // 默认状态样式
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* 内容显示区域 */}
        <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 min-h-[400px]">
          {/* 标题和统计信息 */}
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-stone-800">
              {currentMonth}月 热门话题 Top 5
            </h4>
            <span className="text-sm text-stone-500">
              当月热度积分: {formatNum(totalPoints)}
            </span>
          </div>

          {/* 月度话题列表 */}
          <div className="grid gap-4">
            {data.map((item, index) => (
              <button
                type="button"
                disabled={!item.isTop20}
                key={item.id}
                className="text-left flex items-start gap-4 p-4 bg-white rounded-lg border border-stone-100 hover:border-orange-200 transition-colors group"
                style={{ cursor: item.isTop20 ? "pointer" : "default" }} // Top 20 项目可点击
                onClick={() => {
                  // 如果是 Top 20 项目，点击后滚动到洞察区域
                  if (item.isTop20) {
                    document
                      .getElementById("insights")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                title={item.isTop20 ? "点击查看深度分析" : undefined}
              >
                {/* 序号 */}
                <div className="text-orange-600 font-mono font-bold text-lg w-6 text-center">
                  {index + 1}.
                </div>
                {/* 内容区域 */}
                <div className="flex-1">
                  <h5 className="text-stone-900 font-medium group-hover:text-orange-700 transition-colors">
                    {item.title}
                  </h5>
                  {/* 元信息 */}
                  <div className="flex gap-3 mt-1 text-xs text-stone-500">
                    <span>{item.points} points</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-600">
                      {item.category}
                    </span>
                    {/* Top 20 标记 */}
                    {item.isTop20 && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-semibold">
                        🏆 年度 Top 20
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
