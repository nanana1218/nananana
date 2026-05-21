import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProjectProgress {
  learnCompleted: boolean;
  practiceCompleted: boolean;
  testScore: number | null;
  lastVisited: number;
}

export interface LearningState {
  currentProject: number | null;
  currentPhase: 'learn' | 'practice' | 'test' | null;
  projectProgress: Record<number, ProjectProgress>;
  streak: number;
  totalTimeSpent: number;
  badges: string[];
}

interface LearningActions {
  setCurrentProject: (projectId: number | null) => void;
  setCurrentPhase: (phase: 'learn' | 'practice' | 'test' | null) => void;
  markLearnComplete: (projectId: number) => void;
  markPracticeComplete: (projectId: number) => void;
  setTestScore: (projectId: number, score: number) => void;
  resetProgress: () => void;
  updateStreak: () => void;
  addBadge: (badge: string) => void;
  addTimeSpent: (seconds: number) => void;
  getProgress: (projectId: number) => ProjectProgress | null;
  getOverallProgress: () => number;
  getCompletedProjects: () => number;
  checkBadges: () => void;
}

export const useLearningStore = create<LearningState & LearningActions>()(
  persist(
    (set, get) => ({
      currentProject: null,
      currentPhase: null,
      projectProgress: {},
      streak: 0,
      totalTimeSpent: 0,
      badges: [],

      setCurrentProject: (projectId) => set({ currentProject: projectId }),

      setCurrentPhase: (phase) => set({ currentPhase: phase }),

      markLearnComplete: (projectId) => {
        set((state) => ({
          projectProgress: {
            ...state.projectProgress,
            [projectId]: {
              ...state.projectProgress[projectId],
              learnCompleted: true,
              lastVisited: Date.now(),
            },
          },
        }));
        get().updateStreak();
        get().checkBadges();
      },

      markPracticeComplete: (projectId) => {
        set((state) => ({
          projectProgress: {
            ...state.projectProgress,
            [projectId]: {
              ...state.projectProgress[projectId],
              practiceCompleted: true,
              lastVisited: Date.now(),
            },
          },
        }));
        get().updateStreak();
        get().checkBadges();
      },

      setTestScore: (projectId, score) => {
        set((state) => ({
          projectProgress: {
            ...state.projectProgress,
            [projectId]: {
              ...state.projectProgress[projectId],
              testScore: score,
              lastVisited: Date.now(),
            },
          },
        }));
        get().updateStreak();
        get().checkBadges();
      },

      resetProgress: () =>
        set({
          currentProject: null,
          currentPhase: null,
          projectProgress: {},
          streak: 0,
          totalTimeSpent: 0,
          badges: [],
        }),

      updateStreak: () => {
        const state = get();
        const lastVisit = localStorage.getItem('lastVisit');
        const today = new Date().toDateString();

        if (lastVisit !== today) {
          if (lastVisit) {
            const lastVisitDate = new Date(lastVisit);
            const todayDate = new Date();
            const diffDays = Math.floor(
              (todayDate.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (diffDays === 1) {
              set({ streak: state.streak + 1 });
            } else if (diffDays > 1) {
              set({ streak: 1 });
            }
          } else {
            set({ streak: 1 });
          }
          localStorage.setItem('lastVisit', today);
        }
      },

      addBadge: (badge) =>
        set((state) => ({
          badges: state.badges.includes(badge) ? state.badges : [...state.badges, badge],
        })),

      addTimeSpent: (seconds) =>
        set((state) => ({ totalTimeSpent: state.totalTimeSpent + seconds })),

      getProgress: (projectId) => get().projectProgress[projectId] || null,

      getOverallProgress: () => {
        const state = get();
        const completed = Object.values(state.projectProgress).filter(
          (p) => p.testScore !== null
        ).length;
        return completed;
      },

      getCompletedProjects: () => {
        const state = get();
        return Object.values(state.projectProgress).filter((p) => p.testScore !== null)
          .length;
      },

      checkBadges: () => {
        const state = get();
        const completed = state.getCompletedProjects();
        const streak = state.streak;

        if (completed >= 1 && !state.badges.includes('first_project')) {
          state.addBadge('first_project');
        }
        if (completed >= 5 && !state.badges.includes('half_way')) {
          state.addBadge('half_way');
        }
        if (completed >= 10 && !state.badges.includes('data_master')) {
          state.addBadge('data_master');
        }
        if (streak >= 3 && !state.badges.includes('streak_3')) {
          state.addBadge('streak_3');
        }
        if (streak >= 7 && !state.badges.includes('streak_7')) {
          state.addBadge('streak_7');
        }
      },
    }),
    {
      name: 'learning-progress',
    }
  )
);
