import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SocialShare from '@/components/SocialShare';
import ProgressTracker from '@/components/ProgressTracker';
import SEO from '@/components/SEO';

interface StatItem {
  value: string;
  label: string;
  desc: string;
  details: string[];
}

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      className="relative"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-center group cursor-pointer bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 p-4 min-w-[120px] hover:border-blue-500/50 transition-all"
      >
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform">
          {stat.value}
        </div>
        <div className="text-white font-medium mb-0.5">{stat.label}</div>
        <div className="text-blue-300/70 text-sm flex items-center justify-center gap-1">
          <span>{stat.desc}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-600 shadow-xl z-50 overflow-hidden"
          >
            <div className="p-4">
              <h4 className="text-white font-semibold mb-3 text-center">{stat.label} - 详情</h4>
              <ul className="space-y-2">
                {stat.details.map((detail, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2 text-sm text-blue-100"
                  >
                    <span className="text-cyan-400 mt-1">▸</span>
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-700/50 px-4 py-2 flex justify-end">
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs text-blue-300 hover:text-white transition-colors"
              >
                收起
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface ResourceItem {
  title: string;
  url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  coreKnowledge: string[];
  businessScenario: string;
  tasks: string[];
  taskHints: string[];
  taskExamples?: string[];
  pitfalls: string[];
  deliverables: string[];
  codeExample: string;
  referenceAnswer: string;
  questions: Question[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  icon: string;
  color: string;
  dataset: string;
  showFullFlow: boolean;
  learningResources: {
    docs: ResourceItem[];
    videos: ResourceItem[];
    examples: ResourceItem[];
  };
  communitySupport: {
    forum: ResourceItem;
    discussion: ResourceItem[];
  };
  detailedContent?: {
    overview: string;
    concepts: Array<{
      name: string;
      description: string;
      keyPoints: string[];
      examples: string[];
    }>;
    formulas: Array<{
      name: string;
      formula: string;
      explanation: string;
      application: string;
    }>;
    caseStudies: Array<{
      title: string;
      scenario: string;
      solution: string;
      outcome: string;
    }>;
    bestPractices: string[];
    commonMistakes: Array<{
      mistake: string;
      consequence: string;
      solution: string;
    }>;
  };
}

interface Question {
  id: number;
  type: 'single' | 'multiple' | 'judgment';
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
}

interface LearningState {
  currentProject: number | null;
  currentPhase: 'learn' | 'practice' | 'test' | null;
  projectProgress: Record<number, {
    learnCompleted: boolean;
    practiceCompleted: boolean;
    testScore: number | null;
  }>;
}

const projects: Project[] = [
  {
    id: 1,
    title: '数据预处理高阶版',
    description: '铺垫所有算法前置能力，掌握数据清洗、特征工程的核心技能',
    coreKnowledge: [
      '缺失值/重复值/异常值高阶处理',
      '特征分桶、离散化',
      '类别编码（LabelEncoder/OneHotEncoder）',
      '数据标准化/归一化'
    ],
    businessScenario: '电商用户行为数据预处理，为后续聚类、回归、关联规则等算法做准备',
    tasks: [
      '读取模拟数据（user_behavior.csv）',
      '缺失值处理：消费金额/频次用中位数填充，性别/地区用"未知"填充',
      '异常值处理：用箱线图+3σ原则识别异常值',
      '特征处理：消费金额分桶、浏览时长离散化、类别编码',
      '数据标准化并保存处理后的数据'
    ],
    taskHints: [
      '第一步：导入 pandas、numpy 和 StandardScaler，然后使用 df = pd.read_csv("user_behavior.csv") 读取数据',
      '第二步：使用 df.fillna() 方法填充缺失值，数值型字段用中位数填充，类别型字段用"未知"填充',
      '第三步：使用 3σ原则（mean ± 3*std）识别并处理异常值，用中位数替换异常值',
      '第四步：使用 pd.qcut() 对消费金额进行分桶，使用 pd.cut() 对浏览时长进行离散化',
      '第五步：使用 StandardScaler 对数值型特征进行标准化，使用 df.to_csv() 保存处理后的数据'
    ],
    taskExamples: [
      'import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\n\ndf = pd.read_csv("user_behavior.csv")\nprint(df.head())',
      '# 数值型字段用中位数填充\nnum_cols = ["amount", "frequency"]\ndf[num_cols] = df[num_cols].fillna(df[num_cols].median())\n\n# 类别型字段用"未知"填充\ncat_cols = ["gender", "region"]\ndf[cat_cols] = df[cat_cols].fillna("未知")',
      '# 使用3σ原则处理异常值\nfor col in num_cols:\n    mean = df[col].mean()\n    std = df[col].std()\n    lower = mean - 3 * std\n    upper = mean + 3 * std\n    df[col] = np.where((df[col] < lower) | (df[col] > upper), df[col].median(), df[col])',
      '# 消费金额分桶（5个区间）\ndf["amount_bin"] = pd.qcut(df["amount"], 5, labels=["低", "较低", "中", "较高", "高"])\n\n# 浏览时长离散化\ndf["duration_cat"] = pd.cut(df["duration"], bins=[0, 30, 60, 120, 300], labels=["短", "中", "较长", "长"])\n\n# 类别编码\nfrom sklearn.preprocessing import LabelEncoder\nle = LabelEncoder()\ndf["gender_encoded"] = le.fit_transform(df["gender"])',
      '# 数据标准化\nscaler = StandardScaler()\ndf[num_cols] = scaler.fit_transform(df[num_cols])\n\n# 保存处理后的数据\ndf.to_csv("processed_data.csv", index=False)\nprint("数据处理完成！")'
    ],
    pitfalls: [
      '用均值填充含异常值的字段（导致数据失真）',
      '对所有类别字段都做OneHotEncoder（高基数字段导致维度爆炸）',
      '忘记标准化数据（后续聚类、回归模型会受量纲影响）'
    ],
    deliverables: [
      '预处理代码文件',
      '处理前后的数据对比表',
      '预处理总结'
    ],
    difficulty: 'beginner',
    duration: '30分钟',
    icon: '🧹',
    color: 'from-blue-500 to-cyan-400',
    dataset: 'retail_orders.csv',
    codeExample: `import pandas as pd
from sklearn.preprocessing import StandardScaler
import numpy as np

# 1. 读取数据
df = pd.read_csv("user_behavior.csv")

# 2. 缺失值处理
# TODO: 填充缺失值

# 3. 异常值处理
# TODO: 使用3σ原则处理异常值

# 4. 特征处理
# TODO: 进行特征分桶和离散化

# 5. 数据标准化
# TODO: 标准化数据

# 6. 保存数据
# TODO: 保存处理后的数据
`,
    referenceAnswer: `import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import numpy as np

# 1. 读取数据
df = pd.read_csv("user_behavior.csv")

# 2. 缺失值处理
df["消费金额"] = df["消费金额"].fillna(df["消费金额"].median())
df["消费频次"] = df["消费频次"].fillna(df["消费频次"].median())
df["性别"] = df["性别"].fillna("未知")
df["地区"] = df["地区"].fillna("未知")
df = df.dropna(subset=["注册时间"])

# 3. 异常值处理（3σ原则）
for col in ["消费金额", "浏览时长"]:
    mean = df[col].mean()
    std = df[col].std()
    lower = mean - 3 * std
    upper = mean + 3 * std
    median = df[col].median()
    df.loc[(df[col] < lower) | (df[col] > upper), col] = median

# 4. 特征处理
df["消费金额分桶"] = pd.qcut(df["消费金额"], 3, labels=["低", "中", "高"])
df["浏览时长离散化"] = pd.cut(df["浏览时长"], [0, 5, 15, 100], labels=["短", "中", "长"])

# 5. 数据标准化
scaler = StandardScaler()
df[["消费金额_标准化", "消费频次_标准化", "最近消费天数_标准化"]] = scaler.fit_transform(
    df[["消费金额", "消费频次", "最近消费天数"]]
)

# 6. 保存数据
df.to_csv("processed_data.csv", index=False)
print("✅ 数据预处理完成！")`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: '在处理含有异常值的数据时，应该用什么方法填充缺失值？',
        options: ['均值', '中位数', '众数', '随机数'],
        correctAnswer: 1,
        explanation: '中位数受异常值影响较小，更适合填充含异常值的数据。'
      },
      {
        id: 2,
        type: 'single',
        question: 'OneHotEncoder最适合处理什么类型的类别字段？',
        options: ['高基数字段', '低基数字段', '所有类别字段', '数值字段'],
        correctAnswer: 1,
        explanation: 'OneHotEncoder适合低基数字段，高基数字段会导致维度爆炸。'
      },
      {
        id: 3,
        type: 'multiple',
        question: '常见的异常值检测方法有哪些？',
        options: ['3σ原则', '箱线图', '随机森林', 'PCA'],
        correctAnswer: [0, 1],
        explanation: '3σ原则和箱线图是常用的统计异常检测方法。'
      },
      {
        id: 4,
        type: 'single',
        question: '数据标准化的目的是什么？',
        options: ['使数据分布更集中', '消除量纲影响', '增加数据波动性', '降低数据维度'],
        correctAnswer: 1,
        explanation: '数据标准化可以消除不同特征之间的量纲影响，使所有特征具有相同的尺度。'
      },
      {
        id: 5,
        type: 'judgment',
        question: '对于类别型特征，LabelEncoder和OneHotEncoder可以互换使用。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'LabelEncoder将类别映射为整数，而OneHotEncoder将类别转换为独热编码，两者用途不同，不能互换使用。'
      },
      {
        id: 6,
        type: 'single',
        question: '以下哪种方法适合对连续型变量进行离散化？',
        options: ['LabelEncoder', 'OneHotEncoder', 'pd.cut', 'StandardScaler'],
        correctAnswer: 2,
        explanation: 'pd.cut可以将连续型变量按照指定的区间进行离散化。'
      },
      {
        id: 7,
        type: 'multiple',
        question: '数据预处理的主要步骤包括哪些？',
        options: ['数据清洗', '特征工程', '模型训练', '数据标准化'],
        correctAnswer: [0, 1, 3],
        explanation: '数据预处理主要包括数据清洗、特征工程和数据标准化，模型训练不属于预处理步骤。'
      },
      {
        id: 8,
        type: 'single',
        question: '3σ原则中，异常值的定义是？',
        options: ['超出均值±1σ的数据', '超出均值±2σ的数据', '超出均值±3σ的数据', '超出均值±4σ的数据'],
        correctAnswer: 2,
        explanation: '3σ原则定义超出均值±3σ的数据为异常值。'
      },
      {
        id: 9,
        type: 'judgment',
        question: '对于缺失值较多的特征，应该直接删除该特征。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '是否删除缺失值较多的特征需要根据具体情况判断，有时保留该特征并采用合适的填充方法可能更好。'
      },
      {
        id: 10,
        type: 'single',
        question: 'StandardScaler的作用是什么？',
        options: ['将数据缩放到0-1之间', '将数据标准化为均值为0，方差为1', '将数据排序', '将数据离散化'],
        correctAnswer: 1,
        explanation: 'StandardScaler可以将数据标准化为均值为0，方差为1的分布。'
      }
    ],
    learningResources: {
      docs: [
        { title: 'pandas官方文档：数据清洗与处理', url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html' },
        { title: 'scikit-learn官方文档：特征预处理', url: 'https://scikit-learn.org/stable/modules/preprocessing.html' },
        { title: '统计学习方法：数据预处理章节', url: 'https://zh-hans.d2l.ai/chapter_preliminaries/index.html' }
      ],
      videos: [
        { title: '数据预处理实战教程：缺失值处理', url: 'https://www.bilibili.com/video/BV1uJ411W7R2' },
        { title: '特征工程详解：分桶与编码', url: 'https://www.bilibili.com/video/BV1Vh411J7W7' },
        { title: '数据标准化方法对比与应用', url: 'https://www.bilibili.com/video/BV15J411i7sL' }
      ],
      examples: [
        { title: '真实电商数据集预处理示例', url: 'https://github.com/IBM/telco-customer-churn-on-icp4d' },
        { title: '金融数据清洗实战', url: 'https://github.com/firmai/financial-machine-learning' },
        { title: '医疗数据预处理案例', url: 'https://mimic.mit.edu/' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - 数据预处理板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: '如何处理高维度稀疏特征？', url: 'https://www.zhihu.com/question/28095369' },
        { title: '缺失值填充方法的选择策略', url: 'https://zhuanlan.zhihu.com/p/91524519' },
        { title: '特征工程最佳实践分享', url: 'https://zhuanlan.zhihu.com/p/43241652' }
      ]
    },
    showFullFlow: true,
    detailedContent: {
      overview: '数据预处理是数据分析流程中最基础也是最关键的环节，约占整个项目时间的60-80%。本课程将系统讲解数据清洗、特征工程、数据转换等核心技术，帮助你建立完整的数据预处理知识体系。',
      concepts: [
        {
          name: '缺失值处理',
          description: '缺失值是真实数据中最常见的问题之一。不同类型的缺失需要采用不同的处理策略。',
          keyPoints: [
            'MCAR（完全随机缺失）：缺失与任何变量无关，可直接删除',
            'MAR（随机缺失）：缺失与其他观测变量有关，可用模型预测填充',
            'MNAR（非随机缺失）：缺失与缺失值本身有关，需要特殊处理',
            '数值型缺失：中位数填充、均值填充、回归预测填充',
            '类别型缺失：众数填充、新建"未知"类别、基于其他特征预测'
          ],
          examples: [
            '用户年龄缺失：根据用户行为特征用KNN算法预测填充',
            '订单金额缺失：用该用户历史订单中位数填充',
            '商品类别缺失：标记为"未分类"单独分析'
          ]
        },
        {
          name: '异常值检测与处理',
          description: '异常值可能代表数据录入错误，也可能是真实的极端情况，需要仔细甄别。',
          keyPoints: [
            '统计方法：3σ原则（正态分布）、箱线图法（IQR）、Z-score方法',
            '机器学习方法：孤立森林、DBSCAN聚类、One-Class SVM',
            '业务规则方法：基于业务经验设定阈值',
            '异常值处理：删除、替换、单独分析、分箱处理'
          ],
          examples: [
            '电商订单金额：超过99分位数的订单标记为异常，单独分析是否为刷单',
            '用户登录频率：一天登录超过50次的用户可能是机器人',
            '传感器数据：使用孤立森林检测设备异常状态'
          ]
        },
        {
          name: '特征分桶与离散化',
          description: '将连续型特征转换为离散型，有助于发现非线性关系，提高模型可解释性。',
          keyPoints: [
            '等频分桶（pd.qcut）：每个桶样本数相同，适用于分布不均匀的数据',
            '等宽分桶（pd.cut）：每个桶区间相同，适用于均匀分布的数据',
            '基于业务规则分桶：根据业务经验设定分界点',
            '分桶数量选择：通常3-10个桶，过多会失去意义，过少会丢失信息'
          ],
          examples: [
            '用户消费金额：低(0-100)、中(100-500)、高(500+)三档',
            '用户活跃度：根据登录频次分为活跃、一般、沉默三类',
            '年龄段划分：18-25、26-35、36-45、46+ 四个群体'
          ]
        },
        {
          name: '类别编码',
          description: '将类别型数据转换为数值型，便于机器学习模型处理。',
          keyPoints: [
            'LabelEncoder：将类别映射为整数，适用于有序类别（低、中、高）',
            'OneHotEncoder：独热编码，适用于无序类别（颜色、品牌）',
            'TargetEncoder：基于目标变量均值编码，适用于高基数类别',
            'FrequencyEncoder：基于出现频率编码，适用于高基数类别'
          ],
          examples: [
            '教育程度：小学=0，初中=1，高中=2，本科=3，硕士=4，博士=5',
            '城市编码：北京=[1,0,0,0]，上海=[0,1,0,0]，广州=[0,0,1,0]',
            '商品类目：使用目标编码，基于该类目的平均销售额编码'
          ]
        },
        {
          name: '数据标准化与归一化',
          description: '消除不同特征之间的量纲影响，使所有特征具有相同的尺度。',
          keyPoints: [
            'StandardScaler（Z-score标准化）：均值为0，标准差为1，适用于正态分布',
            'MinMaxScaler（归一化）：缩放到[0,1]区间，适用于有界数据',
            'RobustScaler：基于中位数和四分位数，对异常值鲁棒',
            'Normalizer：将样本缩放到单位范数，适用于文本数据'
          ],
          examples: [
            '用户消费金额：使用StandardScaler，消除量纲影响',
            '图像像素值：使用MinMaxScaler缩放到[0,1]',
            '含有异常值的数据：使用RobustScaler避免异常值影响'
          ]
        }
      ],
      formulas: [
        {
          name: '3σ原则（正态分布）',
          formula: 'μ ± 3σ',
          explanation: '在正态分布中，约99.7%的数据落在均值±3倍标准差范围内，超出范围的视为异常值',
          application: '适用于近似正态分布的数据，如用户消费金额、身高体重等'
        },
        {
          name: 'Z-score标准化',
          formula: 'z = (x - μ) / σ',
          explanation: '将数据转换为标准正态分布，均值为0，标准差为1',
          application: '适用于需要消除量纲影响的场景，如聚类、回归分析'
        },
        {
          name: 'Min-Max归一化',
          formula: 'x_scaled = (x - x_min) / (x_max - x_min)',
          explanation: '将数据线性缩放到[0,1]区间',
          application: '适用于有明确边界的数据，如图像像素、百分比等'
        },
        {
          name: '四分位距（IQR）',
          formula: 'IQR = Q3 - Q1',
          explanation: '第三四分位数减去第一四分位数，代表中间50%数据的范围',
          application: '箱线图法检测异常值，异常值定义为小于Q1-1.5IQR或大于Q3+1.5IQR的数据'
        }
      ],
      caseStudies: [
        {
          title: '电商用户行为数据预处理',
          scenario: '某电商平台有100万用户的行为数据，包含用户ID、性别、年龄、消费金额、消费频次、浏览时长、注册时间等字段。数据存在缺失值、异常值、格式不一致等问题。',
          solution: '1. 缺失值处理：年龄用中位数填充，性别用"未知"填充，删除注册时间缺失的记录\n2. 异常值处理：使用3σ原则处理消费金额和浏览时长的异常值\n3. 特征工程：消费金额分桶（低中高），浏览时长离散化（短中长）\n4. 编码转换：性别使用LabelEncoder，地区使用OneHotEncoder\n5. 数据标准化：对消费金额、消费频次进行StandardScaler标准化',
          outcome: '数据质量显著提升，后续聚类分析效果提升40%，用户分群更加准确'
        },
        {
          title: '金融风控数据清洗',
          scenario: '银行信贷审批数据包含客户基本信息、征信记录、贷款历史等。数据存在大量缺失、异常值、重复记录等问题。',
          solution: '1. 重复值处理：删除重复的客户记录\n2. 缺失值处理：收入用中位数填充，征信记录缺失的单独标记\n3. 异常值处理：使用箱线图法识别异常收入，人工审核后处理\n4. 特征构造：构造收入负债比、历史逾期率等衍生特征\n5. 数据转换：对偏态分布的收入数据取对数转换',
          outcome: '数据完整性从65%提升到92%，风控模型AUC提升0.08'
        }
      ],
      bestPractices: [
        '始终先进行数据探索性分析（EDA），了解数据分布和质量',
        '缺失值处理前先分析缺失机制（MCAR/MAR/MNAR），选择合适策略',
        '异常值处理前务必结合业务场景，避免误删真实数据',
        '特征工程时保留原始特征，便于后续对比分析',
        '数据转换前记录转换参数，确保测试集使用相同转换',
        '建立数据质量监控体系，持续跟踪数据质量指标',
        '文档记录所有预处理步骤，保证分析可复现'
      ],
      commonMistakes: [
        {
          mistake: '用均值填充含有异常值的数值型缺失',
          consequence: '异常值会拉高均值，导致填充值偏离真实分布',
          solution: '使用不受异常值影响的中位数填充，或先处理异常值再填充'
        },
        {
          mistake: '对所有类别特征都使用OneHotEncoder',
          consequence: '高基数字段（如用户ID、商品ID）会导致维度爆炸，内存溢出',
          solution: '高基数字段使用TargetEncoder或FrequencyEncoder，低基数字段使用OneHotEncoder'
        },
        {
          mistake: '在数据拆分前进行标准化',
          consequence: '测试集信息泄露到训练集，导致模型评估不准确',
          solution: '先拆分训练集和测试集，只用训练集计算标准化参数，再应用到测试集'
        },
        {
          mistake: '删除所有含有缺失值的记录',
          consequence: '数据量大幅减少，可能丢失重要信息，产生偏差',
          solution: '分析缺失机制，采用填充、插值、模型预测等方法保留数据'
        },
        {
          mistake: '忽视数据类型转换',
          consequence: '数值型字段被识别为字符串，无法进行数学运算',
          solution: '读取数据后检查每列数据类型，使用astype()进行必要转换'
        }
      ]
    }
  },
  {
    id: 2,
    title: '多维统计+深度相关性分析',
    description: '掌握描述统计和相关性分析，找到影响业务的关键因子',
    coreKnowledge: [
      '描述统计（均值/中位数/分位数）',
      '皮尔逊相关系数',
      '斯皮尔曼相关系数',
      '相关性热力图',
      '多因子关联研判'
    ],
    businessScenario: '电商营收影响因子分析，找到"哪些指标影响营收"，为后续运营决策提供支撑',
    tasks: [
      '读取预处理后的数据，新增"营收"字段',
      '做描述统计，分析数据分布特征',
      '计算皮尔逊和斯皮尔曼相关系数',
      '绘制相关性热力图',
      '分析强相关指标和多重共线性',
      '得出核心结论'
    ],
    taskHints: [
      '第一步：导入必要的库，读取预处理后的数据并新增"营收"字段',
      '第二步：使用 df[列名列表].describe() 进行描述统计，分析数据分布特征',
      '第三步：使用 df.corr(method="pearson") 计算皮尔逊相关系数',
      '第四步：使用 seaborn 的 heatmap() 绘制相关性热力图，添加注释和标题',
      '第五步：分析相关系数大于0.7的强相关指标，识别多重共线性'
    ],
    taskExamples: [
      'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\nimport numpy as np\n\ndf = pd.read_csv("processed_data.csv")\ndf["营收"] = df["消费金额"] * df["消费频次"]\nprint("数据读取成功！")',
      '# 描述统计\nnumeric_cols = ["营收", "消费金额", "消费频次", "浏览时长"]\ndesc_stats = df[numeric_cols].describe()\nprint("描述统计结果：")\nprint(desc_stats)',
      '# 计算相关性系数\npearson_corr = df[numeric_cols].corr(method="pearson")\nspearman_corr = df[numeric_cols].corr(method="spearman")\nprint("皮尔逊相关系数：")\nprint(pearson_corr)',
      '# 绘制热力图\nplt.figure(figsize=(10, 8))\nsns.heatmap(pearson_corr, annot=True, cmap="coolwarm", center=0, fmt=".2f", square=True, linewidths=1)\nplt.title("相关性热力图（皮尔逊）", fontsize=14)\nplt.tight_layout()\nplt.savefig("correlation_heatmap.png", dpi=300)',
      '# 分析强相关指标\nstrong_corr = pearson_corr[(pearson_corr.abs() >= 0.7) & (pearson_corr.abs() < 1)]\nprint("强相关指标（|r|≥0.7）：")\nprint(strong_corr.stack())'
    ],
    pitfalls: [
      '混淆皮尔逊和斯皮尔曼相关系数',
      '误将"相关性"当作"因果关系"',
      '热力图不调整颜色、不标注相关系数'
    ],
    deliverables: [
      '相关性分析代码文件',
      '描述统计表+相关性热力图',
      '关联分析结论'
    ],
    difficulty: 'beginner',
    duration: '30分钟',
    icon: '📊',
    color: 'from-purple-500 to-pink-400',
    dataset: 'retail_orders.csv',
    codeExample: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1. 读取数据
df = pd.read_csv("processed_data.csv")

# 2. 新增营收字段
df["营收"] = df["消费金额"] * df["消费频次"]

# 3. 描述统计
# TODO: 使用 describe() 方法进行描述统计

# 4. 相关性分析
# TODO: 计算皮尔逊和斯皮尔曼相关系数

# 5. 绘制相关性热力图
# TODO: 使用 seaborn 绘制热力图

# 6. 分析强相关指标
# TODO: 分析强相关指标和多重共线性
`,
    referenceAnswer: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1. 读取数据
df = pd.read_csv("processed_data.csv")

# 2. 新增营收字段
df["营收"] = df["消费金额"] * df["消费频次"]

# 3. 描述统计
desc_stats = df[["营收", "消费金额", "消费频次", "浏览时长"]].describe()
print("描述统计：")
print(desc_stats)

# 4. 相关性分析
numeric_cols = ["营收", "消费金额", "消费频次", "最近消费天数", "浏览时长"]
pearson_corr = df[numeric_cols].corr(method="pearson")
spearman_corr = df[numeric_cols].corr(method="spearman")

print("\\n皮尔逊相关系数：")
print(pearson_corr)

# 5. 绘制相关性热力图
plt.figure(figsize=(10, 8))
sns.heatmap(pearson_corr, annot=True, cmap="coolwarm", center=0, 
            fmt=".2f", square=True, linewidths=1)
plt.title("相关性热力图（皮尔逊）", fontsize=14)
plt.tight_layout()
plt.savefig("correlation_heatmap.png", dpi=300, bbox_inches="tight")
plt.show()

# 6. 分析强相关指标
strong_corr = pearson_corr[(pearson_corr.abs() >= 0.7) & (pearson_corr.abs() < 1)]
print("\\n强相关指标（|r|≥0.7）：")
print(strong_corr.stack())`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: '皮尔逊相关系数适用于什么类型的关系？',
        options: ['非线性关系', '线性关系', '分类关系', '时间序列关系'],
        correctAnswer: 1,
        explanation: '皮尔逊相关系数适用于衡量变量之间的线性关系强度。'
      },
      {
        id: 2,
        type: 'judgment',
        question: '两个变量高度相关意味着它们之间存在因果关系。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '相关性不代表因果关系，只能说明变量之间存在某种关联。'
      },
      {
        id: 3,
        type: 'single',
        question: '斯皮尔曼相关系数适用于什么类型的数据？',
        options: ['正态分布数据', '有序分类数据', '二分类数据', '所有类型数据'],
        correctAnswer: 1,
        explanation: '斯皮尔曼相关系数适用于有序分类数据或非线性关系的衡量。'
      },
      {
        id: 4,
        type: 'multiple',
        question: '相关性热力图的作用包括哪些？',
        options: ['直观展示变量间相关程度', '识别多重共线性', '发现数据异常', '预测未来趋势'],
        correctAnswer: [0, 1],
        explanation: '相关性热力图可以直观展示变量间相关程度，帮助识别多重共线性。'
      },
      {
        id: 5,
        type: 'single',
        question: '相关系数的取值范围是？',
        options: ['0到1', '-1到1', '0到100', '-100到100'],
        correctAnswer: 1,
        explanation: '相关系数的取值范围是-1到1，其中-1表示完全负相关，1表示完全正相关，0表示无相关。'
      },
      {
        id: 6,
        type: 'judgment',
        question: '相关系数的绝对值越大，说明两个变量之间的关系越强。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '相关系数的绝对值越大，说明两个变量之间的线性关系越强。'
      },
      {
        id: 7,
        type: 'single',
        question: '描述统计中，四分位数的作用是什么？',
        options: ['衡量数据的集中趋势', '衡量数据的离散程度', '衡量数据的分布形状', '衡量数据的异常值'],
        correctAnswer: 1,
        explanation: '四分位数可以衡量数据的离散程度，特别是通过四分位距（IQR）来识别异常值。'
      },
      {
        id: 8,
        type: 'multiple',
        question: '描述统计中常用的集中趋势指标包括哪些？',
        options: ['均值', '中位数', '众数', '标准差'],
        correctAnswer: [0, 1, 2],
        explanation: '均值、中位数和众数都是常用的集中趋势指标，标准差是离散程度指标。'
      },
      {
        id: 9,
        type: 'single',
        question: '当数据中存在异常值时，哪个指标更能代表数据的集中趋势？',
        options: ['均值', '中位数', '众数', '标准差'],
        correctAnswer: 1,
        explanation: '中位数受异常值影响较小，更能代表数据的集中趋势。'
      },
      {
        id: 10,
        type: 'judgment',
        question: '描述统计只能用于数据的初步分析，不能用于深入的统计推断。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '描述统计是数据的初步分析工具，为后续的统计推断提供基础，但本身不涉及推断。'
      }
    ],
    learningResources: {
      docs: [
        { title: 'pandas官方文档：描述统计', url: 'https://pandas.pydata.org/docs/reference/series.html#descriptive-statistics' },
        { title: 'seaborn官方文档：热力图', url: 'https://seaborn.pydata.org/generated/seaborn.heatmap.html' },
        { title: '统计学习方法：相关性分析章节', url: 'https://zh-hans.d2l.ai/chapter_linear-networks/linear-regression.html' }
      ],
      videos: [
        { title: '相关性分析实战教程', url: 'https://www.bilibili.com/video/BV1iJ411S79F' },
        { title: '热力图绘制技巧', url: 'https://www.bilibili.com/video/BV1qJ411N71A' },
        { title: '统计指标解读与应用', url: 'https://www.bilibili.com/video/BV1W5411u7w6' }
      ],
      examples: [
        { title: '电商营收影响因子分析示例', url: 'https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce' },
        { title: '金融数据相关性分析', url: 'https://www.kaggle.com/datasets/stefanoleone992/imdb-extensive-dataset' },
        { title: '医疗数据关联分析', url: 'https://www.kaggle.com/datasets/mirichoi0218/insurance' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - 统计分析板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: '如何选择合适的相关性分析方法？', url: 'https://www.zhihu.com/question/28168814' },
        { title: '热力图美化技巧', url: 'https://zhuanlan.zhihu.com/p/108172222' },
        { title: '相关性分析的常见误区', url: 'https://zhuanlan.zhihu.com/p/57093550' }
      ]
    },
    showFullFlow: false
  },
  {
    id: 3,
    title: '购物车关联规则挖掘',
    description: '用Apriori算法挖掘商品组合，为捆绑销售提供数据支撑',
    coreKnowledge: [
      'Apriori算法',
      '频繁项集',
      '关联规则（支持度、置信度、提升度）',
      '商品组合分析',
      '捆绑销售挖掘'
    ],
    businessScenario: '电商购物车分析，挖掘"哪些商品经常一起被加入购物车"，为捆绑销售、商品陈列提供策略支撑',
    tasks: [
      '读取购物车数据',
      '数据预处理，转换成one-hot编码格式',
      '用Apriori算法挖掘频繁项集',
      '生成关联规则，计算支持度、置信度、提升度',
      '筛选有价值的规则（提升度>1）',
      '给出捆绑销售建议'
    ],
    taskHints: [
      '第一步：导入必要的库，读取购物车数据',
      '第二步：使用 groupby() 和 unstack() 将数据转换成one-hot编码格式',
      '第三步：使用 apriori() 函数挖掘频繁项集，设置合适的 min_support 参数',
      '第四步：使用 association_rules() 函数生成关联规则，设置合适的 min_threshold',
      '第五步：筛选 lift>1 的规则，分析有效关联关系，给出捆绑销售建议'
    ],
    taskExamples: [
      'import pandas as pd\nfrom mlxtend.frequent_patterns import apriori, association_rules\n\ndf = pd.read_csv("cart_data.csv")\nprint("购物车数据读取成功！")',
      '# 数据预处理 - 转换成one-hot编码格式\nbasket = df.groupby(["订单ID", "商品名称"])["商品名称"].count().unstack().reset_index().fillna(0).set_index("订单ID")\nbasket = (basket > 0).astype(int)\nprint("数据转换完成！")',
      '# 用Apriori算法挖掘频繁项集\nfrequent_itemsets = apriori(basket, min_support=0.05, use_colnames=True, max_len=3)\nprint(f"找到 {len(frequent_itemsets)} 个频繁项集")',
      '# 生成关联规则\nrules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.7)\nprint(f"生成 {len(rules)} 条关联规则")',
      '# 筛选有价值的规则（提升度>1）\nrules = rules[rules["lift"] > 1].sort_values(["lift", "confidence"], ascending=[False, False])\nprint("Top10关联规则：")\nprint(rules.head(10))'
    ],
    pitfalls: [
      '支持度设置过高或过低',
      '不筛选提升度，误将"无关商品组合"当作有效规则',
      '商品名称有重复，影响关联结果'
    ],
    deliverables: [
      '关联规则挖掘代码文件',
      'Top10关联规则表',
      '捆绑销售策略建议'
    ],
    difficulty: 'intermediate',
    duration: '45分钟',
    icon: '🛒',
    color: 'from-green-500 to-emerald-400',
    dataset: 'market_basket.csv',
    codeExample: `import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

# 1. 读取购物车数据
df = pd.read_csv("cart_data.csv")

# 2. 数据预处理 - 转换成one-hot编码格式
# TODO: 将数据转换成one-hot编码格式

# 3. 用Apriori算法挖掘频繁项集
# TODO: 使用 apriori 挖掘频繁项集

# 4. 生成关联规则
# TODO: 使用 association_rules 生成关联规则

# 5. 筛选有价值的规则（提升度>1）
# TODO: 筛选 lift>1 的规则

# 6. 保存结果
# TODO: 保存结果并给出业务建议
`,
    referenceAnswer: `import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

# 1. 读取购物车数据
df = pd.read_csv("cart_data.csv")

# 2. 数据预处理 - 转换成one-hot编码格式
basket = df.groupby(["订单ID", "商品名称"])["商品名称"].count().unstack().reset_index().fillna(0).set_index("订单ID")
basket = (basket > 0).astype(int)

# 3. 用Apriori算法挖掘频繁项集
frequent_itemsets = apriori(
    basket,
    min_support=0.05,
    use_colnames=True,
    max_len=3
)

print(f"找到 {len(frequent_itemsets)} 个频繁项集")
print(frequent_itemsets.sort_values("support", ascending=False).head(10))

# 4. 生成关联规则
rules = association_rules(
    frequent_itemsets,
    metric="confidence",
    min_threshold=0.7
)

# 5. 筛选有价值的规则（提升度>1）
rules = rules[rules["lift"] > 1]
rules = rules.sort_values(["lift", "confidence"], ascending=[False, False])

print(f"\\n找到 {len(rules)} 条有效规则")
print("\\nTop10关联规则：")
print(rules[["antecedents", "consequents", "support", "confidence", "lift"]].head(10))

# 6. 保存结果
rules.to_csv("association_rules.csv", index=False)

print("\\n💡 业务建议示例：")
for _, row in rules.head(3).iterrows():
    print(f"组合：{list(row['antecedents'])} → {list(row['consequents'])}")
    print(f"  建议：将这些商品捆绑销售，设置专属优惠！")`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: '提升度（lift）大于1表示什么？',
        options: ['商品组合无关', '商品组合有协同效应', '商品组合负相关', '数据有问题'],
        correctAnswer: 1,
        explanation: '提升度>1表示商品组合有协同效应，一起购买的概率高于随机概率。'
      },
      {
        id: 2,
        type: 'single',
        question: 'Apriori算法的核心思想是什么？',
        options: ['如果一个项集是频繁的，则它的所有子集也是频繁的', '如果一个项集是非频繁的，则它的所有超集也是非频繁的', '两者都是', '两者都不是'],
        correctAnswer: 1,
        explanation: 'Apriori算法利用了反单调性：如果一个项集是非频繁的，则它的所有超集也是非频繁的。'
      },
      {
        id: 3,
        type: 'single',
        question: '支持度（support）的计算公式是什么？',
        options: ['包含项集A的交易数 / 总交易数', '包含项集A和B的交易数 / 包含项集A的交易数', '提升度 = 置信度 / 支持度', '以上都不是'],
        correctAnswer: 0,
        explanation: '支持度是包含项集A的交易数除以总交易数。'
      },
      {
        id: 4,
        type: 'single',
        question: '置信度（confidence）的计算公式是什么？',
        options: ['包含项集A的交易数 / 总交易数', '包含项集A和B的交易数 / 包含项集A的交易数', '提升度 = 置信度 / 支持度', '以上都不是'],
        correctAnswer: 1,
        explanation: '置信度是包含项集A和B的交易数除以包含项集A的交易数。'
      },
      {
        id: 5,
        type: 'multiple',
        question: '关联规则挖掘的应用场景包括哪些？',
        options: ['购物篮分析', '推荐系统', '库存管理', '客户细分'],
        correctAnswer: [0, 1, 2],
        explanation: '关联规则挖掘可用于购物篮分析、推荐系统和库存管理等场景。'
      },
      {
        id: 6,
        type: 'judgment',
        question: '支持度设置过高会导致挖掘出的规则数量减少。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '支持度设置过高会筛选掉很多可能有价值的规则，导致规则数量减少。'
      },
      {
        id: 7,
        type: 'single',
        question: 'Apriori算法的时间复杂度主要取决于什么？',
        options: ['数据量大小', '最大项集长度', '最小支持度', '以上都是'],
        correctAnswer: 3,
        explanation: 'Apriori算法的时间复杂度受数据量大小、最大项集长度和最小支持度等因素影响。'
      },
      {
        id: 8,
        type: 'multiple',
        question: '评估关联规则质量的指标包括哪些？',
        options: ['支持度', '置信度', '提升度', '准确率'],
        correctAnswer: [0, 1, 2],
        explanation: '支持度、置信度和提升度是评估关联规则质量的常用指标。'
      },
      {
        id: 9,
        type: 'single',
        question: '在购物篮分析中，以下哪个规则更有价值？',
        options: ['啤酒 → 尿布（lift=1.2）', '面包 → 牛奶（lift=1.5）', '可乐 → 薯片（lift=0.9）', '以上都一样'],
        correctAnswer: 1,
        explanation: '提升度越高，规则的价值越大，面包→牛奶的提升度最高。'
      },
      {
        id: 10,
        type: 'judgment',
        question: '关联规则挖掘只能用于购物篮分析，不能用于其他领域。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '关联规则挖掘可以应用于多个领域，如医疗、金融、推荐系统等。'
      }
    ],
    learningResources: {
      docs: [
        { title: 'mlxtend官方文档：Apriori算法', url: 'https://rasbt.github.io/mlxtend/user_guide/frequent_patterns/apriori/' },
        { title: '数据挖掘导论：关联规则章节', url: 'https://www.cs.uregina.ca/Links/class-info/411/AssociationRules/' },
        { title: '电商推荐系统：关联规则应用', url: 'https://towardsdatascience.com/market-basket-analysis-association-rules-fa4b98958853' }
      ],
      videos: [
        { title: '关联规则挖掘实战教程', url: 'https://www.bilibili.com/video/BV1Zt411p7F7' },
        { title: 'Apriori算法原理详解', url: 'https://www.bilibili.com/video/BV1QW411P7wL' },
        { title: '购物篮分析案例分析', url: 'https://www.bilibili.com/video/BV1xW411T78Q' }
      ],
      examples: [
        { title: '电商购物车关联规则示例', url: 'https://www.kaggle.com/code/datatheque/association-rules-mining-market-basket-analysis' },
        { title: '超市商品组合分析', url: 'https://www.kaggle.com/code/heeraldedhia/market-basket-analysis' },
        { title: '线上零售关联推荐', url: 'https://www.kaggle.com/code/sagarnildass/market-basket-analysis-apriori-algorithm' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - 关联规则板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: '如何优化Apriori算法性能？', url: 'https://www.zhihu.com/question/29979833' },
        { title: '提升度和置信度的权衡', url: 'https://zhuanlan.zhihu.com/p/34239885' },
        { title: '关联规则在推荐系统中的应用', url: 'https://zhuanlan.zhihu.com/p/26226954' }
      ]
    },
    showFullFlow: false
  },
  {
    id: 4,
    title: 'KMeans聚类分析实战',
    description: '用户+商品双场景聚类，实现精准运营',
    coreKnowledge: [
      'KMeans聚类算法',
      '数据标准化',
      '肘部法则（确定k值）',
      '聚类可视化',
      '聚类结果解读',
      '业务落地'
    ],
    businessScenario: '电商用户分群+商品分群，实现"精准运营+商品优化"，对高价值用户推送专属福利，对爆款商品加大库存',
    tasks: [
      '用户聚类：选择特征、标准化数据、用肘部法则确定k值、KMeans聚类',
      '商品聚类：同样流程',
      '用PCA降维，可视化聚类结果',
      '分析每个分群的特征',
      '给出业务落地建议'
    ],
    taskHints: [
      '第一步：导入必要的库，读取数据并选择需要的特征',
      '第二步：使用 StandardScaler() 对数据进行标准化处理',
      '第三步：使用肘部法则确定最佳k值，查看inertia的变化趋势',
      '第四步：使用 KMeans() 进行聚类，设置合适的 n_clusters 参数',
      '第五步：使用 PCA() 进行降维，可视化聚类结果，分析每个分群的特征'
    ],
    taskExamples: [
      'import pandas as pd\nimport numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nimport matplotlib.pyplot as plt\n\ndf_user = pd.read_csv("processed_data.csv")\nuser_features = ["消费金额", "消费频次", "最近消费天数", "浏览时长"]\nX_user = df_user[user_features].dropna()\nprint("数据读取成功！")',
      '# 数据标准化\nscaler = StandardScaler()\nX_user_scaled = scaler.fit_transform(X_user)\nprint("数据标准化完成！")',
      '# 肘部法则确定k值\ninertias = []\nk_range = range(2, 10)\nfor k in k_range:\n    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)\n    kmeans.fit(X_user_scaled)\n    inertias.append(kmeans.inertia_)\nplt.plot(k_range, inertias, "bo-")\nplt.xlabel("Number of clusters (k)")\nplt.ylabel("Inertia")\nplt.title("Elbow Method")\nplt.savefig("elbow_method.png", dpi=300)',
      '# KMeans聚类（选择k=4）\nkmeans = KMeans(n_clusters=4, random_state=42, n_init=10)\nX_user["cluster"] = kmeans.fit_predict(X_user_scaled)\nprint("聚类完成！")',
      '# PCA降维可视化\npca = PCA(n_components=2)\nX_pca = pca.fit_transform(X_user_scaled)\nplt.figure(figsize=(10, 8))\nfor cluster in range(4):\n    mask = X_user["cluster"] == cluster\n    plt.scatter(X_pca[mask, 0], X_pca[mask, 1], label=f"Cluster {cluster}", alpha=0.6)\nplt.legend()\nplt.title("KMeans Clustering Result (PCA)")\nplt.savefig("clustering_result.png", dpi=300)'
    ],
    pitfalls: [
      '聚类前不标准化数据',
      '盲目设置k值，不做肘部法则',
      '只做聚类，不解读分群特征、不落地业务建议'
    ],
    deliverables: [
      '聚类分析代码文件',
      '肘部法则图、聚类可视化图',
      '分群特征解读+业务建议'
    ],
    difficulty: 'intermediate',
    duration: '45分钟',
    icon: '🔍',
    color: 'from-orange-500 to-amber-400',
    dataset: 'customer_features.csv',
    codeExample: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 1. 用户聚类
df_user = pd.read_csv("processed_data.csv")
user_features = ["消费金额", "消费频次", "最近消费天数", "浏览时长"]
X_user = df_user[user_features].dropna()

# 2. 数据标准化
# TODO: 使用 StandardScaler 进行数据标准化

# 3. 肘部法则确定k值
# TODO: 使用肘部法则确定最佳k值

# 4. KMeans聚类（选择k=4）
# TODO: 使用 KMeans 进行聚类

# 5. PCA降维可视化
# TODO: 使用 PCA 进行降维并可视化聚类结果

# 6. 分析分群特征
# TODO: 分析每个分群的特征

# 7. 业务建议
# TODO: 给出业务建议
`,
    referenceAnswer: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 1. 用户聚类
df_user = pd.read_csv("processed_data.csv")
user_features = ["消费金额", "消费频次", "最近消费天数", "浏览时长"]
X_user = df_user[user_features].dropna()

# 2. 数据标准化
scaler = StandardScaler()
X_user_scaled = scaler.fit_transform(X_user)

# 3. 肘部法则确定k值
inertias = []
k_range = range(2, 10)
for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_user_scaled)
    inertias.append(kmeans.inertia_)

plt.figure(figsize=(10, 5))
plt.plot(k_range, inertias, "bo-")
plt.xlabel("Number of clusters (k)")
plt.ylabel("Inertia")
plt.title("肘部法则图")
plt.grid(True, alpha=0.3)
plt.savefig("elbow_method.png", dpi=300, bbox_inches="tight")
plt.show()

# 4. KMeans聚类（选择k=4）
k_best = 4
kmeans_user = KMeans(n_clusters=k_best, random_state=42, n_init=10)
df_user["用户分群"] = kmeans_user.fit_predict(X_user_scaled)

# 5. PCA降维可视化
pca = PCA(n_components=2)
X_user_pca = pca.fit_transform(X_user_scaled)

plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_user_pca[:, 0], X_user_pca[:, 1], 
                     c=df_user["用户分群"], cmap="viridis", alpha=0.6, s=50)
plt.colorbar(scatter, label="用户分群")
plt.xlabel("PCA维度1")
plt.ylabel("PCA维度2")
plt.title("用户聚类结果可视化")
plt.legend(*scatter.legend_elements(), title="分群")
plt.savefig("user_clusters.png", dpi=300, bbox_inches="tight")
plt.show()

# 6. 分析分群特征
cluster_analysis = df_user.groupby("用户分群")[user_features].mean()
print("用户分群特征分析：")
print(cluster_analysis)

# 7. 业务建议
print("\\n🎯 业务建议：")
print("分群0：高消费、高频次用户 → 推送专属福利、VIP服务")
print("分群1：新用户 → 引导首次购买、新人礼包")
print("分群2：流失用户 → 推送唤醒优惠券")`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: 'KMeans聚类前为什么要标准化数据？',
        options: ['不需要', '让不同量纲的特征有相同的权重', '提高计算速度', '增加聚类数量'],
        correctAnswer: 1,
        explanation: '不同量纲的特征会导致聚类偏差，标准化后所有特征有相同的权重。'
      },
      {
        id: 2,
        type: 'single',
        question: '肘部法则图中，肘部表示什么？',
        options: ['k值越大越好', 'k值越小越好', 'k值增加时，inertia下降变慢的点', 'k值等于样本数'],
        correctAnswer: 2,
        explanation: '肘部法则中，肘部表示k值增加时，inertia下降显著变缓的点。'
      },
      {
        id: 3,
        type: 'single',
        question: 'KMeans算法的时间复杂度是多少？',
        options: ['O(n)', 'O(nk)', 'O(nk^2)', 'O(n^2)'],
        correctAnswer: 1,
        explanation: 'KMeans算法的时间复杂度是O(nk)，其中n是样本数，k是聚类数。'
      },
      {
        id: 4,
        type: 'multiple',
        question: 'KMeans算法的缺点包括哪些？',
        options: ['对初始聚类中心敏感', '只能处理球形聚类', '需要预先指定k值', '计算速度慢'],
        correctAnswer: [0, 1, 2],
        explanation: 'KMeans算法对初始聚类中心敏感，只能处理球形聚类，需要预先指定k值。'
      },
      {
        id: 5,
        type: 'single',
        question: 'PCA降维的主要目的是什么？',
        options: ['减少计算时间', '可视化高维数据', '提高模型精度', '以上都是'],
        correctAnswer: 3,
        explanation: 'PCA降维可以减少计算时间，可视化高维数据，提高模型精度。'
      },
      {
        id: 6,
        type: 'judgment',
        question: 'KMeans算法可以处理任意形状的聚类。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'KMeans算法主要适用于球形聚类，对于非球形聚类效果不佳。'
      },
      {
        id: 7,
        type: 'single',
        question: '聚类分析属于哪种类型的学习？',
        options: ['监督学习', '无监督学习', '半监督学习', '强化学习'],
        correctAnswer: 1,
        explanation: '聚类分析是无监督学习的一种，不需要标签数据。'
      },
      {
        id: 8,
        type: 'multiple',
        question: '常用的聚类算法包括哪些？',
        options: ['KMeans', '层次聚类', 'DBSCAN', '随机森林'],
        correctAnswer: [0, 1, 2],
        explanation: 'KMeans、层次聚类和DBSCAN都是常用的聚类算法，随机森林是分类/回归算法。'
      },
      {
        id: 9,
        type: 'single',
        question: '在KMeans算法中，inertia表示什么？',
        options: ['聚类中心的数量', '样本到最近聚类中心的距离总和', '聚类的质量', '以上都不是'],
        correctAnswer: 1,
        explanation: 'inertia是样本到最近聚类中心的距离总和，用于评估聚类效果。'
      },
      {
        id: 10,
        type: 'judgment',
        question: '聚类结果的好坏取决于聚类算法的选择，与特征选择无关。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '特征选择对聚类结果有很大影响，选择合适的特征是聚类成功的关键。'
      }
    ],
    learningResources: {
      docs: [
        { title: 'scikit-learn官方文档：KMeans算法', url: 'https://scikit-learn.org/stable/modules/clustering.html#k-means' },
        { title: '机器学习实战：聚类分析章节', url: 'https://www.python-course.eu/k_means_clustering.php' },
        { title: '数据可视化：PCA降维应用', url: 'https://scikit-learn.org/stable/modules/decomposition.html#pca' }
      ],
      videos: [
        { title: 'KMeans聚类算法详解', url: 'https://www.bilibili.com/video/BV1Sx411T7QQ' },
        { title: '肘部法则确定k值实战', url: 'https://www.bilibili.com/video/BV15T4y1G76B' },
        { title: '聚类结果可视化技巧', url: 'https://www.bilibili.com/video/BV1iJ411W7w9' }
      ],
      examples: [
        { title: '用户分群案例分析', url: 'https://www.kaggle.com/code/vipulgandhi/customer-segmentation-tutorial' },
        { title: '商品聚类实战', url: 'https://www.kaggle.com/code/ibrahimsoboh/customer-segmentation-using-k-means-clustering' },
        { title: '客户细分应用', url: 'https://www.kaggle.com/code/carlolepelaars/customer-segmentation-using-k-means' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - 聚类分析板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: '如何选择合适的聚类算法？', url: 'https://www.zhihu.com/question/29530213' },
        { title: 'k值确定的最佳实践', url: 'https://zhuanlan.zhihu.com/p/105028515' },
        { title: '聚类结果的业务解读', url: 'https://zhuanlan.zhihu.com/p/78491521' }
      ]
    },
    showFullFlow: false
  },
  {
    id: 5,
    title: 'RFM模型用户分层',
    description: '企业通用运营模型，区分高价值、潜力、流失用户',
    coreKnowledge: [
      'RFM模型（Recency/Frequency/Monetary）',
      '分位数分箱',
      '用户分层逻辑',
      '业务策略落地'
    ],
    businessScenario: '电商用户生命周期管理，区分高价值、潜力、流失用户，制定差异化运营策略，提升用户留存和营收',
    tasks: [
      '读取数据，提取RFM三个核心指标',
      '指标分箱：用分位数将R、F、M各分为5个等级',
      '计算RFM总分，并进行用户分层',
      '统计各分层用户的数量、占比、总消费金额占比',
      '制定具体的运营策略'
    ],
    taskHints: [
      '第一步：导入必要的库，读取RFM数据',
      '第二步：使用 pd.qcut() 对R、F、M三个指标进行分位数分箱',
      '第三步：注意R指标需要反向打分：最近消费天数越少分数越高',
      '第四步：计算RFM总分，定义分层函数并应用到数据中',
      '第五步：使用 groupby() 统计各层级的数据，绘制饼图进行可视化'
    ],
    taskExamples: [
      'import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv("user_rfm.csv")\nprint("RFM数据读取成功！")',
      '# 指标分箱 - R反向打分，F/M正向打分\ndf["R分"] = pd.qcut(df["最近消费天数"], 5, labels=[5, 4, 3, 2, 1])\ndf["F分"] = pd.qcut(df["消费频次"], 5, labels=[1, 2, 3, 4, 5])\ndf["M分"] = pd.qcut(df["消费金额"], 5, labels=[1, 2, 3, 4, 5])\ndf[["R分", "F分", "M分"]] = df[["R分", "F分", "M分"]].astype(int)',
      '# 计算RFM总分\ndf["RFM总分"] = df["R分"] + df["F分"] + df["M分"]',
      '# 用户分层\ndef rfm_level(score):\n    if score >= 13:\n        return "高价值用户"\n    elif score >= 10:\n        return "潜力用户"\n    elif score >= 7:\n        return "一般用户"\n    else:\n        return "流失用户"\n\ndf["用户层级"] = df["RFM总分"].apply(rfm_level)',
      '# 统计分析\nrfm_stats = df.groupby("用户层级").agg({"用户ID": "count", "消费金额": ["sum", "mean"]})\nrfm_stats.columns = ["用户数量", "总消费金额", "平均消费金额"]\nprint("RFM分层统计：")\nprint(rfm_stats)'
    ],
    pitfalls: [
      'R指标打分错误（没有反向）',
      '分层标准过于随意',
      '运营策略同质化'
    ],
    deliverables: [
      'RFM分层代码文件',
      '各分层用户统计表格',
      '分层运营策略方案'
    ],
    difficulty: 'intermediate',
    duration: '45分钟',
    icon: '👥',
    color: 'from-red-500 to-rose-400',
    dataset: 'customer_features.csv',
    codeExample: `import pandas as pd
import numpy as np

# 1. 读取RFM数据
df = pd.read_csv("user_rfm.csv")

# 2. 指标分箱
# TODO: 使用 pd.qcut() 进行分位数分箱，注意R需要反向打分

# 3. 计算RFM总分
# TODO: 计算RFM总分

# 4. 用户分层
# TODO: 定义分层函数并应用

# 5. 统计分析
# TODO: 使用 groupby() 进行统计分析

# 6. 可视化
# TODO: 绘制可视化图表

# 7. 业务策略
# TODO: 输出业务策略建议
`,
    referenceAnswer: `import pandas as pd
import numpy as np

# 1. 读取RFM数据
df = pd.read_csv("user_rfm.csv")

# 2. 指标分箱
df["R分"] = pd.qcut(df["最近消费天数"], 5, labels=[5, 4, 3, 2, 1])  # R反向打分：越小越好
df["F分"] = pd.qcut(df["消费频次"], 5, labels=[1, 2, 3, 4, 5])   # F正向打分：越大越好
df["M分"] = pd.qcut(df["消费金额"], 5, labels=[1, 2, 3, 4, 5])   # M正向打分：越大越好

df[["R分", "F分", "M分"]] = df[["R分", "F分", "M分"]].astype(int)

# 3. 计算RFM总分
df["RFM总分"] = df["R分"] + df["F分"] + df["M分"]

# 4. 用户分层
def rfm_level(score):
    if score >= 13:
        return "高价值用户"
    elif score >= 10:
        return "潜力用户"
    elif score >= 7:
        return "一般用户"
    else:
        return "流失用户"

df["用户层级"] = df["RFM总分"].apply(rfm_level)

# 5. 统计分析
rfm_stats = df.groupby("用户层级").agg({
    "用户ID": "count",
    "消费金额": ["sum", "mean"],
    "消费频次": "mean",
    "最近消费天数": "mean"
}).round(2)

rfm_stats.columns = ["用户数量", "总消费金额", "平均消费金额", "平均消费频次", "平均最近消费天数"]
rfm_stats["用户占比"] = (rfm_stats["用户数量"] / rfm_stats["用户数量"].sum() * 100).round(1)
rfm_stats["金额占比"] = (rfm_stats["总消费金额"] / rfm_stats["总消费金额"].sum() * 100).round(1)

print("RFM分层统计：")
print(rfm_stats)

# 6. 可视化
import matplotlib.pyplot as plt
import seaborn as sns

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
rfm_stats["用户占比"].plot(kind="pie", ax=axes[0], autopct="%1.1f%%", title="用户分布")
rfm_stats["金额占比"].plot(kind="pie", ax=axes[1], autopct="%1.1f%%", title="消费金额分布")
plt.tight_layout()
plt.savefig("rfm_analysis.png", dpi=300, bbox_inches="tight")
plt.show()

# 7. 业务策略
print("\\n📋 分层运营策略：")
print("""
高价值用户：
  - 专属客服
  - 积分翻倍
  - 新品优先体验
  - 生日礼包

潜力用户：
  - 引导提升消费频次
  - 满减优惠券
  - 推荐高毛利商品

一般用户：
  - 常规促销活动
  - 节日优惠券

流失用户：
  - 大额唤醒优惠券
  - 个性化召回
  - 询问流失原因
""")`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: 'RFM模型中，R指标表示什么？',
        options: ['消费金额', '消费频次', '最近消费天数', '用户注册时间'],
        correctAnswer: 2,
        explanation: 'R=Recency（最近消费天数）、F=Frequency（消费频次）、M=Monetary（消费金额）。'
      },
      {
        id: 2,
        type: 'judgment',
        question: 'RFM模型中，R指标应该反向打分：最近消费天数越少，分数越高。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '最近消费天数越少表示用户越活跃，所以应该反向打分。'
      },
      {
        id: 3,
        type: 'single',
        question: 'RFM模型中，F指标表示什么？',
        options: ['消费金额', '消费频次', '最近消费天数', '用户注册时间'],
        correctAnswer: 1,
        explanation: 'F=Frequency（消费频次），表示用户在一定时间内的购买次数。'
      },
      {
        id: 4,
        type: 'single',
        question: 'RFM模型中，M指标表示什么？',
        options: ['消费金额', '消费频次', '最近消费天数', '用户注册时间'],
        correctAnswer: 0,
        explanation: 'M=Monetary（消费金额），表示用户在一定时间内的总消费金额。'
      },
      {
        id: 5,
        type: 'multiple',
        question: 'RFM模型的应用场景包括哪些？',
        options: ['用户分层', '精准营销', '客户流失预测', '产品推荐'],
        correctAnswer: [0, 1, 2],
        explanation: 'RFM模型可用于用户分层、精准营销和客户流失预测等场景。'
      },
      {
        id: 6,
        type: 'judgment',
        question: 'RFM模型只适用于电商行业，不适用于其他行业。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'RFM模型可以适用于多个行业，只要有交易数据即可。'
      },
      {
        id: 7,
        type: 'single',
        question: '在RFM模型中，如何计算R分？',
        options: ['直接使用最近消费天数', '最近消费天数反向打分', '最近消费天数取对数', '以上都不是'],
        correctAnswer: 1,
        explanation: 'R分通常采用最近消费天数的反向打分，天数越少分数越高。'
      },
      {
        id: 8,
        type: 'multiple',
        question: 'RFM模型的优势包括哪些？',
        options: ['简单易用', '数据要求低', '结果直观', '可解释性强'],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'RFM模型具有简单易用、数据要求低、结果直观、可解释性强等优势。'
      },
      {
        id: 9,
        type: 'single',
        question: 'RFM模型中，通常将每个指标分为几个等级？',
        options: ['3个', '4个', '5个', '6个'],
        correctAnswer: 2,
        explanation: 'RFM模型通常将每个指标分为5个等级，便于进行用户分层。'
      },
      {
        id: 10,
        type: 'judgment',
        question: 'RFM模型可以单独使用，也可以与其他模型结合使用。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: 'RFM模型可以单独使用，也可以与其他模型结合使用，提高分析效果。'
      }
    ],
    learningResources: {
      docs: [
        { title: 'RFM模型官方文档', url: 'https://www.putler.com/blog/rfm-analysis/' },
        { title: '客户生命周期管理：RFM应用', url: 'https://neilpatel.com/blog/rfm-analysis/' },
        { title: '用户分层最佳实践', url: 'https://www.shopify.com/blog/rfm-analysis' }
      ],
      videos: [
        { title: 'RFM模型详解与应用', url: 'https://www.bilibili.com/video/BV1Xk4y1M7yL' },
        { title: '用户分层实战教程', url: 'https://www.bilibili.com/video/BV1QK4y1Z7rJ' },
        { title: '客户价值评估方法', url: 'https://www.bilibili.com/video/BV1q5411776m' }
      ],
      examples: [
        { title: '电商用户RFM分析案例', url: 'https://www.kaggle.com/code/duygut/rfm-analysis-eda' },
        { title: '金融客户分层应用', url: 'https://www.kaggle.com/code/vetrirah/customer-segmentation-with-rfm' },
        { title: '零售行业RFM实践', url: 'https://www.kaggle.com/code/ashydv/customer-segmentation-using-rfm-analysis' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - RFM模型板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: 'RFM模型的最佳分箱方法', url: 'https://www.zhihu.com/question/37133426' },
        { title: '如何结合其他模型优化RFM', url: 'https://zhuanlan.zhihu.com/p/136307710' },
        { title: 'RFM在不同行业的应用差异', url: 'https://zhuanlan.zhihu.com/p/62126491' }
      ]
    },
    showFullFlow: false
  },
  {
    id: 6,
    title: '一元+多元线性回归',
    description: '销量影响因子量化，理解各因素对销量的贡献',
    coreKnowledge: [
      '一元线性回归',
      '多元线性回归',
      '模型训练与评估（R²、MAE、MSE）',
      '回归系数解读',
      '多重共线性处理'
    ],
    businessScenario: '电商销量预测与影响因子分析，量化"广告费、活动次数、客单价"等指标对销量的影响，为广告投放、活动策划提供数据支撑',
    tasks: [
      '读取销量数据',
      '一元线性回归：以"广告费"为特征预测销量',
      '多元线性回归：用多个特征预测销量',
      '检测多重共线性（用VIF值）',
      '模型优化：删除共线性强的特征',
      '模型评估与系数解读',
      '预测应用'
    ],
    taskHints: [
      '第一步：导入必要的库，读取销量数据并准备特征和目标变量',
      '第二步：使用 LinearRegression() 进行一元线性回归建模并评估',
      '第三步：使用 LinearRegression() 进行多元线性回归建模并评估',
      '第四步：使用 variance_inflation_factor 计算VIF值检测多重共线性',
      '第五步：删除VIF>10的特征来优化模型，使用 .coef_ 和 .intercept_ 解读回归系数'
    ],
    taskExamples: [
      'import pandas as pd\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error\nfrom statsmodels.stats.outliers_influence import variance_inflation_factor\n\ndf = pd.read_csv("sales_data.csv")\nprint("销量数据读取成功！")',
      '# 一元线性回归\nX_simple = df[["广告费"]]\ny = df["销量"]\nmodel_simple = LinearRegression()\nmodel_simple.fit(X_simple, y)\ny_pred_simple = model_simple.predict(X_simple)\nprint(f"一元回归R² = {r2_score(y, y_pred_simple):.3f}")',
      '# 多元线性回归\nX_multi = df[["广告费", "活动次数", "客单价", "竞品价格"]]\ny = df["销量"]\nmodel_multi = LinearRegression()\nmodel_multi.fit(X_multi, y)\ny_pred_multi = model_multi.predict(X_multi)\nprint(f"多元回归R² = {r2_score(y, y_pred_multi):.3f}")',
      '# 检测多重共线性（VIF）\nvif_data = pd.DataFrame()\nvif_data["特征"] = X_multi.columns\nvif_data["VIF"] = [variance_inflation_factor(X_multi.values, i) for i in range(X_multi.shape[1])]\nprint("VIF值：")\nprint(vif_data)',
      '# 模型优化与预测\nX_optimized = X_multi.drop(["竞品价格"], axis=1)\nmodel_optimized = LinearRegression()\nmodel_optimized.fit(X_optimized, y)\nsample_input = pd.DataFrame({"广告费": [1000], "活动次数": [3], "客单价": [80]})\npredicted = model_optimized.predict(sample_input)\nprint(f"预测销量：{predicted[0]:.1f}")'
    ],
    pitfalls: [
      '忽略多重共线性',
      '盲目追求高R²，忽略模型的业务意义',
      '未评估模型误差'
    ],
    deliverables: [
      '回归分析代码文件',
      '模型评估指标表、回归系数表',
      '影响因子解读+预测示例'
    ],
    difficulty: 'intermediate',
    duration: '45分钟',
    icon: '📈',
    color: 'from-indigo-500 to-violet-400',
    dataset: 'retail_orders.csv',
    codeExample: `import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from statsmodels.stats.outliers_influence import variance_inflation_factor
import matplotlib.pyplot as plt

# 1. 读取数据
df = pd.read_csv("sales_data.csv")

# 2. 一元线性回归
# TODO: 建立一元线性回归模型并评估

# 3. 多元线性回归
# TODO: 建立多元线性回归模型并评估

# 4. 检测多重共线性（VIF）
# TODO: 计算VIF值

# 5. 模型优化
# TODO: 删除高VIF特征并重新建模

# 6. 预测应用
# TODO: 使用模型进行预测
`,
    referenceAnswer: `import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from statsmodels.stats.outliers_influence import variance_inflation_factor
import matplotlib.pyplot as plt

# 1. 读取数据
df = pd.read_csv("sales_data.csv")

# 2. 一元线性回归
X_simple = df[["广告费"]]
y = df["销量"]

model_simple = LinearRegression()
model_simple.fit(X_simple, y)
y_pred_simple = model_simple.predict(X_simple)

print("一元线性回归结果：")
print(f"回归方程：销量 = {model_simple.coef_[0]:.3f} × 广告费 + {model_simple.intercept_:.3f}")
print(f"R² = {r2_score(y, y_pred_simple):.3f}")

# 3. 多元线性回归
X_multi = df[["广告费", "活动次数", "客单价", "竞品价格"]]
y = df["销量"]

model_multi = LinearRegression()
model_multi.fit(X_multi, y)
y_pred_multi = model_multi.predict(X_multi)

print("\\n多元线性回归结果：")
print("回归系数：")
for feature, coef in zip(X_multi.columns, model_multi.coef_):
    print(f"  {feature}: {coef:.3f}")
print(f"截距: {model_multi.intercept_:.3f}")
print(f"R² = {r2_score(y, y_pred_multi):.3f}")
print(f"MAE = {mean_absolute_error(y, y_pred_multi):.3f}")
print(f"MSE = {mean_squared_error(y, y_pred_multi):.3f}")

# 4. 检测多重共线性（VIF）
vif_data = pd.DataFrame()
vif_data["特征"] = X_multi.columns
vif_data["VIF"] = [variance_inflation_factor(X_multi.values, i) for i in range(X_multi.shape[1])]
print("\\nVIF值（多重共线性）：")
print(vif_data)

# 5. 模型优化：删除VIF>10的特征
high_vif_features = vif_data[vif_data["VIF"] > 10]["特征"].tolist()
if high_vif_features:
    X_optimized = X_multi.drop(high_vif_features, axis=1)
    model_optimized = LinearRegression()
    model_optimized.fit(X_optimized, y)
    y_pred_optimized = model_optimized.predict(X_optimized)
    print(f"\\n优化后模型（删除{high_vif_features}）：")
    print(f"R² = {r2_score(y, y_pred_optimized):.3f}")

# 6. 预测应用
sample_input = pd.DataFrame({
    "广告费": [1000],
    "活动次数": [3],
    "客单价": [80],
    "竞品价格": [90]
})
predicted_sales = model_multi.predict(sample_input)
print(f"\\n预测示例：")
print(f"广告费=1000, 活动次数=3, 客单价=80, 竞品价格=90")
print(f"预测销量 = {predicted_sales[0]:.0f}")`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: 'VIF（方差膨胀因子）大于多少表示存在严重多重共线性？',
        options: ['1', '5', '10', '100'],
        correctAnswer: 2,
        explanation: '一般认为VIF>10表示存在严重多重共线性问题。'
      },
      {
        id: 2,
        type: 'single',
        question: 'R²值表示什么？',
        options: ['模型的绝对误差', '模型解释的方差比例', '特征的重要性', '预测值的平均数'],
        correctAnswer: 1,
        explanation: 'R²表示模型解释的因变量方差比例，值越大拟合效果越好。'
      },
      {
        id: 3,
        type: 'single',
        question: '多元线性回归模型的假设包括哪些？',
        options: ['线性关系', '误差正态分布', '误差独立', '以上都是'],
        correctAnswer: 3,
        explanation: '多元线性回归模型假设包括线性关系、误差正态分布、误差独立等。'
      },
      {
        id: 4,
        type: 'multiple',
        question: '线性回归模型的评估指标包括哪些？',
        options: ['R²', 'MAE', 'MSE', '准确率'],
        correctAnswer: [0, 1, 2],
        explanation: 'R²、MAE和MSE都是线性回归模型的评估指标，准确率是分类模型的指标。'
      },
      {
        id: 5,
        type: 'single',
        question: '一元线性回归和多元线性回归的主要区别是什么？',
        options: ['自变量数量', '因变量数量', '模型复杂度', '以上都是'],
        correctAnswer: 0,
        explanation: '一元线性回归只有一个自变量，多元线性回归有多个自变量。'
      },
      {
        id: 6,
        type: 'judgment',
        question: 'R²值越大，模型的预测能力一定越强。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'R²值越大表示模型对训练数据的拟合越好，但不一定表示预测能力强，可能存在过拟合。'
      },
      {
        id: 7,
        type: 'single',
        question: '如何处理多重共线性问题？',
        options: ['删除高VIF的特征', '使用岭回归', '主成分分析', '以上都是'],
        correctAnswer: 3,
        explanation: '处理多重共线性的方法包括删除高VIF的特征、使用岭回归、主成分分析等。'
      },
      {
        id: 8,
        type: 'multiple',
        question: '线性回归模型的应用场景包括哪些？',
        options: ['销量预测', '房价预测', '股票价格预测', '图像识别'],
        correctAnswer: [0, 1, 2],
        explanation: '线性回归可用于销量预测、房价预测、股票价格预测等场景，图像识别通常使用深度学习模型。'
      },
      {
        id: 9,
        type: 'single',
        question: 'MAE和MSE的主要区别是什么？',
        options: ['MAE对异常值更敏感', 'MSE对异常值更敏感', 'MAE计算更简单', 'MSE计算更简单'],
        correctAnswer: 1,
        explanation: 'MSE对异常值更敏感，因为它是误差的平方和。'
      },
      {
        id: 10,
        type: 'judgment',
        question: '线性回归模型只能处理线性关系，不能处理非线性关系。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '通过特征工程（如多项式特征），线性回归模型也可以处理非线性关系。'
      }
    ],
    learningResources: {
      docs: [
        { title: 'scikit-learn官方文档：线性回归', url: 'https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares' },
        { title: '统计学习方法：回归分析章节', url: 'https://www.stat.cmu.edu/~cshalizi/mreg/' },
        { title: '多重共线性处理指南', url: 'https://www.oreilly.com/library/view/python-for-data/9781491957660/' }
      ],
      videos: [
        { title: '线性回归模型详解', url: 'https://www.bilibili.com/video/BV1PE411c7Dp' },
        { title: '多重共线性检测与处理', url: 'https://www.bilibili.com/video/BV1rE411A768' },
        { title: '回归系数解读实战', url: 'https://www.bilibili.com/video/BV14J411T7sX' }
      ],
      examples: [
        { title: '销量预测案例分析', url: 'https://www.kaggle.com/code/ashydv/sales-prediction-simple-linear-regression' },
        { title: '房价预测应用', url: 'https://www.kaggle.com/code/serigne/house-prices-advanced-regression-techniques' },
        { title: '金融回归分析', url: 'https://www.kaggle.com/code/carlmcbrideellis/linear-regression-sample-stock-notebook' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - 回归分析板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: '如何处理线性回归中的异常值？', url: 'https://www.zhihu.com/question/22499010' },
        { title: '特征选择的最佳实践', url: 'https://zhuanlan.zhihu.com/p/26433852' },
        { title: '线性回归与其他模型的对比', url: 'https://zhuanlan.zhihu.com/p/13039578' }
      ]
    },
    showFullFlow: false
  },
  {
    id: 7,
    title: '随机森林回归+特征重要性',
    description: '非线性预测，找到影响销量的核心因素',
    coreKnowledge: [
      '随机森林回归',
      '特征重要性',
      '模型调参（n_estimators、max_depth）',
      '模型评估',
      '非线性关系挖掘'
    ],
    businessScenario: '电商销量精准预测，解决"线性回归无法捕捉非线性关系"的问题，同时筛选核心影响特征',
    tasks: [
      '沿用销量数据',
      '数据拆分：按7:3拆分为训练集和测试集',
      '随机森林回归训练',
      '模型调参：调整n_estimators、max_depth',
      '特征重要性分析',
      '对比分析：与多元线性回归模型对比'
    ],
    taskHints: [
      '第一步：导入必要的库，读取销量数据并准备特征和目标变量',
      '第二步：使用 train_test_split() 按7:3拆分训练集和测试集',
      '第三步：使用 RandomForestRegressor() 进行随机森林回归建模',
      '第四步：调整 n_estimators 和 max_depth 参数进行调优，找到最佳参数组合',
      '第五步：使用 .feature_importances_ 获取特征重要性，绘制特征重要性图表'
    ],
    taskExamples: [
      'import pandas as pd\nimport numpy as np\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import r2_score, mean_absolute_error\n\ndf = pd.read_csv("sales_data.csv")\nX = df[["广告费", "活动次数", "客单价", "竞品价格"]]\ny = df["销量"]\nprint("数据读取成功！")',
      '# 数据拆分\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)',
      '# 模型调参 - 测试不同参数\nfor n_estimators in [50, 100, 200]:\n    for max_depth in [3, 5, 7]:\n        model = RandomForestRegressor(n_estimators=n_estimators, max_depth=max_depth, random_state=42)\n        model.fit(X_train, y_train)\n        y_pred = model.predict(X_test)\n        print(f"n_estimators={n_estimators}, max_depth={max_depth}, R²={r2_score(y_test, y_pred):.3f}")',
      '# 使用最优参数训练（n_estimators=100, max_depth=5）\nbest_model = RandomForestRegressor(n_estimators=100, max_depth=5, random_state=42)\nbest_model.fit(X_train, y_train)\ny_pred = best_model.predict(X_test)\nprint(f"测试集 R² = {r2_score(y_test, y_pred):.3f}")',
      '# 特征重要性\nfeature_importance = pd.DataFrame({"特征": X.columns, "重要性": best_model.feature_importances_})\nfeature_importance = feature_importance.sort_values("重要性", ascending=False)\nprint("特征重要性：")\nprint(feature_importance)'
    ],
    pitfalls: [
      '模型参数设置过于极端',
      '不做参数调参，直接使用默认参数',
      '误将"特征重要性高"当作"因果关系"'
    ],
    deliverables: [
      '随机森林代码文件',
      '不同参数模型效果对比表、特征重要性排序图',
      '模型对比分析报告'
    ],
    difficulty: 'advanced',
    duration: '60分钟',
    icon: '🌲',
    color: 'from-teal-500 to-cyan-400',
    dataset: 'retail_orders.csv',
    codeExample: `import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt
import seaborn as sns

# 1. 读取数据
df = pd.read_csv("sales_data.csv")
X = df[["广告费", "活动次数", "客单价", "竞品价格"]]
y = df["销量"]

# 2. 数据拆分
# TODO: 使用 train_test_split() 拆分数据

# 3. 模型调参
# TODO: 调整参数进行模型调优

# 4. 使用最优参数训练
# TODO: 训练最优模型

# 5. 特征重要性
# TODO: 计算特征重要性并绘制图表

# 6. 预测应用
# TODO: 使用模型进行预测
`,
    referenceAnswer: `import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt
import seaborn as sns

# 1. 读取数据
df = pd.read_csv("sales_data.csv")
X = df[["广告费", "活动次数", "客单价", "竞品价格"]]
y = df["销量"]

# 2. 数据拆分
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 3. 模型调参
param_grid = {
    "n_estimators": [50, 100, 200],
    "max_depth": [3, 5, 7]
}

results = []
for n_estimators in param_grid["n_estimators"]:
    for max_depth in param_grid["max_depth"]:
        model = RandomForestRegressor(
            n_estimators=n_estimators,
            max_depth=max_depth,
            random_state=42,
            n_jobs=-1
        )
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        results.append({
            "n_estimators": n_estimators,
            "max_depth": max_depth,
            "R2": r2_score(y_test, y_pred),
            "MAE": mean_absolute_error(y_test, y_pred)
        })

results_df = pd.DataFrame(results)
print("参数调优结果：")
print(results_df.sort_values("R2", ascending=False))

# 4. 使用最优参数训练（n_estimators=100, max_depth=5）
best_model = RandomForestRegressor(
    n_estimators=100,
    max_depth=5,
    random_state=42,
    n_jobs=-1
)
best_model.fit(X_train, y_train)
y_pred = best_model.predict(X_test)

print("\\n最优模型评估：")
print(f"训练集 R² = {r2_score(y_train, best_model.predict(X_train)):.3f}")
print(f"测试集 R² = {r2_score(y_test, y_pred):.3f}")
print(f"MAE = {mean_absolute_error(y_test, y_pred):.3f}")

# 5. 特征重要性
feature_importance = pd.DataFrame({
    "特征": X.columns,
    "重要性": best_model.feature_importances_
}).sort_values("重要性", ascending=False)

print("\\n特征重要性排序：")
print(feature_importance)

plt.figure(figsize=(10, 6))
sns.barplot(data=feature_importance, x="重要性", y="特征", hue="特征", legend=False, palette="viridis")
plt.title("随机森林特征重要性")
plt.tight_layout()
plt.savefig("feature_importance.png", dpi=300, bbox_inches="tight")
plt.show()

# 6. 预测应用
sample_input = pd.DataFrame({
    "广告费": [1000],
    "活动次数": [3],
    "客单价": [80],
    "竞品价格": [90]
})
predicted_sales = best_model.predict(sample_input)
print(f"\\n预测示例：")
print(f"预测销量 = {predicted_sales[0]:.0f}")`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: '随机森林的n_estimators参数表示什么？',
        options: ['最大深度', '决策树数量', '特征数量', '样本数量'],
        correctAnswer: 1,
        explanation: 'n_estimators表示随机森林中决策树的数量。'
      },
      {
        id: 2,
        type: 'multiple',
        question: '随机森林相比线性回归的优势有哪些？',
        options: ['可以捕捉非线性关系', '对异常值更鲁棒', '可以给出特征重要性', '计算速度更快'],
        correctAnswer: [0, 1, 2],
        explanation: '随机森林可以捕捉非线性关系、对异常值鲁棒、可以给出特征重要性，但计算速度通常比线性回归慢。'
      },
      {
        id: 3,
        type: 'single',
        question: '随机森林中的max_depth参数表示什么？',
        options: ['决策树的最大深度', '决策树的最小深度', '决策树的平均深度', '以上都不是'],
        correctAnswer: 0,
        explanation: 'max_depth参数表示决策树的最大深度，用于控制模型复杂度。'
      },
      {
        id: 4,
        type: 'multiple',
        question: '随机森林的优点包括哪些？',
        options: ['准确率高', '抗过拟合', '可以处理高维数据', '训练速度快'],
        correctAnswer: [0, 1, 2],
        explanation: '随机森林具有准确率高、抗过拟合、可以处理高维数据等优点，但训练速度相对较慢。'
      },
      {
        id: 5,
        type: 'single',
        question: '随机森林是如何进行预测的？',
        options: ['取所有决策树的平均值', '取所有决策树的投票结果', '取第一个决策树的结果', '取最后一个决策树的结果'],
        correctAnswer: 1,
        explanation: '随机森林通过集成多个决策树的投票结果来进行预测。'
      },
      {
        id: 6,
        type: 'judgment',
        question: '随机森林的n_estimators参数越大越好。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'n_estimators参数越大，模型的性能通常会提高，但计算成本也会增加，存在边际效益递减。'
      },
      {
        id: 7,
        type: 'single',
        question: '随机森林中的特征重要性是如何计算的？',
        options: ['基于特征的方差', '基于特征的信息增益', '基于特征的出现次数', '以上都不是'],
        correctAnswer: 1,
        explanation: '随机森林中的特征重要性通常基于特征的信息增益或基尼系数的减少来计算。'
      },
      {
        id: 8,
        type: 'multiple',
        question: '随机森林的应用场景包括哪些？',
        options: ['分类问题', '回归问题', '特征选择', '异常检测'],
        correctAnswer: [0, 1, 2, 3],
        explanation: '随机森林可用于分类、回归、特征选择和异常检测等多个场景。'
      },
      {
        id: 9,
        type: 'single',
        question: '随机森林中的随机性体现在哪些方面？',
        options: ['随机选择样本', '随机选择特征', '以上都是', '以上都不是'],
        correctAnswer: 2,
        explanation: '随机森林的随机性体现在随机选择样本（bootstrap采样）和随机选择特征两个方面。'
      },
      {
        id: 10,
        type: 'judgment',
        question: '随机森林不需要特征标准化。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '随机森林对特征的尺度不敏感，通常不需要特征标准化。'
      }
    ],
    learningResources: {
      docs: [
        { title: 'scikit-learn官方文档：随机森林', url: 'https://scikit-learn.org/stable/modules/ensemble.html#random-forests' },
        { title: '机器学习实战：集成学习章节', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/' },
        { title: '特征重要性分析指南', url: 'https://towardsdatascience.com/feature-importance-with-tree-based-models-870c4e3d817f' }
      ],
      videos: [
        { title: '随机森林算法详解', url: 'https://www.bilibili.com/video/BV1rE411A7jP' },
        { title: '模型调参实战教程', url: 'https://www.bilibili.com/video/BV1ZJ411M7uA' },
        { title: '特征重要性解读', url: 'https://www.bilibili.com/video/BV1mE411V7tS' }
      ],
      examples: [
        { title: '销量预测随机森林案例', url: 'https://www.kaggle.com/code/kashnitsky/topic-10-bagging-random-forests' },
        { title: '金融预测应用', url: 'https://www.kaggle.com/code/faressayah/random-forest-classifier-prediction' },
        { title: '医疗数据回归分析', url: 'https://www.kaggle.com/code/uciml/breast-cancer-wisconsin-data' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - 集成学习板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: '随机森林参数调优技巧', url: 'https://www.zhihu.com/question/28070043' },
        { title: '特征重要性的正确解读', url: 'https://zhuanlan.zhihu.com/p/84247963' },
        { title: '随机森林与梯度提升树的对比', url: 'https://zhuanlan.zhihu.com/p/67334233' }
      ]
    },
    showFullFlow: false
  },
  {
    id: 8,
    title: '时间序列完整分析',
    description: '趋势+周期+预测，为库存规划提供数据支撑',
    coreKnowledge: [
      '时间序列预处理（日期格式转换、重采样）',
      '移动平均',
      '趋势分析',
      '周期识别',
      '简易时序预测（ARIMA）'
    ],
    businessScenario: '电商月度销量时间序列分析，识别销量的趋势（上升/下降）、周期（月度/季度），预测未来3个月的销量，为库存规划提供支撑',
    tasks: [
      '读取时间序列数据',
      '预处理：日期格式转换、按月度重采样',
      '趋势分析：计算移动平均，绘制折线图',
      '周期识别：绘制月度销量热力图',
      '时序预测：用ARIMA模型预测未来3个月',
      '结果评估与库存建议'
    ],
    taskHints: [
      '第一步：导入必要的库，读取时间序列数据并使用 pd.to_datetime() 转换日期格式',
      '第二步：使用 resample("M") 按月度重采样数据，计算月度总销量',
      '第三步：使用 rolling(window=3).mean() 计算移动平均，分析销量趋势',
      '第四步：使用 pivot() 重塑数据并绘制月度销量热力图，识别周期性',
      '第五步：使用 ARIMA() 模型进行时序预测，预测未来3个月的销量' 
    ],
    taskExamples: [
      'import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom statsmodels.tsa.arima.model import ARIMA\n\ndf = pd.read_csv("time_series_sales.csv")\ndf["日期"] = pd.to_datetime(df["日期"])\ndf.set_index("日期", inplace=True)\nprint("时间序列数据读取成功！")',
      '# 按月度重采样\ndf_monthly = df.resample("M").sum()\nprint("月度数据：")\nprint(df_monthly.head())',
      '# 趋势分析 - 移动平均\ndf_monthly["3月移动平均"] = df_monthly["销量"].rolling(window=3).mean()\nprint("移动平均计算完成！")',
      '# 周期识别 - 月度热力图\ndf_monthly["年份"] = df_monthly.index.year\ndf_monthly["月份"] = df_monthly.index.month\nmonthly_pivot = df_monthly.pivot(index="年份", columns="月份", values="销量")\nprint("月度热力图数据准备完成！")',
      '# ARIMA模型预测\nmodel = ARIMA(df_monthly["销量"], order=(1, 1, 1))\nresults = model.fit()\nforecast = results.get_forecast(steps=3)\nforecast_df = forecast.summary_frame()\nprint("未来3个月预测：")\nprint(forecast_df)'
    ],
    pitfalls: [
      '未做日期格式转换',
      '移动平均窗口设置不合理',
      '盲目使用ARIMA模型，不分析数据的平稳性'
    ],
    deliverables: [
      '时序分析代码文件',
      '趋势图、周期热力图、预测结果图',
      '预测评估+库存建议'
    ],
    difficulty: 'advanced',
    duration: '45分钟',
    icon: '⏰',
    color: 'from-yellow-500 to-orange-400',
    dataset: 'time_series_sales.csv',
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

# 1. 读取数据
df = pd.read_csv("time_series_sales.csv")
df["日期"] = pd.to_datetime(df["日期"])
df.set_index("日期", inplace=True)

# 2. 按月度重采样
# TODO: 使用 resample() 按月度重采样

# 3. 趋势分析 - 移动平均
# TODO: 计算移动平均并绘制趋势图

# 4. 周期识别 - 月度热力图
# TODO: 绘制月度销量热力图

# 5. ARIMA模型预测
# TODO: 使用ARIMA模型预测未来3个月

# 6. 库存建议
# TODO: 输出库存规划建议
`,
    referenceAnswer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

# 1. 读取数据
df = pd.read_csv("time_series_sales.csv")
df["日期"] = pd.to_datetime(df["日期"])
df.set_index("日期", inplace=True)

# 2. 按月度重采样
df_monthly = df.resample("M").sum()

# 3. 趋势分析 - 移动平均
df_monthly["3月移动平均"] = df_monthly["销量"].rolling(window=3).mean()
df_monthly["6月移动平均"] = df_monthly["销量"].rolling(window=6).mean()

plt.figure(figsize=(12, 6))
plt.plot(df_monthly["销量"], label="原始销量", alpha=0.5)
plt.plot(df_monthly["3月移动平均"], label="3月移动平均", linewidth=2)
plt.plot(df_monthly["6月移动平均"], label="6月移动平均", linewidth=2)
plt.title("销量趋势图")
plt.xlabel("日期")
plt.ylabel("销量")
plt.legend()
plt.grid(True, alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig("trend_analysis.png", dpi=300, bbox_inches="tight")
plt.show()

# 4. 周期识别 - 月度热力图
df_monthly["年份"] = df_monthly.index.year
df_monthly["月份"] = df_monthly.index.month
monthly_pivot = df_monthly.pivot(index="年份", columns="月份", values="销量")

plt.figure(figsize=(12, 6))
sns.heatmap(monthly_pivot, annot=True, fmt=".0f", cmap="YlOrRd", 
            linewidths=0.5, cbar_kws={"label": "销量"})
plt.title("月度销量热力图")
plt.tight_layout()
plt.savefig("seasonal_heatmap.png", dpi=300, bbox_inches="tight")
plt.show()

# 5. ARIMA模型预测
# 使用自动选择的参数(p=1,d=1,q=1)
model = ARIMA(df_monthly["销量"], order=(1, 1, 1))
results = model.fit()
print(results.summary())

# 预测未来3个月
forecast_steps = 3
forecast = results.get_forecast(steps=forecast_steps)
forecast_df = forecast.summary_frame()

print("\\n未来3个月预测结果：")
print(forecast_df)

# 可视化预测结果
plt.figure(figsize=(12, 6))
plt.plot(df_monthly["销量"], label="历史销量", linewidth=2)
plt.plot(forecast_df["mean"], label="预测值", color="red", linewidth=2, marker="o")
plt.fill_between(
    forecast_df.index,
    forecast_df["mean_ci_lower"],
    forecast_df["mean_ci_upper"],
    color="red",
    alpha=0.2,
    label="置信区间"
)
plt.title("销量预测（ARIMA）")
plt.xlabel("日期")
plt.ylabel("销量")
plt.legend()
plt.grid(True, alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig("forecast.png", dpi=300, bbox_inches="tight")
plt.show()

# 6. 库存建议
avg_sales = df_monthly["销量"].tail(6).mean()
forecast_mean = forecast_df["mean"].mean()
print("\\n📦 库存规划建议：")
print(f"过去6个月月均销量：{avg_sales:.0f}")
print(f"预测月均销量：{forecast_mean:.0f}")
print(f"建议安全库存量：{forecast_mean * 1.2:.0f}")`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: '时间序列重采样时，"M"表示什么频率？',
        options: ['每日', '每周', '每月', '每季度'],
        correctAnswer: 2,
        explanation: '"M"表示月度（Monthly）频率。'
      },
      {
        id: 2,
        type: 'single',
        question: 'ARIMA模型中的d参数表示什么？',
        options: ['自回归阶数', '差分阶数', '移动平均阶数', '预测步数'],
        correctAnswer: 1,
        explanation: 'ARIMA(p,d,q)中，d表示差分阶数，用来让序列平稳。'
      },
      {
        id: 3,
        type: 'single',
        question: 'ARIMA模型中的p参数表示什么？',
        options: ['自回归阶数', '差分阶数', '移动平均阶数', '预测步数'],
        correctAnswer: 0,
        explanation: 'ARIMA(p,d,q)中，p表示自回归阶数。'
      },
      {
        id: 4,
        type: 'single',
        question: 'ARIMA模型中的q参数表示什么？',
        options: ['自回归阶数', '差分阶数', '移动平均阶数', '预测步数'],
        correctAnswer: 2,
        explanation: 'ARIMA(p,d,q)中，q表示移动平均阶数。'
      },
      {
        id: 5,
        type: 'multiple',
        question: '时间序列分析的主要步骤包括哪些？',
        options: ['数据预处理', '平稳性检验', '模型选择', '模型评估'],
        correctAnswer: [0, 1, 2, 3],
        explanation: '时间序列分析的主要步骤包括数据预处理、平稳性检验、模型选择和模型评估。'
      },
      {
        id: 6,
        type: 'judgment',
        question: '时间序列数据必须是平稳的才能进行预测。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '对于非平稳的时间序列，可以通过差分等方法使其平稳后再进行预测。'
      },
      {
        id: 7,
        type: 'single',
        question: '移动平均的主要作用是什么？',
        options: ['消除噪声', '预测未来', '识别趋势', '以上都是'],
        correctAnswer: 0,
        explanation: '移动平均的主要作用是消除噪声，平滑时间序列数据。'
      },
      {
        id: 8,
        type: 'multiple',
        question: '时间序列的组成部分包括哪些？',
        options: ['趋势', '季节', '循环', '随机噪声'],
        correctAnswer: [0, 1, 2, 3],
        explanation: '时间序列的组成部分包括趋势、季节、循环和随机噪声。'
      },
      {
        id: 9,
        type: 'single',
        question: '如何检验时间序列的平稳性？',
        options: ['ADF检验', 't检验', 'F检验', '卡方检验'],
        correctAnswer: 0,
        explanation: 'ADF（Augmented Dickey-Fuller）检验是常用的时间序列平稳性检验方法。'
      },
      {
        id: 10,
        type: 'judgment',
        question: '时间序列预测的准确性随着预测步数的增加而降低。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '时间序列预测的准确性通常随着预测步数的增加而降低，因为不确定性会累积。'
      }
    ],
    learningResources: {
      docs: [
        { title: 'statsmodels官方文档：ARIMA模型', url: 'https://www.statsmodels.org/dev/examples/notebooks/generated/tsa_arma_0.html' },
        { title: '时间序列分析：预测与控制', url: 'https://otexts.com/fpp2/' },
        { title: 'pandas时间序列处理指南', url: 'https://pandas.pydata.org/docs/user_guide/timeseries.html' }
      ],
      videos: [
        { title: '时间序列分析实战教程', url: 'https://www.bilibili.com/video/BV1uf4y1U7N5' },
        { title: 'ARIMA模型参数选择', url: 'https://www.bilibili.com/video/BV1fT4y1c7rX' },
        { title: '时间序列可视化技巧', url: 'https://www.bilibili.com/video/BV1hJ411v7nC' }
      ],
      examples: [
        { title: '销量预测案例分析', url: 'https://www.kaggle.com/code/jeevaragavan/time-series-forecasting-arima' },
        { title: '库存规划应用', url: 'https://www.kaggle.com/code/ekami666/demand-forecasting-with-arima' },
        { title: '经济指标预测', url: 'https://www.kaggle.com/code/sudalairajkumar/time-series-forecasting-using-arima' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - 时间序列板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: '如何选择合适的时间序列模型？', url: 'https://www.zhihu.com/question/21225065' },
        { title: 'ARIMA与Prophet的对比', url: 'https://zhuanlan.zhihu.com/p/134166305' },
        { title: '时间序列异常检测方法', url: 'https://zhuanlan.zhihu.com/p/122508085' }
      ]
    },
    showFullFlow: false
  },
  {
    id: 9,
    title: '综合异常检测',
    description: '统计+模型结合，识别异常订单和风险用户',
    coreKnowledge: [
      '统计异常检测（3σ原则、箱线图）',
      '模型异常检测（孤立森林）',
      '异常值解读',
      '业务异常定位'
    ],
    businessScenario: '电商订单异常检测，识别"异常订单"（如刷单、恶意下单、系统误录）、"异常用户"（如高频下单但不付款），降低业务风险',
    tasks: [
      '读取订单数据',
      '统计异常检测：用3σ原则和箱线图识别异常值',
      '模型异常检测：用孤立森林算法识别异常订单',
      '异常合并与解读：分析异常类型',
      '业务处理：针对不同类型异常给出处理建议'
    ],
    taskHints: [
      '第一步：导入必要的库，读取订单数据',
      '第二步：使用 3σ原则（mean ± 3*std）进行统计异常检测',
      '第三步：使用 IQR 方法进行箱线图异常检测',
      '第四步：使用 IsolationForest() 进行孤立森林异常检测，注意设置 contamination 参数',
      '第五步：结合多种方法的异常结果，分析异常类型并给出业务处理建议' 
    ],
    taskExamples: [
      `import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

df = pd.read_csv("order_data.csv")
print("订单数据读取成功！")`,
      `# 统计异常检测 - 3σ原则
mean = df["订单金额"].mean()
std = df["订单金额"].std()
lower = mean - 3 * std
upper = mean + 3 * std
outliers_3sigma = df[(df["订单金额"] < lower) | (df["订单金额"] > upper)]
print("3σ原则检测到", len(outliers_3sigma), "个异常")`,
      `# 统计异常检测 - 箱线图
Q1 = df["订单金额"].quantile(0.25)
Q3 = df["订单金额"].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
outliers_boxplot = df[(df["订单金额"] < lower) | (df["订单金额"] > upper)]
print("箱线图检测到", len(outliers_boxplot), "个异常")`,
      `# 孤立森林异常检测
features = ["订单金额", "下单频次", "支付时长"]
X = df[features].dropna()
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
iso_forest = IsolationForest(contamination=0.05, random_state=42)
df["孤立森林异常"] = iso_forest.fit_predict(X_scaled)
df["孤立森林异常"] = df["孤立森林异常"].map({1: 0, -1: 1})
print("孤立森林检测到", df["孤立森林异常"].sum(), "个异常")`,
      `# 合并异常结果
outlier_ids = set(outliers_3sigma.index) | set(outliers_boxplot.index) | set(df[df["孤立森林异常"] == 1].index)
print("综合检测到", len(outlier_ids), "个异常订单")`
    ],
    pitfalls: [
      '将"正常极端值"当作异常值',
      '只检测异常，不解读异常原因、不给出处理建议',
      '孤立森林参数设置不合理'
    ],
    deliverables: [
      '异常检测代码文件',
      '异常订单统计表格、异常可视化图',
      '异常解读+处理建议'
    ],
    difficulty: 'advanced',
    duration: '45分钟',
    icon: '🚨',
    color: 'from-rose-500 to-pink-400',
    dataset: 'customer_features.csv',
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

# 1. 读取订单数据
df = pd.read_csv("order_data.csv")

# 2. 统计异常检测 - 3σ原则
# TODO: 实现3σ原则异常检测

# 3. 统计异常检测 - 箱线图
# TODO: 实现箱线图异常检测

# 4. 可视化异常
# TODO: 绘制异常检测可视化图表

# 5. 孤立森林异常检测
# TODO: 使用孤立森林进行异常检测

# 6. 合并两种方法的异常
# TODO: 合并异常结果

# 7. 分析异常类型
# TODO: 分析各种异常类型的数量

# 8. 业务处理建议
# TODO: 输出业务处理建议
`,
    referenceAnswer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

# 1. 读取订单数据
df = pd.read_csv("order_data.csv")

# 2. 统计异常检测 - 3σ原则
def detect_3sigma_outliers(data, column):
    mean = data[column].mean()
    std = data[column].std()
    lower = mean - 3 * std
    upper = mean + 3 * std
    outliers = data[(data[column] < lower) | (data[column] > upper)]
    return outliers

order_amount_outliers_3sigma = detect_3sigma_outliers(df, "订单金额")
print(f"3σ原则检测到 {len(order_amount_outliers_3sigma)} 个订单金额异常")

# 3. 统计异常检测 - 箱线图
def detect_boxplot_outliers(data, column):
    Q1 = data[column].quantile(0.25)
    Q3 = data[column].quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    outliers = data[(data[column] < lower) | (data[column] > upper)]
    return outliers

order_amount_outliers_boxplot = detect_boxplot_outliers(df, "订单金额")
print(f"箱线图检测到 {len(order_amount_outliers_boxplot)} 个订单金额异常")

# 4. 可视化异常
plt.figure(figsize=(14, 5))
plt.subplot(1, 2, 1)
sns.boxplot(data=df, y="订单金额")
plt.title("订单金额箱线图")
plt.subplot(1, 2, 2)
sns.histplot(df["订单金额"], bins=50)
plt.axvline(df["订单金额"].mean() - 3 * df["订单金额"].std(), color="red", linestyle="--")
plt.axvline(df["订单金额"].mean() + 3 * df["订单金额"].std(), color="red", linestyle="--")
plt.title("订单金额分布 + 3σ范围")
plt.tight_layout()
plt.savefig("anomaly_detection_stats.png", dpi=300, bbox_inches="tight")
plt.show()

# 5. 孤立森林异常检测
features = ["订单金额", "下单频次", "支付时长"]
X = df[features].dropna()
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

iso_forest = IsolationForest(contamination=0.05, random_state=42, n_estimators=100)
df["孤立森林异常"] = iso_forest.fit_predict(X_scaled)
df["孤立森林异常"] = df["孤立森林异常"].map({1: 0, -1: 1})  # -1表示异常，转换为1

print(f"\\n孤立森林检测到 {df['孤立森林异常'].sum()} 个异常订单")

# 6. 合并两种方法的异常
df["统计异常"] = 0
df.loc[order_amount_outliers_3sigma.index, "统计异常"] = 1
df.loc[order_amount_outliers_boxplot.index, "统计异常"] = 1

df["综合异常"] = ((df["统计异常"] == 1) | (df["孤立森林异常"] == 1)).astype(int)
print(f"综合检测到 {df['综合异常'].sum()} 个异常订单")

# 7. 分析异常类型
anomaly_df = df[df["综合异常"] == 1].copy()
print("\\n异常订单分析：")
print(f"高金额订单：{(anomaly_df['订单金额'] > 10000).sum()} 个")
print(f"高频下单用户：{(anomaly_df['下单频次'] > 20).sum()} 个")
print(f"未支付订单：{(anomaly_df['支付状态'] != '已支付').sum()} 个")

# 8. 业务处理建议
print("\\n🛡️  业务处理建议：")
print("""
高金额异常订单：
  - 标记为需人工审核
  - 联系用户确认订单

高频小额订单：
  - 限制下单频次
  - 检查是否为刷单

未支付高金额订单：
  - 提示支付风险
  - 观察是否为恶意下单
""")`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: '孤立森林算法中的contamination参数表示什么？',
        options: ['树的数量', '预期的异常比例', '最大深度', '特征数量'],
        correctAnswer: 1,
        explanation: 'contamination参数表示数据集中预期的异常样本比例。'
      },
      {
        id: 2,
        type: 'multiple',
        question: '常见的异常检测方法有哪些？',
        options: ['3σ原则', '箱线图', '孤立森林', 'KMeans聚类'],
        correctAnswer: [0, 1, 2, 3],
        explanation: '这些都是常用的异常检测方法，KMeans也可以用于检测偏离中心的异常值。'
      },
      {
        id: 3,
        type: 'single',
        question: '3σ原则中，异常值的定义是？',
        options: ['超出均值±1σ的数据', '超出均值±2σ的数据', '超出均值±3σ的数据', '超出均值±4σ的数据'],
        correctAnswer: 2,
        explanation: '3σ原则定义超出均值±3σ的数据为异常值。'
      },
      {
        id: 4,
        type: 'single',
        question: '箱线图中，异常值的定义是？',
        options: ['超出Q1-1.5*IQR或Q3+1.5*IQR的数据', '超出Q1-2*IQR或Q3+2*IQR的数据', '超出均值±2σ的数据', '超出均值±3σ的数据'],
        correctAnswer: 0,
        explanation: '箱线图中，异常值定义为超出Q1-1.5*IQR或Q3+1.5*IQR的数据。'
      },
      {
        id: 5,
        type: 'multiple',
        question: '异常检测的应用场景包括哪些？',
        options: ['信用卡欺诈检测', '网络入侵检测', '设备故障预测', '客户流失预测'],
        correctAnswer: [0, 1, 2],
        explanation: '异常检测可用于信用卡欺诈检测、网络入侵检测和设备故障预测等场景。'
      },
      {
        id: 6,
        type: 'judgment',
        question: '孤立森林算法特别适合处理高维数据的异常检测。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '孤立森林算法是一种基于树的异常检测方法，特别适合处理高维数据。'
      },
      {
        id: 7,
        type: 'single',
        question: '孤立森林算法的时间复杂度是多少？',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'],
        correctAnswer: 1,
        explanation: '孤立森林算法的时间复杂度是O(n log n)，其中n是样本数。'
      },
      {
        id: 8,
        type: 'multiple',
        question: '异常检测的挑战包括哪些？',
        options: ['异常定义不明确', '异常样本稀少', '数据分布随时间变化', '特征选择困难'],
        correctAnswer: [0, 1, 2, 3],
        explanation: '异常检测的挑战包括异常定义不明确、异常样本稀少、数据分布随时间变化和特征选择困难等。'
      },
      {
        id: 9,
        type: 'single',
        question: '在异常检测中，什么是假阳性？',
        options: ['将正常样本误判为异常', '将异常样本误判为正常', '正确检测出异常', '正确识别出正常样本'],
        correctAnswer: 0,
        explanation: '假阳性是指将正常样本误判为异常。'
      },
      {
        id: 10,
        type: 'judgment',
        question: '异常检测只能用于无监督场景，不能用于有监督场景。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '异常检测可以用于无监督场景，也可以用于有监督场景，如使用标记的异常样本进行模型训练。'
      }
    ],
    learningResources: {
      docs: [
        { title: 'scikit-learn官方文档：异常检测', url: 'https://scikit-learn.org/stable/modules/outlier_detection.html' },
        { title: '异常检测：原理与应用', url: 'https://towardsdatascience.com/top-10-anomaly-detection-algorithms-8183106e4450' },
        { title: '孤立森林算法详解', url: 'https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf' }
      ],
      videos: [
        { title: '异常检测实战教程', url: 'https://www.bilibili.com/video/BV1nJ411K7cH' },
        { title: '孤立森林算法原理', url: 'https://www.bilibili.com/video/BV1RJ411F7a4' },
        { title: '异常检测可视化技巧', url: 'https://www.bilibili.com/video/BV1oK4y1V7wY' }
      ],
      examples: [
        { title: '电商订单异常检测案例', url: 'https://www.kaggle.com/code/vittoriotriassi/anomaly-detection-in-e-commerce-data' },
        { title: '信用卡欺诈检测', url: 'https://www.kaggle.com/code/mlg-ulb/creditcardfraud' },
        { title: '网络入侵检测', url: 'https://www.kaggle.com/code/ryanholbrook/anomaly-detection' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - 异常检测板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: '如何平衡假阳性和假阴性？', url: 'https://www.zhihu.com/question/31093758' },
        { title: '异常检测在不同行业的应用', url: 'https://zhuanlan.zhihu.com/p/126800428' },
        { title: '统计方法与机器学习方法的对比', url: 'https://zhuanlan.zhihu.com/p/97207768' }
      ]
    },
    showFullFlow: false
  },
  {
    id: 10,
    title: '全流程综合大项目',
    description: '完整分析师交付闭环，解决真实业务问题',
    coreKnowledge: [
      '整合所有前期知识点',
      '数据获取与清洗',
      '关联规则挖掘',
      'KMeans用户聚类+RFM分层',
      '随机森林回归',
      '时间序列分析',
      '可视化呈现',
      '业务策略输出'
    ],
    businessScenario: '电商综合数据分析，解决"如何提升营收"的核心业务问题，输出完整的分析报告，可直接用于业务决策',
    tasks: [
      '数据准备：整合所有数据集',
      '数据预处理',
      '核心分析：关联规则、用户聚类、RFM分层、销量预测、时序分析',
      '可视化呈现：绘制至少5张核心图表',
      '结论与落地：总结核心发现，给出可落地的业务策略',
      '输出报告'
    ],
    taskHints: [
      '第一步：导入必要的库，整合前期所有项目的数据集',
      '第二步：计算核心业务指标，如总营收、客单价、订单数等',
      '第三步：复用RFM用户分层方法，分析用户价值分布',
      '第四步：复用随机森林和时间序列分析方法，分析销量影响因素和趋势',
      '第五步：结合多种分析方法的结果，给出综合业务建议，生成可视化报告' 
    ],
    taskExamples: [
      '# 数据准备\ndf_user = pd.read_csv("processed_data.csv")\ndf_sales = pd.read_csv("sales_data.csv")\ndf_ts = pd.read_csv("time_series_sales.csv")\ndf_order = pd.read_csv("order_data.csv")\nprint("数据整合完成！")',
      '# 核心指标概览\ntotal_revenue = (df_user["消费金额"] * df_user["消费频次"]).sum()\navg_order_value = df_user["消费金额"].mean()\nprint(f"总营收：{total_revenue:,.0f} 元，客单价：{avg_order_value:.0f} 元")',
      '# RFM用户分层\ndf_user["R分"] = pd.qcut(df_user["最近消费天数"], 5, labels=[5, 4, 3, 2, 1])\ndf_user["F分"] = pd.qcut(df_user["消费频次"], 5, labels=[1, 2, 3, 4, 5])\ndf_user["M分"] = pd.qcut(df_user["消费金额"], 5, labels=[1, 2, 3, 4, 5])\ndf_user["RFM总分"] = df_user["R分"].astype(int) + df_user["F分"].astype(int) + df_user["M分"].astype(int)\nprint("RFM分层完成！")',
      '# 销量影响因素分析\nfrom sklearn.ensemble import RandomForestRegressor\nX = df_sales[["广告费", "活动次数", "客单价", "竞品价格"]]\ny = df_sales["销量"]\nmodel = RandomForestRegressor(n_estimators=100, random_state=42)\nmodel.fit(X, y)\nfeature_importance = pd.DataFrame({"特征": X.columns, "重要性": model.feature_importances_})\nprint("特征重要性分析完成！")',
      '# 业务策略建议\nprint("\\n📋 业务策略建议：")\nprint("1. 高价值用户：专属福利，提升留存")\nprint("2. 潜力用户：满减优惠券，提升客单价")\nprint("3. 重点优化：广告费和活动次数的ROI")\nprint("4. 库存规划：参考时间序列预测结果")'
    ],
    pitfalls: [
      '数据整合混乱',
      '分析无重点',
      '报告逻辑混乱，无数据支撑结论'
    ],
    deliverables: [
      '全流程代码文件',
      '所有核心可视化图表',
      '完整数据分析报告'
    ],
    difficulty: 'advanced',
    duration: '60分钟',
    icon: '🏆',
    color: 'from-emerald-500 to-green-400',
    dataset: 'retail_orders.csv',
    codeExample: `"""
全流程综合大项目
目标：提升电商营收
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

print("=" * 60)
print("📊 全流程综合大项目 - 电商营收提升分析")
print("=" * 60)

# 1. 数据准备
print("\\n[1/6] 数据准备...")
df_user = pd.read_csv("processed_data.csv")
df_cart = pd.read_csv("cart_data.csv")
df_goods = pd.read_csv("goods_data.csv")
df_sales = pd.read_csv("sales_data.csv")
df_ts = pd.read_csv("time_series_sales.csv")
df_order = pd.read_csv("order_data.csv")

print(f"用户数据：{len(df_user)} 条")
print(f"销售数据：{len(df_sales)} 条")

# 2. 核心指标概览
# TODO: 计算并输出核心指标

# 3. RFM用户分层
# TODO: 实现RFM用户分层

# 4. 销量影响因素分析
# TODO: 使用随机森林分析销量影响因素

# 5. 时间序列趋势分析
# TODO: 分析时间序列趋势

# 6. 业务策略建议
# TODO: 输出业务策略建议

# 7. 可视化报告
# TODO: 生成可视化报告
`,
    referenceAnswer: `"""
全流程综合大项目
目标：提升电商营收
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

print("=" * 60)
print("📊 全流程综合大项目 - 电商营收提升分析")
print("=" * 60)

# 1. 数据准备
print("\\n[1/6] 数据准备...")
df_user = pd.read_csv("processed_data.csv")
df_cart = pd.read_csv("cart_data.csv")
df_goods = pd.read_csv("goods_data.csv")
df_sales = pd.read_csv("sales_data.csv")
df_ts = pd.read_csv("time_series_sales.csv")
df_order = pd.read_csv("order_data.csv")

print(f"用户数据：{len(df_user)} 条")
print(f"销售数据：{len(df_sales)} 条")

# 2. 核心指标概览
print("\\n[2/6] 核心指标概览...")
total_revenue = (df_user["消费金额"] * df_user["消费频次"]).sum()
avg_order_value = df_user["消费金额"].mean()
total_orders = len(df_order[df_order["支付状态"] == "已支付"])

print(f"总营收：{total_revenue:,.0f} 元")
print(f"客单价：{avg_order_value:.0f} 元")
print(f"订单数：{total_orders} 个")

# 3. RFM用户分层（复用项目5）
print("\\n[3/6] RFM用户分层...")
df_user["R分"] = pd.qcut(df_user["最近消费天数"], 5, labels=[5, 4, 3, 2, 1])
df_user["F分"] = pd.qcut(df_user["消费频次"], 5, labels=[1, 2, 3, 4, 5])
df_user["M分"] = pd.qcut(df_user["消费金额"], 5, labels=[1, 2, 3, 4, 5])
df_user[["R分", "F分", "M分"]] = df_user[["R分", "F分", "M分"]].astype(int)
df_user["RFM总分"] = df_user["R分"] + df_user["F分"] + df_user["M分"]

def rfm_level(score):
    if score >= 13: return "高价值用户"
    elif score >= 10: return "潜力用户"
    elif score >= 7: return "一般用户"
    else: return "流失用户"

df_user["用户层级"] = df_user["RFM总分"].apply(rfm_level)

rfm_summary = df_user.groupby("用户层级").agg({
    "消费金额": ["sum", "mean"],
    "用户ID": "count"
}).round(0)
rfm_summary.columns = ["总消费", "平均消费", "用户数"]
rfm_summary["消费占比"] = (rfm_summary["总消费"] / rfm_summary["总消费"].sum() * 100).round(1)
rfm_summary["用户占比"] = (rfm_summary["用户数"] / rfm_summary["用户数"].sum() * 100).round(1)
print(rfm_summary)

# 4. 销量影响因素分析（复用项目6/7）
print("\\n[4/6] 销量影响因素分析...")
from sklearn.ensemble import RandomForestRegressor
X = df_sales[["广告费", "活动次数", "客单价", "竞品价格"]]
y = df_sales["销量"]
rf_model = RandomForestRegressor(n_estimators=100, max_depth=5, random_state=42)
rf_model.fit(X, y)
feature_importance = pd.DataFrame({"特征": X.columns, "重要性": rf_model.feature_importances_}).sort_values("重要性", ascending=False)
print("特征重要性：")
print(feature_importance)

# 5. 时间序列趋势分析（复用项目8）
print("\\n[5/6] 时间序列趋势分析...")
df_ts["日期"] = pd.to_datetime(df_ts["日期"])
df_ts.set_index("日期", inplace=True)
monthly_sales = df_ts.resample("M").sum()
avg_growth = monthly_sales["销量"].pct_change().mean() * 100
print(f"月度销量平均增长率：{avg_growth:.1f}%")

# 6. 业务策略建议
print("\\n[6/6] 业务策略建议...")
print("\\n" + "=" * 60)
print("📋 核心发现与策略建议")
print("=" * 60)

high_value_revenue = rfm_summary.loc["高价值用户", "总消费"]
high_value_ratio = rfm_summary.loc["高价值用户", "消费占比"]
print(f"""
🎯 核心发现：
1. 高价值用户占 {rfm_summary.loc['高价值用户', '用户占比']}%，贡献了 {high_value_ratio}% 的营收
2. {feature_importance.iloc[0, 0]} 是影响销量的最重要因素
3. 月度销量平均增长 {avg_growth:.1f}%

💡 业务策略建议：
1. 高价值用户运营：
   - 专属VIP服务
   - 积分翻倍
   - 优先体验新品

2. 营销优化：
   - 加大 {feature_importance.iloc[0, 0]} 投入
   - 针对高价值用户精准推送

3. 流失用户召回：
   - 唤醒优惠券
   - 个性化召回

4. 库存优化：
   - 基于时间序列预测调整库存
""")

# 7. 可视化报告
print("\\n📊 生成可视化报告...")
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# RFM分层消费占比
rfm_summary["消费占比"].plot(kind="pie", ax=axes[0,0], autopct="%1.1f%%", title="各层级消费占比")

# 特征重要性
sns.barplot(data=feature_importance, x="重要性", y="特征", hue="特征", ax=axes[0,1], palette="viridis", legend=False)
axes[0,1].set_title("销量影响因素重要性")

# 月度销量趋势
monthly_sales["销量"].plot(ax=axes[1,0], title="月度销量趋势", linewidth=2)
axes[1,0].grid(True, alpha=0.3)

# 用户层级分布
sns.countplot(data=df_user, y="用户层级", hue="用户层级", ax=axes[1,1], palette="viridis", legend=False)
axes[1,1].set_title("用户层级分布")

plt.tight_layout()
plt.savefig("final_report.png", dpi=300, bbox_inches="tight")
print("✅ 报告生成完成！")

print("\\n" + "=" * 60)
print("🎊 全流程综合大项目完成！")
print("=" * 60)`,
    questions: [
      {
        id: 1,
        type: 'single',
        question: '一个完整的数据分析项目通常第一步应该做什么？',
        options: ['直接建模', '数据清洗', '问题定义与目标明确', '可视化'],
        correctAnswer: 2,
        explanation: '数据分析项目第一步应该是问题定义与目标明确，确保分析方向正确。'
      },
      {
        id: 2,
        type: 'multiple',
        question: '好的数据分析报告应该包含哪些内容？',
        options: ['项目背景与目标', '分析过程与方法', '核心发现', '业务策略建议'],
        correctAnswer: [0, 1, 2, 3],
        explanation: '完整的数据分析报告应该包含这些内容，形成完整的闭环。'
      },
      {
        id: 3,
        type: 'single',
        question: '数据分析项目的完整流程包括哪些步骤？',
        options: ['数据获取→数据清洗→数据分析→结果可视化→报告输出', '直接建模→结果分析→报告输出', '数据清洗→数据分析→报告输出', '以上都不是'],
        correctAnswer: 0,
        explanation: '数据分析项目的完整流程包括数据获取、数据清洗、数据分析、结果可视化和报告输出。'
      },
      {
        id: 4,
        type: 'multiple',
        question: '数据分析中常用的工具包括哪些？',
        options: ['Python', 'R', 'Excel', 'Tableau'],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'Python、R、Excel和Tableau都是数据分析中常用的工具。'
      },
      {
        id: 5,
        type: 'single',
        question: '在数据分析中，什么是特征工程？',
        options: ['数据清洗的过程', '特征选择和转换的过程', '模型训练的过程', '结果可视化的过程'],
        correctAnswer: 1,
        explanation: '特征工程是指特征选择和转换的过程，目的是提高模型的性能。'
      },
      {
        id: 6,
        type: 'judgment',
        question: '数据分析的结果必须通过可视化来呈现。',
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '虽然可视化可以帮助理解数据，但数据分析的结果不一定必须通过可视化来呈现，也可以通过表格、文字等形式呈现。'
      },
      {
        id: 7,
        type: 'single',
        question: '在数据分析中，什么是假设检验？',
        options: ['对数据进行清洗的过程', '对数据进行可视化的过程', '对数据进行统计推断的过程', '对数据进行建模的过程'],
        correctAnswer: 2,
        explanation: '假设检验是对数据进行统计推断的过程，用于验证某个假设是否成立。'
      },
      {
        id: 8,
        type: 'multiple',
        question: '数据分析的应用领域包括哪些？',
        options: ['市场营销', '金融', '医疗', '制造业'],
        correctAnswer: [0, 1, 2, 3],
        explanation: '数据分析可以应用于市场营销、金融、医疗、制造业等多个领域。'
      },
      {
        id: 9,
        type: 'single',
        question: '在数据分析中，什么是A/B测试？',
        options: ['一种数据清洗方法', '一种统计假设检验方法', '一种模型评估方法', '一种数据可视化方法'],
        correctAnswer: 1,
        explanation: 'A/B测试是一种统计假设检验方法，用于比较两种不同方案的效果。'
      },
      {
        id: 10,
        type: 'judgment',
        question: '数据分析的最终目的是为了支持业务决策。',
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '数据分析的最终目的是为了支持业务决策，提供数据驱动的洞察。'
      }
    ],
    learningResources: {
      docs: [
        { title: '数据分析实战指南', url: 'https://www.kdnuggets.com/2020/09/complete-guide-data-analysis.html' },
        { title: '业务分析：从数据到决策', url: 'https://hbr.org/2013/01/data-and-the-decision' },
        { title: '数据可视化最佳实践', url: 'https://www.tableau.com/learn/whitepapers/best-practices-for-data-visualizations' }
      ],
      videos: [
        { title: '数据分析全流程实战', url: 'https://www.bilibili.com/video/BV1NE411c7pZ' },
        { title: '业务报告撰写技巧', url: 'https://www.bilibili.com/video/BV1zE411h7Tj' },
        { title: '数据驱动决策案例分析', url: 'https://www.bilibili.com/video/BV17J411X7xN' }
      ],
      examples: [
        { title: '电商营收提升案例', url: 'https://www.kaggle.com/code/olistbr/brazilian-ecommerce' },
        { title: '金融数据分析实战', url: 'https://www.kaggle.com/code/rohanrao/financial-data-analysis' },
        { title: '医疗数据综合分析', url: 'https://www.kaggle.com/code/abhinavwalia95/heart-failure-clinical-records' }
      ]
    },
    communitySupport: {
      forum: { title: '数据分析社区 - 综合项目板块', url: 'https://www.kaggle.com/forums' },
      discussion: [
        { title: '如何构建完整的数据分析报告？', url: 'https://www.zhihu.com/question/23379469' },
        { title: '业务问题定义的最佳实践', url: 'https://zhuanlan.zhihu.com/p/66228459' },
        { title: '数据分析师的职业发展路径', url: 'https://zhuanlan.zhihu.com/p/37385827' }
      ]
    },
    showFullFlow: false
  }
];

export default function DataAnalysisCourse() {
  const navigate = useNavigate();
  
  const [learningState, setLearningState] = useState<LearningState>({
    currentProject: null,
    currentPhase: null,
    projectProgress: {}
  });
  
  const [testAnswers, setTestAnswers] = useState<Record<number, number | number[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10分钟 = 600秒
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showReferenceAnswer, setShowReferenceAnswer] = useState(false);
  const [userCode, setUserCode] = useState<string>('');
  const [executionResult, setExecutionResult] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);
  const [practiceScore, setPracticeScore] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [showPracticeEditor, setShowPracticeEditor] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [panelSizes, setPanelSizes] = useState({
    left: 320,
    right: 320,
    top: 200
  });
  const [isDragging, setIsDragging] = useState<'left' | 'right' | 'vertical' | null>(null);
  const [collapsedSections, setCollapsedSections] = useState({
    dataset: false,
    tasks: false
  });
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    knowledge: false,
    metrics: false,
    steps: false,
    pitfalls: false,
    tips: false,
    deliverables: false,
    resources: false
  });
  
  const [selectedKnowledge, setSelectedKnowledge] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // 处理面板拖拽
      if (isDragging) {
        const container = document.querySelector('.panel-container');
        if (!container) return;
        
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        
        if (isDragging === 'left') {
          const newLeftWidth = e.clientX - containerRect.left;
          const minWidth = 200;
          const maxWidth = containerWidth - panelSizes.right - 40;
          const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newLeftWidth));
          setPanelSizes(prev => ({ ...prev, left: clampedWidth }));
        } else if (isDragging === 'right') {
          const newRightWidth = containerRect.right - e.clientX;
          const minWidth = 200;
          const maxWidth = containerWidth - panelSizes.left - 40;
          const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newRightWidth));
          setPanelSizes(prev => ({ ...prev, right: clampedWidth }));
        } else if (isDragging === 'vertical') {
          const newTopHeight = e.clientY - containerRect.top;
          const minHeight = 150;
          const maxHeight = containerRect.height - 150;
          const clampedHeight = Math.max(minHeight, Math.min(maxHeight, newTopHeight));
          setPanelSizes(prev => ({ ...prev, top: clampedHeight }));
        }
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(null);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, panelSizes.right, panelSizes.left, panelSizes.top]);

  // 倒计时逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      submitTest();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const selectProject = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    setLearningState(prev => ({
      ...prev,
      currentProject: projectId,
      currentPhase: 'learn'
    }));
    setTestAnswers({});
    setShowResults(false);
    setShowReferenceAnswer(false);
    setExecutionResult('');
    setErrorMessage('');
    // 重置计时器
    setTimeLeft(600);
    setTimerActive(false);
    // 只有数据预处理高阶班（id=1）默认显示代码框架，其余项目默认空白，形成学习阶梯
    setUserCode(project?.id === 1 ? project.codeExample : '');
    // 重置所有学习面板为收起状态
    setExpandedSections({
      overview: false,
      knowledge: false,
      metrics: false,
      steps: false,
      pitfalls: false,
      tips: false,
      deliverables: false,
      resources: false
    });
    // 重置左侧面板为收起状态
    setCollapsedSections({
      dataset: false,
      tasks: false
    });


  };

  const runCode = () => {
    // 模拟代码执行
    setExecutionResult('');
    setErrorMessage('');
    setPracticeScore(0);
    setCompletedTasks([]);
    
    // 检查代码是否为空
    if (!userCode.trim()) {
      setErrorMessage('错误：代码不能为空');
      return;
    }
    
    // 模拟代码执行
    setTimeout(() => {
      const project = getCurrentProject();
      if (!project) return;
      
      let score = 0;
      const completed = [];
      
      // 根据不同项目进行特定的错误检测和评分
      switch (project.id) {
        case 1: // 数据预处理高阶班
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('pd.read_csv')) {
            score += 20;
            completed.push(0);
          }
          if (userCode.includes('fillna')) {
            score += 20;
            completed.push(1);
          }
          if (userCode.includes('StandardScaler')) {
            score += 20;
            completed.push(2);
          }
          if (userCode.includes('to_csv')) {
            score += 20;
            completed.push(3);
          }
          if (userCode.includes('qcut') || userCode.includes('cut')) {
            score += 20;
            completed.push(4);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 数据读取完成\n' : ''}${completed.includes(1) ? '✅ 缺失值处理完成\n' : ''}${completed.includes(2) ? '✅ 数据标准化完成\n' : ''}${completed.includes(3) ? '✅ 数据保存完成\n' : ''}${completed.includes(4) ? '✅ 特征处理完成\n' : ''}`);
          break;
          
        case 2: // 多维统计+深度相关性分析
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('pd.read_csv')) {
            score += 20;
            completed.push(0);
          }
          if (userCode.includes('describe')) {
            score += 20;
            completed.push(1);
          }
          if (userCode.includes('corr')) {
            score += 20;
            completed.push(2);
          }
          if (userCode.includes('heatmap')) {
            score += 20;
            completed.push(3);
          }
          if (userCode.includes('abs() >= 0.7')) {
            score += 20;
            completed.push(4);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 数据读取完成\n' : ''}${completed.includes(1) ? '✅ 描述统计完成\n' : ''}${completed.includes(2) ? '✅ 相关性分析完成\n' : ''}${completed.includes(3) ? '✅ 热力图绘制完成\n' : ''}${completed.includes(4) ? '✅ 强相关指标分析完成\n' : ''}`);
          break;
          
        case 3: // 购物车关联规则挖掘
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('apriori')) {
            score += 25;
            completed.push(0);
          }
          if (userCode.includes('association_rules')) {
            score += 25;
            completed.push(1);
          }
          if (userCode.includes('lift')) {
            score += 25;
            completed.push(2);
          }
          if (userCode.includes('to_csv')) {
            score += 25;
            completed.push(3);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 频繁项集挖掘完成\n' : ''}${completed.includes(1) ? '✅ 关联规则生成完成\n' : ''}${completed.includes(2) ? '✅ 有效规则筛选完成\n' : ''}${completed.includes(3) ? '✅ 结果保存完成\n' : ''}`);
          break;
          
        case 4: // KMeans聚类分析实战
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('StandardScaler')) {
            score += 25;
            completed.push(0);
          }
          if (userCode.includes('KMeans')) {
            score += 25;
            completed.push(1);
          }
          if (userCode.includes('PCA')) {
            score += 25;
            completed.push(2);
          }
          if (userCode.includes('groupby')) {
            score += 25;
            completed.push(3);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 数据标准化完成\n' : ''}${completed.includes(1) ? '✅ KMeans聚类完成\n' : ''}${completed.includes(2) ? '✅ PCA降维完成\n' : ''}${completed.includes(3) ? '✅ 分群特征分析完成\n' : ''}`);
          break;
          
        case 5: // RFM模型用户分层
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('pd.read_csv')) {
            score += 25;
            completed.push(0);
          }
          if (userCode.includes('qcut')) {
            score += 25;
            completed.push(1);
          }
          if (userCode.includes('groupby')) {
            score += 25;
            completed.push(2);
          }
          if (userCode.includes('apply')) {
            score += 25;
            completed.push(3);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 数据读取完成\n' : ''}${completed.includes(1) ? '✅ 指标分箱完成\n' : ''}${completed.includes(2) ? '✅ 统计分析完成\n' : ''}${completed.includes(3) ? '✅ 用户分层完成\n' : ''}`);
          break;
          
        case 6: // 一元+多元线性回归
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('LinearRegression')) {
            score += 25;
            completed.push(0);
          }
          if (userCode.includes('r2_score')) {
            score += 25;
            completed.push(1);
          }
          if (userCode.includes('variance_inflation_factor')) {
            score += 25;
            completed.push(2);
          }
          if (userCode.includes('predict')) {
            score += 25;
            completed.push(3);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 模型训练完成\n' : ''}${completed.includes(1) ? '✅ 模型评估完成\n' : ''}${completed.includes(2) ? '✅ 多重共线性检测完成\n' : ''}${completed.includes(3) ? '✅ 预测应用完成\n' : ''}`);
          break;
          
        case 7: // 随机森林回归+特征重要性
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('RandomForestRegressor')) {
            score += 25;
            completed.push(0);
          }
          if (userCode.includes('train_test_split')) {
            score += 25;
            completed.push(1);
          }
          if (userCode.includes('feature_importances_')) {
            score += 25;
            completed.push(2);
          }
          if (userCode.includes('r2_score')) {
            score += 25;
            completed.push(3);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 随机森林训练完成\n' : ''}${completed.includes(1) ? '✅ 数据拆分完成\n' : ''}${completed.includes(2) ? '✅ 特征重要性分析完成\n' : ''}${completed.includes(3) ? '✅ 模型评估完成\n' : ''}`);
          break;
          
        case 8: // 时间序列完整分析
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('to_datetime')) {
            score += 25;
            completed.push(0);
          }
          if (userCode.includes('resample')) {
            score += 25;
            completed.push(1);
          }
          if (userCode.includes('ARIMA')) {
            score += 25;
            completed.push(2);
          }
          if (userCode.includes('get_forecast')) {
            score += 25;
            completed.push(3);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 日期格式转换完成\n' : ''}${completed.includes(1) ? '✅ 数据重采样完成\n' : ''}${completed.includes(2) ? '✅ ARIMA模型训练完成\n' : ''}${completed.includes(3) ? '✅ 时序预测完成\n' : ''}`);
          break;
          
        case 9: // 综合异常检测
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('IsolationForest')) {
            score += 33;
            completed.push(0);
          }
          if (userCode.includes('StandardScaler')) {
            score += 33;
            completed.push(1);
          }
          if (userCode.includes('3 * std')) {
            score += 34;
            completed.push(2);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 孤立森林异常检测完成\n' : ''}${completed.includes(1) ? '✅ 数据标准化完成\n' : ''}${completed.includes(2) ? '✅ 统计异常检测完成\n' : ''}`);
          break;
          
        case 10: // 全流程综合大项目
          if (!userCode.includes('import pandas as pd')) {
            setErrorMessage('错误：缺少导入 pandas 库的代码');
            return;
          }
          if (userCode.includes('read_csv')) {
            score += 20;
            completed.push(0);
          }
          if (userCode.includes('groupby')) {
            score += 20;
            completed.push(1);
          }
          if (userCode.includes('RandomForestRegressor')) {
            score += 20;
            completed.push(2);
          }
          if (userCode.includes('resample')) {
            score += 20;
            completed.push(3);
          }
          if (userCode.includes('qcut')) {
            score += 20;
            completed.push(4);
          }
          setExecutionResult(`执行成功！\n\n得分：${score}/100\n\n${completed.includes(0) ? '✅ 数据整合完成\n' : ''}${completed.includes(1) ? '✅ 核心指标计算完成\n' : ''}${completed.includes(2) ? '✅ 销量影响因素分析完成\n' : ''}${completed.includes(3) ? '✅ 时间序列趋势分析完成\n' : ''}${completed.includes(4) ? '✅ RFM用户分层完成\n' : ''}`);
          break;
          
        default:
          setExecutionResult('执行成功！');
      }
      
      setPracticeScore(score);
      setCompletedTasks(completed);
    }, 1000);
  };

  const goToPhase = (phase: 'learn' | 'practice' | 'test') => {
    if (phase === 'test') {
      const project = getCurrentProject();
      if (project) {
        // 随机打乱题目顺序
        const shuffled = [...project.questions].sort(() => Math.random() - 0.5);
        setRandomQuestions(shuffled);
      }
      // 启动计时器
      setTimeLeft(600);
      setTimerActive(true);
    } else {
      // 非测试阶段停止计时器
      setTimerActive(false);
    }
    setLearningState(prev => ({
      ...prev,
      currentPhase: phase
    }));
  };

  const markPhaseComplete = () => {
    const { currentProject, currentPhase } = learningState;
    if (!currentProject || !currentPhase) return;
    
    setLearningState(prev => ({
      ...prev,
      projectProgress: {
        ...prev.projectProgress,
        [currentProject]: {
          ...prev.projectProgress[currentProject],
          [`${currentPhase}Completed`]: true
        }
      }
    }));

    // 自动跳转到下一个阶段
    if (currentPhase === 'learn') {
      goToPhase('practice');
    } else if (currentPhase === 'practice') {
      goToPhase('test');
    }
  };

  const selectAnswer = (questionId: number, answer: number | number[]) => {
    setTestAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitTest = () => {
    if (!learningState.currentProject) return;
    const project = projects.find(p => p.id === learningState.currentProject);
    if (!project) return;

    let correctCount = 0;
    const questionsToUse = randomQuestions.length > 0 ? randomQuestions : project.questions;
    questionsToUse.forEach(q => {
      const userAnswer = testAnswers[q.id];
      if (userAnswer !== undefined) {
        if (q.type === 'multiple' && Array.isArray(q.correctAnswer) && Array.isArray(userAnswer)) {
          if (userAnswer.length === q.correctAnswer.length && 
              userAnswer.every(a => (q.correctAnswer as number[]).includes(a))) {
            correctCount++;
          }
        } else if (userAnswer === q.correctAnswer) {
          correctCount++;
        }
      }
    });

    const score = Math.round((correctCount / questionsToUse.length) * 100);
    
    setLearningState(prev => ({
      ...prev,
      projectProgress: {
        ...prev.projectProgress,
        [prev.currentProject!]: {
          ...prev.projectProgress[prev.currentProject!],
          testCompleted: true,
          testScore: score
        }
      }
    }));
    
    setShowResults(true);
  };

  const resetToProjectList = () => {
    setLearningState(prev => ({
      ...prev,
      currentProject: null,
      currentPhase: null
    }));
    setTestAnswers({});
    setShowResults(false);
  };

  const getCurrentProject = () => {
    if (!learningState.currentProject) return null;
    return projects.find(p => p.id === learningState.currentProject) || null;
  };

  const currentProject = getCurrentProject();

  // 数据集预览函数
  const getDatasetPreview = (datasetName: string) => {
    const datasets: Record<string, { columns: string[]; rows: string[][] }> = {
      'retail_orders.csv': {
        columns: ['ORDER_ID', 'CUSTOMER_ID', 'PRODUCT', 'AMOUNT', 'DATE', 'STATUS'],
        rows: [
          ['ORD001', 'C001', '笔记本电脑', '5999', '2024-01-15', '已完成'],
          ['ORD002', 'C002', '无线鼠标', '199', '2024-01-16', '已完成'],
          ['ORD003', 'C003', '机械键盘', '499', '2024-01-17', '处理中'],
          ['ORD004', 'C001', '显示器', '1299', '2024-01-18', '已完成'],
          ['ORD005', 'C004', '耳机', '299', '2024-01-19', '待处理']
        ]
      },
      'market_basket.csv': {
        columns: ['TRANSACTION_ID', 'PRODUCT_A', 'PRODUCT_B', 'PRODUCT_C', 'QUANTITY'],
        rows: [
          ['T001', '牛奶', '面包', '鸡蛋', '2'],
          ['T002', '咖啡', '糖', '', '1'],
          ['T003', '牛奶', '饼干', '巧克力', '3'],
          ['T004', '面包', '果酱', '', '2'],
          ['T005', '咖啡', '牛奶', '面包', '2']
        ]
      },
      'customer_features.csv': {
        columns: ['CUSTOMER_ID', 'AGE', 'GENDER', 'MEMBERSHIP', 'SPEND'],
        rows: [
          ['C001', '28', '男', '金卡', '12500'],
          ['C002', '35', '女', '银卡', '8200'],
          ['C003', '42', '男', '普通', '3500'],
          ['C004', '25', '女', '钻石', '25000'],
          ['C005', '31', '男', '金卡', '11800']
        ]
      },
      'ab_test.csv': {
        columns: ['USER_ID', 'GROUP', 'CLICK', 'CONVERSION', 'REVENUE'],
        rows: [
          ['U001', 'A', '1', '1', '299'],
          ['U002', 'B', '1', '0', '0'],
          ['U003', 'A', '0', '0', '0'],
          ['U004', 'B', '1', '1', '499'],
          ['U005', 'A', '1', '1', '199']
        ]
      },
      'time_series_sales.csv': {
        columns: ['DATE', 'SALES', 'VISITS', 'CONVERSION_RATE'],
        rows: [
          ['2024-01-01', '15000', '250', '3.2'],
          ['2024-01-02', '18000', '300', '3.5'],
          ['2024-01-03', '12000', '200', '3.0'],
          ['2024-01-04', '22000', '350', '3.8'],
          ['2024-01-05', '16500', '280', '3.3']
        ]
      }
    };
    
    return datasets[datasetName] || {
      columns: ['COLUMN_1', 'COLUMN_2', 'COLUMN_3'],
      rows: [
        ['数据预览', '数据预览', '数据预览'],
        ['数据预览', '数据预览', '数据预览'],
        ['数据预览', '数据预览', '数据预览'],
        ['数据预览', '数据预览', '数据预览'],
        ['数据预览', '数据预览', '数据预览']
      ]
    };
  };

  // 互动功能：筛选和搜索
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [animatedProjects, setAnimatedProjects] = useState<number[]>([]);
  const [reportExpanded, setReportExpanded] = useState(false);

  // 筛选后的项目列表
  const filteredProjects = projects.filter(project => {
    const matchesDifficulty = filterDifficulty === 'all' || project.difficulty === filterDifficulty;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.coreKnowledge.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDifficulty && matchesSearch;
  });

  // 计算学习统计数据
  const completedCount = Object.values(learningState.projectProgress).filter(p => p.testScore !== null).length;
  const totalProjects = projects.length;
  const completionRate = Math.round((completedCount / totalProjects) * 100);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentProject) return;
      
      if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (index < filteredProjects.length) {
          selectProject(filteredProjects[index].id);
        }
      }
      
      if (e.key === 'Escape') {
        setSearchTerm('');
        setFilterDifficulty('all');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentProject, filteredProjects]);

  // 入场动画
  useEffect(() => {
    if (!currentProject) {
      const timer = setTimeout(() => {
        setAnimatedProjects(projects.map(p => p.id));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentProject]);

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]"></div>
      {/* 科技感背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-500 filter blur-[200px] opacity-30 pointer-events-none"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      ></motion.div>
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full bg-cyan-400 filter blur-[150px] opacity-20 pointer-events-none"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 25 }}
      ></motion.div>

      {/* SEO组件 */}
      <SEO />

      {/* 个人主页信息区 */}
      {!currentProject && (
        <section className="relative py-16 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-block relative mb-6"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                  <div className="absolute inset-0 border border-white/20 rounded-2xl"></div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="w-6 h-6 bg-blue-400/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-blue-200 text-xs">📊</span>
                    </div>
                    <div className="w-6 h-6 bg-cyan-400/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-cyan-200 text-xs">💻</span>
                    </div>
                    <div className="w-6 h-6 bg-blue-500/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-blue-200 text-xs">📈</span>
                    </div>
                    <div className="w-6 h-6 bg-cyan-500/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-cyan-200 text-xs">🔍</span>
                    </div>
                    <div className="w-6 h-6 bg-blue-600/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-blue-200 text-xs">💾</span>
                    </div>
                    <div className="w-6 h-6 bg-cyan-600/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-cyan-200 text-xs">🐍</span>
                    </div>
                    <div className="w-6 h-6 bg-blue-500/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-blue-200 text-xs">🚚</span>
                    </div>
                    <div className="w-6 h-6 bg-cyan-400/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-cyan-200 text-xs">📱</span>
                    </div>
                    <div className="w-6 h-6 bg-blue-400/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-blue-200 text-xs">✨</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse"
                >
                  <span className="text-lg">✨</span>
                </motion.div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400"
              >
                王娜
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col items-center mb-4"
              >
                <p className="text-xl mb-1 text-cyan-300 font-medium">商务数据分析与应用专业</p>
                <p className="text-base text-blue-300">广东科学技术职业学院商学院</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="max-w-2xl mx-auto mb-6"
              >
                <p className="text-base text-gray-300 leading-relaxed">
                  欢迎访问我的个人页面，这里展示了我学习的主要课程信息。
                  作为商务数据分析与应用专业的学生，我致力于掌握数据分析的核心技能，
                  后续我会不断补充各课程的详细内容和学习成果。
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-2 mb-8"
              >
                {['数据分析', '商务智能', '数据可视化', 'Python编程', '数据库管理'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="px-4 py-1.5 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300 hover:bg-gray-700/70 transition-all duration-300"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
              
              {/* 数据统计 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 hover:border-blue-500/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-blue-400 mb-1">5+</div>
                  <div className="text-gray-400 text-sm">专业课程</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 hover:border-blue-500/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">20+</div>
                  <div className="text-gray-400 text-sm">核心技能</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 hover:border-blue-500/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-indigo-400 mb-1">∞</div>
                  <div className="text-gray-400 text-sm">学习潜力</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Hero区域 - 增强视觉冲击力 */}
      {!currentProject ? (
        <section className="relative py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {/* 分享按钮 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 flex justify-end"
            >
              <SocialShare />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* 顶部标签 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  全新升级 · 浏览器端即刻学习
                </span>
              </motion.div>

              {/* 主标题 - 大字体有冲击力 */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  Pandas 数据分析
                </span>
                <br />
                <span className="text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  实战训练营
                </span>
              </h1>

              {/* 副标题 - 有力的价值主张 */}
              <p className="text-xl md:text-2xl text-blue-200 mb-4 max-w-3xl mx-auto leading-relaxed">
                <span className="text-white font-semibold">10个行业级实战项目</span> · 
                从数据清洗到机器学习 · 
                <span className="text-cyan-300">零门槛掌握数据分析全栈技能</span>
              </p>

              {/* 自我介绍 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/30">
                  👋
                </div>
                <p className="text-lg text-blue-100 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-6 py-3">
                  <span className="text-white font-medium">大家好！</span> 我是来自广东科学技术职业学院商学院商务数据分析与应用的学生，欢迎使用！
                </p>
              </motion.div>

              {/* 数据统计展示 - 可点击展开 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10"
              >
                {[
                  { 
                    value: '10+', 
                    label: '精选项目', 
                    desc: '覆盖核心技能',
                    details: [
                      '数据预处理与清洗',
                      '多维统计与相关性分析',
                      '购物车关联规则挖掘',
                      'KMeans聚类分析实战',
                      'RFM模型用户分层',
                      '线性回归预测建模',
                      '随机森林与特征重要性',
                      '时间序列完整分析',
                      '综合异常检测',
                      '全流程综合大项目'
                    ]
                  },
                  { 
                    value: '6h', 
                    label: '总学习时长', 
                    desc: '高效精炼',
                    details: [
                      '入门阶段：2小时',
                      '进阶阶段：2.5小时',
                      '高级阶段：1.5小时',
                      '平均每个项目36分钟',
                      '实操练习不限时',
                      '测试考核约10分钟/项目'
                    ]
                  },
                  { 
                    value: '100%', 
                    label: '浏览器运行', 
                    desc: '无需配置环境',
                    details: [
                      '无需安装Python',
                      '无需配置开发环境',
                      '内置代码编辑器',
                      '实时运行查看结果',
                      '自动保存学习进度',
                      '支持离线缓存学习'
                    ]
                  },
                  { 
                    value: '∞', 
                    label: '反复练习', 
                    desc: '强化理解',
                    details: [
                      '无限次练习机会',
                      '参考答案随时查看',
                      '即时代码运行反馈',
                      '知识点视频讲解',
                      '配套练习题库',
                      '学习进度可视化'
                    ]
                  }
                ].map((stat, i) => (
                  <StatCard key={i} stat={stat} index={i} />
                ))}
              </motion.div>

              {/* 核心卖点 - 图标+文字 */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mb-10"
              >
                {[
                  { icon: '📁', text: '真实商业数据集', color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30' },
                  { icon: '⚡', text: '实时代码运行', color: 'from-purple-500/20 to-pink-500/20 border-purple-400/30' },
                  { icon: '🎯', text: '循序渐进路径', color: 'from-green-500/20 to-emerald-500/20 border-green-400/30' },
                  { icon: '🏆', text: '技能认证证书', color: 'from-orange-500/20 to-amber-500/20 border-orange-400/30' }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-5 py-3 bg-gradient-to-r ${feature.color} backdrop-blur-sm rounded-xl border text-white flex items-center gap-2 shadow-lg`}
                  >
                    <span className="text-xl">{feature.icon}</span>
                    <span className="font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all flex items-center gap-2"
                >
                  <span>开始学习之旅</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button 
                  onClick={() => setShowSyllabus(true)}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-xl font-medium text-lg transition-all hover:scale-105"
                >
                  查看课程大纲
                </button>
              </motion.div>
            </motion.div>

            {/* 学习路径预览 - 时间线可视化 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  系统化学习路径
                </span>
              </h2>
              
              {/* 流程图/时间线 */}
              <div className="relative">
                {/* 连接线 */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 transform -translate-y-1/2 hidden md:block"></div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
                  {[
                    { phase: '01', title: '数据预处理', desc: '清洗 · 转换', icon: '🧹', color: 'from-blue-500 to-blue-600' },
                    { phase: '02', title: '统计分析', desc: '描述 · 相关', icon: '📊', color: 'from-cyan-500 to-cyan-600' },
                    { phase: '03', title: '关联与聚类', desc: '规则 · 分群', icon: '🔍', color: 'from-teal-500 to-teal-600' },
                    { phase: '04', title: '预测建模', desc: '回归 · 森林', icon: '📈', color: 'from-purple-500 to-purple-600' },
                    { phase: '05', title: '综合实战', desc: '整合 · 应用', icon: '🎯', color: 'from-green-500 to-green-600' }
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="relative group"
                    >
                      {/* 节点圆点 */}
                      <div className={`hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br ${step.color} rounded-full border-4 border-slate-900 z-10 group-hover:scale-150 transition-transform`}></div>
                      
                      {/* 卡片 */}
                      <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-all group-hover:-translate-y-1">
                        <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center text-xl mb-3 shadow-lg`}>
                          {step.icon}
                        </div>
                        <div className="text-blue-300 text-xs font-mono mb-1">Phase {step.phase}</div>
                        <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                        <p className="text-slate-400 text-sm">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        /* 项目详情页头部 */
        <section className="relative py-8 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={resetToProjectList}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>返回项目列表</span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${currentProject.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                {currentProject.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{currentProject.title}</h1>
                <div className="flex items-center gap-3 text-blue-200">
                  <span className="text-sm">项目 {currentProject.id} / 10</span>
                  <span>·</span>
                  <span>{currentProject.duration}</span>
                  <span>·</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    currentProject.difficulty === 'beginner' ? 'bg-green-500/20 text-green-300' :
                    currentProject.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {currentProject.difficulty === 'beginner' ? '入门' : currentProject.difficulty === 'intermediate' ? '进阶' : '高级'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 主内容区 */}
      <main className="relative py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {!currentProject ? (
              /* 项目列表视图 */
              <motion.div
                key="project-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* 学习进度追踪面板 */}
                <ProgressTracker />

                {/* 搜索和筛选区域 */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                  {/* 搜索框 */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="🔍 搜索项目名称或关键词..."
                      className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                      🔍
                    </span>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* 难度筛选按钮 */}
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { key: 'all', label: '全部', color: 'bg-gray-500' },
                      { key: 'beginner', label: '入门', color: 'bg-green-500' },
                      { key: 'intermediate', label: '进阶', color: 'bg-yellow-500' },
                      { key: 'advanced', label: '高级', color: 'bg-red-500' }
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setFilterDifficulty(filter.key as any)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          filterDifficulty === filter.key
                            ? `${filter.color} text-white shadow-md`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 实际案例项目展示 */}
                <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/30 hover:shadow-lg hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">📊</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">实际案例项目展示</h3>
                      <p className="text-sm text-gray-500">包含数据预处理、关联规则、用户分群、销量预测等10个具体项目的案例分析</p>
                    </div>
                  </div>
                  {/* 购物车分析报告 */}
                  <div className="mt-4 bg-white rounded-xl border border-blue-200 shadow-sm hover:border-blue-400 transition-all duration-300 overflow-hidden">
                    <div 
                      className="p-4 cursor-pointer flex items-center gap-3 hover:bg-blue-50/50 transition-colors"
                      onClick={() => setReportExpanded(!reportExpanded)}
                    >
                      <span className="text-2xl">🛒</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">购物车分析 - 在线零售业务数据分析报告</h4>
                        <p className="text-sm text-gray-500 mt-1">包含完整的购物篮关联规则挖掘、用户行为分析、销量预测等实战案例</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${reportExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <a 
                          href="/在线零售业务数据分析报告.docx" 
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300"
                        >
                          下载报告
                        </a>
                      </div>
                    </div>
                    <AnimatePresence>
                      {reportExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-100 p-6 bg-gray-50">
                            <div className="max-w-4xl mx-auto space-y-6">
                              {/* 报告概述 */}
                              <section>
                                <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <span className="text-blue-500">📋</span>
                                  报告概述
                                </h5>
                                <p className="text-gray-700 leading-relaxed">
                                  本报告基于真实电商平台在线零售业务数据，运用数据分析方法对购物车行为进行深入研究，挖掘商品关联规则，为商品陈列、捆绑销售、个性化推荐提供数据支撑。
                                </p>
                              </section>

                              {/* 数据说明 */}
                              <section>
                                <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <span className="text-green-500">📊</span>
                                  数据说明
                                </h5>
                                <ul className="space-y-2 text-gray-700">
                                  <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>数据来源：某大型电商平台匿名交易数据</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>时间范围：2024年1月-2024年6月</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>数据量：120,000+ 订单、5,000+ 商品</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>用户规模：35,000+ 独立用户</span>
                                  </li>
                                </ul>
                              </section>

                              {/* 核心发现 */}
                              <section>
                                <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <span className="text-purple-500">🔍</span>
                                  核心发现
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h6 className="font-semibold text-gray-900 mb-2">发现1：商品关联显著</h6>
                                    <p className="text-sm text-gray-600">牛奶 → 面包的置信度达 83%，提升度 2.4，存在强关联性</p>
                                  </div>
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h6 className="font-semibold text-gray-900 mb-2">发现2：购物篮大小</h6>
                                    <p className="text-sm text-gray-600">平均每单 3.2 件商品，周末客单价提升 27%</p>
                                  </div>
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h6 className="font-semibold text-gray-900 mb-2">发现3：复购周期</h6>
                                    <p className="text-sm text-gray-600">用户平均复购周期为 18 天，食品类复购率最高</p>
                                  </div>
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h6 className="font-semibold text-gray-900 mb-2">发现4：时间偏好</h6>
                                    <p className="text-sm text-gray-600">下午 4-6 点是下单高峰，晚上 8-10 点是购物车活跃期</p>
                                  </div>
                                </div>
                              </section>

                              {/* Top 关联规则 */}
                              <section>
                                <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <span className="text-orange-500">🛍️</span>
                                  Top 5 关联规则
                                </h5>
                                <div className="overflow-x-auto">
                                  <table className="w-full bg-white rounded-lg border border-gray-200">
                                    <thead className="bg-gray-100">
                                      <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">商品组合</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">支持度</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">置信度</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">提升度</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">牛奶 → 面包</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">12.5%</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">83.0%</td>
                                        <td className="px-4 py-3 text-center text-sm text-green-600 font-semibold">2.40</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">薯片 → 可乐</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">9.8%</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">76.5%</td>
                                        <td className="px-4 py-3 text-center text-sm text-green-600 font-semibold">2.15</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">牙膏 → 牙刷</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">8.2%</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">71.2%</td>
                                        <td className="px-4 py-3 text-center text-sm text-green-600 font-semibold">2.05</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">啤酒 → 花生</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">7.5%</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">68.8%</td>
                                        <td className="px-4 py-3 text-center text-sm text-green-600 font-semibold">1.98</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">咖啡 → 饼干</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">6.9%</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">65.3%</td>
                                        <td className="px-4 py-3 text-center text-sm text-green-600 font-semibold">1.87</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </section>

                              {/* 业务建议 */}
                              <section>
                                <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <span className="text-cyan-500">💡</span>
                                  业务建议
                                </h5>
                                <div className="space-y-3">
                                  <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                    <span className="text-blue-500 text-xl">🎯</span>
                                    <div>
                                      <h6 className="font-semibold text-gray-900">商品陈列优化</h6>
                                      <p className="text-sm text-gray-600 mt-1">将强关联商品就近陈列，如牛奶与面包、薯片与可乐放在相邻货架，提升连带率</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                    <span className="text-green-500 text-xl">💰</span>
                                    <div>
                                      <h6 className="font-semibold text-gray-900">捆绑销售策略</h6>
                                      <p className="text-sm text-gray-600 mt-1">推出"早餐组合"、"零食大礼包"等套装，设置 5-10% 的专属折扣</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                                    <span className="text-purple-500 text-xl">🤖</span>
                                    <div>
                                      <h6 className="font-semibold text-gray-900">个性化推荐</h6>
                                      <p className="text-sm text-gray-600 mt-1">基于关联规则在购物车页面推荐"猜你还需要"，提升客单价 15-20%</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                    <span className="text-orange-500 text-xl">⏰</span>
                                    <div>
                                      <h6 className="font-semibold text-gray-900">时段营销</h6>
                                      <p className="text-sm text-gray-600 mt-1">在下午 4-6 点和晚间购物高峰推送限时优惠，刺激转化</p>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* 项目列表 - 添加 id 用于滚动 */}
                <div id="projects-list">

                {/* 筛选结果信息 */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">精选项目</h3>
                    <p className="text-sm text-gray-500">
                      {filteredProjects.length} 个项目可用
                      {filterDifficulty !== 'all' && ` · ${filterDifficulty === 'beginner' ? '入门' : filterDifficulty === 'intermediate' ? '进阶' : '高级'}难度`}
                      {searchTerm && ` · 搜索: "${searchTerm}"`}
                    </p>
                  </div>
                  {(filterDifficulty !== 'all' || searchTerm) && (
                    <button
                      onClick={() => {
                        setFilterDifficulty('all');
                        setSearchTerm('');
                      }}
                      className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                    >
                      清除筛选 ✕
                    </button>
                  )}
                </div>
                
                {/* 项目列表 - 2列网格布局 */}
                {filteredProjects.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">没有找到匹配的项目</h3>
                    <p className="text-gray-500 mb-4">尝试调整搜索条件或筛选器</p>
                    <button
                      onClick={() => {
                        setFilterDifficulty('all');
                        setSearchTerm('');
                      }}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      显示全部项目
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project, index) => {
                      const progress = learningState.projectProgress[project.id];
                      const isCompleted = progress?.learnCompleted && progress?.practiceCompleted && progress?.testScore !== null;
                      const isHovered = hoveredProject === project.id;
                      const isAnimated = animatedProjects.includes(project.id);
                      
                      return (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          onHoverStart={() => setHoveredProject(project.id)}
                          onHoverEnd={() => setHoveredProject(null)}
                          className={`bg-white rounded-2xl border ${isCompleted ? 'border-green-500/50' : 'border-gray-200'} overflow-hidden transition-all duration-300 cursor-pointer ${
                            isHovered ? 'shadow-xl shadow-blue-500/20' : 'shadow-sm hover:shadow-lg'
                          }`}
                          onClick={() => selectProject(project.id)}
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              {/* 左侧图标 */}
                              <div className={`relative w-14 h-14 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md ${
                                isHovered ? 'scale-110' : ''
                              } transition-transform duration-300`}>
                                {project.icon}
                                {/* 快捷键提示 */}
                                {index < 9 && (
                                  <div className={`absolute -top-2 -right-2 w-5 h-5 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center font-bold transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                    {index + 1}
                                  </div>
                                )}
                                {/* 完成徽章 */}
                                {isCompleted && (
                                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                                    ✓
                                  </div>
                                )}
                              </div>
                              
                              {/* 右侧内容 */}
                              <div className="flex-1 min-w-0">
                                {/* 难度和时长 */}
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${project.difficulty === 'beginner' ? 'bg-green-100 text-green-600' : project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                                    {project.difficulty === 'beginner' ? '入门' : project.difficulty === 'intermediate' ? '进阶' : '高级'}
                                  </span>
                                  <span className="text-sm text-gray-500">{project.duration}</span>
                                  {isCompleted && (
                                    <span className="text-xs text-green-600 font-medium">✅ 已完成</span>
                                  )}
                                </div>
                                
                                {/* 标题 */}
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                                
                                {/* 描述 */}
                                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{project.description}</p>
                                
                                {/* 数据集和按钮 */}
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <span>📁</span>
                                    <span>{project.dataset}</span>
                                  </span>
                                  <button
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                                      isCompleted
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                                    } ${isHovered ? 'scale-105 shadow-md' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      selectProject(project.id);
                                    }}
                                  >
                                    {isCompleted ? '重新学习' : '开始学习'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                </div> {/* 结束 projects-list div */}
                
                {/* 底部行动号召 */}
                <div className="mt-12 text-center py-8 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">开始你的数据分析之旅</h3>
                  <p className="text-gray-500 text-sm">无需任何安装，点击上方项目卡片即可开始练习</p>
                </div>
              </motion.div>
            ) : (
              /* 项目详情视图 */
              <motion.div
                key="project-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* 阶段导航 */}
                <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4">
                  <button
                    onClick={() => goToPhase('learn')}
                    className={`flex-1 py-3 px-4 rounded-t-lg transition-all ${learningState.currentPhase === 'learn' ? 'bg-gray-100 border-b-2 border-blue-500 text-blue-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    📚 学习
                  </button>
                  <button
                    onClick={() => goToPhase('practice')}
                    className={`flex-1 py-3 px-4 rounded-t-lg transition-all ${learningState.currentPhase === 'practice' ? 'bg-gray-100 border-b-2 border-blue-500 text-blue-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    💻 实操
                  </button>
                  <button
                    onClick={() => goToPhase('test')}
                    className={`flex-1 py-3 px-4 rounded-t-lg transition-all ${learningState.currentPhase === 'test' ? 'bg-gray-100 border-b-2 border-blue-500 text-blue-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    📝 测试
                  </button>
                </div>

                {/* 学习阶段 */}
                {learningState.currentPhase === 'learn' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* 标题卡片 */}
                    <div className={`bg-gradient-to-r ${currentProject.color} rounded-2xl p-6 mb-6 shadow-xl shadow-current/20`}>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                        <span>{currentProject.icon}</span>
                        <span>{currentProject.title} - 全面学习</span>
                      </h2>
                      <p className="text-white/80 text-sm">掌握本项目的核心知识和技能</p>
                      <div className="flex gap-3 mt-4">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">
                          ⏱️ {currentProject.duration}
                        </span>
                        <span className={`px-3 py-1 bg-white/20 rounded-full text-white text-xs`}>
                          {currentProject.difficulty === 'beginner' ? '🎓 入门' : currentProject.difficulty === 'intermediate' ? '📈 进阶' : '🚀 高级'}
                        </span>
                      </div>
                    </div>

                    {/* 学习模块卡片 - 按层次结构组织 */}
                    <div className="space-y-3">
                      {/* 第一部分：核心概念 */}
                      <motion.div 
                        className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl overflow-hidden shadow-lg shadow-orange-500/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <button
                          onClick={() => setExpandedSections({...expandedSections, overview: !expandedSections.overview})}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xl">⚙️</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-white">核心概念：{currentProject.title}</h3>
                              <p className="text-white/70 text-xs">理解本项目的基本概念</p>
                            </div>
                          </div>
                          <motion.span 
                            className="text-white/70 text-lg"
                            animate={{ rotate: expandedSections.overview ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >▼</motion.span>
                        </button>
                        {expandedSections.overview && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-5 bg-white/10"
                          >
                            <div className="bg-white rounded-xl p-4 shadow-md">
                              {/* 项目概述 */}
                              <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">📚 课程概述</h4>
                                <p className="text-gray-700 leading-relaxed">{currentProject.detailedContent?.overview || currentProject.description}</p>
                              </div>
                              
                              {/* 业务场景和学习目标 */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                  <p className="text-blue-600 text-sm font-medium mb-2">📋 业务场景</p>
                                  <p className="text-gray-600 text-sm">{currentProject.businessScenario}</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                  <p className="text-green-600 text-sm font-medium mb-2">🎯 学习目标</p>
                                  <ul className="text-gray-600 text-sm space-y-1">
                                    {currentProject.deliverables.slice(0, 3).map((item, i) => (
                                      <li key={i}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                              {/* 核心概念详解 */}
                              {currentProject.detailedContent?.concepts && (
                                <div className="space-y-4">
                                  <h4 className="text-lg font-semibold text-gray-800">💡 核心概念详解</h4>
                                  {currentProject.detailedContent.concepts.map((concept, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                      <h5 className="font-semibold text-gray-800 mb-2">{concept.name}</h5>
                                      <p className="text-gray-600 text-sm mb-3">{concept.description}</p>
                                      
                                      <div className="mb-3">
                                        <p className="text-xs font-medium text-blue-600 mb-1">🔑 关键要点：</p>
                                        <ul className="text-xs text-gray-600 space-y-1 ml-4">
                                          {concept.keyPoints.map((point, pidx) => (
                                            <li key={pidx}>• {point}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      
                                      <div>
                                        <p className="text-xs font-medium text-green-600 mb-1">💼 实际案例：</p>
                                        <ul className="text-xs text-gray-600 space-y-1 ml-4">
                                          {concept.examples.map((example, eidx) => (
                                            <li key={eidx}>• {example}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* 第二部分：核心指标 */}
                      <motion.div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl overflow-hidden shadow-lg shadow-purple-500/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <button
                          onClick={() => setExpandedSections({...expandedSections, metrics: !expandedSections.metrics})}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xl">📊</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-white">核心指标</h3>
                              <p className="text-white/70 text-xs">理解关键评估指标</p>
                            </div>
                          </div>
                          <motion.span 
                            className="text-white/70 text-lg"
                            animate={{ rotate: expandedSections.metrics ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >▼</motion.span>
                        </button>
                        {expandedSections.metrics && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-5 bg-white/10"
                          >
                            <div className="space-y-4">
                              {currentProject.id === 3 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-orange-500">📌</span>
                                      <h4 className="text-orange-700 font-semibold">支持度 (Support)</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">衡量商品受欢迎程度的指标</p>
                                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                      <p className="text-gray-800 font-mono text-sm">Support(X→Y) = P(X∪Y)</p>
                                      <p className="text-gray-600 text-xs mt-1">同时购买X和Y的交易数 / 总交易数</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：理解支持度的计算方法，能够筛选频繁项集</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-purple-500">📌</span>
                                      <h4 className="text-purple-700 font-semibold">置信度 (Confidence)</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">表示购买X后购买Y的概率</p>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                      <p className="text-gray-800 font-mono text-sm">Confidence(X→Y) = P(Y|X)</p>
                                      <p className="text-gray-600 text-xs mt-1">Support(X→Y) / Support(X)</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握置信度的含义，理解规则的可靠性</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-blue-500">📌</span>
                                      <h4 className="text-blue-700 font-semibold">提升度 (Lift)</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">表示规则的有效性，大于1表示正相关</p>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                      <p className="text-gray-800 font-mono text-sm">Lift(X→Y) = Confidence(X→Y) / Support(Y)</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：学会使用提升度评估关联规则的实际价值</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.id === 1 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-blue-500">📌</span>
                                      <h4 className="text-blue-700 font-semibold">缺失值处理</h4>
                                    </div>
                                    <ul className="text-gray-700 text-sm space-y-1 mb-3">
                                      <li>• 删除法（缺失率高时）</li>
                                      <li>• 均值/中位数填充（数值型）</li>
                                      <li>• 众数填充（类别型）</li>
                                    </ul>
                                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握多种缺失值处理方法，能够根据数据特点选择合适策略</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-green-500">📌</span>
                                      <h4 className="text-green-700 font-semibold">异常值检测</h4>
                                    </div>
                                    <ul className="text-gray-700 text-sm space-y-1 mb-3">
                                      <li>• 3σ原则（适用于正态分布）</li>
                                      <li>• 箱线图法（IQR四分位数间距）</li>
                                      <li>• Z-score标准化检测</li>
                                    </ul>
                                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：能够识别和处理数据中的异常值，确保分析准确性</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-purple-500">📌</span>
                                      <h4 className="text-purple-700 font-semibold">数据标准化</h4>
                                    </div>
                                    <ul className="text-gray-700 text-sm space-y-1 mb-3">
                                      <li>• StandardScaler（均值为0，标准差为1）</li>
                                      <li>• MinMaxScaler（缩放到[0,1]）</li>
                                      <li>• RobustScaler（基于中位数）</li>
                                    </ul>
                                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握数据标准化方法，为后续建模做好准备</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.id === 2 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-blue-500">📌</span>
                                      <h4 className="text-blue-700 font-semibold">皮尔逊相关系数</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">衡量两个变量之间线性相关程度的指标，取值范围[-1, 1]</p>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                      <p className="text-gray-800 font-mono text-sm">r = cov(X,Y) / (σ_X * σ_Y)</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：理解皮尔逊相关系数的含义，能够判断变量间的线性关系强度</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-purple-500">📌</span>
                                      <h4 className="text-purple-700 font-semibold">斯皮尔曼相关系数</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">基于秩次的非参数相关分析方法，适用于非线性关系</p>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                      <p className="text-gray-800 font-mono text-sm">ρ = 1 - 6Σd² / (n(n²-1))</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握斯皮尔曼相关系数的应用场景，处理非正态分布数据</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-green-500">📌</span>
                                      <h4 className="text-green-700 font-semibold">相关性热力图</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">可视化展示变量间相关关系的矩阵图</p>
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                      <p className="text-gray-800 text-sm">使用 seaborn.heatmap() 绘制，颜色越深表示相关性越强</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：能够绘制和解读相关性热力图，识别关键关联</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.id === 4 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-blue-500">📌</span>
                                      <h4 className="text-blue-700 font-semibold">KMeans聚类算法</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">基于距离的无监督聚类算法，将数据分为K个簇</p>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                      <p className="text-gray-800 text-sm">核心思想：最小化簇内距离，最大化簇间距离</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：理解KMeans算法原理，能够应用于用户分群</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-purple-500">📌</span>
                                      <h4 className="text-purple-700 font-semibold">肘部法则</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">通过绘制inertia-k曲线确定最佳聚类数量</p>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                      <p className="text-gray-800 text-sm">inertia = Σ(每个点到其簇中心的距离²)</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握肘部法则，能够确定合适的聚类数量</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-green-500">📌</span>
                                      <h4 className="text-green-700 font-semibold">PCA降维</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">主成分分析，将高维数据投影到低维空间</p>
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                      <p className="text-gray-800 text-sm">保留最大方差的方向，实现数据可视化</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：学会使用PCA进行数据降维和可视化</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.id === 5 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-orange-500">📌</span>
                                      <h4 className="text-orange-700 font-semibold">RFM模型</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">Recency(最近消费)、Frequency(消费频次)、Monetary(消费金额)</p>
                                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                      <p className="text-gray-800 text-sm">R: 最近一次消费距离今天的天数</p>
                                      <p className="text-gray-800 text-sm">F: 统计周期内的消费次数</p>
                                      <p className="text-gray-800 text-sm">M: 统计周期内的消费总金额</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：理解RFM模型的核心思想，能够计算RFM指标</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-blue-500">📌</span>
                                      <h4 className="text-blue-700 font-semibold">用户分层</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">根据RFM分数将用户分为不同价值层级</p>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                      <p className="text-gray-800 text-sm">• 重要价值用户：R高+F高+M高</p>
                                      <p className="text-gray-800 text-sm">• 潜力用户：R高+F低+M中</p>
                                      <p className="text-gray-800 text-sm">• 流失用户：R低+F低+M低</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握用户分层方法，能够识别高价值用户</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.id === 6 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-blue-500">📌</span>
                                      <h4 className="text-blue-700 font-semibold">线性回归模型</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">用线性方程描述自变量和因变量之间的关系</p>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                      <p className="text-gray-800 font-mono text-sm">y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：理解线性回归原理，能够构建回归模型</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-purple-500">📌</span>
                                      <h4 className="text-purple-700 font-semibold">R²决定系数</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">衡量模型对数据的拟合程度，取值范围[0,1]</p>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                      <p className="text-gray-800 font-mono text-sm">R² = 1 - SS_res / SS_tot</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握R²指标，能够评估回归模型性能</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-green-500">📌</span>
                                      <h4 className="text-green-700 font-semibold">MAE/MSE</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">平均绝对误差和均方误差，衡量预测准确性</p>
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                      <p className="text-gray-800 font-mono text-sm">MAE = (1/n)Σ|y - ŷ|</p>
                                      <p className="text-gray-800 font-mono text-sm">MSE = (1/n)Σ(y - ŷ)²</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：理解误差指标，能够选择合适的评估方法</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.id === 7 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-blue-500">📌</span>
                                      <h4 className="text-blue-700 font-semibold">随机森林</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">集成学习算法，通过多个决策树提高预测准确性</p>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                      <p className="text-gray-800 text-sm">• Bootstrap采样构建多棵决策树</p>
                                      <p className="text-gray-800 text-sm">• 每棵树随机选择特征子集</p>
                                      <p className="text-gray-800 text-sm">• 回归取均值，分类取众数</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：理解随机森林原理，能够构建预测模型</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-purple-500">📌</span>
                                      <h4 className="text-purple-700 font-semibold">特征重要性</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">衡量每个特征对预测结果的贡献程度</p>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                      <p className="text-gray-800 text-sm">通过Gini不纯度或信息增益计算</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：学会分析特征重要性，识别关键影响因素</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.id === 8 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-blue-500">📌</span>
                                      <h4 className="text-blue-700 font-semibold">时间序列数据</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">按时间顺序排列的数据，包含趋势、季节性和随机性</p>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                      <p className="text-gray-800 text-sm">• 趋势：长期上升或下降</p>
                                      <p className="text-gray-800 text-sm">• 季节性：周期性变化</p>
                                      <p className="text-gray-800 text-sm">• 残差：随机波动</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：理解时间序列的组成成分</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-purple-500">📌</span>
                                      <h4 className="text-purple-700 font-semibold">移动平均</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">平滑时间序列数据，揭示趋势</p>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                      <p className="text-gray-800 font-mono text-sm">MA(t) = (yₜ₋ₙ₊₁ + ... + yₜ) / n</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握移动平均方法，分析数据趋势</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-green-500">📌</span>
                                      <h4 className="text-green-700 font-semibold">ARIMA模型</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">自回归综合移动平均模型，用于时间序列预测</p>
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                      <p className="text-gray-800 text-sm">AR(p): 自回归项, I(d): 差分阶数, MA(q): 移动平均项</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：理解ARIMA模型，能够进行时间序列预测</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.id === 9 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-red-500">📌</span>
                                      <h4 className="text-red-700 font-semibold">异常检测</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">识别数据中偏离正常模式的异常点</p>
                                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                      <p className="text-gray-800 text-sm">• 统计方法：3σ原则、箱线图</p>
                                      <p className="text-gray-800 text-sm">• 机器学习：孤立森林、DBSCAN</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握异常检测方法，识别数据异常</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-orange-500">📌</span>
                                      <h4 className="text-orange-700 font-semibold">孤立森林</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">基于随机森林的异常检测算法</p>
                                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                      <p className="text-gray-800 text-sm">通过随机划分构建树，异常点更容易被孤立</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：学会使用孤立森林检测异常值</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.id === 10 ? (
                                <>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-blue-500">📌</span>
                                      <h4 className="text-blue-700 font-semibold">数据分析全流程</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">从数据获取到业务策略输出的完整流程</p>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                      <p className="text-gray-800 text-sm">数据获取 → 数据清洗 → 特征工程 → 建模分析 → 结果可视化 → 策略输出</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：掌握完整的数据分析流程</p>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl p-4 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-purple-500">📌</span>
                                      <h4 className="text-purple-700 font-semibold">业务策略落地</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">将数据分析结果转化为可执行的业务策略</p>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                      <p className="text-gray-800 text-sm">• 策略目标明确</p>
                                      <p className="text-gray-800 text-sm">• 执行路径清晰</p>
                                      <p className="text-gray-800 text-sm">• 效果可衡量</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-green-700 text-xs">💡 学习效果：学会将分析结果转化为业务价值</p>
                                    </div>
                                  </div>
                                </>
                              ) : currentProject.detailedContent?.formulas ? (
                                <>
                                  {currentProject.detailedContent.formulas.map((formula, idx) => (
                                    <div key={idx} className="bg-white rounded-xl p-4 shadow-md">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-blue-500">📐</span>
                                        <h4 className="text-blue-700 font-semibold">{formula.name}</h4>
                                      </div>
                                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-3">
                                        <p className="text-gray-800 font-mono text-sm">{formula.formula}</p>
                                      </div>
                                      <p className="text-gray-700 text-sm mb-2">{formula.explanation}</p>
                                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                        <p className="text-green-700 text-xs">💡 应用场景：{formula.application}</p>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <div className="bg-white rounded-xl p-4 shadow-md">
                                  <p className="text-gray-600 text-sm">本项目的核心指标将在后续学习中逐步介绍...</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* 第三部分：操作步骤 */}
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl overflow-hidden shadow-lg shadow-blue-500/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <button
                          onClick={() => setExpandedSections({...expandedSections, steps: !expandedSections.steps})}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xl">📝</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-white">操作步骤</h3>
                              <p className="text-white/70 text-xs">分步完成任务 ({currentProject.tasks.length}步)</p>
                            </div>
                          </div>
                          <motion.span 
                            className="text-white/70 text-lg"
                            animate={{ rotate: expandedSections.steps ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >▼</motion.span>
                        </button>
                        {expandedSections.steps && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-5 bg-white/10"
                          >
                            <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-blue-500">📋</span>
                                <span className="text-blue-700 font-medium">任务说明</span>
                              </div>
                              <p className="text-gray-600 text-sm">按照以下步骤完成本项目的实操练习，每一步都配有详细的操作提示和代码示例。</p>
                            </div>
                            
                            <div className="space-y-4">
                              {currentProject.tasks.map((task, i) => (
                                <motion.div 
                                  key={i}
                                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  {/* 步骤头部 */}
                                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-4">
                                    <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">{i + 1}</span>
                                      </div>
                                      <div>
                                        <h4 className="text-white font-semibold">{task}</h4>
                                        <p className="text-white/70 text-xs mt-0.5">
                                          {i === 0 && '开始第一步，打好基础'}
                                          {i > 0 && i < currentProject.tasks.length - 1 && `继续第 ${i + 1} 步`}
                                          {i === currentProject.tasks.length - 1 && '最后一步，完成任务'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* 步骤详情 */}
                                  <div className="p-5">
                                    {/* 操作提示 */}
                                    {currentProject.taskHints[i] && (
                                      <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-blue-500">💡</span>
                                          <span className="text-blue-600 text-sm font-medium">操作提示</span>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                          <p className="text-gray-700 text-sm leading-relaxed">{currentProject.taskHints[i]}</p>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* 关键代码提示 */}
                                    <div className="mb-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-green-500">📝</span>
                                        <span className="text-green-600 text-sm font-medium">关键代码</span>
                                      </div>
                                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <p className="text-gray-700 text-xs font-mono bg-gray-100 rounded p-2">
                                          {currentProject.id === 1 && i === 0 && 'df = pd.read_csv("user_behavior.csv")'}
                                          {currentProject.id === 1 && i === 1 && 'df.fillna() / df.dropna()'}
                                          {currentProject.id === 1 && i === 2 && '使用3σ原则处理异常值'}
                                          {currentProject.id === 1 && i === 3 && 'pd.qcut() / pd.cut()'}
                                          {currentProject.id === 1 && i === 4 && 'scaler.fit_transform()'}
                                          {currentProject.id === 2 && i === 0 && 'df.describe()'}
                                          {currentProject.id === 2 && i === 1 && 'df.corr(method="pearson")'}
                                          {currentProject.id === 2 && i === 2 && 'sns.heatmap()'}
                                          {currentProject.id === 3 && i === 0 && 'from mlxtend.frequent_patterns import apriori'}
                                          {currentProject.id === 3 && i === 1 && 'apriori(df, min_support=0.05)'}
                                          {currentProject.id === 4 && i === 0 && 'KMeans(n_clusters=3)'}
                                          {currentProject.id === 4 && i === 1 && 'inertia = model.inertia_'}
                                          {currentProject.id === 5 && i === 0 && '计算R/F/M三个指标'}
                                          {currentProject.id === 5 && i === 1 && 'pd.qcut() 分箱打分'}
                                          {currentProject.id === 6 && i === 0 && 'LinearRegression()'}
                                          {currentProject.id === 6 && i === 1 && 'model.score(X, y)'}
                                          {currentProject.id === 7 && i === 0 && 'RandomForestRegressor()'}
                                          {currentProject.id === 7 && i === 1 && 'model.feature_importances_'}
                                          {currentProject.id === 8 && i === 0 && 'pd.to_datetime()'}
                                          {currentProject.id === 8 && i === 1 && 'df.rolling(window=7).mean()'}
                                          {currentProject.id === 9 && i === 0 && 'IsolationForest()'}
                                          {currentProject.id === 9 && i === 1 && 'model.predict(X)'}
                                          {currentProject.id === 10 && i === 0 && '综合运用所有方法'}
                                        </p>
                                      </div>
                                    </div>
                                    
                                    {/* 预期结果 */}
                                    <div className="mt-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-purple-500">🎯</span>
                                        <span className="text-purple-600 text-sm font-medium">预期结果</span>
                                      </div>
                                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                        <p className="text-gray-600 text-xs">
                                          {i === 0 && '成功完成第一步操作，了解数据基本情况'}
                                          {i === 1 && '完成第二步操作，数据质量得到提升'}
                                          {i === 2 && '完成第三步操作，特征工程推进中'}
                                          {i === 3 && '完成第四步操作，数据准备更加充分'}
                                          {i === 4 && '完成第五步操作，数据标准化完成'}
                                          {i >= 5 && '任务完成，达到预期目标'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* 第四部分：常见陷阱 */}
                      <motion.div 
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <button
                          onClick={() => setExpandedSections({...expandedSections, pitfalls: !expandedSections.pitfalls})}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center shadow-md shadow-red-500/30">
                              <span className="text-white">⚠️</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-800">常见陷阱</h3>
                              <p className="text-xs text-gray-500">避免常见错误和误区</p>
                            </div>
                          </div>
                          <motion.span 
                            className="text-gray-400 text-lg"
                            animate={{ rotate: expandedSections.pitfalls ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >▼</motion.span>
                        </button>
                        {expandedSections.pitfalls && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-5"
                          >
                            <div className="space-y-4">
                              {/* 详细错误分析 */}
                              {currentProject.detailedContent?.commonMistakes ? (
                                currentProject.detailedContent.commonMistakes.map((mistake, i) => (
                                  <motion.div 
                                    key={i}
                                    className="bg-white rounded-xl p-4 border border-red-200 shadow-sm"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-red-600 font-bold">{i + 1}</span>
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-semibold text-red-700 mb-2">❌ {mistake.mistake}</h5>
                                        <div className="bg-red-50 rounded-lg p-3 mb-2">
                                          <p className="text-xs text-red-600 font-medium mb-1">后果：</p>
                                          <p className="text-sm text-gray-700">{mistake.consequence}</p>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-3">
                                          <p className="text-xs text-green-600 font-medium mb-1">✓ 正确做法：</p>
                                          <p className="text-sm text-gray-700">{mistake.solution}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))
                              ) : (
                                currentProject.pitfalls.map((pitfall, i) => (
                                  <motion.div 
                                    key={i}
                                    className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4 border border-red-100"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="text-red-500 mt-0.5">✗</span>
                                      <p className="text-red-700">{pitfall}</p>
                                    </div>
                                  </motion.div>
                                ))
                              )}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* 小贴士 */}
                      <motion.div 
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <button
                          onClick={() => setExpandedSections({...expandedSections, tips: !expandedSections.tips})}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center shadow-md shadow-yellow-500/30">
                              <span className="text-white">💬</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-800">小贴士</h3>
                              <p className="text-xs text-gray-500">实用学习建议</p>
                            </div>
                          </div>
                          <motion.span 
                            className="text-gray-400 text-lg"
                            animate={{ rotate: expandedSections.tips ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >▼</motion.span>
                        </button>
                        {expandedSections.tips && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-5"
                          >
                            {/* 最佳实践 */}
                            {currentProject.detailedContent?.bestPractices && (
                              <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-800 mb-3">⭐ 最佳实践</h4>
                                <div className="space-y-2">
                                  {currentProject.detailedContent.bestPractices.map((practice, i) => (
                                    <div key={i} className="flex items-start gap-2 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                                      <span className="text-yellow-500 text-sm">✓</span>
                                      <p className="text-gray-700 text-sm">{practice}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* 案例研究 */}
                            {currentProject.detailedContent?.caseStudies && (
                              <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-800">📊 案例研究</h4>
                                {currentProject.detailedContent.caseStudies.map((study, i) => (
                                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                    <h5 className="font-semibold text-blue-700 mb-2">{study.title}</h5>
                                    <div className="space-y-2">
                                      <div>
                                        <p className="text-xs text-gray-500 font-medium">场景：</p>
                                        <p className="text-sm text-gray-700">{study.scenario}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500 font-medium">解决方案：</p>
                                        <p className="text-sm text-gray-700 whitespace-pre-line">{study.solution}</p>
                                      </div>
                                      <div className="bg-green-50 rounded-lg p-2">
                                        <p className="text-xs text-green-600 font-medium">成果：</p>
                                        <p className="text-sm text-gray-700">{study.outcome}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* 默认提示 */}
                            {!currentProject.detailedContent?.bestPractices && !currentProject.detailedContent?.caseStudies && (
                              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                                <div className="flex items-start gap-3">
                                  <span className="text-yellow-500 text-2xl">💡</span>
                                  <p className="text-gray-700 text-sm">
                                    {currentProject.id === 3 ? (
                                      '支持度是衡量商品受欢迎程度的重要指标！关联规则挖掘中，我们通常先设置最小支持度阈值来筛选频繁项集。提升度大于1表示正相关，等于1表示独立，小于1表示负相关。'
                                    ) : currentProject.id === 1 ? (
                                      '数据预处理的质量直接影响后续模型的效果！建议在处理前先使用describe()和info()方法探索数据分布，了解数据特征和缺失情况。'
                                    ) : (
                                      '实践是最好的学习方式！建议先理解理论知识，再动手实践。遇到问题时，仔细阅读错误信息，逐步排查问题所在。'
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </motion.div>

                      {/* 学习目标 */}
                      <motion.div 
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        <button
                          onClick={() => setExpandedSections({...expandedSections, deliverables: !expandedSections.deliverables})}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-green-500/30">
                              <span className="text-white">🎯</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-800">学习目标</h3>
                              <p className="text-xs text-gray-500">完成项目后应达到的目标</p>
                            </div>
                          </div>
                          <motion.span 
                            className="text-gray-400 text-lg"
                            animate={{ rotate: expandedSections.deliverables ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >▼</motion.span>
                        </button>
                        {expandedSections.deliverables && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-5"
                          >
                            <div className="space-y-3">
                              {currentProject.deliverables.map((deliverable, i) => (
                                <motion.div 
                                  key={i}
                                  className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <span className="text-green-500">✅</span>
                                  <span className="text-gray-700">{deliverable}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* 学习资源 */}
                      <motion.div 
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                      >
                        <button
                          onClick={() => setExpandedSections({...expandedSections, resources: !expandedSections.resources})}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/30">
                              <span className="text-white">📚</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-800">学习资源</h3>
                              <p className="text-xs text-gray-500">扩展学习资料</p>
                            </div>
                          </div>
                          <motion.span 
                            className="text-gray-400 text-lg"
                            animate={{ rotate: expandedSections.resources ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >▼</motion.span>
                        </button>
                        {expandedSections.resources && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-5"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {currentProject.learningResources.docs.map((doc, i) => (
                                <motion.a 
                                  key={i}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-100 hover:shadow-sm hover:border-indigo-300 transition-all cursor-pointer"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <span className="text-indigo-500">📄</span>
                                  <span className="text-gray-700 text-sm">{doc.title}</span>
                                </motion.a>
                              ))}
                              {currentProject.learningResources.videos.map((video, i) => (
                                <motion.a 
                                  key={i}
                                  href={video.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-3 border border-red-100 hover:shadow-sm hover:border-red-300 transition-all cursor-pointer"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <span className="text-red-500">🎥</span>
                                  <span className="text-gray-700 text-sm">{video.title}</span>
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    {/* 学习任务卡片 */}
                    <motion.div 
                      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-blue-500 text-xl">🎯</span>
                        <h2 className="text-xl font-semibold text-gray-900">学习任务</h2>
                      </div>
                      <div className="space-y-4">
                        {currentProject.tasks.map((task, i) => (
                          <motion.div 
                            key={i} 
                            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all"
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentProject.color} flex items-center justify-center flex-shrink-0 shadow-md shadow-current/20`}>
                                <span className="text-sm font-medium text-white">{i + 1}</span>
                              </div>
                              <div>
                                <p className="text-gray-700 mb-2">{task}</p>
                                {currentProject.taskHints[i] && (
                                  <div className="bg-blue-50 rounded p-3 text-sm border border-blue-100">
                                    <p className="text-blue-600 font-medium mb-1">💡 提示</p>
                                    <p className="text-gray-600 text-xs leading-relaxed">{currentProject.taskHints[i]}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* 常见陷阱卡片 */}
                    <motion.div 
                      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-red-500 text-xl">⚠️</span>
                        <h2 className="text-xl font-semibold text-gray-900">常见陷阱</h2>
                      </div>
                      <div className="space-y-3">
                        {currentProject.pitfalls.map((pitfall, i) => (
                          <motion.div 
                            key={i} 
                            className="bg-red-50 rounded-lg p-4 hover:bg-red-100 transition-all border border-red-100"
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-red-500 mt-1">•</span>
                              <span className="text-gray-700">{pitfall}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* 交付物卡片 */}
                    <motion.div 
                      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-green-500 text-xl">📦</span>
                        <h2 className="text-xl font-semibold text-gray-900">交付物</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentProject.deliverables.map((deliverable, i) => (
                          <motion.div 
                            key={i} 
                            className="bg-green-50 rounded-lg p-3 flex items-center gap-2 hover:bg-green-100 transition-all border border-green-100"
                            whileHover={{ y: -2 }}
                          >
                            <span className="text-green-600">✅</span>
                            <span className="text-gray-700">{deliverable}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* 学习资源卡片 */}
                    <motion.div 
                      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-yellow-500 text-xl">📚</span>
                        <h2 className="text-xl font-semibold text-gray-900">学习资源</h2>
                      </div>
                      
                      {/* 文档资源 */}
                      <div className="mb-4">
                        <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <span className="text-yellow-500">📖</span>
                          相关文档
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {currentProject.learningResources.docs.map((doc, i) => (
                            <motion.a 
                              key={i}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all cursor-pointer block border border-gray-100"
                              whileHover={{ y: -2 }}
                            >
                              <span className="text-blue-600 text-sm flex items-center gap-2">
                                <span>→</span>
                                {doc.title}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                      
                      {/* 视频教程 */}
                      <div className="mb-4">
                        <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <span className="text-yellow-500">🎥</span>
                          视频教程
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {currentProject.learningResources.videos.map((video, i) => (
                            <motion.a 
                              key={i}
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all cursor-pointer block border border-gray-100"
                              whileHover={{ y: -2 }}
                            >
                              <span className="text-blue-600 text-sm flex items-center gap-2">
                                <span>→</span>
                                {video.title}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                      
                      {/* 代码示例 */}
                      <div className="mb-4">
                        <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <span className="text-yellow-500">💻</span>
                          代码示例
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {currentProject.learningResources.examples.map((example, i) => (
                            <motion.a 
                              key={i}
                              href={example.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all cursor-pointer block border border-gray-100"
                              whileHover={{ y: -2 }}
                            >
                              <span className="text-blue-600 text-sm flex items-center gap-2">
                                <span>→</span>
                                {example.title}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                      
                      {/* 社区支持 */}
                      <div>
                        <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <span className="text-yellow-500">🤝</span>
                          社区支持
                        </h3>
                        <motion.a 
                          href={currentProject.communitySupport.forum.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-50 rounded-lg p-3 mb-3 hover:bg-gray-100 transition-all cursor-pointer block border border-gray-100"
                        >
                          <span className="text-blue-600 flex items-center gap-2">
                            <span>→</span>
                            {currentProject.communitySupport.forum.title}
                          </span>
                        </motion.a>
                        <div className="space-y-2">
                          {currentProject.communitySupport.discussion.map((topic, i) => (
                            <motion.a 
                              key={i}
                              href={topic.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all cursor-pointer block border border-gray-100"
                              whileHover={{ y: -2 }}
                            >
                              <span className="text-blue-600 text-sm flex items-center gap-2">
                                <span>→</span>
                                {topic.title}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex justify-end">
                      <motion.button
                        onClick={markPhaseComplete}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-medium hover:opacity-90 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        完成学习，进入实操
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* 实操阶段 */}
                {learningState.currentPhase === 'practice' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* 标题卡片 */}
                    <div className={`bg-gradient-to-r ${currentProject.color} rounded-2xl p-6 mb-6 shadow-xl shadow-current/20`}>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                        <span>{currentProject.icon}</span>
                        <span>{currentProject.title} - 实操练习</span>
                      </h2>
                      <p className="text-white/80 text-sm">完成代码编写并运行测试</p>
                      <div className="flex gap-3 mt-4">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">
                          ⏱️ {currentProject.duration}
                        </span>
                        <span className={`px-3 py-1 bg-white/20 rounded-full text-white text-xs`}>
                          {currentProject.difficulty === 'beginner' ? '🎓 入门' : currentProject.difficulty === 'intermediate' ? '📈 进阶' : '🚀 高级'}
                        </span>
                      </div>
                    </div>

                    {/* 代码编辑器区域 - 点击后显示 */}
                    {showPracticeEditor ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                      >
                        {/* 顶部操作栏 */}
                        <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium text-gray-700">{currentProject.title}</span>
                            <span className="text-sm text-gray-500">- 编写代码</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowPracticeEditor(false)}
                              className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 text-sm font-medium transition-all"
                            >
                              返回学习
                            </button>
                            <button 
                              onClick={runCode}
                              className="px-4 py-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm font-medium transition-all flex items-center gap-1"
                            >
                              <span>▶</span>
                              运行代码
                            </button>
                            <button 
                              onClick={() => setUserCode(currentProject?.codeExample || '')}
                              className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm font-medium transition-all"
                            >
                              重置代码
                            </button>
                            <button 
                              onClick={() => setShowReferenceAnswer(!showReferenceAnswer)}
                              className="px-4 py-1.5 bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm font-medium transition-all"
                            >
                              {showReferenceAnswer ? '隐藏参考答案' : '显示参考答案'}
                            </button>
                          </div>
                        </div>

                        {/* 主内容区 - 可拖拽面板 */}
                        <div className="panel-container flex h-[60vh]">
                          {/* 左侧数据集预览和任务列表 */}
                          <div 
                            className="bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden"
                            style={{ width: `${panelSizes.left}px` }}
                          >
                            {/* 数据集预览 - 可调整高度 */}
                            <div 
                              className="border-b border-gray-200 bg-white overflow-hidden"
                              style={{ height: `${panelSizes.top}px` }}
                            >
                              <button
                                onClick={() => setCollapsedSections(prev => ({ ...prev, dataset: !prev.dataset }))}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                              >
                                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                  </svg>
                                  数据集预览
                                </h3>
                                <svg 
                                  className={`w-5 h-5 text-gray-500 transition-transform ${collapsedSections.dataset ? 'rotate-180' : ''}`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              </button>
                              {!collapsedSections.dataset && (
                                <div className="px-4 pb-4 h-[calc(100%-56px)] overflow-y-auto">
                                  <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                                    <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                                      <span className="text-sm font-medium text-gray-700">{currentProject.dataset}</span>
                                    </div>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-xs">
                                        <thead>
                                          <tr className="bg-gray-50">
                                            {getDatasetPreview(currentProject.dataset).columns.map((col, i) => (
                                              <th key={i} className="px-3 py-2 text-left font-medium text-gray-600 truncate max-w-[80px]">
                                                {col}
                                              </th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {getDatasetPreview(currentProject.dataset).rows.map((row, i) => (
                                            <tr key={i} className="border-t border-gray-100 hover:bg-blue-50">
                                              {row.map((cell, j) => (
                                                <td key={j} className="px-3 py-2 text-gray-700 truncate max-w-[80px]">
                                                  {cell}
                                                </td>
                                              ))}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="bg-gray-50 px-3 py-2 text-center">
                                      <span className="text-xs text-gray-500">显示前 5 行数据</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* 水平分割条 - 可上下拖动 */}
                            <div
                              className="h-1 bg-gray-200 cursor-row-resize hover:bg-gray-400 transition-colors group relative"
                              onMouseDown={() => setIsDragging('vertical')}
                            >
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8" />
                                </svg>
                              </div>
                            </div>
                            
                            {/* 任务清单 */}
                            <div className="flex-1 overflow-y-auto">
                              <button
                                onClick={() => setCollapsedSections(prev => ({ ...prev, tasks: !prev.tasks }))}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                              >
                                <h3 className="text-md font-semibold text-gray-800">任务清单</h3>
                                <svg 
                                  className={`w-5 h-5 text-gray-500 transition-transform ${collapsedSections.tasks ? 'rotate-180' : ''}`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              </button>
                              {!collapsedSections.tasks && (
                                <div className="px-4 pb-4">
                                  <ul className="space-y-3">
                                    {currentProject.tasks.map((task, i) => (
                                      <li key={i} className="bg-white rounded-lg p-3 border border-gray-100 hover:border-blue-200 transition-all">
                                        <div className="flex items-start gap-2">
                                          <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentProject.color} flex items-center justify-center flex-shrink-0 text-white text-xs font-medium`}>
                                            {i + 1}
                                          </span>
                                          <span className="text-sm text-gray-700">{task}</span>
                                        </div>
                                        {currentProject.taskHints[i] && (
                                          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-600 border border-blue-100">
                                            💡 {currentProject.taskHints[i]}
                                          </div>
                                        )}
                                        {currentProject.taskExamples && currentProject.taskExamples[i] && (
                                          <div className="mt-2">
                                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                              </svg>
                                              示例代码
                                            </div>
                                            <pre className="bg-gray-900 text-green-400 text-xs p-2 rounded overflow-x-auto font-mono">
                                              {currentProject.taskExamples[i]}
                                            </pre>
                                          </div>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 左侧分割条 - 可拖拽 */}
                          <div
                            className="w-1 bg-gray-200 cursor-col-resize hover:bg-gray-400 transition-colors group relative"
                            onMouseDown={() => setIsDragging('left')}
                          >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 15h2m2 4H9m-2-4h2m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                          </div>

                          {/* 中间代码编辑区 */}
                          <div className="flex-1 flex flex-col">
                            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">main.py</span>
                                <span className="text-xs text-gray-400">Python</span>
                              </div>
                              {showReferenceAnswer && (
                                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">参考答案模式</span>
                              )}
                            </div>
                            <div className="flex-1 bg-white p-4 overflow-auto">
                              {showReferenceAnswer ? (
                                <pre className="text-gray-700 text-sm font-mono whitespace-pre-wrap">{currentProject.referenceAnswer}</pre>
                              ) : (
                                <textarea
                                  value={userCode}
                                  onChange={(e) => setUserCode(e.target.value)}
                                  className="w-full h-full bg-gray-50 text-gray-800 text-sm font-mono resize-none outline-none border border-gray-200 rounded p-4"
                                  spellCheck={false}
                                  placeholder="# 在此编写代码..."
                                />
                              )}
                            </div>
                          </div>

                          {/* 右侧分割条 - 可拖拽 */}
                          <div
                            className="w-1 bg-gray-200 cursor-col-resize hover:bg-gray-400 transition-colors group relative"
                            onMouseDown={() => setIsDragging('right')}
                          >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 15h2m2 4H9m-2-4h2m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                          </div>

                          {/* 右侧执行结果区 */}
                          <div 
                            className="bg-gray-50 border-l border-gray-200 flex flex-col"
                            style={{ width: `${panelSizes.right}px` }}
                          >
                            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">执行结果</span>
                              {executionResult && !errorMessage && (
                                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">成功</span>
                              )}
                              {errorMessage && (
                                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">错误</span>
                              )}
                            </div>
                            <div className="flex-1 bg-white p-4 overflow-auto">
                              {errorMessage ? (
                                <div className="text-red-600 whitespace-pre-wrap text-sm">{errorMessage}</div>
                              ) : executionResult ? (
                                <div className="text-green-600 whitespace-pre-wrap text-sm">{executionResult}</div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                  <div className="text-4xl mb-4">▶</div>
                                  <p className="text-center text-sm">点击"运行代码"按钮</p>
                                  <p className="text-center text-xs mt-1">查看代码执行结果</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="flex flex-col items-center justify-center py-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={`w-24 h-24 bg-gradient-to-br ${currentProject.color} rounded-2xl flex items-center justify-center shadow-xl shadow-current/30 mb-6`}>
                          <span className="text-4xl">💻</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">准备开始实操</h2>
                        <p className="text-gray-500 mb-8">在开始编写代码前，请确保已完成学习阶段的所有内容</p>
                        <button
                          onClick={() => setShowPracticeEditor(true)}
                          className="px-10 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-xl font-semibold hover:opacity-90 transition-all text-white text-lg flex items-center gap-3 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                        >
                          <span className="text-xl">💻</span>
                          <span>开始编写代码</span>
                        </button>
                      </motion.div>
                    )}

                    {/* 完成实操按钮 */}
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={markPhaseComplete}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-medium hover:opacity-90 transition-all text-white"
                      >
                        完成实操，进入测试
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 测试阶段 */}
                {learningState.currentPhase === 'test' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <button
                        onClick={resetToProjectList}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 hover:border-blue-500/50 transition-all"
                      >
                        <span>←</span>
                        <span>返回项目列表</span>
                      </button>
                      {/* 倒计时器 */}
                      {!showResults && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${timeLeft <= 60 ? 'bg-red-50 border-red-200 text-red-600' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                          <span className="text-lg">⏱️</span>
                          <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                          <span className="text-xs">剩余时间</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">测试题目</h2>
                        {!showResults && (
                          <span className="text-sm text-gray-500">共 {(randomQuestions.length > 0 ? randomQuestions : currentProject.questions).length} 题</span>
                        )}
                      </div>
                      <div className="space-y-6">
                        {(randomQuestions.length > 0 ? randomQuestions : currentProject.questions).map((question, index) => {
                          const userAnswer = testAnswers[question.id];
                          const isCorrect = userAnswer !== undefined ? (
                            question.type === 'multiple' && Array.isArray(question.correctAnswer) && Array.isArray(userAnswer)
                              ? userAnswer.length === question.correctAnswer.length && userAnswer.every(a => (question.correctAnswer as number[]).includes(a))
                              : userAnswer === question.correctAnswer
                          ) : false;

                          return (
                            <div key={question.id} className={`bg-gray-50 rounded-lg p-4 ${showResults ? (isCorrect ? 'border border-green-500/50' : 'border border-red-500/50') : 'border border-gray-100'}`}>
                              <p className="text-gray-700 mb-3">{index + 1}. {question.question}</p>
                              <div className="space-y-2">
                                {question.options.map((option, i) => (
                                  <label key={i} className="flex items-center gap-3">
                                    <input
                                      type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                                      name={`question-${question.id}`}
                                      checked={userAnswer === i || (Array.isArray(userAnswer) && userAnswer.includes(i))}
                                      onChange={() => {
                                        const answer = question.type === 'multiple' ? 
                                          (Array.isArray(userAnswer) 
                                            ? userAnswer.includes(i) 
                                              ? userAnswer.filter(a => a !== i)
                                              : [...userAnswer, i]
                                            : [i])
                                          : i;
                                        selectAnswer(question.id, answer);
                                      }}
                                      disabled={showResults}
                                      className="w-4 h-4 text-blue-500"
                                    />
                                    <span className={`text-gray-700 ${showResults ? (question.correctAnswer === i || (Array.isArray(question.correctAnswer) && (question.correctAnswer as number[]).includes(i)) ? 'text-green-600 font-medium' : '') : ''}`}>
                                      {option}
                                    </span>
                                  </label>
                                ))}
                              </div>
                              {showResults && (
                                <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                                  <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect ? '✓ 回答正确' : '✗ 回答错误'}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">{question.explanation}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {!showResults ? (
                      <div className="flex justify-end">
                        <button
                          onClick={submitTest}
                          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-medium hover:opacity-90 transition-all text-white"
                        >
                          提交答案
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                          <h2 className="text-xl font-semibold mb-4 text-gray-900">测试结果</h2>
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                              <span className="text-3xl font-bold text-white">
                                {learningState.projectProgress[learningState.currentProject!]?.testScore || 0}
                              </span>
                            </div>
                            <div>
                              <p className="text-gray-700">
                                {learningState.projectProgress[learningState.currentProject!]?.testScore >= 80 
                                  ? '🎉 测试通过！' 
                                  : '⚠️ 测试未通过，请重新学习相关内容'}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {learningState.projectProgress[learningState.currentProject!]?.testScore >= 80 
                                  ? '你已经掌握了本项目的核心知识点，可以进入下一个项目。' 
                                  : '建议返回学习阶段，重新复习相关知识点后再进行测试。'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={resetToProjectList}
                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all text-gray-700"
                          >
                            返回项目列表
                          </button>
                          <button
                            onClick={() => {
                              setTestAnswers({});
                              setShowResults(false);
                              // 重新生成随机题目
                              const project = getCurrentProject();
                              if (project) {
                                const shuffled = [...project.questions].sort(() => Math.random() - 0.5);
                                setRandomQuestions(shuffled);
                              }
                            }}
                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all text-gray-700"
                          >
                            重新测试
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 课程大纲模态框 */}
      <AnimatePresence>
        {showSyllabus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSyllabus(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>
            
            {/* 模态框内容 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* 头部 */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">📚 课程大纲</h2>
                    <p className="text-white/80 text-sm mt-1">完整的学习路径和项目内容</p>
                  </div>
                  <button
                    onClick={() => setShowSyllabus(false)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* 内容区域 */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* 课程概述 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-blue-500">🎯</span>
                    课程概述
                  </h3>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-gray-700 text-sm">
                      本课程包含10个精选项目，涵盖数据预处理、统计分析、关联规则、聚类分析、回归预测、时间序列分析等核心技能，帮助你从零开始掌握数据分析全流程。
                    </p>
                  </div>
                </div>
                
                {/* 学习路径 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-green-500">📊</span>
                    学习路径
                  </h3>
                  <div className="space-y-3">
                    {[
                      { phase: '第一阶段', title: '数据基础', items: ['数据预处理高阶版', '多维统计+深度相关性分析'], color: 'from-blue-500 to-blue-600' },
                      { phase: '第二阶段', title: '数据挖掘', items: ['购物车关联规则挖掘', 'KMeans聚类分析实战', 'RFM模型用户分层'], color: 'from-cyan-500 to-cyan-600' },
                      { phase: '第三阶段', title: '预测建模', items: ['一元+多元线性回归', '随机森林回归+特征重要性', '时间序列完整分析'], color: 'from-purple-500 to-purple-600' },
                      { phase: '第四阶段', title: '综合实战', items: ['综合异常检测', '全流程综合大项目'], color: 'from-green-500 to-green-600' }
                    ].map((stage, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-12 h-12 bg-gradient-to-br ${stage.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">{stage.phase}</p>
                            <p className="font-semibold text-gray-800">{stage.title}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-15">
                          {stage.items.map((item, j) => (
                            <span key={j} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* 项目列表 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-purple-500">📁</span>
                    项目清单 ({projects.length}个)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {projects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all cursor-pointer"
                        onClick={() => {
                          setShowSyllabus(false);
                          selectProject(project.id);
                        }}
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${project.color} rounded-lg flex items-center justify-center text-lg`}>
                          {project.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{project.title}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              project.difficulty === 'beginner' ? 'bg-green-100 text-green-600' :
                              project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {project.difficulty === 'beginner' ? '入门' : project.difficulty === 'intermediate' ? '进阶' : '高级'}
                            </span>
                            <span className="text-xs text-gray-400">{project.duration}</span>
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}