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
  subItems?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface Resource {
  id: number;
  title: string;
  type: 'article' | 'video' | 'document' | 'code';
  description: string;
  link: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export default function DataAnalysisCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('progress');

  // 学习进度数据
  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：数据分析基础',
      completed: false,
      subItems: [
        { id: 'chapter1-1', title: '数据分析的定义与重要性', completed: false },
        { id: 'chapter1-2', title: '数据分析的基本流程', completed: false },
        { id: 'chapter1-3', title: '数据类型与数据结构', completed: false },
        { id: 'chapter1-4', title: '数据分析的常用方法分类', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：数据可视化技术',
      completed: false,
      subItems: [
        { id: 'chapter2-1', title: '数据可视化的基本原理', completed: false },
        { id: 'chapter2-2', title: 'Matplotlib库的使用', completed: false },
        { id: 'chapter2-3', title: 'Seaborn库的高级可视化', completed: false },
        { id: 'chapter2-4', title: '交互式数据可视化工具', completed: false },
        { id: 'chapter2-5', title: '数据可视化最佳实践', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：统计分析方法',
      completed: false,
      subItems: [
        { id: 'chapter3-1', title: '描述性统计分析', completed: false },
        { id: 'chapter3-2', title: '假设检验', completed: false },
        { id: 'chapter3-3', title: '方差分析', completed: false },
        { id: 'chapter3-4', title: '相关分析与回归分析', completed: false },
        { id: 'chapter3-5', title: '时间序列分析', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：机器学习基础',
      completed: false,
      subItems: [
        { id: 'chapter4-1', title: '机器学习概述', completed: false },
        { id: 'chapter4-2', title: '监督学习与无监督学习', completed: false },
        { id: 'chapter4-3', title: '线性回归与逻辑回归', completed: false },
        { id: 'chapter4-4', title: '决策树与随机森林', completed: false },
        { id: 'chapter4-5', title: '聚类分析', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：商务数据分析应用',
      completed: false,
      subItems: [
        { id: 'chapter5-1', title: '市场数据分析', completed: false },
        { id: 'chapter5-2', title: '客户行为分析', completed: false },
        { id: 'chapter5-3', title: '销售数据分析', completed: false },
        { id: 'chapter5-4', title: '供应链数据分析', completed: false },
        { id: 'chapter5-5', title: '财务数据分析', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据分析项目实战',
      completed: false,
      subItems: [
        { id: 'chapter6-1', title: '项目选题与规划', completed: false },
        { id: 'chapter6-2', title: '数据获取与清洗', completed: false },
        { id: 'chapter6-3', title: '数据分析与建模', completed: false },
        { id: 'chapter6-4', title: '结果可视化与报告', completed: false },
        { id: 'chapter6-5', title: '项目展示与评估', completed: false }
      ]
    }
  ];

  // 学习资源数据
  const learningResources: Resource[] = [
    {
      id: 1,
      title: 'Python数据分析入门',
      type: 'document',
      description: 'Python数据分析的基础教程，涵盖NumPy、Pandas等库的使用',
      link: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: '数据可视化实战',
      type: 'video',
      description: '使用Matplotlib和Seaborn创建专业的数据可视化图表',
      link: 'https://www.bilibili.com/video/BV17Y4y157yf/',
      duration: '8小时',
      difficulty: 'intermediate'
    },
    {
      id: 3,
      title: '统计学基础',
      type: 'document',
      description: '数据分析所需的统计学基础知识',
      link: 'https://www.statlearning.com/',
      difficulty: 'beginner'
    },
    {
      id: 4,
      title: '机器学习实战',
      type: 'document',
      description: '使用Scikit-learn进行机器学习的实践指南',
      link: 'https://scikit-learn.org/stable/tutorial/index.html',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: '商务数据分析案例',
      type: 'article',
      description: '真实的商务数据分析案例分析',
      link: 'https://www.kaggle.com/datasets',
      difficulty: 'intermediate'
    },
    {
      id: 6,
      title: 'Pandas高级教程',
      type: 'code',
      description: 'Pandas库的高级使用技巧和最佳实践',
      link: 'https://pandas.pydata.org/docs/user_guide/advanced.html',
      difficulty: 'advanced'
    },
    {
      id: 7,
      title: '数据科学实战',
      type: 'video',
      description: '从数据获取到模型部署的完整数据科学流程',
      link: 'https://www.coursera.org/specializations/jhu-data-science',
      duration: '10小时',
      difficulty: 'advanced'
    },
    {
      id: 8,
      title: '时间序列分析',
      type: 'article',
      description: '使用Python进行时间序列分析的方法和技巧',
      link: 'https://www.statsmodels.org/stable/tsa.html',
      difficulty: 'advanced'
    }
  ];

  // 练习数据
  const exercises: Question[] = [
    {
      id: 1,
      question: '以下哪个库不是Python中常用的数据分析库？',
      options: ['NumPy', 'Pandas', 'Matplotlib', 'Flask'],
      correctAnswer: 3,
      explanation: 'Flask是一个Web框架，不是数据分析库。NumPy、Pandas和Matplotlib都是常用的数据分析库。'
    },
    {
      id: 2,
      question: '数据可视化的主要目的是什么？',
      options: ['使数据更复杂', '帮助理解数据', '占用更多存储空间', '增加数据量'],
      correctAnswer: 1,
      explanation: '数据可视化的主要目的是帮助人们更直观地理解数据，发现数据中的模式和趋势。'
    },
    {
      id: 3,
      question: '以下哪种分析方法属于监督学习？',
      options: ['K-means聚类', '主成分分析', '线性回归', '层次聚类'],
      correctAnswer: 2,
      explanation: '线性回归是一种监督学习算法，用于预测连续值。K-means聚类、主成分分析和层次聚类都属于无监督学习。'
    },
    {
      id: 4,
      question: 'Pandas中用于读取CSV文件的函数是？',
      options: ['read_csv()', 'load_csv()', 'import_csv()', 'fetch_csv()'],
      correctAnswer: 0,
      explanation: 'Pandas中使用read_csv()函数来读取CSV文件。'
    },
    {
      id: 5,
      question: '以下哪个图表类型最适合展示数据的分布情况？',
      options: ['折线图', '散点图', '柱状图', '直方图'],
      correctAnswer: 3,
      explanation: '直方图最适合展示数据的分布情况，它将数据分成多个 bins 并显示每个 bin 中的数据频率。'
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
      description: '本课程是商务数据分析与应用专业的核心课程，旨在培养学生掌握数据分析的基本方法和工具，能够运用数据分析技术解决实际商务问题。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：数据分析基础',
      description: '回顾数据分析的基本概念和流程，为后续学习打下基础。',
      topics: [
        '数据分析的定义与重要性',
        '数据分析的基本流程',
        '数据类型与数据结构',
        '数据分析的常用方法分类'
      ],
      resources: [
        '《数据分析基础》教材',
        '数据分析流程图表',
        '案例分析：电商平台用户行为分析'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：数据可视化技术',
      description: '学习数据可视化的基本原理和常用工具，掌握如何通过图表直观展示数据。',
      topics: [
        '数据可视化的基本原理',
        'Matplotlib库的使用',
        'Seaborn库的高级可视化',
        '交互式数据可视化工具',
        '数据可视化最佳实践'
      ],
      resources: [
        'Matplotlib官方文档',
        'Seaborn教程',
        '数据可视化案例集'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：统计分析方法',
      description: '学习基本的统计分析方法，掌握数据描述和推断统计的应用。',
      topics: [
        '描述性统计分析',
        '假设检验',
        '方差分析',
        '相关分析与回归分析',
        '时间序列分析'
      ],
      resources: [
        '《统计学原理》教材',
        'SciPy统计模块文档',
        '统计分析案例练习'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：机器学习基础',
      description: '介绍机器学习的基本概念和常用算法，培养学生的机器学习思维。',
      topics: [
        '机器学习概述',
        '监督学习与无监督学习',
        '线性回归与逻辑回归',
        '决策树与随机森林',
        '聚类分析'
      ],
      resources: [
        'Scikit-learn官方文档',
        '机器学习实战教程',
        '分类算法案例分析'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：商务数据分析应用',
      description: '将数据分析技术应用于实际商务场景，解决真实的商务问题。',
      topics: [
        '市场数据分析',
        '客户行为分析',
        '销售数据分析',
        '供应链数据分析',
        '财务数据分析'
      ],
      resources: [
        '商务数据分析案例集',
        '行业数据分析报告',
        '真实商务数据集'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据分析项目实战',
      description: '通过实际项目，综合运用所学知识，完成完整的数据分析任务。',
      topics: [
        '项目选题与规划',
        '数据获取与清洗',
        '数据分析与建模',
        '结果可视化与报告',
        '项目展示与评估'
      ],
      resources: [
        '项目模板与规范',
        '数据可视化工具指南',
        '项目评估标准'
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
              <span className="text-4xl">📊</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            数据分析技术
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业核心课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握数据分析的基本方法和工具，能够运用数据分析技术解决实际商务问题，
            为后续的专业学习和职业发展打下坚实基础。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：Python基础
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：数据采集与预处理
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：商务数据分析基础
            </div>
          </div>
        </div>
      </header>

      {/* 课程大纲 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              课程大纲
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              课程内容按照由浅入深的顺序编排，涵盖数据分析的核心技术和应用
            </p>
          </div>
          
          <div className="space-y-6">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-blue-500/50"
              >
                <div 
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection(section.id)}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">{section.title}</h3>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                  <span className={`text-blue-400 font-medium transition-transform duration-300 ${activeSection === section.id ? 'transform rotate-180' : ''}`}>
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
                            <span className="text-blue-400 mr-3 mt-1">•</span>
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
                                <span className="text-cyan-400 mr-3 mt-1">📚</span>
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
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              学习目标
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              通过本课程的学习，学生将达到以下目标
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-400 text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">知识目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">掌握数据分析的基本概念和流程</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解数据可视化的原理和方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉统计分析和机器学习的基本方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">了解商务数据分析的应用场景和方法</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-cyan-400 text-xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">能力目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用Python进行数据可视化</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够运用统计方法分析数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用机器学习算法解决分类问题</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够完成完整的数据分析项目</span>
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
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
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
                    <div className="w-24 text-right mr-4 text-gray-300">10%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">实验练习</h3>
                  <p className="text-gray-400">包括数据可视化、统计分析等实验</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">30%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-cyan-500 h-4 rounded-full" style={{ width: '30%' }}></div>
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
                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">期末项目</h3>
                  <p className="text-gray-400">完整的数据分析项目设计与实现</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">40%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-cyan-500 h-4 rounded-full" style={{ width: '40%' }}></div>
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
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              学习中心
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              在这里进行学习、练习和资源查阅
            </p>
          </div>
          
          {/* 标签页导航 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'progress'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              学习进度
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'resources'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              学习资源
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'exercises'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              练习测试
            </button>
          </div>
          
          {/* 标签页内容 */}
          <div className="mt-8">
            {activeTab === 'progress' && (
              <LearningProgress 
                title="数据分析技术课程学习进度" 
                items={progressItems} 
              />
            )}
            {activeTab === 'resources' && (
              <LearningResource 
                title="数据分析学习资源" 
                resources={learningResources} 
              />
            )}
            {activeTab === 'exercises' && (
              <ExerciseComponent 
                title="数据分析技术练习" 
                questions={exercises} 
              />
            )}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-300">数据分析技术课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}