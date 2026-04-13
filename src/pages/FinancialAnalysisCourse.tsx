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

interface ChapterQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  type: 'single' | 'multiple' | 'judgment';
  explanation?: string;
}

export default function FinancialAnalysisCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('progress');
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeChapterMode, setActiveChapterMode] = useState<'content' | 'exercise' | null>(null);

  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：财务数据基础',
      completed: false,
      children: [
        { id: 'section1-1', title: '财务数据的概念与类型', completed: false },
        { id: 'section1-2', title: '财务报表的结构与内容', completed: false },
        { id: 'section1-3', title: '财务数据的收集方法', completed: false },
        { id: 'section1-4', title: '财务数据的整理与预处理', completed: false },
        { id: 'section1-5', title: '财务数据的质量评估', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：财务指标分析',
      completed: false,
      children: [
        { id: 'section2-1', title: '盈利能力指标', completed: false },
        { id: 'section2-2', title: '偿债能力指标', completed: false },
        { id: 'section2-3', title: '运营能力指标', completed: false },
        { id: 'section2-4', title: '发展能力指标', completed: false },
        { id: 'section2-5', title: '财务指标的综合分析', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：财务数据可视化',
      completed: false,
      children: [
        { id: 'section3-1', title: '财务数据可视化的原则', completed: false },
        { id: 'section3-2', title: '常用的财务图表类型', completed: false },
        { id: 'section3-3', title: '使用Python进行财务数据可视化', completed: false },
        { id: 'section3-4', title: '财务仪表盘的设计', completed: false },
        { id: 'section3-5', title: '财务数据可视化最佳实践', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：财务预测与预算',
      completed: false,
      children: [
        { id: 'section4-1', title: '财务预测的基本原理', completed: false },
        { id: 'section4-2', title: '时间序列分析在财务预测中的应用', completed: false },
        { id: 'section4-3', title: '回归分析在财务预测中的应用', completed: false },
        { id: 'section4-4', title: '预算编制的方法与流程', completed: false },
        { id: 'section4-5', title: '财务预测的评估与调整', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：财务风险分析',
      completed: false,
      children: [
        { id: 'section5-1', title: '财务风险的类型与特征', completed: false },
        { id: 'section5-2', title: '财务风险的识别方法', completed: false },
        { id: 'section5-3', title: '财务风险的评估模型', completed: false },
        { id: 'section5-4', title: '财务风险的管理策略', completed: false },
        { id: 'section5-5', title: '财务风险的监控与预警', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：财务数据分析实战',
      completed: false,
      children: [
        { id: 'section6-1', title: '财务数据分析的流程', completed: false },
        { id: 'section6-2', title: '财务报表分析案例', completed: false },
        { id: 'section6-3', title: '企业财务状况综合分析', completed: false },
        { id: 'section6-4', title: '行业对比分析', completed: false },
        { id: 'section6-5', title: '财务分析报告的撰写', completed: false }
      ]
    }
  ];

  const learningResources: Resource[] = [
    {
      id: 'resource1',
      title: '财务数据分析基础',
      type: 'document',
      difficulty: 'beginner',
      url: '#',
      description: '财务数据分析的基本概念和方法',
      duration: '10小时'
    },
    {
      id: 'resource2',
      title: '财务报表分析教程',
      type: 'video',
      difficulty: 'beginner',
      url: '#',
      description: '财务报表的结构和分析方法',
      duration: '8小时'
    },
    {
      id: 'resource3',
      title: '财务指标计算与分析',
      type: 'article',
      difficulty: 'intermediate',
      url: '#',
      description: '常用财务指标的计算方法和分析技巧',
      duration: '6小时'
    },
    {
      id: 'resource4',
      title: 'Python财务数据可视化',
      type: 'code',
      difficulty: 'intermediate',
      url: '#',
      description: '使用Python进行财务数据可视化的实例',
      duration: '5小时'
    },
    {
      id: 'resource5',
      title: '财务预测与预算',
      type: 'article',
      difficulty: 'advanced',
      url: '#',
      description: '财务预测和预算编制的高级方法',
      duration: '7小时'
    },
    {
      id: 'resource6',
      title: '财务风险分析',
      type: 'video',
      difficulty: 'advanced',
      url: '#',
      description: '财务风险的识别、评估和管理',
      duration: '9小时'
    }
  ];

  // 章节内容数据
  const chapterContents = {
    'chapter1': {
      title: '第一章：财务数据基础',
      sections: [
        {
          id: 'section1-1',
          title: '财务数据的概念与类型',
          content: '财务数据是企业在生产经营过程中产生的各种财务信息，是企业财务状况和经营成果的数字化表现。\n\n财务数据的类型包括：\n1. 资产负债表数据\n2. 利润表数据\n3. 现金流量表数据\n4. 所有者权益变动表数据\n5. 附注信息数据',
          codeExamples: []
        },
        {
          id: 'section1-2',
          title: '财务报表的结构与内容',
          content: '财务报表是企业财务数据的主要载体，包括资产负债表、利润表、现金流量表和所有者权益变动表。\n\n资产负债表：反映企业在某一特定日期的财务状况，包括资产、负债和所有者权益三个部分。\n利润表：反映企业在一定会计期间的经营成果，包括收入、费用和利润三个部分。\n现金流量表：反映企业在一定会计期间的现金和现金等价物流入和流出情况。\n所有者权益变动表：反映企业所有者权益各组成部分在一定会计期间的增减变动情况。',
          codeExamples: []
        },
        {
          id: 'section1-3',
          title: '财务数据的收集方法',
          content: '财务数据的收集是财务分析的基础，主要方法包括：\n\n1. 内部收集：从企业内部的会计系统、ERP系统等获取财务数据\n2. 外部收集：从公开渠道获取企业的财务报表、行业数据等\n3. 问卷调查：通过问卷调查获取相关财务信息\n4. 实地调查：通过实地考察获取企业的财务数据',
          codeExamples: []
        },
        {
          id: 'section1-4',
          title: '财务数据的整理与预处理',
          content: '财务数据的整理与预处理是财务分析的重要环节，主要包括：\n\n1. 数据清洗：去除无效数据、异常数据\n2. 数据转换：将原始数据转换为适合分析的格式\n3. 数据标准化：统一数据的计量单位和格式\n4. 数据验证：验证数据的准确性和完整性',
          codeExamples: []
        },
        {
          id: 'section1-5',
          title: '财务数据的质量评估',
          content: '财务数据的质量直接影响财务分析的结果，主要评估维度包括：\n\n1. 准确性：数据是否真实反映企业的财务状况\n2. 完整性：数据是否全面，没有遗漏\n3. 一致性：数据在不同时间和不同来源之间是否一致\n4. 及时性：数据是否及时更新\n5. 可靠性：数据是否可重复验证',
          codeExamples: []
        }
      ]
    },
    'chapter2': {
      title: '第二章：财务指标分析',
      sections: [
        {
          id: 'section2-1',
          title: '盈利能力指标',
          content: '盈利能力是企业获取利润的能力，主要指标包括：\n\n1. 毛利率：(销售收入 - 销售成本) / 销售收入\n2. 净利率：净利润 / 销售收入\n3. 总资产收益率：净利润 / 平均总资产\n4. 净资产收益率：净利润 / 平均净资产\n5. 每股收益：净利润 / 普通股股数',
          codeExamples: []
        },
        {
          id: 'section2-2',
          title: '偿债能力指标',
          content: '偿债能力是企业偿还债务的能力，主要指标包括：\n\n1. 流动比率：流动资产 / 流动负债\n2. 速动比率：(流动资产 - 存货) / 流动负债\n3. 资产负债率：总负债 / 总资产\n4. 利息保障倍数：息税前利润 / 利息费用',
          codeExamples: []
        },
        {
          id: 'section2-3',
          title: '运营能力指标',
          content: '运营能力是企业利用资产创造收入的能力，主要指标包括：\n\n1. 存货周转率：销售成本 / 平均存货\n2. 应收账款周转率：销售收入 / 平均应收账款\n3. 总资产周转率：销售收入 / 平均总资产\n4. 固定资产周转率：销售收入 / 平均固定资产',
          codeExamples: []
        },
        {
          id: 'section2-4',
          title: '发展能力指标',
          content: '发展能力是企业未来增长的潜力，主要指标包括：\n\n1. 销售收入增长率：(本期销售收入 - 上期销售收入) / 上期销售收入\n2. 净利润增长率：(本期净利润 - 上期净利润) / 上期净利润\n3. 总资产增长率：(本期总资产 - 上期总资产) / 上期总资产\n4. 净资产增长率：(本期净资产 - 上期净资产) / 上期净资产',
          codeExamples: []
        },
        {
          id: 'section2-5',
          title: '财务指标的综合分析',
          content: '财务指标的综合分析是将各种财务指标结合起来，全面评估企业的财务状况和经营成果。常用的综合分析方法包括：\n\n1. 杜邦分析法：通过分解净资产收益率，分析企业的盈利能力、运营能力和偿债能力\n2. 沃尔评分法：通过对多个财务指标进行评分，综合评估企业的财务状况\n3. 经济增加值(EVA)：考虑资本成本的企业价值评估方法',
          codeExamples: []
        }
      ]
    },
    'chapter3': {
      title: '第三章：财务数据可视化',
      sections: [
        {
          id: 'section3-1',
          title: '财务数据可视化的原则',
          content: '财务数据可视化是将财务数据转化为图形、图表等视觉形式，以便更直观地理解数据。主要原则包括：\n\n1. 准确性：可视化结果应准确反映数据的真实情况\n2. 简洁性：可视化应简洁明了，避免过多的装饰\n3. 相关性：可视化应突出数据之间的相关性\n4. 可读性：可视化应易于阅读和理解\n5. 美观性：可视化应具有一定的美观性，提高用户体验',
          codeExamples: []
        },
        {
          id: 'section3-2',
          title: '常用的财务图表类型',
          content: '常用的财务图表类型包括：\n\n1. 折线图：用于展示时间序列数据的变化趋势\n2. 柱状图：用于比较不同类别数据的大小\n3. 饼图：用于展示数据的构成比例\n4. 散点图：用于展示两个变量之间的关系\n5. 雷达图：用于多维度数据的比较\n6. 热力图：用于展示数据的密度和分布',
          codeExamples: []
        },
        {
          id: 'section3-3',
          title: '使用Python进行财务数据可视化',
          content: 'Python是一种强大的数据分析工具，可用于财务数据的可视化。常用的库包括：\n\n1. Matplotlib：Python的基础绘图库，功能强大\n2. Seaborn：基于Matplotlib的高级绘图库，提供更美观的图表\n3. Plotly：交互式绘图库，支持生成可交互的图表\n4. Pandas：数据处理库，内置了简单的绘图功能',
          codeExamples: ['import matplotlib.pyplot as plt\nimport pandas as pd\n\n# 绘制销售收入趋势图\nsales_data = pd.DataFrame({month: [1月, 2月, 3月, 4月, 5月, 6月],\n                           sales: [100, 120, 150, 130, 160, 180]})\nplt.figure(figsize=(10, 6))\nplt.plot(sales_data[month], sales_data[sales], marker=o)\nplt.title(销售收入趋势)\nplt.xlabel(月份)\nplt.ylabel(销售收入)\nplt.show()']
        },
        {
          id: 'section3-4',
          title: '财务仪表盘的设计',
          content: '财务仪表盘是一种综合展示企业财务状况的可视化工具，设计时应考虑：\n\n1. 关键指标选择：选择最能反映企业财务状况的关键指标\n2. 布局设计：合理布局各个指标，突出重要信息\n3. 颜色搭配：使用适当的颜色，增强视觉效果\n4. 交互设计：添加适当的交互功能，提高用户体验\n5. 数据更新：确保数据的及时更新',
          codeExamples: []
        },
        {
          id: 'section3-5',
          title: '财务数据可视化最佳实践',
          content: '财务数据可视化的最佳实践包括：\n\n1. 明确目标：根据分析目的选择合适的可视化方式\n2. 选择合适的图表类型：根据数据类型和分析目的选择合适的图表类型\n3. 保持简洁：避免过多的装饰和不必要的信息\n4. 突出重点：突出重要的数据和信息\n5. 提供上下文：为数据提供必要的上下文信息\n6. 确保准确性：确保可视化结果准确反映数据的真实情况',
          codeExamples: []
        }
      ]
    },
    'chapter4': {
      title: '第四章：财务预测与预算',
      sections: [
        {
          id: 'section4-1',
          title: '财务预测的基本原理',
          content: '财务预测是根据历史财务数据和其他相关信息，对企业未来的财务状况和经营成果进行预测。基本原理包括：\n\n1. 惯性原理：企业的财务状况和经营成果具有一定的连续性\n2. 相关原理：企业的财务指标之间存在一定的相关性\n3. 概率原理：财务预测结果具有一定的概率分布\n4. 反馈原理：根据实际结果调整预测模型',
          codeExamples: []
        },
        {
          id: 'section4-2',
          title: '时间序列分析在财务预测中的应用',
          content: '时间序列分析是一种基于历史数据的预测方法，主要包括：\n\n1. 移动平均法：使用过去几期的数据平均值作为预测值\n2. 指数平滑法：对不同时期的数据赋予不同的权重\n3. 趋势分析：分析数据的长期趋势\n4. 季节分析：分析数据的季节性变化\n5. ARIMA模型：自回归综合移动平均模型，适用于复杂的时间序列数据',
          codeExamples: []
        },
        {
          id: 'section4-3',
          title: '回归分析在财务预测中的应用',
          content: '回归分析是一种基于变量之间关系的预测方法，主要包括：\n\n1. 一元线性回归：分析一个自变量与因变量之间的线性关系\n2. 多元线性回归：分析多个自变量与因变量之间的线性关系\n3. 非线性回归：分析变量之间的非线性关系\n4. 逐步回归：通过逐步选择自变量，建立最优的回归模型',
          codeExamples: []
        },
        {
          id: 'section4-4',
          title: '预算编制的方法与流程',
          content: '预算编制是企业财务管理的重要环节，主要方法包括：\n\n1. 增量预算法：以上期预算为基础，根据实际情况进行调整\n2. 零基预算法：不考虑上期预算，从零开始编制预算\n3. 滚动预算法：定期调整预算，保持预算的时效性\n4. 弹性预算法：根据不同的业务量水平编制不同的预算\n\n预算编制的流程包括：\n1. 确定预算目标\n2. 收集相关信息\n3. 编制预算草案\n4. 审查和批准预算\n5. 执行和监控预算\n6. 评估和调整预算',
          codeExamples: []
        },
        {
          id: 'section4-5',
          title: '财务预测的评估与调整',
          content: '财务预测的评估与调整是提高预测准确性的重要环节，主要包括：\n\n1. 预测误差分析：分析预测值与实际值之间的差异\n2. 预测模型评估：评估预测模型的性能\n3. 预测假设审查：审查预测所基于的假设是否合理\n4. 预测结果调整：根据实际情况调整预测结果\n5. 预测方法改进：不断改进预测方法，提高预测准确性',
          codeExamples: []
        }
      ]
    },
    'chapter5': {
      title: '第五章：财务风险分析',
      sections: [
        {
          id: 'section5-1',
          title: '财务风险的类型与特征',
          content: '财务风险是企业在财务管理过程中面临的各种不确定性，主要类型包括：\n\n1. 市场风险：由于市场因素变化导致的风险\n2. 信用风险：由于债务人违约导致的风险\n3. 流动性风险：由于资产流动性不足导致的风险\n4. 操作风险：由于内部操作失误导致的风险\n5. 法律风险：由于法律法规变化导致的风险\n6. 汇率风险：由于汇率变化导致的风险\n7. 利率风险：由于利率变化导致的风险',
          codeExamples: []
        },
        {
          id: 'section5-2',
          title: '财务风险的识别方法',
          content: '财务风险的识别是风险管理的第一步，主要方法包括：\n\n1. 财务报表分析法：通过分析财务报表识别风险\n2. 风险清单法：列出可能的风险因素\n3. 情景分析法：分析不同情景下的风险\n4. 德尔菲法：通过专家意见识别风险\n5. 流程图分析法：通过分析业务流程识别风险\n6. 问卷调查法：通过问卷调查识别风险',
          codeExamples: []
        },
        {
          id: 'section5-3',
          title: '财务风险的评估模型',
          content: '财务风险的评估是对风险大小的量化分析，主要模型包括：\n\n1. 方差-协方差模型：基于正态分布假设的风险评估模型\n2. VaR (Value at Risk)模型：在一定置信水平下，资产组合在未来特定时期内可能的最大损失\n3. 压力测试：测试极端情况下的风险\n4. 敏感性分析：分析不同因素变化对财务结果的影响\n5. 蒙特卡洛模拟：通过随机模拟评估风险',
          codeExamples: []
        },
        {
          id: 'section5-4',
          title: '财务风险的管理策略',
          content: '财务风险的管理策略是根据风险评估结果，采取相应的措施降低风险，主要包括：\n\n1. 风险规避：避免从事高风险活动\n2. 风险降低：采取措施降低风险发生的概率和影响\n3. 风险转移：通过保险、衍生品等方式转移风险\n4. 风险保留：接受风险，准备应对风险的措施\n5. 风险组合：通过多元化投资降低整体风险',
          codeExamples: []
        },
        {
          id: 'section5-5',
          title: '财务风险的监控与预警',
          content: '财务风险的监控与预警是及时发现和应对风险的重要环节，主要包括：\n\n1. 建立风险监控体系：定期监控关键风险指标\n2. 设置风险预警指标：当指标达到预警值时发出预警\n3. 建立风险应急预案：针对可能的风险事件制定应对预案\n4. 定期风险评估：定期评估风险状况，调整风险管理策略\n5. 风险信息系统：建立风险信息收集、分析和报告系统',
          codeExamples: []
        }
      ]
    },
    'chapter6': {
      title: '第六章：财务数据分析实战',
      sections: [
        {
          id: 'section6-1',
          title: '财务数据分析的流程',
          content: '财务数据分析是一个系统性的过程，主要流程包括：\n\n1. 确定分析目标：明确分析的目的和范围\n2. 收集数据：收集相关的财务数据和非财务数据\n3. 数据预处理：清洗、转换和标准化数据\n4. 数据分析：使用适当的分析方法和工具进行分析\n5. 结果解释：解释分析结果，得出结论\n6. 报告生成：生成分析报告，提出建议\n7. 跟踪反馈：跟踪分析结果的应用效果，及时调整分析方法',
          codeExamples: []
        },
        {
          id: 'section6-2',
          title: '财务报表分析案例',
          content: '财务报表分析是财务分析的基础，通过分析企业的财务报表，可以了解企业的财务状况、经营成果和现金流量。\n\n案例分析步骤：\n1. 收集企业的财务报表数据\n2. 计算相关财务指标\n3. 分析企业的盈利能力、偿债能力、运营能力和发展能力\n4. 与同行业企业进行比较\n5. 识别企业存在的问题和机会\n6. 提出改进建议',
          codeExamples: []
        },
        {
          id: 'section6-3',
          title: '企业财务状况综合分析',
          content: '企业财务状况综合分析是对企业整体财务状况的全面评估，主要包括：\n\n1. 财务比率分析：分析企业的各项财务比率\n2. 趋势分析：分析企业财务指标的变化趋势\n3. 结构分析：分析企业财务结构的合理性\n4. 现金流量分析：分析企业的现金流量状况\n5. 综合评分：对企业的财务状况进行综合评分\n6. 风险评估：评估企业面临的财务风险',
          codeExamples: []
        },
        {
          id: 'section6-4',
          title: '行业对比分析',
          content: '行业对比分析是将企业的财务指标与同行业企业进行比较，了解企业在行业中的地位和竞争力。\n\n对比分析步骤：\n1. 选择可比企业：选择与目标企业相似的同行业企业\n2. 收集行业数据：收集同行业企业的财务数据\n3. 计算行业平均值：计算行业的平均财务指标\n4. 对比分析：将目标企业的财务指标与行业平均值进行比较\n5. 差异分析：分析目标企业与行业平均水平的差异\n6. 原因分析：分析差异产生的原因\n7. 改进建议：提出改进企业财务状况的建议',
          codeExamples: []
        },
        {
          id: 'section6-5',
          title: '财务分析报告的撰写',
          content: '财务分析报告是财务分析的最终成果，是向管理层和其他利益相关者传达分析结果的重要工具。\n\n财务分析报告的结构：\n1. 摘要：简要介绍分析目的、方法和主要结论\n2. 企业概况：介绍企业的基本情况\n3. 分析方法：说明使用的分析方法和工具\n4. 分析结果：详细展示分析结果\n5. 问题与机会：识别企业存在的问题和机会\n6. 建议：提出改进企业财务状况的建议\n7. 附录：提供详细的数据和分析过程',
          codeExamples: []
        }
      ]
    }
  };

  // 400题题库（包含单选、多选和判断题）
  const chapterQuestions: { [key: string]: ChapterQuestion[] } = {
    'chapter1': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        type: 'single' as const,
        question: `财务数据基础问题 ${i + 1}：下列哪项不属于主要的财务报表？`,
        options: [
          '资产负债表',
          '利润表',
          '现金流量表',
          '销售明细表'
        ],
        correctAnswer: 3,
        explanation: '销售明细表属于内部管理报表，不属于主要的财务报表。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 51,
        type: 'multiple' as const,
        question: `财务数据基础问题 ${i + 51}：下列哪些属于财务数据的类型？`,
        options: [
          '资产负债表数据',
          '利润表数据',
          '现金流量表数据',
          '市场调研数据'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '财务数据的类型包括资产负债表数据、利润表数据、现金流量表数据和所有者权益变动表数据，市场调研数据不属于财务数据。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 81,
        type: 'judgment' as const,
        question: `财务数据基础问题 ${i + 81}：资产负债表反映企业在一定会计期间的经营成果。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '资产负债表反映企业在某一特定日期的财务状况，利润表反映企业在一定会计期间的经营成果。'
      }))
    ],
    'chapter2': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 101,
        type: 'single' as const,
        question: `财务指标分析问题 ${i + 1}：下列哪项属于盈利能力指标？`,
        options: [
          '资产负债率',
          '毛利率',
          '流动比率',
          '存货周转率'
        ],
        correctAnswer: 1,
        explanation: '毛利率属于盈利能力指标，资产负债率和流动比率属于偿债能力指标，存货周转率属于运营能力指标。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 151,
        type: 'multiple' as const,
        question: `财务指标分析问题 ${i + 51}：下列哪些属于偿债能力指标？`,
        options: [
          '流动比率',
          '速动比率',
          '资产负债率',
          '总资产收益率'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '流动比率、速动比率和资产负债率属于偿债能力指标，总资产收益率属于盈利能力指标。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 181,
        type: 'judgment' as const,
        question: `财务指标分析问题 ${i + 81}：存货周转率越高，说明企业的运营能力越强。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '存货周转率越高，说明企业的存货周转速度越快，运营能力越强。'
      }))
    ],
    'chapter3': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 201,
        type: 'single' as const,
        question: `财务数据可视化问题 ${i + 1}：下列哪种图表最适合展示时间序列数据的变化趋势？`,
        options: [
          '饼图',
          '柱状图',
          '折线图',
          '散点图'
        ],
        correctAnswer: 2,
        explanation: '折线图最适合展示时间序列数据的变化趋势。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 251,
        type: 'multiple' as const,
        question: `财务数据可视化问题 ${i + 51}：Python中用于财务数据可视化的库包括哪些？`,
        options: [
          'Matplotlib',
          'Seaborn',
          'Plotly',
          'Pandas'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'Matplotlib、Seaborn、Plotly和Pandas都可以用于财务数据可视化。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 281,
        type: 'judgment' as const,
        question: `财务数据可视化问题 ${i + 81}：财务数据可视化的主要目的是美化数据。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '财务数据可视化的主要目的是更直观地理解数据，而不仅仅是美化数据。'
      }))
    ],
    'chapter4': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 301,
        type: 'single' as const,
        question: `财务预测与预算问题 ${i + 1}：下列哪种方法是基于历史数据的预测方法？`,
        options: [
          '时间序列分析',
          '回归分析',
          '德尔菲法',
          '情景分析法'
        ],
        correctAnswer: 0,
        explanation: '时间序列分析是基于历史数据的预测方法。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 351,
        type: 'multiple' as const,
        question: `财务预测与预算问题 ${i + 51}：预算编制的方法包括哪些？`,
        options: [
          '增量预算法',
          '零基预算法',
          '滚动预算法',
          '弹性预算法'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '预算编制的方法包括增量预算法、零基预算法、滚动预算法和弹性预算法。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 381,
        type: 'judgment' as const,
        question: `财务预测与预算问题 ${i + 81}：财务预测可以完全准确。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '财务预测是基于历史数据和趋势的估计，不可能完全准确。'
      }))
    ],
    'chapter5': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 401,
        type: 'single' as const,
        question: `财务风险分析问题 ${i + 1}：财务风险分析的首要步骤是？`,
        options: [
          '风险评估',
          '风险识别',
          '风险应对',
          '风险监控'
        ],
        correctAnswer: 1,
        explanation: '财务风险分析的首要步骤是风险识别，只有识别出风险才能进行后续的评估和应对。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 451,
        type: 'multiple' as const,
        question: `财务风险分析问题 ${i + 51}：财务风险的类型包括哪些？`,
        options: [
          '市场风险',
          '信用风险',
          '流动性风险',
          '操作风险'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '财务风险的类型包括市场风险、信用风险、流动性风险、操作风险等。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 481,
        type: 'judgment' as const,
        question: `财务风险分析问题 ${i + 81}：风险转移是指完全避免从事高风险活动。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '风险转移是通过保险、衍生品等方式转移风险，而不是完全避免从事高风险活动。'
      }))
    ],
    'chapter6': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 501,
        type: 'single' as const,
        question: `财务数据分析实战问题 ${i + 1}：财务分析报告的核心部分是？`,
        options: [
          '摘要',
          '企业概况',
          '分析结果',
          '建议'
        ],
        correctAnswer: 2,
        explanation: '分析结果是财务分析报告的核心部分，展示了分析的具体内容和发现。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 551,
        type: 'multiple' as const,
        question: `财务数据分析实战问题 ${i + 51}：财务数据分析的流程包括哪些步骤？`,
        options: [
          '确定分析目标',
          '收集数据',
          '数据预处理',
          '分析结果解释'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '财务数据分析的流程包括确定分析目标、收集数据、数据预处理、数据分析、结果解释、报告生成和跟踪反馈等步骤。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 581,
        type: 'judgment' as const,
        question: `财务数据分析实战问题 ${i + 81}：行业对比分析是将企业的财务指标与同行业企业进行比较。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '行业对比分析是将企业的财务指标与同行业企业进行比较，了解企业在行业中的地位和竞争力。'
      }))
    ]
  };

  const exercises: Question[] = [
    {
      id: 'exercise1',
      text: '下列不属于财务报表的是：',
      options: [
        '资产负债表',
        '利润表',
        '现金流量表',
        '销售明细表'
      ],
      correctAnswer: 3,
      explanation: '销售明细表属于内部管理报表，不属于主要的财务报表。',
      difficulty: 'easy'
    },
    {
      id: 'exercise2',
      text: '反映企业盈利能力的指标是：',
      options: [
        '资产负债率',
        '毛利率',
        '存货周转率',
        '流动比率'
      ],
      correctAnswer: 1,
      explanation: '毛利率反映了企业产品的盈利能力，是盈利能力指标。',
      difficulty: 'medium'
    },
    {
      id: 'exercise3',
      text: '财务数据可视化的主要目的是：',
      options: [
        '美化数据',
        '提高数据处理速度',
        '更直观地理解数据',
        '减少数据存储空间'
      ],
      correctAnswer: 2,
      explanation: '财务数据可视化的主要目的是通过图表等方式更直观地理解数据。',
      difficulty: 'easy'
    },
    {
      id: 'exercise4',
      text: '下列关于财务预测的说法，正确的是：',
      options: [
        '财务预测只需要历史数据',
        '财务预测不需要考虑外部因素',
        '财务预测可以完全准确',
        '财务预测是基于历史数据和趋势的估计'
      ],
      correctAnswer: 3,
      explanation: '财务预测是基于历史数据和趋势对未来财务状况的估计，不可能完全准确。',
      difficulty: 'medium'
    },
    {
      id: 'exercise5',
      text: '财务风险分析的首要步骤是：',
      options: [
        '风险评估',
        '风险识别',
        '风险应对',
        '风险监控'
      ],
      correctAnswer: 1,
      explanation: '财务风险分析的首要步骤是风险识别，只有识别出风险才能进行后续的评估和应对。',
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
      description: '本课程是商务数据分析与应用专业的专业课程，旨在培养学生掌握财务数据的分析方法和应用，为企业的财务决策提供支持。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：财务数据基础',
      description: '学习财务数据的基本概念和财务报表的结构，掌握财务数据的收集和整理方法。',
      topics: [
        '财务数据的概念与类型',
        '财务报表的结构与内容',
        '财务数据的收集方法',
        '财务数据的整理与预处理',
        '财务数据的质量评估'
      ],
      resources: [
        '《财务分析》教材',
        '财务报表分析指南',
        '财务数据收集案例'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：财务指标分析',
      description: '学习常用的财务指标，掌握财务指标的计算和分析方法。',
      topics: [
        '盈利能力指标',
        '偿债能力指标',
        '运营能力指标',
        '发展能力指标',
        '财务指标的综合分析'
      ],
      resources: [
        '财务指标计算手册',
        '财务指标分析案例',
        '财务指标行业标准'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：财务数据可视化',
      description: '学习财务数据的可视化方法，掌握如何通过图表直观展示财务数据。',
      topics: [
        '财务数据可视化的原则',
        '常用的财务图表类型',
        '使用Python进行财务数据可视化',
        '财务仪表盘的设计',
        '财务数据可视化最佳实践'
      ],
      resources: [
        '财务数据可视化教程',
        'Matplotlib财务图表示例',
        '财务仪表盘设计案例'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：财务预测与预算',
      description: '学习财务预测和预算编制的方法，掌握如何基于历史数据进行财务预测。',
      topics: [
        '财务预测的基本原理',
        '时间序列分析在财务预测中的应用',
        '回归分析在财务预测中的应用',
        '预算编制的方法与流程',
        '财务预测的评估与调整'
      ],
      resources: [
        '财务预测与预算教材',
        '财务预测案例分析',
        '预算编制指南'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：财务风险分析',
      description: '学习财务风险的识别和评估方法，掌握财务风险的分析和管理技术。',
      topics: [
        '财务风险的类型与特征',
        '财务风险的识别方法',
        '财务风险的评估模型',
        '财务风险的管理策略',
        '财务风险的监控与预警'
      ],
      resources: [
        '财务风险管理教材',
        '财务风险评估案例',
        '财务风险预警系统设计'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：财务数据分析实战',
      description: '通过实际案例，综合运用所学知识，完成完整的财务数据分析任务。',
      topics: [
        '财务数据分析的流程',
        '财务报表分析案例',
        '企业财务状况综合分析',
        '行业对比分析',
        '财务分析报告的撰写'
      ],
      resources: [
        '财务分析实战案例',
        '财务分析报告模板',
        '行业财务数据对比'
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
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
              <span className="text-4xl">💰</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400">
            财务数据分析
          </h1>
          <p className="text-xl text-emerald-300 mb-6">
            商务数据分析与应用专业专业课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握财务数据的分析方法和应用，为企业的财务决策提供支持，
            使学生能够运用数据分析技术解决财务领域的实际问题。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-green-700/50 text-sm text-green-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-green-700/50 text-sm text-green-300">
              先修课程：Python基础
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-green-700/50 text-sm text-green-300">
              先修课程：数据分析技术
            </div>
          </div>
        </div>
      </header>

      {/* 课程大纲 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              课程大纲
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              课程内容按照由浅入深的顺序编排，涵盖财务数据分析的核心知识
            </p>
          </div>
          
          <div className="space-y-6">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-green-500/50"
              >
                <div 
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection(section.id)}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">{section.title}</h3>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                  <span className={`text-green-400 font-medium transition-transform duration-300 ${activeSection === section.id ? 'transform rotate-180' : ''}`}>
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
                            <span className="text-green-400 mr-3 mt-1">•</span>
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
                                <span className="text-emerald-400 mr-3 mt-1">📚</span>
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
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              学习目标
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              通过本课程的学习，学生将达到以下目标
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-green-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-400 text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">知识目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">掌握财务数据的基本概念和财务报表的结构</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解常用的财务指标和分析方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉财务数据可视化的方法和工具</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">了解财务预测和风险分析的基本原理</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-green-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-400 text-xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">能力目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够收集和整理财务数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够计算和分析财务指标</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用Python进行财务数据可视化</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够完成完整的财务数据分析任务</span>
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
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
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
                      <div className="bg-green-500 h-4 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">实验练习</h3>
                  <p className="text-gray-400">包括财务指标计算、数据可视化等练习</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">30%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '30%' }}></div>
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
                      <div className="bg-green-500 h-4 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-100">期末项目</h3>
                  <p className="text-gray-400">综合财务数据分析项目</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-300">35%</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4">
                      <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '35%' }}></div>
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
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
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
                  ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              学习进度
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'resources'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              学习资源
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'exercises'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              练习测试
            </button>
          </div>
          
          {/* 标签页内容 */}
          <div className="mt-8">
            {activeTab === 'progress' && !activeChapter && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h3 className="text-2xl font-semibold text-gray-100 mb-6">财务数据分析课程学习进度</h3>
                {/* 总体进度条 */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">总体进度</span>
                    <span className="text-green-400 font-medium">
                      {progressItems.reduce((total, item) => total + (item.children?.filter(sub => sub.completed).length || 0), 0)}/{progressItems.reduce((total, item) => total + (item.children?.length || 0), 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-400 h-4 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(progressItems.reduce((total, item) => total + (item.children?.filter(sub => sub.completed).length || 0), 0) / progressItems.reduce((total, item) => total + (item.children?.length || 0), 0)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-4">
                  {progressItems.map((item) => (
                    <div key={item.id} className="border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setActiveChapter(item.id)}>
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                            item.completed
                              ? 'border-green-500 bg-green-500 text-white'
                              : 'border-gray-600'
                          }`}>
                            {item.completed ? '✓' : ''}
                          </div>
                          <h4 className={`font-medium ${item.completed ? 'text-green-400' : 'text-gray-300'}`}>
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {item.children?.filter(sub => sub.completed).length}/{item.children?.length}
                        </span>
                      </div>
                      {item.children && (
                        <div className="mt-3 ml-9 space-y-2">
                          {item.children.map(subItem => (
                            <div key={subItem.id} className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                                subItem.completed
                                  ? 'border-green-500 bg-green-500 text-white'
                                  : 'border-gray-600'
                              }`}>
                                {subItem.completed ? '✓' : ''}
                              </div>
                              <span className={`text-sm ${subItem.completed ? 'text-green-400' : 'text-gray-400'}`}>
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
            {activeTab === 'progress' && activeChapter && activeChapterMode === 'content' && (
              <div>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setActiveChapter(null)}
                    className="flex items-center text-green-400 hover:text-green-300 mb-4"
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
            {activeTab === 'progress' && activeChapter && activeChapterMode === 'exercise' && (
              <div>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setActiveChapterMode('content')}
                    className="flex items-center text-green-400 hover:text-green-300 mb-4 mr-4"
                  >
                    <span className="mr-2">←</span> 返回章节内容
                  </button>
                  <button
                    onClick={() => setActiveChapter(null)}
                    className="flex items-center text-green-400 hover:text-green-300 mb-4"
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
            {activeTab === 'resources' && (
              <LearningResource 
                title="财务数据分析学习资源" 
                resources={learningResources.map((resource, index) => ({
                  ...resource,
                  id: index + 1,
                  link: resource.url
                }))} 
              />
            )}
            {activeTab === 'exercises' && !activeChapter && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h3 className="text-2xl font-semibold text-gray-100 mb-6">章节练习测试</h3>
                <p className="text-gray-400 mb-8">选择章节进行测试，每次测试包含30道题目（单选、多选、判断）</p>
                <div className="space-y-4">
                  {progressItems.map((item) => (
                    <div key={item.id} className="border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => {
                        setActiveChapter(item.id);
                        setActiveChapterMode('exercise');
                      }}>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-green-400 text-xl">📝</span>
                          </div>
                          <h4 className="font-medium text-gray-300">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-gray-400 text-sm">
                          400题题库
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'exercises' && activeChapter && activeChapterMode === 'exercise' && (
              <div>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setActiveChapter(null)}
                    className="flex items-center text-green-400 hover:text-green-300 mb-4"
                  >
                    <span className="mr-2">←</span> 返回章节列表
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
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-300">财务数据分析课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}