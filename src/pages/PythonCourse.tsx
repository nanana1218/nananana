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

export default function PythonCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('progress');

  // 学习进度数据
  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：Python语言基础',
      completed: false,
      subItems: [
        { id: 'chapter1-1', title: 'Python简介与安装', completed: false },
        { id: 'chapter1-2', title: '基本数据类型', completed: false },
        { id: 'chapter1-3', title: '变量与赋值', completed: false },
        { id: 'chapter1-4', title: '基本运算符与表达式', completed: false },
        { id: 'chapter1-5', title: '输入输出函数', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：控制结构',
      completed: false,
      subItems: [
        { id: 'chapter2-1', title: '条件语句', completed: false },
        { id: 'chapter2-2', title: 'for循环', completed: false },
        { id: 'chapter2-3', title: 'while循环', completed: false },
        { id: 'chapter2-4', title: '循环控制语句', completed: false },
        { id: 'chapter2-5', title: '嵌套循环与条件', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：数据结构',
      completed: false,
      subItems: [
        { id: 'chapter3-1', title: '列表的创建与操作', completed: false },
        { id: 'chapter3-2', title: '元组的创建与操作', completed: false },
        { id: 'chapter3-3', title: '字典的创建与操作', completed: false },
        { id: 'chapter3-4', title: '集合的创建与操作', completed: false },
        { id: 'chapter3-5', title: '数据结构的选择与应用', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：函数与模块',
      completed: false,
      subItems: [
        { id: 'chapter4-1', title: '函数的定义与调用', completed: false },
        { id: 'chapter4-2', title: '函数参数与返回值', completed: false },
        { id: 'chapter4-3', title: '函数的作用域', completed: false },
        { id: 'chapter4-4', title: '模块的导入与使用', completed: false },
        { id: 'chapter4-5', title: '标准库的应用', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：文件操作',
      completed: false,
      subItems: [
        { id: 'chapter5-1', title: '文件的打开与关闭', completed: false },
        { id: 'chapter5-2', title: '文件的读取操作', completed: false },
        { id: 'chapter5-3', title: '文件的写入操作', completed: false },
        { id: 'chapter5-4', title: '文件的异常处理', completed: false },
        { id: 'chapter5-5', title: 'CSV文件的读写', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：面向对象编程',
      completed: false,
      subItems: [
        { id: 'chapter6-1', title: '类与对象的概念', completed: false },
        { id: 'chapter6-2', title: '类的定义与实例化', completed: false },
        { id: 'chapter6-3', title: '类的属性与方法', completed: false },
        { id: 'chapter6-4', title: '继承与多态', completed: false },
        { id: 'chapter6-5', title: '面向对象编程实践', completed: false }
      ]
    }
  ];

  // 学习资源数据
  const learningResources: Resource[] = [
    {
      id: 1,
      title: 'Python官方文档',
      type: 'document',
      description: 'Python官方提供的完整文档，包含语言参考、标准库等内容',
      link: 'https://docs.python.org/zh-cn/3/',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: 'Python编程：从入门到实践',
      type: 'document',
      description: '一本适合初学者的Python入门书籍，包含基础语法和实践项目',
      link: 'https://book.douban.com/subject/26829016/',
      difficulty: 'beginner'
    },
    {
      id: 3,
      title: 'Python基础教程（第3版）',
      type: 'document',
      description: '全面介绍Python语言的基础知识，适合初学者和中级开发者',
      link: 'https://book.douban.com/subject/26829016/',
      difficulty: 'beginner'
    },
    {
      id: 4,
      title: 'Python进阶：从入门到精通',
      type: 'article',
      description: 'Python进阶教程，涵盖面向对象编程、模块开发等高级主题',
      link: 'https://www.runoob.com/python3/python3-tutorial.html',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: 'Python数据科学入门',
      type: 'video',
      description: '视频教程，介绍如何使用Python进行数据分析和可视化',
      link: 'https://www.bilibili.com/video/BV12E411A7ZQ/',
      duration: '10小时',
      difficulty: 'intermediate'
    },
    {
      id: 6,
      title: 'Python标准库实例',
      type: 'code',
      description: 'Python标准库的使用示例，包含常用模块的代码示例',
      link: 'https://github.com/python/cpython/tree/main/Lib',
      difficulty: 'intermediate'
    },
    {
      id: 7,
      title: 'Python设计模式',
      type: 'article',
      description: '介绍Python中常用的设计模式及其实现',
      link: 'https://refactoringguru.cn/design-patterns/python',
      difficulty: 'advanced'
    },
    {
      id: 8,
      title: 'Python性能优化',
      type: 'article',
      description: 'Python代码性能优化的技巧和方法',
      link: 'https://realpython.com/python-performance/',
      difficulty: 'advanced'
    }
  ];

  // 练习数据
  const exercises: Question[] = [
    {
      id: 1,
      question: '以下哪个不是Python的基本数据类型？',
      options: ['整数', '浮点数', '字符串', '数组'],
      correctAnswer: 3,
      explanation: 'Python的基本数据类型包括整数、浮点数、字符串、布尔值等，数组不是Python的基本数据类型，而是通过列表实现的。'
    },
    {
      id: 2,
      question: 'Python中用于定义函数的关键字是？',
      options: ['function', 'def', 'func', 'define'],
      correctAnswer: 1,
      explanation: '在Python中，使用def关键字来定义函数。'
    },
    {
      id: 3,
      question: '以下哪个语句用于退出循环？',
      options: ['break', 'continue', 'exit', 'return'],
      correctAnswer: 0,
      explanation: 'break语句用于退出循环，continue语句用于跳过当前循环的剩余部分并进入下一次循环，exit()函数用于退出程序，return语句用于从函数返回值。'
    },
    {
      id: 4,
      question: 'Python中列表的特点是？',
      options: ['不可变', '有序', '不可重复', '键值对'],
      correctAnswer: 1,
      explanation: 'Python中列表是有序的、可变的、可重复的集合类型。'
    },
    {
      id: 5,
      question: '以下哪个模块用于处理CSV文件？',
      options: ['csv', 'json', 'xml', 'pickle'],
      correctAnswer: 0,
      explanation: 'csv模块用于处理CSV文件，json模块用于处理JSON数据，xml模块用于处理XML数据，pickle模块用于对象序列化。'
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
      description: '本课程是商务数据分析与应用专业的基础课程，旨在培养学生掌握Python编程语言的基础知识，为后续的数据分析学习打下坚实的基础。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：Python语言基础',
      description: '学习Python语言的基本语法和数据类型，掌握Python编程的基础知识。',
      topics: [
        'Python简介与安装',
        '基本数据类型（整数、浮点数、字符串、布尔值）',
        '变量与赋值',
        '基本运算符与表达式',
        '输入输出函数'
      ],
      resources: [
        '《Python编程：从入门到实践》',
        'Python官方文档',
        'Python基础语法练习'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：控制结构',
      description: '学习Python的控制结构，包括条件语句和循环语句，掌握程序的流程控制。',
      topics: [
        '条件语句（if-elif-else）',
        '循环语句（for循环）',
        '循环语句（while循环）',
        '循环控制语句（break、continue）',
        '嵌套循环与条件'
      ],
      resources: [
        'Python控制结构教程',
        '循环语句练习',
        '条件判断案例分析'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：数据结构',
      description: '学习Python的内置数据结构，包括列表、元组、字典和集合，掌握数据的组织和管理。',
      topics: [
        '列表（List）的创建与操作',
        '元组（Tuple）的创建与操作',
        '字典（Dictionary）的创建与操作',
        '集合（Set）的创建与操作',
        '数据结构的选择与应用'
      ],
      resources: [
        'Python数据结构教程',
        '数据结构练习',
        '数据结构应用案例'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：函数与模块',
      description: '学习Python的函数定义与调用，以及模块的导入与使用，掌握代码的组织和复用。',
      topics: [
        '函数的定义与调用',
        '函数参数与返回值',
        '函数的作用域',
        '模块的导入与使用',
        '标准库的应用'
      ],
      resources: [
        'Python函数教程',
        '模块与包的使用指南',
        '函数练习与案例'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：文件操作',
      description: '学习Python的文件读写操作，掌握数据的持久化存储。',
      topics: [
        '文件的打开与关闭',
        '文件的读取操作',
        '文件的写入操作',
        '文件的异常处理',
        'CSV文件的读写'
      ],
      resources: [
        'Python文件操作教程',
        '文件读写练习',
        'CSV文件处理案例'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：面向对象编程',
      description: '学习Python的面向对象编程思想和方法，掌握类和对象的概念和使用。',
      topics: [
        '类与对象的概念',
        '类的定义与实例化',
        '类的属性与方法',
        '继承与多态',
        '面向对象编程实践'
      ],
      resources: [
        'Python面向对象编程教程',
        '类与对象练习',
        '面向对象编程案例'
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
              <span className="text-4xl">🐍</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            Python基础
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业基础课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握Python编程语言的基础知识，为后续的数据分析学习打下坚实的基础，
            使学生能够使用Python进行简单的数据处理和分析。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：无
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
              课程内容按照由浅入深的顺序编排，涵盖Python编程的核心知识
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
                  <span className="text-gray-300">掌握Python语言的基本语法和数据类型</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解Python的控制结构和数据结构</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉Python的函数和模块系统</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">了解面向对象编程的基本概念</span>
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
                  <span className="text-gray-300">能够编写基本的Python程序</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用Python处理和分析数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用Python读写文件</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用Python的标准库</span>
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
                  <p className="text-gray-400">包括编程练习、小项目等</p>
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
                  <p className="text-gray-400">综合编程项目</p>
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
                title="Python基础课程学习进度" 
                items={progressItems} 
              />
            )}
            {activeTab === 'resources' && (
              <LearningResource 
                title="Python学习资源" 
                resources={learningResources} 
              />
            )}
            {activeTab === 'exercises' && (
              <ExerciseComponent 
                title="Python基础练习" 
                questions={exercises} 
              />
            )}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-300">Python基础课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}