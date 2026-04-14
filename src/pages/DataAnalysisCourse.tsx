import { useState, useEffect } from 'react';
import LearningProgress from '../components/LearningProgress';
import LearningResource from '../components/LearningResource';
import ExerciseComponent from '../components/ExerciseComponent';
import ChapterContent from '../components/ChapterContent';
import ChapterExercise from '../components/ChapterExercise';

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

export default function DataAnalysisCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeChapterMode, setActiveChapterMode] = useState<'content' | 'exercise' | null>(null);
  const [activeTab, setActiveTab] = useState<'progress' | 'resources' | 'exercises'>('progress');

  // 学习进度数据
  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：数据分析基础',
      completed: false,
      subItems: [
        { id: 'chapter1-1', title: '数据分析的定义与重要性', completed: false },
        { id: 'chapter1-2', title: '数据分析的基本流程', completed: false },
        { id: 'chapter1-3', title: '数据类型与数据结构', completed: false },
        { id: 'chapter1-4', title: '数据分析的常用方法分类', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：数据可视化技术',
      completed: false,
      subItems: [
        { id: 'chapter2-1', title: '数据可视化的基本原理', completed: false },
        { id: 'chapter2-2', title: 'Matplotlib库的使用', completed: false },
        { id: 'chapter2-3', title: 'Seaborn库的高级可视化', completed: false },
        { id: 'chapter2-4', title: '交互式数据可视化工具', completed: false },
        { id: 'chapter2-5', title: '数据可视化最佳实践', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：统计分析方法',
      completed: false,
      subItems: [
        { id: 'chapter3-1', title: '描述性统计分析', completed: false },
        { id: 'chapter3-2', title: '假设检验', completed: false },
        { id: 'chapter3-3', title: '方差分析', completed: false },
        { id: 'chapter3-4', title: '相关分析与回归分析', completed: false },
        { id: 'chapter3-5', title: '时间序列分析', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：机器学习基础',
      completed: false,
      subItems: [
        { id: 'chapter4-1', title: '机器学习概述', completed: false },
        { id: 'chapter4-2', title: '监督学习与无监督学习', completed: false },
        { id: 'chapter4-3', title: '线性回归与逻辑回归', completed: false },
        { id: 'chapter4-4', title: '决策树与随机森林', completed: false },
        { id: 'chapter4-5', title: '聚类分析', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：商务数据分析应用',
      completed: false,
      subItems: [
        { id: 'chapter5-1', title: '市场数据分析', completed: false },
        { id: 'chapter5-2', title: '客户行为分析', completed: false },
        { id: 'chapter5-3', title: '销售数据分析', completed: false },
        { id: 'chapter5-4', title: '供应链数据分析', completed: false },
        { id: 'chapter5-5', title: '财务数据分析', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据分析项目实战',
      completed: false,
      subItems: [
        { id: 'chapter6-1', title: '项目选题与规划', completed: false },
        { id: 'chapter6-2', title: '数据获取与清洗', completed: false },
        { id: 'chapter6-3', title: '数据分析与建模', completed: false },
        { id: 'chapter6-4', title: '结果可视化与报告', completed: false },
        { id: 'chapter6-5', title: '项目展示与评估', completed: false }
      ]
    }
  ];

  // 章节内容数据
  const chapterContents = {
    'chapter1': {
      title: '第一章：数据分析基础',
      sections: [
        {
          id: 'section1-1',
          title: '数据分析的定义与重要性',
          content: '数据分析是指使用适当的统计分析方法对收集到的数据进行处理、分析和解释，以发现数据中的模式、趋势和关系，为决策提供依据。\n\n数据分析的重要性：\n1. 帮助企业做出数据驱动的决策\n2. 发现业务中的问题和机会\n3. 优化业务流程和提高效率\n4. 预测未来趋势和市场变化',
          codeExamples: [],
          resources: [
            '《数据分析基础》教材',
            '数据分析流程图表',
            '案例分析：电商平台用户行为分析'
          ]
        },
        {
          id: 'section1-2',
          title: '数据分析的基本流程',
          content: '数据分析的基本流程包括：\n\n1. 问题定义：明确分析的目标和问题\n2. 数据收集：获取相关的数据\n3. 数据清洗：处理缺失值、异常值等\n4. 数据探索：了解数据的基本特征\n5. 数据分析：使用适当的方法分析数据\n6. 结果可视化：通过图表展示分析结果\n7. 结论与建议：基于分析结果提出结论和建议',
          codeExamples: [],
          resources: [
            '数据分析流程图解',
            '数据清洗最佳实践指南',
            '案例：某企业数据分析项目流程'
          ]
        },
        {
          id: 'section1-3',
          title: '数据类型与数据结构',
          content: '数据类型包括：\n\n1. 数值型数据：整数、浮点数等\n2. 分类型数据：类别、标签等\n3. 时间序列数据：按时间顺序排列的数据\n4. 文本数据：文字、文档等\n\n数据结构包括：\n1. 表格数据：行和列组成的数据\n2. 层次数据：树状结构的数据\n3. 网络数据：节点和边组成的数据',
          codeExamples: [],
          resources: [
            '数据类型与结构详解',
            'Python数据结构教程',
            '数据类型转换练习'
          ]
        },
        {
          id: 'section1-4',
          title: '数据分析的常用方法分类',
          content: '数据分析方法可分为：\n\n1. 描述性分析：描述数据的基本特征\n2. 诊断性分析：分析数据发生的原因\n3. 预测性分析：预测未来的趋势\n4. 规范性分析：提供最优决策建议',
          codeExamples: [],
          resources: [
            '数据分析方法分类表',
            '各分析方法适用场景',
            '分析方法选择指南'
          ]
        }
      ]
    },
    'chapter2': {
      title: '第二章：数据可视化技术',
      sections: [
        {
          id: 'section2-1',
          title: '数据可视化的基本原理',
          content: '数据可视化是通过图表、图形等方式将数据以视觉形式展示出来，帮助人们更直观地理解数据。\n\n数据可视化的基本原则：\n1. 准确性：正确反映数据的真实情况\n2. 清晰性：易于理解和解读\n3. 美观性：视觉效果良好\n4. 有效性：能够有效传达信息',
          codeExamples: [],
          resources: [
            '数据可视化原理教程',
            '视觉设计基础',
            '数据可视化案例集'
          ]
        },
        {
          id: 'section2-2',
          title: 'Matplotlib库的使用',
          content: 'Matplotlib是Python中最常用的数据可视化库，可用于创建各种类型的图表。\n\n基本使用步骤：\n1. 导入Matplotlib库\n2. 创建图表和子图\n3. 绘制数据\n4. 设置图表属性\n5. 显示或保存图表',
          codeExamples: ['import matplotlib.pyplot as plt', 'plt.figure(figsize=(10, 6))', 'plt.plot(x, y)', 'plt.title("标题")', 'plt.xlabel("X轴")', 'plt.ylabel("Y轴")', 'plt.show()'],
          resources: [
            'Matplotlib官方文档',
            'Matplotlib基础教程',
            '常见图表绘制示例'
          ]
        },
        {
          id: 'section2-3',
          title: 'Seaborn库的高级可视化',
          content: 'Seaborn是基于Matplotlib的高级数据可视化库，提供了更美观的默认样式和更高级的图表类型。\n\n常用图表类型：\n1. 散点图：展示两个变量之间的关系\n2. 直方图：展示数据的分布\n3. 箱线图：展示数据的分布和异常值\n4. 热力图：展示变量之间的相关性',
          codeExamples: ['import seaborn as sns', 'sns.scatterplot(x="x", y="y", data=data)', 'sns.histplot(data["value"])'],
          resources: [
            'Seaborn官方教程',
            'Seaborn图表类型详解',
            'Seaborn实战案例'
          ]
        },
        {
          id: 'section2-4',
          title: '交互式数据可视化工具',
          content: '交互式数据可视化工具允许用户与图表进行交互，如缩放、悬停查看详情等。\n\n常用工具：\n1. Plotly：创建交互式图表\n2. Dash：创建交互式数据应用\n3. Bokeh：创建交互式Web可视化',
          codeExamples: [],
          resources: [
            'Plotly入门教程',
            'Dash应用开发指南',
            '交互式可视化案例'
          ]
        },
        {
          id: 'section2-5',
          title: '数据可视化最佳实践',
          content: '数据可视化的最佳实践：\n\n1. 选择合适的图表类型\n2. 保持简洁明了\n3. 使用适当的颜色和标签\n4. 提供必要的上下文信息\n5. 避免图表欺诈',
          codeExamples: [],
          resources: [
            '数据可视化最佳实践指南',
            '图表类型选择参考',
            '数据可视化设计原则'
          ]
        }
      ]
    },
    'chapter3': {
      title: '第三章：统计分析方法',
      sections: [
        {
          id: 'section3-1',
          title: '描述性统计分析',
          content: '描述性统计分析用于描述数据的基本特征，包括：\n\n1. 集中趋势：均值、中位数、众数\n2. 离散程度：方差、标准差、范围\n3. 分布形状：偏度、峰度\n4. 分位数：四分位数、百分位数',
          codeExamples: ['import numpy as np', 'np.mean(data)', 'np.median(data)', 'np.std(data)'],
          resources: [
            '《统计学原理》教材',
            '描述性统计分析指南',
            '统计量计算练习'
          ]
        },
        {
          id: 'section3-2',
          title: '假设检验',
          content: '假设检验用于判断样本数据是否支持某个假设。\n\n常见的假设检验：\n1. t检验：比较两个样本的均值\n2. 卡方检验：比较分类变量的分布\n3. F检验：比较多个样本的方差',
          codeExamples: ['from scipy import stats', 'stats.ttest_ind(sample1, sample2)'],
          resources: [
            '假设检验原理详解',
            't检验、卡方检验、F检验应用场景',
            '假设检验案例分析'
          ]
        },
        {
          id: 'section3-3',
          title: '方差分析',
          content: '方差分析用于比较多个组之间的均值差异。\n\n类型：\n1. 单因素方差分析：一个自变量\n2. 双因素方差分析：两个自变量\n3. 多因素方差分析：多个自变量',
          codeExamples: ['from scipy import stats', 'f_stat, p_value = stats.f_oneway(group1, group2, group3)'],
          resources: [
            '方差分析教程',
            '方差分析假设条件',
            '方差分析案例练习'
          ]
        },
        {
          id: 'section3-4',
          title: '相关分析与回归分析',
          content: '相关分析用于衡量变量之间的线性关系强度，回归分析用于建立变量之间的预测模型。\n\n类型：\n1. 简单线性回归：一个自变量\n2. 多元线性回归：多个自变量\n3. 非线性回归：非线性关系',
          codeExamples: ['import numpy as np', 'from sklearn.linear_model import LinearRegression', 'X = np.array([[1], [2], [3]])', 'y = np.array([2, 4, 6])', 'model = LinearRegression()', 'model.fit(X, y)'],
          resources: [
            '相关分析与回归分析教程',
            '回归模型评估指标',
            '回归分析案例实战'
          ]
        },
        {
          id: 'section3-5',
          title: '时间序列分析',
          content: '时间序列分析用于分析和预测时间相关的数据。\n\n方法：\n1. 移动平均：平滑时间序列\n2. 指数平滑：对近期数据赋予更高权重\n3. ARIMA模型：自回归综合移动平均模型',
          codeExamples: [],
          resources: [
            '时间序列分析基础',
            'ARIMA模型详解',
            '时间序列预测案例'
          ]
        }
      ]
    },
    'chapter4': {
      title: '第四章：机器学习基础',
      sections: [
        {
          id: 'section4-1',
          title: '机器学习概述',
          content: '机器学习是人工智能的一个分支，通过算法让计算机从数据中学习规律，而不需要明确的编程指令。\n\n机器学习的应用：\n1. 图像识别\n2. 语音识别\n3. 自然语言处理\n4. 推荐系统\n5. 预测分析',
          codeExamples: [],
          resources: [
            '机器学习入门教程',
            '机器学习应用案例集',
            '机器学习算法分类表'
          ]
        },
        {
          id: 'section4-2',
          title: '监督学习与无监督学习',
          content: '监督学习：使用标记数据进行训练，目标是预测未知数据的标签。\n\n无监督学习：使用未标记数据进行训练，目标是发现数据中的模式和结构。\n\n半监督学习：结合标记和未标记数据进行训练。',
          codeExamples: [],
          resources: [
            '监督学习与无监督学习对比',
            '半监督学习方法介绍',
            '学习方法选择指南'
          ]
        },
        {
          id: 'section4-3',
          title: '线性回归与逻辑回归',
          content: '线性回归：用于预测连续值的监督学习算法。\n\n逻辑回归：用于预测分类标签的监督学习算法，输出是概率值。',
          codeExamples: ['from sklearn.linear_model import LinearRegression, LogisticRegression', 'model = LinearRegression()', 'model.fit(X_train, y_train)'],
          resources: [
            '线性回归原理与实践',
            '逻辑回归详解',
            '回归模型调优指南'
          ]
        },
        {
          id: 'section4-4',
          title: '决策树与随机森林',
          content: '决策树：通过树状结构进行决策的监督学习算法。\n\n随机森林：由多个决策树组成的集成学习算法，通过投票机制提高预测准确性。',
          codeExamples: ['from sklearn.tree import DecisionTreeClassifier', 'from sklearn.ensemble import RandomForestClassifier', 'model = RandomForestClassifier(n_estimators=100)'],
          resources: [
            '决策树算法原理',
            '随机森林参数调优',
            '树模型可视化工具'
          ]
        },
        {
          id: 'section4-5',
          title: '聚类分析',
          content: '聚类分析是一种无监督学习方法，用于将相似的数据点分组。\n\n常见的聚类算法：\n1. K-means：基于距离的聚类\n2. 层次聚类：基于层次结构的聚类\n3. DBSCAN：基于密度的聚类',
          codeExamples: ['from sklearn.cluster import KMeans', 'model = KMeans(n_clusters=3)', 'model.fit(X)'],
          resources: [
            '聚类算法原理',
            'K-means聚类实践',
            '聚类结果评估方法'
          ]
        }
      ]
    },
    'chapter5': {
      title: '第五章：商务数据分析应用',
      sections: [
        {
          id: 'section5-1',
          title: '市场数据分析',
          content: '市场数据分析用于了解市场趋势、竞争对手和消费者行为。\n\n分析内容：\n1. 市场规模和增长趋势\n2. 竞争对手分析\n3. 消费者行为分析\n4. 市场份额分析',
          codeExamples: [],
          resources: [
            '市场数据分析指南',
            '竞争对手分析框架',
            '市场分析案例集'
          ]
        },
        {
          id: 'section5-2',
          title: '客户行为分析',
          content: '客户行为分析用于了解客户的购买习惯、偏好和价值。\n\n分析内容：\n1. 客户细分\n2. 购买行为分析\n3. 客户生命周期价值\n4. 客户流失预测',
          codeExamples: [],
          resources: [
            '客户行为分析方法',
            'RFM模型应用',
            '客户流失预测模型'
          ]
        },
        {
          id: 'section5-3',
          title: '销售数据分析',
          content: '销售数据分析用于优化销售策略和提高销售业绩。\n\n分析内容：\n1. 销售趋势分析\n2. 产品销售分析\n3. 区域销售分析\n4. 销售渠道分析',
          codeExamples: [],
          resources: [
            '销售数据分析模板',
            '销售趋势预测方法',
            '销售分析案例'
          ]
        },
        {
          id: 'section5-4',
          title: '供应链数据分析',
          content: '供应链数据分析用于优化供应链流程和降低成本。\n\n分析内容：\n1. 库存分析\n2. 物流成本分析\n3. 供应商绩效分析\n4. 需求预测',
          codeExamples: [],
          resources: [
            '供应链数据分析指南',
            '库存优化模型',
            '供应商评估体系'
          ]
        },
        {
          id: 'section5-5',
          title: '财务数据分析',
          content: '财务数据分析用于评估企业的财务状况和业绩。\n\n分析内容：\n1. 财务比率分析\n2. 成本分析\n3. 盈利能力分析\n4. 现金流分析',
          codeExamples: [],
          resources: [
            '财务分析指标体系',
            '成本分析方法',
            '财务报表分析案例'
          ]
        }
      ]
    },
    'chapter6': {
      title: '第六章：数据分析项目实战',
      sections: [
        {
          id: 'section6-1',
          title: '项目选题与规划',
          content: '项目选题应结合实际业务需求，具有明确的目标和可行性。\n\n规划内容：\n1. 确定项目目标和范围\n2. 制定项目计划和时间表\n3. 确定数据需求和来源\n4. 评估项目风险',
          codeExamples: [],
          resources: [
            '项目选题指南',
            '项目计划模板',
            '项目风险管理方法'
          ]
        },
        {
          id: 'section6-2',
          title: '数据获取与清洗',
          content: '数据获取：从各种来源收集数据，如数据库、API、文件等。\n\n数据清洗：处理数据中的缺失值、异常值、重复值等问题。',
          codeExamples: ['import pandas as pd', 'df = pd.read_csv("data.csv")', 'df = df.dropna()', 'df = df.drop_duplicates()'],
          resources: [
            '数据获取方法汇总',
            '数据清洗工具推荐',
            '数据质量评估标准'
          ]
        },
        {
          id: 'section6-3',
          title: '数据分析与建模',
          content: '根据项目目标选择合适的分析方法和模型。\n\n步骤：\n1. 数据探索和可视化\n2. 特征工程\n3. 模型选择和训练\n4. 模型评估和优化',
          codeExamples: [],
          resources: [
            '数据分析方法选择指南',
            '特征工程技巧',
            '模型评估指标详解'
          ]
        },
        {
          id: 'section6-4',
          title: '结果可视化与报告',
          content: '将分析结果以清晰、直观的方式展示，并撰写详细的分析报告。\n\n报告内容：\n1. 项目背景和目标\n2. 数据来源和处理方法\n3. 分析过程和结果\n4. 结论和建议',
          codeExamples: [],
          resources: [
            '数据分析报告模板',
            '数据可视化最佳实践',
            '报告撰写技巧'
          ]
        },
        {
          id: 'section6-5',
          title: '项目展示与评估',
          content: '项目展示：向相关人员展示分析结果和建议。\n\n项目评估：评估项目的成功度和影响力。',
          codeExamples: [],
          resources: [
            '项目展示技巧',
            '项目评估标准',
            '成功项目案例分析'
          ]
        }
      ]
    }
  };

  // 400题题库（包含单选、多选和判断题）
  const chapterQuestions = {
    'chapter1': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 1,
        type: 'single' as const,
        question: `数据分析基础问题 ${i + 1}：数据分析的主要目的是什么？`,
        options: [
          '收集数据',
          '处理数据',
          '从数据中提取有价值的信息',
          '存储数据'
        ],
        correctAnswer: 2,
        explanation: '数据分析的主要目的是从数据中提取有价值的信息，为决策提供依据。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 201,
        type: 'multiple' as const,
        question: `数据分析基础问题 ${i + 201}：下列哪些属于数据分析的基本流程？`,
        options: [
          '问题定义',
          '数据收集',
          '数据清洗',
          '数据删除'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '数据分析的基本流程包括问题定义、数据收集、数据清洗、数据探索、数据分析、结果可视化、结论与建议。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 321,
        type: 'judgment' as const,
        question: `数据分析基础问题 ${i + 321}：描述性分析是数据分析的最高层次。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '数据分析的层次从低到高依次是：描述性分析、诊断性分析、预测性分析、规范性分析。'
      }))
    ],
    'chapter2': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 401,
        type: 'single' as const,
        question: `数据可视化问题 ${i + 1}：下列哪个库是Python中最常用的数据可视化库？`,
        options: [
          'NumPy',
          'Pandas',
          'Matplotlib',
          'Scikit-learn'
        ],
        correctAnswer: 2,
        explanation: 'Matplotlib是Python中最常用的数据可视化库。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 601,
        type: 'multiple' as const,
        question: `数据可视化问题 ${i + 201}：下列哪些是常用的数据可视化图表类型？`,
        options: [
          '散点图',
          '直方图',
          '箱线图',
          '热力图'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '散点图、直方图、箱线图和热力图都是常用的数据可视化图表类型。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 721,
        type: 'judgment' as const,
        question: `数据可视化问题 ${i + 321}：数据可视化的主要目的是使数据看起来更美观。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '数据可视化的主要目的是帮助人们更直观地理解数据，发现数据中的模式和趋势。'
      }))
    ],
    'chapter3': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 801,
        type: 'single' as const,
        question: `统计分析问题 ${i + 1}：下列哪个指标用于衡量数据的集中趋势？`,
        options: [
          '方差',
          '标准差',
          '均值',
          '范围'
        ],
        correctAnswer: 2,
        explanation: '均值是衡量数据集中趋势的指标，方差、标准差和范围是衡量数据离散程度的指标。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1001,
        type: 'multiple' as const,
        question: `统计分析问题 ${i + 201}：下列哪些属于假设检验的类型？`,
        options: [
          't检验',
          '卡方检验',
          'F检验',
          'Z检验'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: 't检验、卡方检验、F检验和Z检验都是常见的假设检验类型。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1121,
        type: 'judgment' as const,
        question: `统计分析问题 ${i + 321}：相关分析可以确定变量之间的因果关系。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '相关分析只能衡量变量之间的线性关系强度，不能确定因果关系。'
      }))
    ],
    'chapter4': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 1201,
        type: 'single' as const,
        question: `机器学习问题 ${i + 1}：下列哪种学习方式使用标记数据进行训练？`,
        options: [
          '监督学习',
          '无监督学习',
          '半监督学习',
          '强化学习'
        ],
        correctAnswer: 0,
        explanation: '监督学习使用标记数据进行训练，目标是预测未知数据的标签。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1401,
        type: 'multiple' as const,
        question: `机器学习问题 ${i + 201}：下列哪些属于监督学习算法？`,
        options: [
          '线性回归',
          '逻辑回归',
          'K-means聚类',
          '决策树'
        ],
        correctAnswer: [0, 1, 3],
        explanation: '线性回归、逻辑回归和决策树属于监督学习算法，K-means聚类属于无监督学习算法。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1521,
        type: 'judgment' as const,
        question: `机器学习问题 ${i + 321}：随机森林是由多个决策树组成的集成学习算法。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '随机森林是由多个决策树组成的集成学习算法，通过投票机制提高预测准确性。'
      }))
    ],
    'chapter5': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 1601,
        type: 'single' as const,
        question: `商务数据分析问题 ${i + 1}：下列哪种分析用于了解客户的购买习惯和偏好？`,
        options: [
          '市场数据分析',
          '客户行为分析',
          '销售数据分析',
          '供应链数据分析'
        ],
        correctAnswer: 1,
        explanation: '客户行为分析用于了解客户的购买习惯、偏好和价值。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1801,
        type: 'multiple' as const,
        question: `商务数据分析问题 ${i + 201}：下列哪些属于财务数据分析的内容？`,
        options: [
          '财务比率分析',
          '成本分析',
          '盈利能力分析',
          '客户流失预测'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '财务比率分析、成本分析和盈利能力分析属于财务数据分析的内容，客户流失预测属于客户行为分析的内容。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1921,
        type: 'judgment' as const,
        question: `商务数据分析问题 ${i + 321}：销售数据分析可以帮助企业优化销售策略和提高销售业绩。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '销售数据分析用于优化销售策略和提高销售业绩，包括销售趋势分析、产品销售分析、区域销售分析和销售渠道分析。'
      }))
    ],
    'chapter6': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 2001,
        type: 'single' as const,
        question: `数据分析项目实战问题 ${i + 1}：数据分析项目的第一步是什么？`,
        options: [
          '数据收集',
          '问题定义',
          '数据清洗',
          '数据分析'
        ],
        correctAnswer: 1,
        explanation: '数据分析项目的第一步是问题定义，明确分析的目标和问题。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 2201,
        type: 'multiple' as const,
        question: `数据分析项目实战问题 ${i + 201}：下列哪些属于数据清洗的内容？`,
        options: [
          '处理缺失值',
          '处理异常值',
          '处理重复值',
          '数据可视化'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '数据清洗的内容包括处理缺失值、异常值和重复值，数据可视化属于数据分析的内容。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 2321,
        type: 'judgment' as const,
        question: `数据分析项目实战问题 ${i + 321}：数据分析报告只需要包含分析结果，不需要包含分析过程。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '数据分析报告应该包含项目背景和目标、数据来源和处理方法、分析过程和结果、结论和建议等内容。'
      }))
    ]
  };

  // 学习资源数据
  const learningResources: Resource[] = [
    {
      id: 1,
      title: 'Python数据分析入门',
      type: 'document',
      description: 'Python数据分析的基础教程，涵盖NumPy、Pandas等库的使用',
      link: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: '数据可视化实战',
      type: 'video',
      description: '使用Matplotlib和Seaborn创建专业的数据可视化图表',
      link: 'https://www.bilibili.com/video/BV17Y4y157yf/',
      duration: '8小时',
      difficulty: 'intermediate'
    },
    {
      id: 3,
      title: '统计学基础',
      type: 'document',
      description: '数据分析所需的统计学基础知识',
      link: 'https://www.statlearning.com/',
      difficulty: 'beginner'
    },
    {
      id: 4,
      title: '机器学习实战',
      type: 'document',
      description: '使用Scikit-learn进行机器学习的实践指南',
      link: 'https://scikit-learn.org/stable/tutorial/index.html',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: '商务数据分析案例',
      type: 'article',
      description: '真实的商务数据分析案例分析',
      link: 'https://www.kaggle.com/datasets',
      difficulty: 'intermediate'
    },
    {
      id: 6,
      title: 'Pandas高级教程',
      type: 'code',
      description: 'Pandas库的高级使用技巧和最佳实践',
      link: 'https://pandas.pydata.org/docs/user_guide/advanced.html',
      difficulty: 'advanced'
    },
    {
      id: 7,
      title: '数据科学实战',
      type: 'video',
      description: '从数据获取到模型部署的完整数据科学流程',
      link: 'https://www.coursera.org/specializations/jhu-data-science',
      duration: '10小时',
      difficulty: 'advanced'
    },
    {
      id: 8,
      title: '时间序列分析',
      type: 'article',
      description: '使用Python进行时间序列分析的方法和技巧',
      link: 'https://www.statsmodels.org/stable/tsa.html',
      difficulty: 'advanced'
    }
  ];

  // 练习数据
  const exercises: Question[] = [
    {
      id: 1,
      question: '以下哪个库不是Python中常用的数据分析库？',
      options: ['NumPy', 'Pandas', 'Matplotlib', 'Flask'],
      correctAnswer: 3,
      explanation: 'Flask是一个Web框架，不是数据分析库。NumPy、Pandas和Matplotlib都是常用的数据分析库。'
    },
    {
      id: 2,
      question: '数据可视化的主要目的是什么？',
      options: ['使数据更复杂', '帮助理解数据', '占用更多存储空间', '增加数据量'],
      correctAnswer: 1,
      explanation: '数据可视化的主要目的是帮助人们更直观地理解数据，发现数据中的模式和趋势。'
    },
    {
      id: 3,
      question: '以下哪种分析方法属于监督学习？',
      options: ['K-means聚类', '主成分分析', '线性回归', '层次聚类'],
      correctAnswer: 2,
      explanation: '线性回归是一种监督学习算法，用于预测连续值。K-means聚类、主成分分析和层次聚类都属于无监督学习。'
    },
    {
      id: 4,
      question: 'Pandas中用于读取CSV文件的函数是？',
      options: ['read_csv()', 'load_csv()', 'import_csv()', 'fetch_csv()'],
      correctAnswer: 0,
      explanation: 'Pandas中使用read_csv()函数来读取CSV文件。'
    },
    {
      id: 5,
      question: '以下哪个图表类型最适合展示数据的分布情况？',
      options: ['折线图', '散点图', '柱状图', '直方图'],
      correctAnswer: 3,
      explanation: '直方图最适合展示数据的分布情况，它将数据分成多个 bins 并显示每个 bin 中的数据频率。'
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
      description: '本课程是商务数据分析与应用专业的核心课程，旨在培养学生掌握数据分析的基本方法和工具，能够运用数据分析技术解决实际商务问题。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：数据分析基础',
      description: '回顾数据分析的基本概念和流程，为后续学习打下基础。',
      topics: [
        '数据分析的定义与重要性',
        '数据分析的基本流程',
        '数据类型与数据结构',
        '数据分析的常用方法分类'
      ],
      resources: [
        '《数据分析基础》教材',
        '数据分析流程图表',
        '案例分析：电商平台用户行为分析'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：数据可视化技术',
      description: '学习数据可视化的基本原理和常用工具，掌握如何通过图表直观展示数据。',
      topics: [
        '数据可视化的基本原理',
        'Matplotlib库的使用',
        'Seaborn库的高级可视化',
        '交互式数据可视化工具',
        '数据可视化最佳实践'
      ],
      resources: [
        'Matplotlib官方文档',
        'Seaborn教程',
        '数据可视化案例集'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：统计分析方法',
      description: '学习基本的统计分析方法，掌握数据描述和推断统计的应用。',
      topics: [
        '描述性统计分析',
        '假设检验',
        '方差分析',
        '相关分析与回归分析',
        '时间序列分析'
      ],
      resources: [
        '《统计学原理》教材',
        'SciPy统计模块文档',
        '统计分析案例练习'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：机器学习基础',
      description: '介绍机器学习的基本概念和常用算法，培养学生的机器学习思维。',
      topics: [
        '机器学习概述',
        '监督学习与无监督学习',
        '线性回归与逻辑回归',
        '决策树与随机森林',
        '聚类分析'
      ],
      resources: [
        'Scikit-learn官方文档',
        '机器学习实战教程',
        '分类算法案例分析'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：商务数据分析应用',
      description: '将数据分析技术应用于实际商务场景，解决真实的商务问题。',
      topics: [
        '市场数据分析',
        '客户行为分析',
        '销售数据分析',
        '供应链数据分析',
        '财务数据分析'
      ],
      resources: [
        '商务数据分析案例集',
        '行业数据分析报告',
        '真实商务数据集'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据分析项目实战',
      description: '通过实际项目，综合运用所学知识，完成完整的数据分析任务。',
      topics: [
        '项目选题与规划',
        '数据获取与清洗',
        '数据分析与建模',
        '结果可视化与报告',
        '项目展示与评估'
      ],
      resources: [
        '项目模板与规范',
        '数据可视化工具指南',
        '项目评估标准'
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const scrollToLearningSection = () => {
    const learningSection = document.querySelector('[data-learning-section="true"]');
    if (learningSection) {
      learningSection.scrollIntoView({ behavior: 'smooth' });
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
              <span className="text-4xl">📊</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            数据分析技术
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业核心课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握数据分析的基本方法和工具，能够运用数据分析技术解决实际商务问题，
            为后续的专业学习和职业发展打下坚实基础。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：Python基础
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：数据采集与预处理
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：商务数据分析基础
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
              课程内容按照由浅入深的顺序编排，涵盖数据分析的核心技术和应用
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
                        <div className="mb-6">
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
                      {section.id !== 'intro' && (
                        <div className="mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveChapter(section.id);
                              setActiveChapterMode('content');
                              setTimeout(scrollToLearningSection, 100);
                            }}
                            className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                          >
                            开始学习本章
                          </button>
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
                  <span className="text-gray-300">掌握数据分析的基本概念和流程</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解数据可视化的原理和方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉统计分析和机器学习的基本方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">了解商务数据分析的应用场景和方法</span>
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
                  <span className="text-gray-300">能够使用Python进行数据可视化</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够运用统计方法分析数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用机器学习算法解决分类问题</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够完成完整的数据分析项目</span>
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
                    <div className="w-24 text-right mr-4 text-gray-300">10%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">实验练习</h3>
                  <p className="text-gray-400">包括数据可视化、统计分析等实验</p>
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
                  <p className="text-gray-400">完整的数据分析项目设计与实现</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">40%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-cyan-500 h-4 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 学习中心 */}
      <section className="py-16 px-4 relative z-10" data-learning-section="true">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              学习中心
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              查看学习进度、获取学习资源和进行练习测试
            </p>
          </div>
          
          {/* 标签页导航 */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-1 mb-8 flex justify-center">
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'text-gray-400 hover:text-gray-300'}`}
            >
              学习进度
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'resources' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'text-gray-400 hover:text-gray-300'}`}
            >
              学习资源
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'exercises' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'text-gray-400 hover:text-gray-300'}`}
            >
              练习测试
            </button>
          </div>
          
          {/* 标签页内容 */}
          {activeTab === 'progress' && (
            <div>
              {!activeChapter && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                  <h3 className="text-2xl font-semibold text-gray-100 mb-6">数据分析技术课程学习进度</h3>
                  {/* 总体进度条 */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">总体进度</span>
                      <span className="text-blue-400 font-medium">
                        {progressItems.reduce((total, item) => total + (item.subItems?.filter(sub => sub.completed).length || 0), 0)}/{progressItems.reduce((total, item) => total + (item.subItems?.length || 0), 0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(progressItems.reduce((total, item) => total + (item.subItems?.filter(sub => sub.completed).length || 0), 0) / progressItems.reduce((total, item) => total + (item.subItems?.length || 0), 0)) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {progressItems.map((item) => (
                      <div key={item.id} className="border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => setActiveChapter(item.id)}>
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
                          <span className="text-gray-400 text-sm">
                            {item.subItems?.filter(sub => sub.completed).length}/{item.subItems?.length}
                          </span>
                        </div>
                        {item.subItems && (
                          <div className="mt-3 ml-9 space-y-2">
                            {item.subItems.map(subItem => (
                              <div key={subItem.id} className="flex items-center">
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
              )}
              {activeChapter && activeChapterMode === 'content' && (
                <div>
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => setActiveChapter(null)}
                      className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
                    >
                      <span className="mr-2">←</span> 返回课程进度
                    </button>
                  </div>
                  <ChapterContent
                    chapterId={activeChapter}
                    chapterTitle={chapterContents[activeChapter as keyof typeof chapterContents]?.title || ''}
                    sections={chapterContents[activeChapter as keyof typeof chapterContents]?.sections || []}
                    onComplete={() => {
                      setActiveChapterMode('exercise');
                    }}
                  />
                </div>
              )}
              {activeChapter && activeChapterMode === 'exercise' && (
                <div>
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => setActiveChapterMode('content')}
                      className="flex items-center text-blue-400 hover:text-blue-300 mb-4 mr-4"
                    >
                      <span className="mr-2">←</span> 返回章节内容
                    </button>
                    <button
                      onClick={() => setActiveChapter(null)}
                      className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
                    >
                      <span className="mr-2">←</span> 返回课程进度
                    </button>
                  </div>
                  <ChapterExercise
                    chapterId={activeChapter}
                    chapterTitle={chapterContents[activeChapter as keyof typeof chapterContents]?.title || ''}
                    questions={chapterQuestions[activeChapter as keyof typeof chapterQuestions] || []}
                    questionCount={30}
                    onComplete={(score, total) => {
                      console.log(`练习完成，得分：${score}/${total}`);
                    }}
                  />
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'resources' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h3 className="text-2xl font-semibold text-gray-100 mb-6">学习资源</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningResources.map((resource) => (
                  <div key={resource.id} className="border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-blue-400 text-xl">
                          {resource.type === 'article' && '📄'}
                          {resource.type === 'video' && '🎥'}
                          {resource.type === 'document' && '📑'}
                          {resource.type === 'code' && '💻'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-100 mb-2">{resource.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                            {resource.difficulty === 'beginner' && '初级'}
                            {resource.difficulty === 'intermediate' && '中级'}
                            {resource.difficulty === 'advanced' && '高级'}
                          </span>
                          {resource.duration && (
                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                              {resource.duration}
                            </span>
                          )}
                        </div>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
                        >
                          查看资源
                          <span className="ml-2">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'exercises' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h3 className="text-2xl font-semibold text-gray-100 mb-6">练习测试</h3>
              <div className="space-y-6">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
                    <h4 className="font-medium text-gray-100 mb-3">{exercise.question}</h4>
                    <div className="space-y-2 mb-4">
                      {exercise.options.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center mr-3">
                            <span className="text-xs text-gray-400">{String.fromCharCode(65 + index)}</span>
                          </div>
                          <span className="text-gray-300">{option}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-gray-700">
                      <p className="text-sm text-blue-400">正确答案: {String.fromCharCode(65 + exercise.correctAnswer)}</p>
                      {exercise.explanation && (
                        <p className="text-sm text-gray-400 mt-2">{exercise.explanation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-300">数据分析技术课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}