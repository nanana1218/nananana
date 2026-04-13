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

export default function DataCollectionCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('progress');

  // 学习进度数据
  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：数据采集概述',
      completed: false,
      subItems: [
        { id: 'chapter1-1', title: '数据采集的概念与意义', completed: false },
        { id: 'chapter1-2', title: '数据采集的类型与方法', completed: false },
        { id: 'chapter1-3', title: '数据采集的工具与技术', completed: false },
        { id: 'chapter1-4', title: '数据采集的伦理与规范', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：Web数据采集',
      completed: false,
      subItems: [
        { id: 'chapter2-1', title: 'HTTP协议基础', completed: false },
        { id: 'chapter2-2', title: 'HTML与CSS基础', completed: false },
        { id: 'chapter2-3', title: 'Python爬虫库介绍', completed: false },
        { id: 'chapter2-4', title: '静态网页数据采集', completed: false },
        { id: 'chapter2-5', title: '动态网页数据采集', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：API数据采集',
      completed: false,
      subItems: [
        { id: 'chapter3-1', title: 'API基本概念', completed: false },
        { id: 'chapter3-2', title: 'RESTful API设计原则', completed: false },
        { id: 'chapter3-3', title: 'API认证与授权', completed: false },
        { id: 'chapter3-4', title: 'API数据获取与处理', completed: false },
        { id: 'chapter3-5', title: '常见API使用案例', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：数据预处理',
      completed: false,
      subItems: [
        { id: 'chapter4-1', title: '数据质量评估', completed: false },
        { id: 'chapter4-2', title: '数据清洗方法', completed: false },
        { id: 'chapter4-3', title: '数据转换技术', completed: false },
        { id: 'chapter4-4', title: '数据集成方法', completed: false },
        { id: 'chapter4-5', title: '数据预处理工具', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：数据存储',
      completed: false,
      subItems: [
        { id: 'chapter5-1', title: '数据存储技术概述', completed: false },
        { id: 'chapter5-2', title: '文件存储格式', completed: false },
        { id: 'chapter5-3', title: '数据库存储', completed: false },
        { id: 'chapter5-4', title: '数据存储最佳实践', completed: false },
        { id: 'chapter5-5', title: '数据安全与隐私', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据采集项目实战',
      completed: false,
      subItems: [
        { id: 'chapter6-1', title: '项目需求分析', completed: false },
        { id: 'chapter6-2', title: '数据采集方案设计', completed: false },
        { id: 'chapter6-3', title: '数据采集实现', completed: false },
        { id: 'chapter6-4', title: '数据预处理', completed: false },
        { id: 'chapter6-5', title: '项目展示与评估', completed: false }
      ]
    }
  ];

  // 学习资源数据
  const learningResources: Resource[] = [
    {
      id: 1,
      title: 'Python网络爬虫入门',
      type: 'document',
      description: 'Python网络爬虫的基础知识和实践指南',
      link: 'https://docs.scrapy.org/en/latest/',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: 'BeautifulSoup使用教程',
      type: 'article',
      description: '使用BeautifulSoup解析HTML和XML文档',
      link: 'https://www.crummy.com/software/BeautifulSoup/bs4/doc/',
      difficulty: 'beginner'
    },
    {
      id: 3,
      title: 'Requests库使用指南',
      type: 'code',
      description: 'Python Requests库的使用方法和最佳实践',
      link: 'https://docs.python-requests.org/en/latest/',
      difficulty: 'beginner'
    },
    {
      id: 4,
      title: 'Web爬虫实战',
      type: 'video',
      description: '从基础到进阶的Web爬虫实战教程',
      link: 'https://www.bilibili.com/video/BV12E411A7ZQ/',
      duration: '6小时',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: 'API设计与开发',
      type: 'document',
      description: 'RESTful API的设计原则和开发方法',
      link: 'https://restfulapi.net/',
      difficulty: 'intermediate'
    },
    {
      id: 6,
      title: '数据清洗与预处理',
      type: 'article',
      description: '数据清洗和预处理的技术和方法',
      link: 'https://pandas.pydata.org/docs/user_guide/cleaning.html',
      difficulty: 'intermediate'
    },
    {
      id: 7,
      title: 'Scrapy框架实战',
      type: 'code',
      description: '使用Scrapy框架进行大规模数据采集',
      link: 'https://docs.scrapy.org/en/latest/intro/tutorial.html',
      difficulty: 'advanced'
    },
    {
      id: 8,
      title: '数据采集伦理与法律',
      type: 'document',
      description: '数据采集的伦理规范和法律问题',
      link: 'https://www.eff.org/issues/net-neutrality',
      difficulty: 'advanced'
    }
  ];

  // 练习数据
  const exercises: Question[] = [
    {
      id: 1,
      question: '以下哪个库不是Python中常用的网络爬虫库？',
      options: ['BeautifulSoup', 'Scrapy', 'Requests', 'Django'],
      correctAnswer: 3,
      explanation: 'Django是一个Web框架，不是网络爬虫库。BeautifulSoup、Scrapy和Requests都是常用的网络爬虫库。'
    },
    {
      id: 2,
      question: 'HTTP请求中，用于获取资源的方法是？',
      options: ['POST', 'GET', 'PUT', 'DELETE'],
      correctAnswer: 1,
      explanation: 'GET方法用于从服务器获取资源，POST方法用于向服务器提交数据，PUT方法用于更新资源，DELETE方法用于删除资源。'
    },
    {
      id: 3,
      question: '以下哪种数据格式不是常见的API响应格式？',
      options: ['JSON', 'XML', 'CSV', 'HTML'],
      correctAnswer: 3,
      explanation: 'HTML是网页格式，不是常见的API响应格式。JSON、XML和CSV都是常见的API响应格式。'
    },
    {
      id: 4,
      question: '数据清洗的主要目的是什么？',
      options: ['增加数据量', '提高数据质量', '降低数据存储成本', '加快数据传输速度'],
      correctAnswer: 1,
      explanation: '数据清洗的主要目的是提高数据质量，包括处理缺失值、异常值、重复值等问题。'
    },
    {
      id: 5,
      question: '以下哪种存储格式最适合存储结构化数据？',
      options: ['JSON', 'CSV', 'XML', 'YAML'],
      correctAnswer: 1,
      explanation: 'CSV（逗号分隔值）格式最适合存储结构化数据，它是一种简单的表格存储格式，易于处理和分析。'
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
      description: '本课程是商务数据分析与应用专业的核心课程，旨在培养学生掌握数据采集与预处理的基本技能，为后续的数据分析学习打下基础。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：数据采集概述',
      description: '学习数据采集的基本概念和方法，了解数据采集在数据分析中的重要性。',
      topics: [
        '数据采集的概念与意义',
        '数据采集的类型与方法',
        '数据采集的工具与技术',
        '数据采集的伦理与规范'
      ],
      resources: [
        '《数据采集与预处理》',
        'Web数据采集技术教程',
        '数据采集案例分析'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：Web数据采集',
      description: '学习Web数据采集的基本原理和方法，掌握使用Python进行Web数据采集的技能。',
      topics: [
        'HTTP协议基础',
        'HTML与CSS基础',
        'Python爬虫库介绍',
        '静态网页数据采集',
        '动态网页数据采集'
      ],
      resources: [
        '《Python网络爬虫实战》',
        'BeautifulSoup文档',
        'Scrapy框架教程'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：API数据采集',
      description: '学习通过API接口采集数据的方法，掌握API调用和数据处理的技能。',
      topics: [
        'API基本概念',
        'RESTful API设计原则',
        'API认证与授权',
        'API数据获取与处理',
        '常见API使用案例'
      ],
      resources: [
        '《API设计与开发》',
        'RESTful API最佳实践',
        'API调用实战案例'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：数据预处理',
      description: '学习数据预处理的基本方法和技术，掌握数据清洗、转换和集成的技能。',
      topics: [
        '数据质量评估',
        '数据清洗方法',
        '数据转换技术',
        '数据集成方法',
        '数据预处理工具'
      ],
      resources: [
        '《数据预处理技术》',
        'Pandas数据处理教程',
        '数据清洗实战案例'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：数据存储',
      description: '学习数据存储的基本原理和方法，掌握数据存储和管理的技能。',
      topics: [
        '数据存储技术概述',
        '文件存储格式',
        '数据库存储',
        '数据存储最佳实践',
        '数据安全与隐私'
      ],
      resources: [
        '《数据存储与管理》',
        'SQL基础教程',
        'NoSQL数据库介绍'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据采集项目实战',
      description: '通过实际项目练习，综合运用所学知识，完成数据采集与预处理的全流程。',
      topics: [
        '项目需求分析',
        '数据采集方案设计',
        '数据采集实现',
        '数据预处理',
        '项目展示与评估'
      ],
      resources: [
        '数据采集项目案例',
        '项目实战指导',
        '数据分析报告模板'
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
            数据采集与处理
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业核心课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握数据采集与预处理的基本技能，为后续的数据分析学习打下基础，
            使学生能够从各种数据源获取数据并进行有效的预处理。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：Python基础
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              后续课程：数据分析技术
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
              课程内容按照数据采集与预处理的流程编排，涵盖从数据获取到数据存储的全过程
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
                  <span className="text-gray-300">掌握数据采集的基本概念和方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解Web数据采集的原理和技术</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉API数据采集的方法和技巧</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">掌握数据预处理的基本技术</span>
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
                  <span className="text-gray-300">能够使用Python进行Web数据采集</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够通过API接口获取数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够对采集的数据进行预处理</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够完成完整的数据采集项目</span>
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
                  <p className="text-gray-400">包括数据采集练习、预处理练习等</p>
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
                  <p className="text-gray-400">综合数据采集与预处理项目</p>
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
                title="数据采集与处理课程学习进度" 
                items={progressItems} 
              />
            )}
            {activeTab === 'resources' && (
              <LearningResource 
                title="数据采集学习资源" 
                resources={learningResources} 
              />
            )}
            {activeTab === 'exercises' && (
              <ExerciseComponent 
                title="数据采集与处理练习" 
                questions={exercises} 
              />
            )}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-300">数据采集与处理课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}
