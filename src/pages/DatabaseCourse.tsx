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

export default function DatabaseCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('progress');

  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：数据库概述',
      completed: false,
      children: [
        { id: 'section1-1', title: '数据库的概念与特点', completed: false },
        { id: 'section1-2', title: '数据库系统的组成', completed: false },
        { id: 'section1-3', title: '数据库的发展历程', completed: false },
        { id: 'section1-4', title: '数据库的应用领域', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：数据模型',
      completed: false,
      children: [
        { id: 'section2-1', title: '数据模型的概念与分类', completed: false },
        { id: 'section2-2', title: '概念模型', completed: false },
        { id: 'section2-3', title: '逻辑模型', completed: false },
        { id: 'section2-4', title: '物理模型', completed: false },
        { id: 'section2-5', title: '实体-关系模型设计', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：关系数据库',
      completed: false,
      children: [
        { id: 'section3-1', title: '关系数据库的基本概念', completed: false },
        { id: 'section3-2', title: '关系代数', completed: false },
        { id: 'section3-3', title: '关系数据库规范化', completed: false },
        { id: 'section3-4', title: '函数依赖', completed: false },
        { id: 'section3-5', title: '范式', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：SQL语言',
      completed: false,
      children: [
        { id: 'section4-1', title: 'SQL语言概述', completed: false },
        { id: 'section4-2', title: '数据定义语言（DDL）', completed: false },
        { id: 'section4-3', title: '数据操作语言（DML）', completed: false },
        { id: 'section4-4', title: '数据查询语言（DQL）', completed: false },
        { id: 'section4-5', title: '数据控制语言（DCL）', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：数据库设计',
      completed: false,
      children: [
        { id: 'section5-1', title: '数据库设计概述', completed: false },
        { id: 'section5-2', title: '需求分析', completed: false },
        { id: 'section5-3', title: '概念结构设计', completed: false },
        { id: 'section5-4', title: '逻辑结构设计', completed: false },
        { id: 'section5-5', title: '物理结构设计', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据库应用开发',
      completed: false,
      children: [
        { id: 'section6-1', title: '数据库应用开发概述', completed: false },
        { id: 'section6-2', title: '数据库连接技术', completed: false },
        { id: 'section6-3', title: '数据库应用系统架构', completed: false },
        { id: 'section6-4', title: '数据库应用开发工具', completed: false },
        { id: 'section6-5', title: '数据库应用开发案例', completed: false }
      ]
    }
  ];

  const learningResources: Resource[] = [
    {
      id: 'resource1',
      title: '数据库系统概论',
      type: 'document',
      difficulty: 'beginner',
      url: '#',
      description: '数据库基础知识的权威教材，适合初学者',
      duration: '10小时'
    },
    {
      id: 'resource2',
      title: 'SQL语言入门教程',
      type: 'video',
      difficulty: 'beginner',
      url: '#',
      description: 'SQL语言的基础语法和使用方法',
      duration: '5小时'
    },
    {
      id: 'resource3',
      title: '关系数据库理论',
      type: 'article',
      difficulty: 'intermediate',
      url: '#',
      description: '深入理解关系数据库的理论基础',
      duration: '3小时'
    },
    {
      id: 'resource4',
      title: '数据库设计实战',
      type: 'code',
      difficulty: 'intermediate',
      url: '#',
      description: '数据库设计的实际案例和最佳实践',
      duration: '4小时'
    },
    {
      id: 'resource5',
      title: '高级SQL查询技巧',
      type: 'article',
      difficulty: 'advanced',
      url: '#',
      description: '复杂SQL查询的优化和技巧',
      duration: '3小时'
    },
    {
      id: 'resource6',
      title: '数据库性能优化',
      type: 'video',
      difficulty: 'advanced',
      url: '#',
      description: '数据库性能调优的方法和技巧',
      duration: '6小时'
    }
  ];

  const exercises: Question[] = [
    {
      id: 'exercise1',
      text: '下列关于数据库的说法，正确的是：',
      options: [
        '数据库是存储数据的文件系统',
        '数据库是管理数据的软件系统',
        '数据库是存储数据的仓库',
        '数据库是数据的集合'
      ],
      correctAnswer: 2,
      explanation: '数据库是按照一定的数据模型组织、存储和管理数据的仓库，是数据的集合。',
      difficulty: 'easy'
    },
    {
      id: 'exercise2',
      text: '关系数据库中，主键的作用是：',
      options: [
        '唯一标识表中的记录',
        '加速数据查询',
        '保证数据的完整性',
        '以上都是'
      ],
      correctAnswer: 3,
      explanation: '主键的作用包括唯一标识表中的记录、加速数据查询和保证数据的完整性。',
      difficulty: 'medium'
    },
    {
      id: 'exercise3',
      text: 'SQL中，用于查询数据的语句是：',
      options: [
        'INSERT',
        'UPDATE',
        'SELECT',
        'DELETE'
      ],
      correctAnswer: 2,
      explanation: 'SELECT语句用于从数据库中查询数据。',
      difficulty: 'easy'
    },
    {
      id: 'exercise4',
      text: '数据库设计的正确步骤是：',
      options: [
        '需求分析 → 概念结构设计 → 逻辑结构设计 → 物理结构设计',
        '概念结构设计 → 需求分析 → 逻辑结构设计 → 物理结构设计',
        '需求分析 → 逻辑结构设计 → 概念结构设计 → 物理结构设计',
        '概念结构设计 → 逻辑结构设计 → 需求分析 → 物理结构设计'
      ],
      correctAnswer: 0,
      explanation: '数据库设计的正确步骤是：需求分析 → 概念结构设计 → 逻辑结构设计 → 物理结构设计。',
      difficulty: 'medium'
    },
    {
      id: 'exercise5',
      text: '下列关于范式的说法，错误的是：',
      options: [
        '1NF要求列不可再分',
        '2NF要求消除部分函数依赖',
        '3NF要求消除传递函数依赖',
        'BCNF要求消除所有函数依赖'
      ],
      correctAnswer: 3,
      explanation: 'BCNF要求消除主属性对候选键的部分和传递函数依赖，而不是所有函数依赖。',
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
      description: '本课程是商务数据分析与应用专业的专业课程，旨在培养学生掌握数据库的基本原理和应用技能，为后续的数据分析学习打下基础。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：数据库概述',
      description: '学习数据库的基本概念和发展历程，了解数据库在企业信息管理中的重要性。',
      topics: [
        '数据库的概念与特点',
        '数据库系统的组成',
        '数据库的发展历程',
        '数据库的应用领域'
      ],
      resources: [
        '《数据库系统概论》',
        '数据库基础知识教程',
        '数据库应用案例分析'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：数据模型',
      description: '学习数据模型的基本概念和类型，掌握实体-关系模型的设计方法。',
      topics: [
        '数据模型的概念与分类',
        '概念模型',
        '逻辑模型',
        '物理模型',
        '实体-关系模型设计'
      ],
      resources: [
        '《数据模型与数据库设计》',
        'ER模型设计指南',
        '数据模型案例分析'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：关系数据库',
      description: '学习关系数据库的基本原理和设计方法，掌握关系代数和关系数据库规范化理论。',
      topics: [
        '关系数据库的基本概念',
        '关系代数',
        '关系数据库规范化',
        '函数依赖',
        '范式'
      ],
      resources: [
        '《关系数据库理论》',
        '关系代数教程',
        '数据库规范化案例'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：SQL语言',
      description: '学习SQL语言的基本语法和使用方法，掌握SQL语句的编写和执行。',
      topics: [
        'SQL语言概述',
        '数据定义语言（DDL）',
        '数据操作语言（DML）',
        '数据查询语言（DQL）',
        '数据控制语言（DCL）'
      ],
      resources: [
        '《SQL语言实用教程》',
        'SQL语法参考手册',
        'SQL查询案例分析'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：数据库设计',
      description: '学习数据库设计的基本方法和步骤，掌握数据库设计的核心技能。',
      topics: [
        '数据库设计概述',
        '需求分析',
        '概念结构设计',
        '逻辑结构设计',
        '物理结构设计'
      ],
      resources: [
        '《数据库设计与开发》',
        '数据库设计指南',
        '数据库设计案例'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据库应用开发',
      description: '学习数据库应用开发的基本方法和技术，掌握数据库应用系统的开发技能。',
      topics: [
        '数据库应用开发概述',
        '数据库连接技术',
        '数据库应用系统架构',
        '数据库应用开发工具',
        '数据库应用开发案例'
      ],
      resources: [
        '《数据库应用开发》',
        '数据库连接技术教程',
        '数据库应用开发案例'
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
              <span className="text-4xl">🗄️</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            数据库原理与应用
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业专业课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握数据库的基本原理和应用技能，为后续的数据分析学习打下基础，
            使学生能够设计和管理数据库系统。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：Python基础
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              后续课程：数据分析综合实训
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
              课程内容按照数据库系统的组成和应用流程编排，涵盖从数据库基础到应用开发的全过程
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
                  <span className="text-gray-300">掌握数据库的基本概念和原理</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解数据模型和关系数据库理论</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉SQL语言的基本语法和使用方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">掌握数据库设计的基本方法和步骤</span>
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
                  <span className="text-gray-300">能够设计和管理数据库系统</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用SQL语言进行数据操作和查询</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够设计合理的数据库结构</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够开发简单的数据库应用系统</span>
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
                  <p className="text-gray-400">包括SQL语句练习、数据库设计练习等</p>
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
                  <p className="text-gray-400">综合数据库设计与应用项目</p>
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
          <p className="mb-2 text-gray-300">数据库原理与应用课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}
