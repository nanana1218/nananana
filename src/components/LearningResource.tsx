import { useState } from 'react';

interface Resource {
  id: number;
  title: string;
  type: 'article' | 'video' | 'document' | 'code';
  description: string;
  link: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface LearningResourceProps {
  title: string;
  resources: Resource[];
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'article':
      return '📄';
    case 'video':
      return '🎥';
    case 'document':
      return '📑';
    case 'code':
      return '💻';
    default:
      return '📦';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'text-green-400';
    case 'intermediate':
      return 'text-yellow-400';
    case 'advanced':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return '初级';
    case 'intermediate':
      return '中级';
    case 'advanced':
      return '高级';
    default:
      return '未知';
  }
};

export default function LearningResource({ title, resources }: LearningResourceProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === activeCategory);

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.type)))];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-gray-100 mb-6">{title}</h3>
      
      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category === 'all' ? '全部' : category === 'article' ? '文章' : 
             category === 'video' ? '视频' : category === 'document' ? '文档' : '代码'}
          </button>
        ))}
      </div>

      {/* 资源列表 */}
      <div className="space-y-4">
        {filteredResources.map(resource => (
          <div
            key={resource.id}
            className="border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                  <span className="text-xl">{getTypeIcon(resource.type)}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-medium text-gray-100">{resource.title}</h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(resource.difficulty)} bg-gray-700`}>
                    {getDifficultyText(resource.difficulty)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-xs">
                    {resource.duration && (
                      <span className="mr-4">⏱️ {resource.duration}</span>
                    )}
                    {resource.type === 'article' ? '阅读材料' : 
                     resource.type === 'video' ? '视频教程' : 
                     resource.type === 'document' ? '文档资料' : '代码示例'}
                  </div>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    查看资源
                    <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
