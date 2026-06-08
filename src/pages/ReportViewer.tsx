import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const reports = {
  'retail': {
    id: 'retail',
    title: '在线零售业务数据分析报告',
    subtitle: '购物车分析',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    icon: '🛒',
    overview: '本报告基于在线零售业务数据集，深入分析了购物车关联规则、用户行为模式、销售趋势等关键业务指标。通过数据挖掘技术，揭示了商品之间的隐藏关联，为营销策略优化提供数据支撑。',
    dataInfo: {
      source: '某大型电商平台真实交易数据',
      timeRange: '2023年1月 - 2023年12月',
      dataVolume: '50,000+ 条交易记录',
      userScale: '10,000+ 活跃用户'
    },
    keyFindings: [
      { title: '购物篮关联发现', content: '发现了20+强关联商品组合，如"笔记本+无线鼠标"、"耳机+手机壳"等，可用于商品推荐和捆绑销售策略。' },
      { title: '用户行为分析', content: '分析了用户购买周期、复购率、平均订单价值等关键指标，识别出高价值客户群体特征。' },
      { title: '销售趋势预测', content: '通过时间序列分析预测了未来季度销售趋势，为库存管理和促销活动提供决策支持。' },
      { title: '品类表现评估', content: '评估了各品类的销售表现，发现电子产品和家居用品是增长最快的品类。' }
    ],
    associationRules: [
      { items: '笔记本电脑 → 无线鼠标', support: '3.2%', confidence: '68%', lift: '3.5' },
      { items: '手机壳 → 耳机', support: '2.8%', confidence: '55%', lift: '2.9' },
      { items: '键盘 → 鼠标垫', support: '2.1%', confidence: '48%', lift: '2.5' },
      { items: '显示器 → 支架', support: '1.8%', confidence: '42%', lift: '3.1' },
      { items: 'U盘 → 数据线', support: '1.5%', confidence: '38%', lift: '2.3' }
    ],
    suggestions: [
      '基于关联规则发现，建议在商品详情页增加"购买此商品的用户也购买了"推荐模块',
      '针对高价值客户群体推出VIP会员计划，提升客户忠诚度',
      '在销售旺季前提前备货电子产品和家居用品',
      '考虑推出捆绑销售套餐，如"办公设备套装"、"数码配件组合"等'
    ],
    downloadUrl: '/在线零售业务数据分析报告.docx'
  },
  'taobao': {
    id: 'taobao',
    title: '淘宝用户聚类分析报告',
    subtitle: '用户细分研究',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    icon: '👥',
    overview: '本报告通过K-Means聚类算法对淘宝平台用户进行细分分析，识别出不同特征的用户群体，为精准营销和个性化服务提供数据支持。',
    dataInfo: {
      source: '淘宝平台用户行为数据',
      timeRange: '2023年6月 - 2023年12月',
      dataVolume: '100,000+ 条用户记录',
      userScale: '50,000+ 样本用户'
    },
    keyFindings: [
      { title: '用户分群识别', content: '成功识别出5个主要用户群体：价格敏感型、品质追求型、时尚潮流型、便捷购物型和深度用户。' },
      { title: '用户画像构建', content: '为每个用户群体构建了详细的画像，包括年龄分布、消费偏好、购物频率等特征。' },
      { title: '消费行为差异', content: '分析了不同群体的消费行为差异，发现品质追求型用户的客单价最高，价格敏感型用户最关注促销活动。' },
      { title: '营销渠道偏好', content: '不同用户群体对营销渠道的偏好存在显著差异，为精准投放提供依据。' }
    ],
    userDistribution: [
      { group: '价格敏感型', percentage: '32%', characteristics: '关注折扣、优惠券，偏好低价商品' },
      { group: '品质追求型', percentage: '18%', characteristics: '注重品牌和品质，愿意为优质商品付费' },
      { group: '时尚潮流型', percentage: '22%', characteristics: '追求时尚潮流，关注新品发布' },
      { group: '便捷购物型', percentage: '15%', characteristics: '重视购物效率，偏好一站式购物' },
      { group: '深度用户', percentage: '13%', characteristics: '高活跃度、高忠诚度、高消费额' }
    ],
    suggestions: [
      '针对价格敏感型用户推出限时折扣和优惠券活动',
      '为品质追求型用户提供专属客服和VIP服务',
      '在社交媒体平台加强对时尚潮流型用户的营销推广',
      '优化移动端购物体验，提升便捷购物型用户的满意度',
      '建立深度用户俱乐部，增强用户粘性和归属感'
    ],
    downloadUrl: '/淘宝用户聚类分析报告.docx'
  }
};

export default function ReportViewer() {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'findings' | 'details'>('overview');

  const report = reports[reportId as keyof typeof reports];

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">报告不存在</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${report.bgColor}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>返回首页</span>
            </button>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-700">{report.subtitle}</span>
              <span className="text-2xl">{report.icon}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{report.title}</h1>
            <p className="text-gray-500">{report.subtitle}</p>
          </div>

          <div className="flex justify-center mb-8">
            <a
              href={report.downloadUrl}
              download
              className={`px-8 py-3 bg-gradient-to-r ${report.color} text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下载完整报告
            </a>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'overview'
                  ? `bg-gradient-to-r ${report.color} text-white shadow-md`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              报告概览
            </button>
            <button
              onClick={() => setActiveTab('findings')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'findings'
                  ? `bg-gradient-to-r ${report.color} text-white shadow-md`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              核心发现
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'details'
                  ? `bg-gradient-to-r ${report.color} text-white shadow-md`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              详细分析
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 报告概述</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{report.overview}</p>

                <h3 className="text-lg font-semibold text-gray-700 mb-4">📊 数据说明</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">数据来源</p>
                    <p className="text-sm font-medium text-gray-700">{report.dataInfo.source}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">时间范围</p>
                    <p className="text-sm font-medium text-gray-700">{report.dataInfo.timeRange}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">数据量</p>
                    <p className="text-sm font-medium text-gray-700">{report.dataInfo.dataVolume}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">用户规模</p>
                    <p className="text-sm font-medium text-gray-700">{report.dataInfo.userScale}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'findings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">🔍 核心发现</h2>
                <div className="space-y-4">
                  {report.keyFindings.map((finding, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {index + 1}. {finding.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{finding.content}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div>
                {report.associationRules && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">📈 Top 5 关联规则</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-4 py-3 text-left font-semibold text-gray-700 rounded-tl-xl">关联规则</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">支持度</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">置信度</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700 rounded-tr-xl">提升度</th>
                          </tr>
                        </thead>
                        <tbody>
                          {report.associationRules.map((rule, index) => (
                            <tr 
                              key={index} 
                              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-3 font-medium text-gray-800">{rule.items}</td>
                              <td className="px-4 py-3 text-center text-gray-600">{rule.support}</td>
                              <td className="px-4 py-3 text-center text-gray-600">{rule.confidence}</td>
                              <td className="px-4 py-3 text-center text-gray-600">{rule.lift}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {report.userDistribution && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">👥 用户分群分布</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {report.userDistribution.map((group, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 rounded-xl p-5"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-800">{group.group}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${report.color} text-white`}>
                              {group.percentage}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{group.characteristics}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 业务建议</h2>
                  <ul className="space-y-3">
                    {report.suggestions.map((suggestion, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${report.color} text-white text-sm flex items-center justify-center font-medium`}>
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{suggestion}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800 text-white py-8 mt-12"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 数据分析在线教育平台</p>
          <p className="text-gray-500 text-sm mt-2">广东科学技术职业学院商学院</p>
        </div>
      </motion.footer>
    </div>
  );
}
