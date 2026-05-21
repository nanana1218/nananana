import { motion } from 'framer-motion';
import { Trophy, Flame, Clock, Award, Target, CheckCircle2 } from 'lucide-react';
import { useLearningStore } from '../store/learningStore';

const badgeConfig: Record<string, { icon: string; name: string; color: string }> = {
  first_project: { icon: '🎯', name: '初露锋芒', color: 'bg-green-500' },
  half_way: { icon: '🏆', name: '半程突破', color: 'bg-yellow-500' },
  data_master: { icon: '👑', name: '数据大师', color: 'bg-purple-500' },
  streak_3: { icon: '🔥', name: '连续3天', color: 'bg-orange-500' },
  streak_7: { icon: '💪', name: '连续7天', color: 'bg-red-500' },
};

export default function ProgressTracker() {
  const { projectProgress, streak, badges, totalTimeSpent, getCompletedProjects } = useLearningStore();
  
  const completed = getCompletedProjects();
  const totalProjects = 10;
  const progress = Math.round((completed / totalProjects) * 100);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    }
    return `${minutes}分钟`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 space-y-6">
      {/* 标题 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">学习进度</h3>
          <p className="text-blue-200/70 text-sm">追踪你的学习旅程</p>
        </div>
      </div>

      {/* 进度条 */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-blue-200">完成项目</span>
          <span className="text-white font-semibold">{completed} / {totalProjects}</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
          />
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {progress}%
          </span>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 bg-white/5 rounded-xl"
        >
          <div className="flex justify-center mb-1">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-xl font-bold text-white">{streak}</div>
          <div className="text-xs text-blue-200/70">连续天数</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center p-3 bg-white/5 rounded-xl"
        >
          <div className="flex justify-center mb-1">
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white">{formatTime(totalTimeSpent)}</div>
          <div className="text-xs text-blue-200/70">学习时长</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center p-3 bg-white/5 rounded-xl"
        >
          <div className="flex justify-center mb-1">
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-xl font-bold text-white">{badges.length}</div>
          <div className="text-xs text-blue-200/70">获得徽章</div>
        </motion.div>
      </div>

      {/* 徽章展示 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-blue-200">获得徽章</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full"
            >
              <span className="text-lg">{badgeConfig[badge]?.icon || '🏅'}</span>
              <span className="text-xs text-blue-100">{badgeConfig[badge]?.name || badge}</span>
            </motion.div>
          ))}
          {badges.length === 0 && (
            <span className="text-xs text-blue-200/50">完成项目获取徽章</span>
          )}
        </div>
      </div>

      {/* 项目进度列表 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-sm text-blue-200">项目状态</span>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {Array.from({ length: totalProjects }, (_, i) => {
            const projectId = i + 1;
            const progress = projectProgress[projectId];
            const isCompleted = progress?.testScore !== null;
            
            return (
              <div
                key={projectId}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  isCompleted 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/10 text-blue-200/70'
                }`}>
                  {projectId}
                </div>
                <div className="flex-1">
                  <div className="flex gap-1">
                    <span className={`w-2 h-2 rounded-full ${
                      progress?.learnCompleted ? 'bg-green-500' : 'bg-white/20'
                    }`} />
                    <span className={`w-2 h-2 rounded-full ${
                      progress?.practiceCompleted ? 'bg-green-500' : 'bg-white/20'
                    }`} />
                    <span className={`w-2 h-2 rounded-full ${
                      progress?.testScore !== null ? 'bg-green-500' : 'bg-white/20'
                    }`} />
                  </div>
                </div>
                {isCompleted && (
                  <span className="text-xs text-green-400">{progress?.testScore}分</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
