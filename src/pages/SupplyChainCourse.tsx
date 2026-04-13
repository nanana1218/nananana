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

export default function SupplyChainCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('progress');

  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：供应链管理概述',
      completed: false,
      children: [
        { id: 'section1-1', title: '供应链管理的概念与意义', completed: false },
        { id: 'section1-2', title: '供应链管理的发展历程', completed: false },
        { id: 'section1-3', title: '供应链管理的核心流程', completed: false },
        { id: 'section1-4', title: '供应链管理的挑战与机遇', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：供应链数据采集与预处理',
      completed: false,
      children: [
        { id: 'section2-1', title: '供应链数据的类型与来源', completed: false },
        { id: 'section2-2', title: '供应链数据采集方法', completed: false },
        { id: 'section2-3', title: '供应链数据质量评估', completed: false },
        { id: 'section2-4', title: '供应链数据预处理技术', completed: false },
        { id: 'section2-5', title: '供应链数据存储与管理', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：供应链数据分析方法',
      completed: false,
      children: [
        { id: 'section3-1', title: '描述性分析方法', completed: false },
        { id: 'section3-2', title: '预测性分析方法', completed: false },
        { id: 'section3-3', title: '规范性分析方法', completed: false },
        { id: 'section3-4', title: '供应链数据分析工具', completed: false },
        { id: 'section3-5', title: '供应链数据分析案例', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：供应链绩效分析',
      completed: false,
      children: [
        { id: 'section4-1', title: '供应链绩效指标体系', completed: false },
        { id: 'section4-2', title: '供应链绩效评估方法', completed: false },
        { id: 'section4-3', title: '供应链绩效分析工具', completed: false },
        { id: 'section4-4', title: '供应链绩效改进策略', completed: false },
        { id: 'section4-5', title: '供应链绩效分析案例', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：供应链风险管理',
      completed: false,
      children: [
        { id: 'section5-1', title: '供应链风险的类型与特征', completed: false },
        { id: 'section5-2', title: '供应链风险评估方法', completed: false },
        { id: 'section5-3', title: '供应链风险预测模型', completed: false },
        { id: 'section5-4', title: '供应链风险应对策略', completed: false },
        { id: 'section5-5', title: '供应链风险管理案例', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：供应链数据分析项目实战',
      completed: false,
      children: [
        { id: 'section6-1', title: '项目需求分析', completed: false },
        { id: 'section6-2', title: '数据采集与预处理', completed: false },
        { id: 'section6-3', title: '数据分析方案设计', completed: false },
        { id: 'section6-4', title: '数据分析实现', completed: false },
        { id: 'section6-5', title: '项目展示与评估', completed: false }
      ]
    }
  ];

  const learningResources: Resource[] = [
    {
      id: 'resource1',
      title: '供应链管理概述',
      type: 'document',
      difficulty: 'beginner',
      url: '#',
      description: '供应链管理的基本概念和核心流程',
      duration: '8小时'
    },
    {
      id: 'resource2',
      title: '供应链数据采集技术',
      type: 'video',
      difficulty: 'beginner',
      url: '#',
      description: '供应链数据的采集方法和工具',
      duration: '6小时'
    },
    {
      id: 'resource3',
      title: '供应链数据分析方法',
      type: 'article',
      difficulty: 'intermediate',
      url: '#',
      description: '供应链数据分析的常用方法和技术',
      duration: '5小时'
    },
    {
      id: 'resource4',
      title: '供应链绩效评估指标',
      type: 'code',
      difficulty: 'intermediate',
      url: '#',
      description: '供应链绩效评估的指标体系和计算方法',
      duration: '4小时'
    },
    {
      id: 'resource5',
      title: '供应链风险管理',
      type: 'article',
      difficulty: 'advanced',
      url: '#',
      description: '供应链风险的识别、评估和应对策略',
      duration: '6小时'
    },
    {
      id: 'resource6',
      title: '供应链数据分析项目实战',
      type: 'video',
      difficulty: 'advanced',
      url: '#',
      description: '完整的供应链数据分析项目案例',
      duration: '10小时'
    }
  ];

  const exercises: Question[] = [
    {
      id: 'exercise1',
      text: '下列关于供应链管理的说法，正确的是：',
      options: [
        '供应链管理只关注物流环节',
        '供应链管理包括从供应商到客户的全过程',
        '供应链管理与企业战略无关',
        '供应链管理不需要数据分析'
      ],
      correctAnswer: 1,
      explanation: '供应链管理是指从供应商到客户的全过程管理，包括物流、信息流和资金流的协调。',
      difficulty: 'easy'
    },
    {
      id: 'exercise2',
      text: '供应链数据的主要来源不包括：',
      options: [
        '企业内部系统',
        '供应商系统',
        '客户反馈',
        '竞争对手内部数据'
      ],
      correctAnswer: 3,
      explanation: '竞争对手内部数据通常无法直接获取，不是供应链数据的主要来源。',
      difficulty: 'medium'
    },
    {
      id: 'exercise3',
      text: '供应链绩效评估的核心指标不包括：',
      options: [
        '成本指标',
        '质量指标',
        '时间指标',
        '员工满意度'
      ],
      correctAnswer: 3,
      explanation: '员工满意度是企业内部管理指标，不是供应链绩效评估的核心指标。',
      difficulty: 'medium'
    },
    {
      id: 'exercise4',
      text: '供应链风险管理的首要步骤是：',
      options: [
        '风险评估',
        '风险识别',
        '风险应对',
        '风险监控'
      ],
      correctAnswer: 1,
      explanation: '供应链风险管理的首要步骤是风险识别，只有识别出风险才能进行后续的评估和应对。',
      difficulty: 'easy'
    },
    {
      id: 'exercise5',
      text: '下列关于供应链数据分析的说法，错误的是：',
      options: [
        '描述性分析用于了解过去的情况',
        '预测性分析用于预测未来趋势',
        '规范性分析用于提供决策建议',
        '供应链数据分析不需要考虑数据质量'
      ],
      correctAnswer: 3,
      explanation: '数据质量是供应链数据分析的基础，直接影响分析结果的准确性和可靠性。',
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
      description: '本课程是商务数据分析与应用专业的专业课程，旨在培养学生掌握供应链数据分析的基本技能，为企业供应链管理提供数据支持。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：供应链管理概述',
      description: '学习供应链管理的基本概念和方法，了解供应链管理在企业运营中的重要性。',
      topics: [
        '供应链管理的概念与意义',
        '供应链管理的发展历程',
        '供应链管理的核心流程',
        '供应链管理的挑战与机遇'
      ],
      resources: [
        '《供应链管理》',
        '供应链管理案例分析',
        '供应链管理最佳实践'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：供应链数据采集与预处理',
      description: '学习供应链数据的采集方法和预处理技术，为后续的数据分析打下基础。',
      topics: [
        '供应链数据的类型与来源',
        '供应链数据采集方法',
        '供应链数据质量评估',
        '供应链数据预处理技术',
        '供应链数据存储与管理'
      ],
      resources: [
        '《供应链数据管理》',
        '数据采集与预处理教程',
        '供应链数据管理案例'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：供应链数据分析方法',
      description: '学习供应链数据分析的基本方法和技术，掌握供应链数据分析的核心技能。',
      topics: [
        '描述性分析方法',
        '预测性分析方法',
        '规范性分析方法',
        '供应链数据分析工具',
        '供应链数据分析案例'
      ],
      resources: [
        '《供应链数据分析》',
        '数据分析方法教程',
        '供应链数据分析工具指南'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：供应链绩效分析',
      description: '学习供应链绩效分析的方法和技术，掌握供应链绩效评估的核心技能。',
      topics: [
        '供应链绩效指标体系',
        '供应链绩效评估方法',
        '供应链绩效分析工具',
        '供应链绩效改进策略',
        '供应链绩效分析案例'
      ],
      resources: [
        '《供应链绩效评估》',
        '供应链绩效指标体系指南',
        '供应链绩效分析案例'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：供应链风险管理',
      description: '学习供应链风险管理的方法和技术，掌握供应链风险评估和应对的核心技能。',
      topics: [
        '供应链风险的类型与特征',
        '供应链风险评估方法',
        '供应链风险预测模型',
        '供应链风险应对策略',
        '供应链风险管理案例'
      ],
      resources: [
        '《供应链风险管理》',
        '供应链风险评估工具',
        '供应链风险管理案例'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：供应链数据分析项目实战',
      description: '通过实际项目练习，综合运用所学知识，完成供应链数据分析的全流程。',
      topics: [
        '项目需求分析',
        '数据采集与预处理',
        '数据分析方案设计',
        '数据分析实现',
        '项目展示与评估'
      ],
      resources: [
        '供应链数据分析项目案例',
        '项目实战指导',
        '数据分析报告模板'
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const scrollToLearningCenter = () => {
    const learningCenterElement = document.querySelector('[data-learning-center="true"]');
    if (learningCenterElement) {
      learningCenterElement.scrollIntoView({ behavior: 'smooth' });
    }
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
              <span className="text-4xl">📦</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            供应链数据分析
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业专业课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握供应链数据分析的基本技能，为企业供应链管理提供数据支持，
            使学生能够运用数据分析技术优化供应链运营。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：数据分析技术
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              后续课程：数据库原理与应用
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
              课程内容按照供应链管理的流程编排，涵盖从供应链基础到数据分析应用的全过程
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
                  <span className="text-gray-300">掌握供应链管理的基本概念和流程</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解供应链数据的类型和来源</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉供应链数据分析的方法和技术</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">掌握供应链绩效评估和风险管理的方法</span>
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
                  <span className="text-gray-300">能够采集和预处理供应链数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够运用数据分析方法分析供应链问题</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够评估供应链绩效并提出改进建议</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够完成完整的供应链数据分析项目</span>
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
                    <div className="w-24 text-right mr-4 text-gray-300">15%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">实验练习</h3>
                  <p className="text-gray-400">包括供应链数据分析练习、案例分析等</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">35%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-cyan-500 h-4 rounded-full" style={{ width: '35%' }}></div>
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
                  <p className="text-gray-400">综合供应链数据分析项目</p>
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
            </div>
          </div>
        </div>
      </section>

      {/* 学习功能 */}
      <section className="py-16 px-4 relative z-10" data-learning-center="true">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
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
                className={`px-6 py-3 rounded-lg mr-4 mb-4 transition-all duration-300 ${activeTab === 'progress' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                学习进度
              </button>
              <button 
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-3 rounded-lg mr-4 mb-4 transition-all duration-300 ${activeTab === 'resources' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                学习资源
              </button>
              <button 
                onClick={() => setActiveTab('exercises')}
                className={`px-6 py-3 rounded-lg mb-4 transition-all duration-300 ${activeTab === 'exercises' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
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
          <p className="mb-2 text-gray-300">供应链数据分析课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}
