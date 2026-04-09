import { useState, useEffect, useRef } from 'react';

interface Course {
  id: string;
  name: string;
  description: string;
  details: string;
  icon: string;
  color: string;
  skills: string[];
}

export default function Home() {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; speed: number; opacity: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1
      }));
      setParticles(newParticles);
    };

    createParticles();
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y - p.speed,
        x: p.x + Math.sin(p.y * 0.01) * 0.5,
        opacity: p.y < 0 ? 0 : p.opacity
      })).filter(p => p.y > -50));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const courses: Course[] = [
    {
      id: '1',
      name: 'Python基础',
      description: 'Python编程语言的基础知识和应用',
      details: '包含Python语法、数据类型、控制结构、函数、模块等内容，为后续的数据分析学习打下基础。',
      icon: '🐍',
      color: 'from-blue-500 to-cyan-400',
      skills: ['Python语法', '数据结构', '函数编程', '模块导入']
    },
    {
      id: '2',
      name: '数据分析技术',
      description: '数据分析的基本方法和工具',
      details: '学习数据清洗、数据分析、数据可视化等技术，掌握常用的数据分析工具和方法。',
      icon: '📊',
      color: 'from-cyan-400 to-blue-600',
      skills: ['数据清洗', '统计分析', '数据可视化', 'Pandas']
    },
    {
      id: '3',
      name: '数据采集与处理',
      description: '数据采集和预处理的技术',
      details: '学习网络爬虫、数据抓取、数据清洗和预处理等技术，为数据分析准备高质量的数据。',
      icon: '🔍',
      color: 'from-blue-600 to-indigo-500',
      skills: ['网络爬虫', 'API调用', '数据清洗', '数据预处理']
    },
    {
      id: '4',
      name: '供应链数据分析',
      description: '供应链管理中的数据分析应用',
      details: '学习如何利用数据分析优化供应链流程，提高供应链效率和降低成本。',
      icon: '🚚',
      color: 'from-indigo-500 to-blue-500',
      skills: ['供应链管理', '需求预测', '库存优化', '物流分析']
    },
    {
      id: '5',
      name: '数据库原理与应用',
      description: '数据库的基本原理和应用',
      details: '学习数据库设计、SQL语言、数据库管理等内容，掌握数据存储和管理的核心技术。',
      icon: '💾',
      color: 'from-blue-400 to-cyan-500',
      skills: ['SQL语言', '数据库设计', '数据建模', '数据库管理']
    }
  ];

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgMCBMIDUwIDAgTCA1MCA1MCBMIDAgNTAiIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjxwYXRoIGQ9Ik01MCAwIEwgMTAwIDAgTCAxMDAgNTAgTCA1MCA1MCIgZmlsbD0iIzNiODJmNiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTAgNTAiIGQ9Ik01MCA1MCBMIDAgNTAgTCAwIDEwMCBMIDUwIDEwMCIgZmlsbD0iIzNiODJmNiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTUwIDUwIEwgMTAwIDUwIEwgMTAwIDEwMCBMIDUwIDEwMCIgZmlsbD0iIzNiODJmNiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')]"></div>
      
      {/* 动态网格背景 */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>
      
      {/* 电路图案 */}
      <div className="absolute inset-0 opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 L200,50 L200,150 L400,150 L400,250 L600,250 L600,350 L800,350 L800,450 L1000,450" stroke="#3b82f6" strokeWidth="1" fill="none"/>
          <path d="M50,0 L50,200 L150,200 L150,400 L250,400 L250,600 L350,600 L350,800 L450,800 L450,1000" stroke="#3b82f6" strokeWidth="1" fill="none"/>
          <circle cx="200" cy="50" r="3" fill="#3b82f6" className="animate-pulse"/>
          <circle cx="200" cy="150" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
          <circle cx="400" cy="150" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '0.4s'}}/>
          <circle cx="400" cy="250" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
          <circle cx="600" cy="250" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '0.8s'}}/>
          <circle cx="600" cy="350" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '1s'}}/>
          <circle cx="800" cy="350" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '1.2s'}}/>
          <circle cx="800" cy="450" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '1.4s'}}/>
          <circle cx="50" cy="200" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
          <circle cx="150" cy="200" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
          <circle cx="150" cy="400" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '0.7s'}}/>
          <circle cx="250" cy="400" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
          <circle cx="250" cy="600" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '1.1s'}}/>
          <circle cx="350" cy="600" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '1.3s'}}/>
          <circle cx="350" cy="800" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
          <circle cx="450" cy="800" r="3" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '1.7s'}}/>
        </svg>
      </div>
      
      {/* 粒子效果 */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow: '0 0 15px 3px rgba(59, 130, 246, 0.6)',
            animationDuration: `${Math.random() * 2 + 1}s`
          }}
        />
      ))}
      
      {/* 鼠标跟随效果 */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 filter blur-[250px] opacity-15 pointer-events-none"
        style={{
          left: `${mousePosition.x - 400}px`,
          top: `${mousePosition.y - 400}px`,
          transition: 'left 0.08s ease, top 0.08s ease'
        }}
      ></div>
      
      {/* 动态光效 */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500 filter blur-[150px] opacity-5 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-400 filter blur-[150px] opacity-5 animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
      </div>

      {/* 个人信息区 */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-8">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                <div className="absolute inset-0 border border-white/20 rounded-2xl"></div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="w-10 h-10 bg-blue-400/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-blue-200">📊</span>
                  </div>
                  <div className="w-10 h-10 bg-cyan-400/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-cyan-200">💻</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-blue-200">📈</span>
                  </div>
                  <div className="w-10 h-10 bg-cyan-500/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-cyan-200">🔍</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-600/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-blue-200">💾</span>
                  </div>
                  <div className="w-10 h-10 bg-cyan-600/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-cyan-200">🐍</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-blue-200">🚚</span>
                  </div>
                  <div className="w-10 h-10 bg-cyan-400/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-cyan-200">📱</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-400/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-blue-200">✨</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgMCBMIDUwIDAgTCA1MCA1MCBMIDAgNTAiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjxwYXRoIGQ9Ik01MCAwIEwgMTAwIDAgTCAxMDAgNTAgTCA1MCA1MCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTAgNTAiIGQ9Ik01MCA1MCBMIDAgNTAgTCAwIDEwMCBMIDUwIDEwMCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTUwIDUwIEwgMTAwIDUwIEwgMTAwIDEwMCBMIDUwIDEwMCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')]"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">王娜</h1>
            <div className="flex flex-col items-center mb-6">
              <p className="text-2xl mb-2 text-cyan-300 font-medium">商务数据分析与应用专业</p>
              <p className="text-lg text-blue-300">广东科学技术职业学院商学院</p>
            </div>
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-lg text-gray-300 leading-relaxed">
                欢迎访问我的个人页面，这里展示了我学习的主要课程信息。
                作为商务数据分析与应用专业的学生，我致力于掌握数据分析的核心技能，
                后续我会不断补充各课程的详细内容和学习成果。
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300 hover:bg-gray-700/70 transition-all duration-300">
                数据分析
              </div>
              <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300 hover:bg-gray-700/70 transition-all duration-300">
                商务智能
              </div>
              <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300 hover:bg-gray-700/70 transition-all duration-300">
                数据可视化
              </div>
              <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300 hover:bg-gray-700/70 transition-all duration-300">
                Python编程
              </div>
              <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300 hover:bg-gray-700/70 transition-all duration-300">
                数据库管理
              </div>
            </div>
          </div>
          
          {/* 数据统计 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-blue-400 mb-2">5+</div>
              <div className="text-gray-400">专业课程</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-cyan-400 mb-2">20+</div>
              <div className="text-gray-400">核心技能</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-indigo-400 mb-2">∞</div>
              <div className="text-gray-400">学习潜力</div>
            </div>
          </div>
        </div>
        
        {/* 装饰线条 */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
      </section>

      {/* 课程列表区 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              我的课程
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              以下是我学习的核心课程，每门课程都包含详细的学习内容和相关技能
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div 
                  className="p-6 cursor-pointer" 
                  onClick={() => toggleCourse(course.id)}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${course.color} flex items-center justify-center mr-4 shadow-lg shadow-current/40`}>
                      <span className="text-2xl">{course.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100">{course.name}</h3>
                  </div>
                  <p className="text-gray-400 mb-6">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {course.skills.slice(0, 2).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-blue-300">
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 2 && (
                        <span className="px-2 py-1 bg-gray-700/50 rounded text-xs text-blue-300">
                          +{course.skills.length - 2}
                        </span>
                      )}
                    </div>
                    <span className={`text-blue-400 font-medium transition-transform duration-300 ${expandedCourse === course.id ? 'transform rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>
                {expandedCourse === course.id && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-medium text-gray-200 mb-3">课程详情</h4>
                      <p className="text-gray-400 mb-4">{course.details}</p>
                      <h5 className="font-medium text-gray-200 mb-2">相关技能</h5>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-700/50 rounded text-xs text-blue-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 学习路径 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              学习路径
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              我的专业学习规划和技能发展路径
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
            <div className="space-y-12">
              <div className="flex items-center">
                <div className="w-1/2 pr-12 text-right">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">基础阶段</h3>
                  <p className="text-gray-400">Python基础、数据库原理</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-gray-900"></div>
                <div className="w-1/2 pl-12"></div>
              </div>
              <div className="flex items-center">
                <div className="w-1/2 pr-12"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 border-4 border-gray-900"></div>
                <div className="w-1/2 pl-12">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">进阶阶段</h3>
                  <p className="text-gray-400">数据分析技术、数据采集与处理</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/2 pr-12 text-right">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">应用阶段</h3>
                  <p className="text-gray-400">供应链数据分析、实战项目</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-gray-900"></div>
                <div className="w-1/2 pl-12"></div>
              </div>
              <div className="flex items-center">
                <div className="w-1/2 pr-12"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 border-4 border-gray-900"></div>
                <div className="w-1/2 pl-12">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">专业深化</h3>
                  <p className="text-gray-400">高级数据分析、行业应用</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              王娜的个人课程页面
            </h3>
            <p className="text-gray-500 text-sm mb-6">© 2026 广东科学技术职业学院</p>
            <div className="flex justify-center space-x-6">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 hover:border-blue-500 hover:bg-gray-700 transition-all duration-300">
                <span className="text-gray-400 hover:text-blue-400 text-xl">📧</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 hover:border-blue-500 hover:bg-gray-700 transition-all duration-300">
                <span className="text-gray-400 hover:text-blue-400 text-xl">📱</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 hover:border-blue-500 hover:bg-gray-700 transition-all duration-300">
                <span className="text-gray-400 hover:text-blue-400 text-xl">💻</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 hover:border-blue-500 hover:bg-gray-700 transition-all duration-300">
                <span className="text-gray-400 hover:text-blue-400 text-xl">📊</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              科技赋能教育 · 数据驱动未来
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}