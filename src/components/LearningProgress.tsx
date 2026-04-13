import { useState } from 'react';

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

interface LearningProgressProps {
  title: string;
  items: ProgressItem[];
  onProgressUpdate?: (completed: number, total: number) => void;
}

export default function LearningProgress({ title, items, onProgressUpdate }: LearningProgressProps) {
  const [progressItems, setProgressItems] = useState<ProgressItem[]>(items);

  const toggleItem = (itemId: string) => {
    const updatedItems = progressItems.map(item => {
      if (item.id === itemId) {
        const newCompleted = !item.completed;
        return {
          ...item,
          completed: newCompleted,
          subItems: item.subItems?.map(subItem => ({
            ...subItem,
            completed: newCompleted
          }))
        };
      }
      return item;
    });
    setProgressItems(updatedItems);
    updateProgress(updatedItems);
  };

  const toggleSubItem = (itemId: string, subItemId: string) => {
    const updatedItems = progressItems.map(item => {
      if (item.id === itemId && item.subItems) {
        const updatedSubItems = item.subItems.map(subItem => 
          subItem.id === subItemId 
            ? { ...subItem, completed: !subItem.completed }
            : subItem
        );
        const allSubItemsCompleted = updatedSubItems.every(subItem => subItem.completed);
        return {
          ...item,
          subItems: updatedSubItems,
          completed: allSubItemsCompleted
        };
      }
      return item;
    });
    setProgressItems(updatedItems);
    updateProgress(updatedItems);
  };

  const updateProgress = (items: ProgressItem[]) => {
    const allItems = items.flatMap(item => 
      item.subItems ? item.subItems : [{ id: item.id, completed: item.completed }]
    );
    const completedItems = allItems.filter(item => item.completed).length;
    const totalItems = allItems.length;
    if (onProgressUpdate) {
      onProgressUpdate(completedItems, totalItems);
    }
  };

  const allItems = progressItems.flatMap(item => 
    item.subItems ? item.subItems : [{ id: item.id, completed: item.completed }]
  );
  const completedItems = allItems.filter(item => item.completed).length;
  const totalItems = allItems.length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-gray-100 mb-6">{title}</h3>
      
      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">学习进度</span>
          <span className="text-blue-400 font-medium">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          {completedItems}/{totalItems} 个项目已完成
        </div>
      </div>

      {/* 进度项列表 */}
      <div className="space-y-4">
        {progressItems.map(item => (
          <div key={item.id} className="border border-gray-700 rounded-lg p-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                  item.completed
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-600'
                }`}>
                  {item.completed ? '✓' : ''}
                </div>
                <h4 className={`font-medium ${item.completed ? 'text-blue-400' : 'text-gray-300'}`}>
                  {item.title}
                </h4>
              </div>
              {item.subItems && (
                <span className="text-gray-400 text-sm">
                  {item.subItems.filter(sub => sub.completed).length}/{item.subItems.length}
                </span>
              )}
            </div>
            
            {item.subItems && (
              <div className="mt-3 ml-9 space-y-2">
                {item.subItems.map(subItem => (
                  <div 
                    key={subItem.id}
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleSubItem(item.id, subItem.id)}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                      subItem.completed
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-600'
                    }`}>
                      {subItem.completed ? '✓' : ''}
                    </div>
                    <span className={`text-sm ${subItem.completed ? 'text-blue-400' : 'text-gray-400'}`}>
                      {subItem.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
