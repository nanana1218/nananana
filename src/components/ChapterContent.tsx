import { useState } from 'react';

interface Section {
  id: string;
  title: string;
  content: string;
  codeExamples?: string[];
  images?: string[];
  exercises?: number;
  resources?: string[];
}

interface ChapterContentProps {
  chapterId: string;
  chapterTitle: string;
  sections: Section[];
  onComplete: () => void;
}

export default function ChapterContent({ chapterId, chapterTitle, sections, onComplete }: ChapterContentProps) {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  const handleSectionComplete = (sectionId: string) => {
    const newCompletedSections = new Set(completedSections);
    if (newCompletedSections.has(sectionId)) {
      newCompletedSections.delete(sectionId);
    } else {
      newCompletedSections.add(sectionId);
    }
    setCompletedSections(newCompletedSections);
  };

  const handleChapterComplete = () => {
    onComplete();
  };

  const isChapterComplete = completedSections.size === sections.length;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-100">{chapterTitle}</h3>
        <div className="flex items-center">
          <span className="text-gray-400 mr-2">完成进度:</span>
          <span className="text-blue-400 font-medium">
            {completedSections.size}/{sections.length}
          </span>
        </div>
      </div>

      {/* 章节内容导航 */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${(
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : completedSections.has(section.id)
                  ? 'bg-green-900/50 text-green-300'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}`}
            >
              {section.title}
              {completedSections.has(section.id) && (
                <span className="ml-2">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 章节内容 */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        {sections.map((section) => (
          <div key={section.id} className={activeSection === section.id ? 'block' : 'hidden'}>
            <h4 className="text-xl font-semibold text-gray-100 mb-4">{section.title}</h4>
            <div className="prose prose-invert max-w-none">
              {section.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-300">{paragraph}</p>
              ))}
              
              {section.codeExamples && section.codeExamples.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-lg font-medium text-gray-200 mb-3">代码示例</h5>
                  {section.codeExamples.map((code, index) => (
                    <pre key={index} className="bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
                      <code className="text-blue-300">{code}</code>
                    </pre>
                  ))}
                </div>
              )}
              
              {section.resources && section.resources.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-lg font-medium text-gray-200 mb-3">学习资源</h5>
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
            
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => handleSectionComplete(section.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${(
                  completedSections.has(section.id)
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-green-600 text-white hover:bg-green-500'
                )}`}
              >
                {completedSections.has(section.id) ? '已完成' : '标记为完成'}
              </button>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex > 0) {
                      setActiveSection(sections[currentIndex - 1].id);
                    }
                  }}
                  disabled={sections.findIndex(s => s.id === activeSection) === 0}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一节
                </button>
                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex < sections.length - 1) {
                      setActiveSection(sections[currentIndex + 1].id);
                    }
                  }}
                  disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一节
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 章节完成按钮 */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleChapterComplete}
          disabled={!isChapterComplete}
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${(
            isChapterComplete
              ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-blue-500/30'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          )}`}
        >
          完成章节学习
        </button>
      </div>
    </div>
  );
}
