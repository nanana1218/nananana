import { useState, useEffect } from 'react';
import LearningProgress from '../components/LearningProgress';
import LearningResource from '../components/LearningResource';
import ExerciseComponent from '../components/ExerciseComponent';

interface Section {
  id: string;
  title: string;
  description: string;
  topics: string[];
  resources?: string[];
}

interface ProgressItem {
  id: string;
  title: string;
  completed: boolean;
  children?: ProgressItem[];
}

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'document' | 'code';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  description: string;
  duration?: string;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function FinancialAnalysisCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('progress');

  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：财务数据基础',
      completed: false,
      children: [
        { id: 'section1-1', title: '财务数据的概念与类型', completed: false },
        { id: 'section1-2', title: '财务报表的结构与内容', completed: false },
        { id: 'section1-3', title: '财务数据的收集方法', completed: false },
        { id: 'section1-4', title: '财务数据的整理与预处理', completed: false },
        { id: 'section1-5', title: '财务数据的质量评估', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：财务指标分析',
      completed: false,
      children: [
        { id: 'section2-1', title: '盈利能力指标', completed: false },
        { id: 'section2-2', title: '偿债能力指标', completed: false },
        { id: 'section2-3', title: '运营能力指标', completed: false },
        { id: 'section2-4', title: '发展能力指标', completed: false },
        { id: 'section2-5', title: '财务指标的综合分析', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：财务数据可视化',
      completed: false,
      children: [
        { id: 'section3-1', title: '财务数据可视化的原则', completed: false },
        { id: 'section3-2', title: '常用的财务图表类型', completed: false },
        { id: 'section3-3', title: '使用Python进行财务数据可视化', completed: false },
        { id: 'section3-4', title: '财务仪表盘的设计', completed: false },
        { id: 'section3-5', title: '财务数据可视化最佳实践', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：财务预测与预算',
      completed: false,
      children: [
        { id: 'section4-1', title: '财务预测的基本原理', completed: false },
        { id: 'section4-2', title: '时间序列分析在财务预测中的应用', completed: false },
        { id: 'section4-3', title: '回归分析在财务预测中的应用', completed: false },
        { id: 'section4-4', title: '预算编制的方法与流程', completed: false },
        { id: 'section4-5', title: '财务预测的评估与调整', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：财务风险分析',
      completed: false,
      children: [
        { id: 'section5-1', title: '财务风险的类型与特征', completed: false },
        { id: 'section5-2', title: '财务风险的识别方法', completed: false },
        { id: 'section5-3', title: '财务风险的评估模型', completed: false },
        { id: 'section5-4', title: '财务风险的管理策略', completed: false },
        { id: 'section5-5', title: '财务风险的监控与预警', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：财务数据分析实战',
      completed: false,
      children: [
        { id: 'section6-1', title: '财务数据分析的流程', completed: false },
        { id: 'section6-2', title: '财务报表分析案例', completed: false },
        { id: 'section6-3', title: '企业财务状况综合分析', completed: false },
        { id: 'section6-4', title: '行业对比分析', completed: false },
        { id: 'section6-5', title: '财务分析报告的撰写', completed: false }
      ]
    }
  ];

  const learningResources: Resource[] = [
    {
      id: 'resource1',
      title: '财务数据分析基础',
      type: 'document',
      difficulty: 'beginner',
      url: '#',
      description: '财务数据分析的基本概念和方法',
      duration: '10小时'
    },
    {
      id: 'resource2',
      title: '财务报表分析教程',
      type: 'video',
      difficulty: 'beginner',
      url: '#',
      description: '财务报表的结构和分析方法',
      duration: '8小时'
    },
    {
      id: 'resource3',
      title: '财务指标计算与分析',
      type: 'article',
      difficulty: 'intermediate',
      url: '#',
      description: '常用财务指标的计算方法和分析技巧',
      duration: '6小时'
    },
    {
      id: 'resource4',
      title: 'Python财务数据可视化',
      type: 'code',
      difficulty: 'intermediate',
      url: '#',
      description: '使用Python进行财务数据可视化的实例',
      duration: '5小时'
    },
    {
      id: 'resource5',
      title: '财务预测与预算',
      type: 'article',
      difficulty: 'advanced',
      url: '#',
      description: '财务预测和预算编制的高级方法',
      duration: '7小时'
    },
    {
      id: 'resource6',
      title: '财务风险分析',
      type: 'video',
      difficulty: 'advanced',
      url: '#',
      description: '财务风险的识别、评估和管理',
      duration: '9小时'
    }
  ];

  const exercises: Question[] = [
    {
      id: 'exercise1',
      text: '下列不属于财务报表的是：',
      options: [
        '资产负债表',
        '利润表',
        '现金流量表',
        '销售明细表'
      ],
      correctAnswer: 3,
      explanation: '销售明细表属于内部管理报表，不属于主要的财务报表。',
      difficulty: 'easy'
    },
    {
      id: 'exercise2',
      text: '反映企业盈利能力的指标是：',
      options: [
        '资产负债率',
        '毛利率',
        '存货周转率',
        '流动比率'
      ],
      correctAnswer: 1,
      explanation: '毛利率反映了企业产品的盈利能力，是盈利能力指标。',
      difficulty: 'medium'
    },
    {
      id: 'exercise3',
      text: '财务数据可视化的主要目的是：',
      options: [
        '美化数据',
        '提高数据处理速度',
        '更直观地理解数据',
        '减少数据存储空间'
      ],
      correctAnswer: 2,
      explanation: '财务数据可视化的主要目的是通过图表等方式更直观地理解数据。',
      difficulty: 'easy'
    },
    {
      id: 'exercise4',
      text: '下列关于财务预测的说法，正确的是：',
      options: [
        '财务预测只需要历史数据',
        '财务预测不需要考虑外部因素',
        '财务预测可以完全准确',
        '财务预测是基于历史数据和趋势的估计'
      ],
      correctAnswer: 3,
      explanation: '财务预测是基于历史数据和趋势对未来财务状况的估计，不可能完全准确。',
      difficulty: 'medium'
    },
    {
      id: 'exercise5',
      text: '财务风险分析的首要步骤是：',
      options: [
        '风险评估',
        '风险识别',
        '风险应对',
        '风险监控'
      ],
      correctAnswer: 1,
      explanation: '财务风险分析的首要步骤是风险识别，只有识别出风险才能进行后续的评估和应对。',
      difficulty: 'hard'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sections: Section[] = [
    {
      id: 'intro',
      title: '课程介绍',
      description: '本课程是商务数据分析与应用专业的专业课程，旨在培养学生掌握财务数据的分析方法和应用，为企业的财务决策提供支持。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：财务数据基础',
      description: '学习财务数据的基本概念和财务报表的结构，掌握财务数据的收集和整理方法。',
      topics: [
        '财务数据的概念与类型',
        '财务报表的结构与内容',
        '财务数据的收集方法',
        '财务数据的整理与预处理',
        '财务数据的质量评估'
      ],
      resources: [
        '《财务分析》教材',
        '财务报表分析指南',
        '财务数据收集案例'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：财务指标分析',
      description: '学习常用的财务指标，掌握财务指标的计算和分析方法。',
      topics: [
        '盈利能力指标',
        '偿债能力指标',
        '运营能力指标',
        '发展能力指标',
        '财务指标的综合分析'
      ],
      resources: [
        '财务指标计算手册',
        '财务指标分析案例',
        '财务指标行业标准'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：财务数据可视化',
      description: '学习财务数据的可视化方法，掌握如何通过图表直观展示财务数据。',
      topics: [
        '财务数据可视化的原则',
        '常用的财务图表类型',
        '使用Python进行财务数据可视化',
        '财务仪表盘的设计',
        '财务数据可视化最佳实践'
      ],
      resources: [
        '财务数据可视化教程',
        'Matplotlib财务图表示例',
        '财务仪表盘设计案例'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：财务预测与预算',
      description: '学习财务预测和预算编制的方法，掌握如何基于历史数据进行财务预测。',
      topics: [
        '财务预测的基本原理',
        '时间序列分析在财务预测中的应用',
        '回归分析在财务预测中的应用',
        '预算编制的方法与流程',
        '财务预测的评估与调整'
      ],
      resources: [
        '财务预测与预算教材',
        '财务预测案例分析',
        '预算编制指南'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：财务风险分析',
      description: '学习财务风险的识别和评估方法，掌握财务风险的分析和管理技术。',
      topics: [
        '财务风险的类型与特征',
        '财务风险的识别方法',
        '财务风险的评估模型',
        '财务风险的管理策略',
        '财务风险的监控与预警'
      ],
      resources: [
        '财务风险管理教材',
        '财务风险评估案例',
        '财务风险预警系统设计'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：财务数据分析实战',
      description: '通过实际案例，综合运用所学知识，完成完整的财务数据分析任务。',
      topics: [
        '财务数据分析的流程',
        '财务报表分析案例',
        '企业财务状况综合分析',
        '行业对比分析',
        '财务分析报告的撰写'
      ],
      resources: [
        '财务分析实战案例',
        '财务分析报告模板',
        '行业财务数据对比'
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgMCBMIDUwIDAgTCA1MCA1MCBMIDAgNTAiIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjxwYXRoIGQ9Ik01MCAwIEwgMTAwIDAgTCAxMDAgNTAgTCA1MCA1MCIgZmlsbD0iIzNiODJmNiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTAgNTAiIGQ9Ik01MCA1MCBMIDAgNTAgTCAwIDEwMCBMIDUwIDEwMCIgZmlsbD0iIzNiODJmNiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTUwIDUwIEwgMTAwIDUwIEwgMTAwIDEwMCBMIDUwIDEwMCIgZmlsbD0iIzNiODJmNiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')]"></div>
      
      {/* 鼠标跟随效果 */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-600 filter blur-[200px] opacity-10 pointer-events-none"
        style={{
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
          transition: 'left 0.1s ease, top 0.1s ease'
        }}
      ></div>

      {/* 页面头部 */}
      <header className="relative py-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
              <span className="text-4xl">💰</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400">
            财务数据分析
          </h1>
          <p className="text-xl text-emerald-300 mb-6">
            商务数据分析与应用专业专业课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握财务数据的分析方法和应用，为企业的财务决策提供支持，
            使学生能够运用数据分析技术解决财务领域的实际问题。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-green-700/50 text-sm text-green-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-green-700/50 text-sm text-green-300">
              先修课程：Python基础
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-green-700/50 text-sm text-green-300">
              先修课程：数据分析技术
            </div>
          </div>
        </div>
      </header>

      {/* 课程大纲 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              课程大纲
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              课程内容按照由浅入深的顺序编排，涵盖财务数据分析的核心知识
            </p>
          </div>
          
          <div className="space-y-6">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-green-500/50"
              >
                <div 
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection(section.id)}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">{section.title}</h3>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                  <span className={`text-green-400 font-medium transition-transform duration-300 ${activeSection === section.id ? 'transform rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
                {activeSection === section.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-medium text-gray-200 mb-3">学习内容</h4>
                      <ul className="space-y-2 mb-6">
                        {section.topics.map((topic, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-400 mr-3 mt-1">•</span>
                            <span className="text-gray-300">{topic}</span>
                          </li>
                        ))}
                      </ul>
                      {section.resources && (
                        <div>
                          <h4 className="font-medium text-gray-200 mb-3">学习资源</h4>
                          <ul className="space-y-2">
                            {section.resources.map((resource, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-emerald-400 mr-3 mt-1">📚</span>
                                <span className="text-gray-300">{resource}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 学习目标 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              学习目标
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              通过本课程的学习，学生将达到以下目标
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-green-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-400 text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">知识目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">掌握财务数据的基本概念和财务报表的结构</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解常用的财务指标和分析方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉财务数据可视化的方法和工具</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">了解财务预测和风险分析的基本原理</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-green-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-400 text-xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">能力目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够收集和整理财务数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够计算和分析财务指标</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用Python进行财务数据可视化</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够完成完整的财务数据分析任务</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 评估方式 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              评估方式
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              课程成绩由以下部分组成
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">课堂参与</h3>
                  <p className="text-gray-400">包括课堂讨论、作业完成情况等</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">15%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-green-500 h-4 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">实验练习</h3>
                  <p className="text-gray-400">包括财务指标计算、数据可视化等练习</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">30%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">期中考试</h3>
                  <p className="text-gray-400">理论知识和实践能力考核</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">20%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-green-500 h-4 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">期末项目</h3>
                  <p className="text-gray-400">综合财务数据分析项目</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">35%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 学习功能 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              学习中心
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              开始你的学习之旅，跟踪进度，访问学习资源，完成习题
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex flex-wrap mb-6">
              <button 
                onClick={() => setActiveTab('progress')}
                className={`px-6 py-3 rounded-lg mr-4 mb-4 transition-all duration-300 ${activeTab === 'progress' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                学习进度
              </button>
              <button 
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-3 rounded-lg mr-4 mb-4 transition-all duration-300 ${activeTab === 'resources' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                学习资源
              </button>
              <button 
                onClick={() => setActiveTab('exercises')}
                className={`px-6 py-3 rounded-lg mb-4 transition-all duration-300 ${activeTab === 'exercises' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                习题练习
              </button>
            </div>
            
            <div className="min-h-[500px]">
              {activeTab === 'progress' && (
                <LearningProgress title="学习进度" items={progressItems.map(item => ({
                  ...item,
                  subItems: item.children
                }))} />
              )}
              {activeTab === 'resources' && (
                <LearningResource title="学习资源" resources={learningResources.map((resource, index) => ({
                  ...resource,
                  id: index + 1,
                  link: resource.url
                }))} />
              )}
              {activeTab === 'exercises' && (
                <ExerciseComponent title="习题练习" questions={exercises.map((exercise, index) => ({
                  ...exercise,
                  id: index + 1,
                  question: exercise.text
                }))} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-300">财务数据分析课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}