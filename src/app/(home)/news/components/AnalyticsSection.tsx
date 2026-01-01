'use client'; // 客户端组件

import { useEffect, useRef } from 'react'; // 导入 React hooks
import { Chart, registerables } from 'chart.js'; // 导入 Chart.js
import type { MonthlyData } from '../types'; // 导入类型定义

// 注册 Chart.js 所有组件
Chart.register(...registerables);

// 分析图表组件的属性接口
interface AnalyticsSectionProps {
  monthlyData: MonthlyData; // 月度数据
}

// 数据分析图表组件
export default function AnalyticsSection({ monthlyData }: AnalyticsSectionProps) {
  // 创建 canvas 元素的引用
  const categoryChartRef = useRef<HTMLCanvasElement>(null); // 分类饼图引用
  const trendChartRef = useRef<HTMLCanvasElement>(null); // 趋势折线图引用
  const chartInstancesRef = useRef<{ category?: Chart; trend?: Chart }>({}); // 存储图表实例

  useEffect(() => {
    // 如果引用不存在，退出
    if (!categoryChartRef.current || !trendChartRef.current) return;

    // 销毁旧的图表实例（防止重复创建）
    if (chartInstancesRef.current.category) {
      chartInstancesRef.current.category.destroy();
    }
    if (chartInstancesRef.current.trend) {
      chartInstancesRef.current.trend.destroy();
    }

    // 准备数据
    const categories: Record<string, number> = {}; // 分类统计
    const monthlyPoints: number[] = []; // 每月平均热度
    const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

    // 遍历所有月份数据
    Object.keys(monthlyData).forEach(m => {
      let mPoints = 0; // 当月总热度
      monthlyData[Number(m)].forEach(item => {
        // 统计分类
        categories[item.category] = (categories[item.category] || 0) + 1;
        mPoints += item.points;
      });
      monthlyPoints.push(mPoints / 5); // 计算平均热度（每月 5 个项目）
    });

    // 创建分类分布饼图
    const ctx1 = categoryChartRef.current.getContext('2d');
    if (ctx1) {
      chartInstancesRef.current.category = new Chart(ctx1, {
        type: 'doughnut', // 环形图
        data: {
          labels: Object.keys(categories), // 分类名称
          datasets: [{
            data: Object.values(categories), // 分类数量
            backgroundColor: [
              '#ea580c', // AI - 橙色
              '#3b82f6', // Dev - 蓝色
              '#22c55e', // Tech - 绿色
              '#a855f7', // Society - 紫色
              '#64748b'  // Business - 灰色
            ],
            borderWidth: 0 // 无边框
          }]
        },
        options: {
          responsive: true, // 响应式
          maintainAspectRatio: false, // 不保持宽高比
          plugins: {
            legend: {
              position: 'right' // 图例位置在右侧
            }
          }
        }
      });
    }

    // 创建月度热度趋势折线图
    const ctx2 = trendChartRef.current.getContext('2d');
    if (ctx2) {
      chartInstancesRef.current.trend = new Chart(ctx2, {
        type: 'line', // 折线图
        data: {
          labels: months, // 月份名称
          datasets: [{
            label: '平均热度 (Points)', // 数据集标签
            data: monthlyPoints, // 月度平均热度数据
            borderColor: '#ea580c', // 线条颜色：橙色
            backgroundColor: 'rgba(234, 88, 12, 0.1)', // 填充颜色：半透明橙色
            fill: true, // 填充区域
            tension: 0.4, // 曲线张力（平滑度）
            pointRadius: 4, // 数据点半径
            pointHoverRadius: 6 // 悬停时数据点半径
          }]
        },
        options: {
          responsive: true, // 响应式
          maintainAspectRatio: false, // 不保持宽高比
          scales: {
            y: {
              beginAtZero: false, // Y 轴不从 0 开始
              grid: {
                color: '#e5e7eb' // 网格线颜色
              }
            },
            x: {
              grid: {
                display: false // 不显示 X 轴网格线
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                // 自定义提示框标签格式
                label: function(context) {
                  return (context.parsed.y ?? 0).toFixed(0) + " Points";
                }
              }
            }
          }
        }
      });
    }

    // 清理函数：组件卸载时销毁图表
    return () => {
      if (chartInstancesRef.current.category) {
        chartInstancesRef.current.category.destroy();
      }
      if (chartInstancesRef.current.trend) {
        chartInstancesRef.current.trend.destroy();
      }
    };
  }, [monthlyData]); // 依赖 monthlyData，数据变化时重新创建图表

  return (
    <section id="analytics" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 标题和描述 */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-stone-900 mb-3">2025 数据全景</h3>
          <p className="text-stone-600">
            通过数据可视化，我们可以看到 2025 年技术关注点的结构性转移。AI 依然强势，但基础设施与能源话题的崛起不容忽视。
          </p>
        </div>

        {/* 图表网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* 分类分布图 */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-stone-800 mb-4 text-center">
              年度话题分类占比
            </h4>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="relative w-full max-w-[600px] h-[350px] max-h-[400px] mx-auto">
                <canvas ref={categoryChartRef}></canvas>
              </div>
            </div>
            <p className="text-sm text-stone-500 mt-3 text-center">
              AI 应用层与模型层的讨论占据了半壁江山，其次是开发工具链的重构。
            </p>
          </div>

          {/* 月度热度趋势图 */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-stone-800 mb-4 text-center">
              月度热度趋势 (平均 Points)
            </h4>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="relative w-full max-w-[600px] h-[350px] max-h-[400px] mx-auto">
                <canvas ref={trendChartRef}></canvas>
              </div>
            </div>
            <p className="text-sm text-stone-500 mt-3 text-center">
              3月（GPT-5发布）和 10月（SpaceX 火星计划）出现了明显的热度波峰。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

