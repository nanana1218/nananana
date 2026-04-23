import { useState } from 'react';
import { motion } from 'framer-motion';

interface PlatformFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface PlatformStat {
  id: number;
  value: string;
  label: string;
  icon: string;
  color: string;
}

const platformFeatures: PlatformFeature[] = [
  {
    id: 1,
    title: '完整学习闭环',
    description: '学习→实操→测试，形成完整的学习闭环，确保知识掌握',
    icon: '🔄',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 2,
    title: '项目式学习',
    description: '10个真实商业场景项目，从基础到高级，全面提升实战能力',
    icon: '📁',
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 3,
    title: '智能代码验证',
    description: '实时代码验证和错误提示，帮助你快速掌握编程技能',
    icon: '💻',
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 4,
    title: '可视化分析',
    description: '丰富的数据可视化图表，让分析结果更加直观',
    icon: '📊',
    color: 'from-orange-500 to-amber-400'
  }
];

const platformStats: PlatformStat[] = [
  {
    id: 1,
    value: '10',
    label: '实战项目',
    icon: '📁',
    color: 'text-blue-400'
  },
  {
    id: 2,
    value: '50+',
    label: '核心知识点',
    icon: '📚',
    color: 'text-green-400'
  },
  {
    id: 3,
    value: '100%',
    label: '实战导向',
    icon: '🎯',
    color: 'text-purple-400'
  },
  {
    id: 4,
    value: '24/7',
    label: '在线学习',
    icon: '🌐',
    color: 'text-orange-400'
  }
];

export default function DataAnalysisPlatform() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="min-h-screen bg-white text-gray-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]"></div>
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-500 filter blur-[150px] opacity-5 pointer-events-none"
        style={{
          left: `${mousePosition.x - 250}px`,
          top: `${mousePosition.y - 250}px`,
          transition: 'left 0.2s ease, top 0.2s ease'
        }}
      ></div>

      {/* 页面头部 */}
      <header className="relative py-12 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-start mb-8">
            <a 
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all text-gray-800"
            >
              <span>←</span>
              <span>返回主页</span>
            </a>
          </div>
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            >
              数据分析在线教育平台
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              专为商务数据分析与应用专业学生设计的在线学习系统
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href="/data-analysis-course"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-medium hover:opacity-90 transition-all text-white"
              >
                开始学习
              </a>
              <a 
                href="#features"
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all text-gray-800"
              >
                了解更多
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* 统计数据 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platformStats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * stat.id }}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm"
              >
                <div className={`text-3xl mb-2 ${stat.color}`}>{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 平台特色 */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            平台特色
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * feature.id }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500/50 transition-all shadow-sm"
              >
                <div className={`text-3xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 项目预览 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            精选项目
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '数据预处理高阶版', icon: '🧹', color: 'from-blue-500 to-cyan-400' },
              { title: '多维统计+深度相关性分析', icon: '📊', color: 'from-purple-500 to-pink-400' },
              { title: '购物车关联规则挖掘', icon: '🛒', color: 'from-green-500 to-emerald-400' },
              { title: 'KMeans聚类分析实战', icon: '🔍', color: 'from-orange-500 to-amber-400' },
              { title: 'RFM模型用户分层', icon: '👥', color: 'from-red-500 to-rose-400' },
              { title: '一元+多元线性回归', icon: '📈', color: 'from-indigo-500 to-violet-400' }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500/50 transition-all shadow-sm"
              >
                <div className={`text-4xl mb-4 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                  {project.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">实战项目，提升数据分析能力</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 行动号召 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            开始你的数据分析之旅
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            通过10个实战项目，掌握数据分析的核心技能，从数据预处理到机器学习，全面提升你的数据分析能力
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            href="/data-analysis-course"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-medium hover:opacity-90 transition-all text-white"
          >
            开始学习
          </motion.a>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2026 数据分析在线教育平台 | 专为商务数据分析与应用专业设计</p>
        </div>
      </footer>
    </div>
  );
}
