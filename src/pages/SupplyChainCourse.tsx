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

export default function SupplyChainCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeChapterMode, setActiveChapterMode] = useState<'content' | 'exercise' | null>(null);
  const [activeTab, setActiveTab] = useState<'progress' | 'resources' | 'exercises'>('progress');

  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：供应链管理概述',
      completed: false,
      children: [
        { id: 'section1-1', title: '供应链管理的概念与意义', completed: false },
        { id: 'section1-2', title: '供应链管理的发展历程', completed: false },
        { id: 'section1-3', title: '供应链管理的核心流程', completed: false },
        { id: 'section1-4', title: '供应链管理的挑战与机遇', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：供应链数据采集与预处理',
      completed: false,
      children: [
        { id: 'section2-1', title: '供应链数据的类型与来源', completed: false },
        { id: 'section2-2', title: '供应链数据采集方法', completed: false },
        { id: 'section2-3', title: '供应链数据质量评估', completed: false },
        { id: 'section2-4', title: '供应链数据预处理技术', completed: false },
        { id: 'section2-5', title: '供应链数据存储与管理', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：供应链数据分析方法',
      completed: false,
      children: [
        { id: 'section3-1', title: '描述性分析方法', completed: false },
        { id: 'section3-2', title: '预测性分析方法', completed: false },
        { id: 'section3-3', title: '规范性分析方法', completed: false },
        { id: 'section3-4', title: '供应链数据分析工具', completed: false },
        { id: 'section3-5', title: '供应链数据分析案例', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：供应链绩效分析',
      completed: false,
      children: [
        { id: 'section4-1', title: '供应链绩效指标体系', completed: false },
        { id: 'section4-2', title: '供应链绩效评估方法', completed: false },
        { id: 'section4-3', title: '供应链绩效分析工具', completed: false },
        { id: 'section4-4', title: '供应链绩效改进策略', completed: false },
        { id: 'section4-5', title: '供应链绩效分析案例', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：供应链风险管理',
      completed: false,
      children: [
        { id: 'section5-1', title: '供应链风险的类型与特征', completed: false },
        { id: 'section5-2', title: '供应链风险评估方法', completed: false },
        { id: 'section5-3', title: '供应链风险预测模型', completed: false },
        { id: 'section5-4', title: '供应链风险应对策略', completed: false },
        { id: 'section5-5', title: '供应链风险管理案例', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：供应链数据分析项目实战',
      completed: false,
      children: [
        { id: 'section6-1', title: '项目需求分析', completed: false },
        { id: 'section6-2', title: '数据采集与预处理', completed: false },
        { id: 'section6-3', title: '数据分析方案设计', completed: false },
        { id: 'section6-4', title: '数据分析实现', completed: false },
        { id: 'section6-5', title: '项目展示与评估', completed: false }
      ]
    }
  ];

  // 章节内容数据
  const chapterContents = {
    'chapter1': {
      title: '第一章：供应链管理概述',
      sections: [
        {
          id: 'section1-1',
          title: '供应链管理的概念与意义',
          content: '供应链管理是指对从供应商到客户的整个流程进行计划、组织、协调和控制，以实现供应链的高效运作。\n\n供应链管理的意义：\n1. 降低成本：通过优化供应链流程，降低采购、库存和物流成本\n2. 提高效率：减少供应链中的浪费和延迟\n3. 增强竞争力：快速响应市场需求，提高客户满意度\n4. 降低风险：减少供应链中断的风险',
          codeExamples: [],
          resources: [
            '《供应链管理》教材',
            '供应链管理案例分析',
            '供应链管理最佳实践'
          ]
        },
        {
          id: 'section1-2',
          title: '供应链管理的发展历程',
          content: '供应链管理的发展经历了以下阶段：\n\n1. 传统采购管理阶段：关注采购成本和质量\n2. 物流管理阶段：关注物流效率和配送\n3. 供应链管理阶段：关注整个供应链的协调和优化\n4. 数字化供应链阶段：利用数字技术实现供应链的智能化和可视化',
          codeExamples: [],
          resources: [
            '供应链管理发展历程',
            '数字化供应链转型指南',
            '供应链管理演变趋势'
          ]
        },
        {
          id: 'section1-3',
          title: '供应链管理的核心流程',
          content: '供应链管理的核心流程包括：\n\n1. 计划：制定供应链战略和计划\n2. 采购：选择供应商，采购原材料和零部件\n3. 制造：生产和组装产品\n4. 配送：仓储和物流配送\n5. 退货：处理退货和售后服务',
          codeExamples: [],
          resources: [
            '供应链核心流程指南',
            '供应链流程优化方法',
            '供应链流程管理工具'
          ]
        },
        {
          id: 'section1-4',
          title: '供应链管理的挑战与机遇',
          content: '供应链管理面临的挑战：\n\n1. 全球化：全球供应链的复杂性和风险\n2. 不确定性：市场需求和供应的不确定性\n3. 成本压力：不断上升的成本压力\n4. 可持续性：环境和社会责任要求\n\n供应链管理的机遇：\n1. 数字化技术：物联网、大数据、人工智能等技术的应用\n2. 供应链金融：创新的供应链金融解决方案\n3. 协作共赢：供应链伙伴之间的深度协作',
          codeExamples: [],
          resources: [
            '供应链管理挑战与对策',
            '数字化供应链机遇',
            '供应链创新案例'
          ]
        }
      ]
    },
    'chapter2': {
      title: '第二章：供应链数据采集与预处理',
      sections: [
        {
          id: 'section2-1',
          title: '供应链数据的类型与来源',
          content: '供应链数据的类型包括：\n\n1. 采购数据：供应商信息、采购订单、价格等\n2. 生产数据：生产计划、生产进度、质量控制等\n3. 库存数据：库存水平、库存周转率、库存成本等\n4. 物流数据：运输时间、运输成本、配送路线等\n5. 销售数据：销售订单、销售预测、客户需求等\n\n供应链数据的来源：\n1. 企业内部系统：ERP、MES、WMS等\n2. 供应商系统：供应商管理系统\n3. 客户系统：客户关系管理系统\n4. 第三方平台：物流平台、电商平台等',
          codeExamples: [],
          resources: [
            '供应链数据类型与来源',
            '企业数据系统集成指南',
            '供应链数据管理最佳实践'
          ]
        },
        {
          id: 'section2-2',
          title: '供应链数据采集方法',
          content: '供应链数据采集的方法包括：\n\n1. 手动采集：人工录入数据\n2. 自动采集：通过传感器、RFID等自动采集数据\n3. 系统集成：通过API接口集成不同系统的数据\n4. 网络爬虫：从互联网获取相关数据\n5. 问卷调查：通过问卷获取供应商和客户数据',
          codeExamples: [],
          resources: [
            '供应链数据采集方法',
            '自动数据采集技术',
            '系统集成方案'
          ]
        },
        {
          id: 'section2-3',
          title: '供应链数据质量评估',
          content: '供应链数据质量的评估维度包括：\n\n1. 准确性：数据是否准确反映实际情况\n2. 完整性：数据是否完整，没有缺失\n3. 一致性：数据在不同系统和时间点是否一致\n4. 及时性：数据是否及时更新\n5. 可靠性：数据是否可重复验证\n\n数据质量评估的方法：\n1. 数据审计：对数据进行全面检查\n2. 数据清洗：处理异常值和缺失值\n3. 数据验证：验证数据的准确性和一致性',
          codeExamples: [],
          resources: [
            '供应链数据质量评估方法',
            '数据质量指标体系',
            '数据质量改进策略'
          ]
        },
        {
          id: 'section2-4',
          title: '供应链数据预处理技术',
          content: '供应链数据预处理的技术包括：\n\n1. 数据清洗：处理缺失值、异常值和重复值\n2. 数据转换：将数据转换为适合分析的格式\n3. 数据标准化：统一数据的计量单位和格式\n4. 数据集成：合并来自不同来源的数据\n5. 数据降维：减少数据的维度，提高分析效率',
          codeExamples: [],
          resources: [
            '供应链数据预处理技术',
            '数据清洗方法',
            '数据集成工具'
          ]
        },
        {
          id: 'section2-5',
          title: '供应链数据存储与管理',
          content: '供应链数据的存储方式包括：\n\n1. 关系型数据库：如MySQL、PostgreSQL等\n2. 非关系型数据库：如MongoDB、Redis等\n3. 数据仓库：如Hive、BigQuery等\n4. 数据湖：如S3、HDFS等\n\n供应链数据管理的最佳实践：\n1. 数据 governance：建立数据管理规范和流程\n2. 数据安全：保护数据的安全性和隐私\n3. 数据备份：定期备份数据，防止数据丢失\n4. 数据生命周期管理：管理数据的整个生命周期',
          codeExamples: [],
          resources: [
            '供应链数据存储方案',
            '数据管理最佳实践',
            '数据安全与隐私保护'
          ]
        }
      ]
    },
    'chapter3': {
      title: '第三章：供应链数据分析方法',
      sections: [
        {
          id: 'section3-1',
          title: '描述性分析方法',
          content: '描述性分析是对供应链数据的基本特征进行描述，包括：\n\n1. 数据摘要：计算均值、中位数、标准差等统计量\n2. 数据可视化：使用图表展示数据的分布和趋势\n3. 数据分类：对数据进行分类和分组\n4. 数据对比：对比不同时期、不同部门的数据\n\n描述性分析的工具：\n1. Excel：基本的数据分析和可视化\n2. Tableau：高级数据可视化\n3. Power BI：商业智能分析\n4. Python：使用pandas、matplotlib等库进行分析',
          codeExamples: [],
          resources: [
            '描述性分析方法',
            '数据可视化工具指南',
            'Python数据分析教程'
          ]
        },
        {
          id: 'section3-2',
          title: '预测性分析方法',
          content: '预测性分析是基于历史数据预测未来趋势，包括：\n\n1. 时间序列分析：预测时间相关的数据\n2. 回归分析：分析变量之间的关系\n3. 机器学习：使用机器学习算法进行预测\n4. 仿真模拟：模拟不同场景的结果\n\n预测性分析的应用：\n1. 需求预测：预测产品需求\n2. 库存预测：预测库存水平\n3. 价格预测：预测原材料和产品价格\n4. 风险预测：预测供应链风险',
          codeExamples: [],
          resources: [
            '预测性分析方法',
            '时间序列分析教程',
            '机器学习在供应链中的应用'
          ]
        },
        {
          id: 'section3-3',
          title: '规范性分析方法',
          content: '规范性分析是基于数据提供最优决策建议，包括：\n\n1. 优化模型：线性规划、整数规划等\n2. 仿真模型：离散事件仿真、系统动力学等\n3. 决策树：基于树结构的决策分析\n4. 多准则决策：考虑多个决策准则\n\n规范性分析的应用：\n1. 供应链网络设计：优化供应链网络结构\n2. 库存优化：优化库存水平和位置\n3. 运输路线优化：优化运输路线和方式\n4. 生产计划优化：优化生产计划和调度',
          codeExamples: [],
          resources: [
            '规范性分析方法',
            '供应链优化模型',
            '决策分析工具'
          ]
        },
        {
          id: 'section3-4',
          title: '供应链数据分析工具',
          content: '供应链数据分析的工具包括：\n\n1. 商业智能工具：Tableau、Power BI、QlikView等\n2. 数据分析工具：Excel、Python、R等\n3. 供应链专业工具：SAP IBP、Oracle SCM、JDA等\n4. 开源工具：Apache Spark、Hadoop等\n\n工具选择的考虑因素：\n1. 功能需求：满足业务需求的功能\n2. 易用性：工具的易用程度\n3.  scalability：工具的可扩展性\n4. 成本：工具的购买和维护成本',
          codeExamples: [],
          resources: [
            '供应链数据分析工具',
            '工具选型指南',
            '工具使用教程'
          ]
        },
        {
          id: 'section3-5',
          title: '供应链数据分析案例',
          content: '供应链数据分析的案例包括：\n\n1. 需求预测案例：使用时间序列分析预测产品需求\n2. 库存优化案例：使用优化模型优化库存水平\n3. 运输路线优化案例：使用路径优化算法优化运输路线\n4. 供应商评估案例：使用多准则决策评估供应商\n5. 供应链风险分析案例：使用风险评估模型分析供应链风险\n\n案例分析的步骤：\n1. 问题定义：明确分析的问题和目标\n2. 数据收集：收集相关的数据\n3. 数据分析：使用适当的分析方法分析数据\n4. 结果解释：解释分析结果，得出结论\n5. 建议实施：提出改进建议并实施',
          codeExamples: [],
          resources: [
            '供应链数据分析案例集',
            '案例分析方法',
            '成功案例分享'
          ]
        }
      ]
    },
    'chapter4': {
      title: '第四章：供应链绩效分析',
      sections: [
        {
          id: 'section4-1',
          title: '供应链绩效指标体系',
          content: '供应链绩效指标体系包括：\n\n1. 成本指标：采购成本、库存成本、物流成本等\n2. 质量指标：产品质量、供应商质量、退货率等\n3. 时间指标：交货时间、生产周期、响应时间等\n4. 服务指标：客户满意度、准时交付率、订单履行率等\n5. 资产指标：资产周转率、库存周转率、投资回报率等\n6. 可持续性指标：环境影响、社会责任、合规性等\n\n指标选择的原则：\n1. 相关性：与业务目标相关\n2. 可测量性：能够准确测量\n3. 可操作性：能够通过管理措施影响\n4. 及时性：能够及时获取和分析',
          codeExamples: [],
          resources: [
            '供应链绩效指标体系',
            '指标设计指南',
            '行业标准指标'
          ]
        },
        {
          id: 'section4-2',
          title: '供应链绩效评估方法',
          content: '供应链绩效评估的方法包括：\n\n1. 平衡计分卡：从财务、客户、内部流程、学习与成长四个维度评估\n2. SCOR模型：供应链运作参考模型，从计划、采购、制造、配送、退货五个流程评估\n3. 标杆管理：与行业最佳实践或竞争对手比较\n4. 六西格玛：使用统计方法评估和改进流程\n5. 精益管理：消除浪费，提高效率\n\n评估的步骤：\n1. 确定评估目标和范围\n2. 选择评估指标和方法\n3. 收集和分析数据\n4. 评估结果并识别改进机会\n5. 制定和实施改进计划',
          codeExamples: [],
          resources: [
            '供应链绩效评估方法',
            '平衡计分卡应用',
            'SCOR模型指南'
          ]
        },
        {
          id: 'section4-3',
          title: '供应链绩效分析工具',
          content: '供应链绩效分析的工具包括：\n\n1. 商业智能工具：Tableau、Power BI等\n2. 供应链管理系统：SAP SCM、Oracle SCM等\n3. 数据分析工具：Excel、Python等\n4. 专业绩效评估工具：Arcus、LLamasoft等\n\n工具的功能：\n1. 数据收集和整合\n2. 指标计算和分析\n3. 可视化和报告\n4. 预测和模拟\n5. 改进建议',
          codeExamples: [],
          resources: [
            '供应链绩效分析工具',
            '工具使用教程',
            '工具对比分析'
          ]
        },
        {
          id: 'section4-4',
          title: '供应链绩效改进策略',
          content: '供应链绩效改进的策略包括：\n\n1. 流程优化：优化供应链流程，减少浪费和延迟\n2. 技术应用：应用数字化技术，提高效率和可视化\n3. 合作伙伴关系：加强与供应商和客户的合作\n4. 风险管理：识别和管理供应链风险\n5. 人才培养：培养供应链专业人才\n\n改进的步骤：\n1. 识别问题和机会\n2. 分析根本原因\n3. 制定改进方案\n4. 实施改进措施\n5. 监控和评估改进效果',
          codeExamples: [],
          resources: [
            '供应链绩效改进策略',
            '流程优化方法',
            '持续改进框架'
          ]
        },
        {
          id: 'section4-5',
          title: '供应链绩效分析案例',
          content: '供应链绩效分析的案例包括：\n\n1. 成本 reduction案例：通过优化采购流程降低成本\n2. 交付时间 improvement案例：通过流程优化缩短交付时间\n3. 库存 optimization案例：通过需求预测优化库存水平\n4. 质量 improvement案例：通过供应商管理提高产品质量\n5. 可持续性 improvement案例：通过绿色供应链减少环境影响\n\n案例分析的价值：\n1. 学习成功经验\n2. 避免常见错误\n3. 启发创新思路\n4. 指导实践应用',
          codeExamples: [],
          resources: [
            '供应链绩效分析案例集',
            '成功案例分析',
            '行业最佳实践'
          ]
        }
      ]
    },
    'chapter5': {
      title: '第五章：供应链风险管理',
      sections: [
        {
          id: 'section5-1',
          title: '供应链风险的类型与特征',
          content: '供应链风险的类型包括：\n\n1. 供应风险：供应商中断、质量问题、价格波动等\n2. 需求风险：需求预测错误、市场变化、客户变更等\n3. 运营风险：生产中断、设备故障、人力短缺等\n4. 物流风险：运输延迟、配送错误、仓储问题等\n5. 财务风险：汇率波动、信用风险、成本上升等\n6. 环境风险：自然灾害、地缘政治风险、法规变化等\n7. 网络风险：网络攻击、数据泄露、系统故障等\n\n供应链风险的特征：\n1. 复杂性：风险来源多样，相互关联\n2. 不确定性：风险发生的概率和影响难以预测\n3. 传导性：风险会在供应链中传导和放大\n4. 动态性：风险随时间和环境变化',
          codeExamples: [],
          resources: [
            '供应链风险类型与特征',
            '风险识别指南',
            '行业风险分析'
          ]
        },
        {
          id: 'section5-2',
          title: '供应链风险评估方法',
          content: '供应链风险评估的方法包括：\n\n1. 定性评估：专家评估、风险矩阵、情景分析等\n2. 定量评估：风险值(VaR)、蒙特卡洛模拟、敏感性分析等\n3. 混合评估：结合定性和定量方法\n\n评估的步骤：\n1. 风险识别：识别潜在的风险因素\n2. 风险分析：分析风险发生的概率和影响\n3. 风险评估：评估风险的严重程度和优先级\n4. 风险报告：生成风险评估报告',
          codeExamples: [],
          resources: [
            '供应链风险评估方法',
            '风险评估工具',
            '风险评估案例'
          ]
        },
        {
          id: 'section5-3',
          title: '供应链风险预测模型',
          content: '供应链风险预测的模型包括：\n\n1. 统计模型：时间序列分析、回归分析等\n2. 机器学习模型：分类模型、聚类模型、神经网络等\n3. 仿真模型：系统动力学、离散事件仿真等\n4. 混合模型：结合多种模型的优势\n\n预测的应用：\n1. 供应商风险预测：预测供应商违约风险\n2. 需求风险预测：预测需求波动风险\n3. 物流风险预测：预测物流中断风险\n4. 财务风险预测：预测财务风险',
          codeExamples: [],
          resources: [
            '供应链风险预测模型',
            '机器学习在风险预测中的应用',
            '预测模型评估方法'
          ]
        },
        {
          id: 'section5-4',
          title: '供应链风险应对策略',
          content: '供应链风险应对的策略包括：\n\n1. 风险规避：避免高风险的业务活动\n2. 风险降低：采取措施降低风险发生的概率和影响\n3. 风险转移：通过保险、合同等方式转移风险\n4. 风险保留：接受风险，准备应对措施\n5. 风险共享：与供应链伙伴共同承担风险\n\n应对的具体措施：\n1. 供应商多元化：发展多个供应商\n2. 库存缓冲：建立安全库存\n3. 供应链可视化：实时监控供应链状态\n4. 应急计划：制定风险应对预案\n5. 业务连续性管理：确保业务持续运营',
          codeExamples: [],
          resources: [
            '供应链风险应对策略',
            '风险缓解措施',
            '应急计划制定指南'
          ]
        },
        {
          id: 'section5-5',
          title: '供应链风险管理案例',
          content: '供应链风险管理的案例包括：\n\n1. 供应商风险案例：通过供应商多元化降低供应风险\n2. 物流风险案例：通过多式联运降低物流风险\n3. 需求风险案例：通过需求预测和库存优化降低需求风险\n4. 环境风险案例：通过供应链弹性设计应对环境风险\n5. 网络风险案例：通过网络安全措施降低网络风险\n\n案例分析的价值：\n1. 学习风险应对经验\n2. 了解风险管理的挑战\n3. 掌握风险应对的最佳实践\n4. 提高风险意识和应对能力',
          codeExamples: [],
          resources: [
            '供应链风险管理案例集',
            '成功风险管理案例',
            '风险应对经验分享'
          ]
        }
      ]
    },
    'chapter6': {
      title: '第六章：供应链数据分析项目实战',
      sections: [
        {
          id: 'section6-1',
          title: '项目需求分析',
          content: '项目需求分析是供应链数据分析项目的第一步，包括：\n\n1. 业务问题定义：明确要解决的业务问题\n2. 目标设定：设定项目的具体目标\n3. 数据需求分析：确定需要的数据类型和来源\n4. 约束条件分析：识别项目的约束条件\n5. 成功标准定义：定义项目成功的标准\n\n需求分析的方法：\n1. 访谈：与业务 stakeholders 进行访谈\n2. 问卷调查：通过问卷收集需求\n3. 文档分析：分析相关的业务文档\n4. 头脑风暴：与团队成员进行头脑风暴',
          codeExamples: [],
          resources: [
            '项目需求分析方法',
            '需求文档模板',
            '需求分析案例'
          ]
        },
        {
          id: 'section6-2',
          title: '数据采集与预处理',
          content: '数据采集与预处理是供应链数据分析项目的基础，包括：\n\n1. 数据采集：从不同来源收集数据\n2. 数据清洗：处理缺失值、异常值和重复值\n3. 数据转换：将数据转换为适合分析的格式\n4. 数据集成：合并来自不同来源的数据\n5. 数据验证：验证数据的准确性和一致性\n\n数据采集与预处理的工具：\n1. 数据采集工具：Python、Web爬虫等\n2. 数据处理工具：Pandas、Excel等\n3. 数据集成工具：ETL工具、API集成等',
          codeExamples: [],
          resources: [
            '数据采集与预处理指南',
            '数据处理工具教程',
            '数据质量控制方法'
          ]
        },
        {
          id: 'section6-3',
          title: '数据分析方案设计',
          content: '数据分析方案设计是供应链数据分析项目的核心，包括：\n\n1. 分析方法选择：根据问题选择合适的分析方法\n2. 模型设计：设计分析模型和算法\n3. 工具选择：选择适合的分析工具\n4. 分析流程设计：设计详细的分析流程\n5. 预期结果定义：定义预期的分析结果\n\n方案设计的原则：\n1. 针对性：针对具体的业务问题\n2. 可行性：在资源和时间约束下可行\n3. 可靠性：分析方法和模型可靠\n4. 可解释性：分析结果可解释和应用',
          codeExamples: [],
          resources: [
            '数据分析方案设计指南',
            '分析方法选择指南',
            '方案设计模板'
          ]
        },
        {
          id: 'section6-4',
          title: '数据分析实现',
          content: '数据分析实现是供应链数据分析项目的执行阶段，包括：\n\n1. 数据加载：将预处理后的数据加载到分析工具中\n2. 模型训练：训练分析模型（如果使用机器学习）\n3. 数据分析：执行分析流程\n4. 结果验证：验证分析结果的准确性和可靠性\n5. 结果优化：优化分析结果和模型\n\n实现的注意事项：\n1. 数据质量：确保数据的质量和一致性\n2. 模型性能：确保模型的性能和准确性\n3. 计算效率：确保分析的计算效率\n4. 结果可重现性：确保分析结果可重现',
          codeExamples: [],
          resources: [
            '数据分析实现指南',
            '模型训练方法',
            '分析结果验证技术'
          ]
        },
        {
          id: 'section6-5',
          title: '项目展示与评估',
          content: '项目展示与评估是供应链数据分析项目的最后阶段，包括：\n\n1. 结果可视化：将分析结果可视化\n2. 报告撰写：撰写分析报告\n3. 结果展示：向 stakeholders 展示分析结果\n4. 反馈收集：收集 stakeholders 的反馈\n5. 项目评估：评估项目的成功度和价值\n6. 经验总结：总结项目的经验和教训\n\n展示与评估的最佳实践：\n1. 清晰简洁：展示内容清晰简洁\n2. 重点突出：突出关键发现和建议\n3. 交互性：使用交互式可视化\n4. 实用性：提供实用的建议和解决方案\n5. 持续改进：基于反馈持续改进',
          codeExamples: [],
          resources: [
            '项目展示与评估指南',
            '报告撰写技巧',
            '展示设计最佳实践'
          ]
        }
      ]
    }
  };

  // 400题题库（包含单选、多选和判断题）
  const chapterQuestions = {
    'chapter1': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        type: 'single' as const,
        question: `供应链管理概述问题 ${i + 1}：供应链管理的核心是？`,
        options: [
          '降低成本',
          '提高效率',
          '协调供应链各环节',
          '提高客户满意度'
        ],
        correctAnswer: 2,
        explanation: '供应链管理的核心是协调供应链各环节，实现整体优化。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 51,
        type: 'multiple' as const,
        question: `供应链管理概述问题 ${i + 51}：供应链管理的核心流程包括哪些？`,
        options: [
          '计划',
          '采购',
          '制造',
          '配送'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '供应链管理的核心流程包括计划、采购、制造、配送和退货。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 81,
        type: 'judgment' as const,
        question: `供应链管理概述问题 ${i + 81}：供应链管理只关注企业内部的流程。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '供应链管理关注从供应商到客户的整个流程，不仅仅是企业内部。'
      }))
    ],
    'chapter2': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 101,
        type: 'single' as const,
        question: `供应链数据采集与预处理问题 ${i + 1}：下列哪项不是供应链数据的类型？`,
        options: [
          '采购数据',
          '生产数据',
          '销售数据',
          '员工数据'
        ],
        correctAnswer: 3,
        explanation: '员工数据不属于供应链数据的类型，供应链数据包括采购数据、生产数据、库存数据、物流数据和销售数据。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 151,
        type: 'multiple' as const,
        question: `供应链数据采集与预处理问题 ${i + 51}：供应链数据采集的方法包括哪些？`,
        options: [
          '手动采集',
          '自动采集',
          '系统集成',
          '网络爬虫'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '供应链数据采集的方法包括手动采集、自动采集、系统集成、网络爬虫和问卷调查。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 181,
        type: 'judgment' as const,
        question: `供应链数据采集与预处理问题 ${i + 81}：数据预处理是数据分析的可选步骤。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '数据预处理是数据分析的必要步骤，它可以提高数据质量和分析效果。'
      }))
    ],
    'chapter3': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 201,
        type: 'single' as const,
        question: `供应链数据分析方法问题 ${i + 1}：下列哪项属于预测性分析方法？`,
        options: [
          '数据摘要',
          '时间序列分析',
          '数据可视化',
          '数据分类'
        ],
        correctAnswer: 1,
        explanation: '时间序列分析属于预测性分析方法，用于预测未来趋势。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 251,
        type: 'multiple' as const,
        question: `供应链数据分析方法问题 ${i + 51}：供应链数据分析的工具包括哪些？`,
        options: [
          'Tableau',
          'Python',
          'Excel',
          'SAP SCM'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '供应链数据分析的工具包括商业智能工具、数据分析工具、供应链专业工具等。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 281,
        type: 'judgment' as const,
        question: `供应链数据分析方法问题 ${i + 81}：规范性分析可以提供最优决策建议。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '规范性分析基于数据提供最优决策建议，帮助企业做出更好的决策。'
      }))
    ],
    'chapter4': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 301,
        type: 'single' as const,
        question: `供应链绩效分析问题 ${i + 1}：下列哪项属于供应链绩效的成本指标？`,
        options: [
          '准时交付率',
          '库存周转率',
          '采购成本',
          '客户满意度'
        ],
        correctAnswer: 2,
        explanation: '采购成本属于供应链绩效的成本指标，准时交付率和客户满意度属于服务指标，库存周转率属于资产指标。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 351,
        type: 'multiple' as const,
        question: `供应链绩效分析问题 ${i + 51}：供应链绩效评估的方法包括哪些？`,
        options: [
          '平衡计分卡',
          'SCOR模型',
          '标杆管理',
          '六西格玛'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '供应链绩效评估的方法包括平衡计分卡、SCOR模型、标杆管理、六西格玛和精益管理等。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 381,
        type: 'judgment' as const,
        question: `供应链绩效分析问题 ${i + 81}：供应链绩效指标越多越好。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '供应链绩效指标不是越多越好，应该选择与业务目标相关、可测量、可操作的指标。'
      }))
    ],
    'chapter5': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 401,
        type: 'single' as const,
        question: `供应链风险管理问题 ${i + 1}：下列哪项不属于供应链风险的类型？`,
        options: [
          '供应风险',
          '需求风险',
          '运营风险',
          '市场风险'
        ],
        correctAnswer: 3,
        explanation: '市场风险是一个更广泛的概念，供应链风险包括供应风险、需求风险、运营风险、物流风险、财务风险、环境风险和网络风险等。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 451,
        type: 'multiple' as const,
        question: `供应链风险管理问题 ${i + 51}：供应链风险应对的策略包括哪些？`,
        options: [
          '风险规避',
          '风险降低',
          '风险转移',
          '风险保留'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '供应链风险应对的策略包括风险规避、风险降低、风险转移、风险保留和风险共享。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 481,
        type: 'judgment' as const,
        question: `供应链风险管理问题 ${i + 81}：供应链风险管理可以完全消除风险。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '供应链风险管理不能完全消除风险，只能降低风险发生的概率和影响。'
      }))
    ],
    'chapter6': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 501,
        type: 'single' as const,
        question: `供应链数据分析项目实战问题 ${i + 1}：供应链数据分析项目的第一步是？`,
        options: [
          '数据采集',
          '需求分析',
          '数据分析',
          '结果展示'
        ],
        correctAnswer: 1,
        explanation: '供应链数据分析项目的第一步是需求分析，明确要解决的业务问题和目标。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 551,
        type: 'multiple' as const,
        question: `供应链数据分析项目实战问题 ${i + 51}：供应链数据分析项目的阶段包括哪些？`,
        options: [
          '需求分析',
          '数据采集与预处理',
          '数据分析方案设计',
          '数据分析实现'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '供应链数据分析项目的阶段包括需求分析、数据采集与预处理、数据分析方案设计、数据分析实现、项目展示与评估。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 581,
        type: 'judgment' as const,
        question: `供应链数据分析项目实战问题 ${i + 81}：项目展示只需要展示分析结果，不需要展示分析过程。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '项目展示不仅需要展示分析结果，还需要展示分析过程，以便 stakeholders 理解结果的来源和可靠性。'
      }))
    ]
  };

  const learningResources: Resource[] = [
    {
      id: 'resource1',
      title: '供应链管理概述',
      type: 'document',
      difficulty: 'beginner',
      url: '#',
      description: '供应链管理的基本概念和核心流程',
      duration: '8小时'
    },
    {
      id: 'resource2',
      title: '供应链数据采集技术',
      type: 'video',
      difficulty: 'beginner',
      url: '#',
      description: '供应链数据的采集方法和工具',
      duration: '6小时'
    },
    {
      id: 'resource3',
      title: '供应链数据分析方法',
      type: 'article',
      difficulty: 'intermediate',
      url: '#',
      description: '供应链数据分析的常用方法和技术',
      duration: '5小时'
    },
    {
      id: 'resource4',
      title: '供应链绩效评估指标',
      type: 'code',
      difficulty: 'intermediate',
      url: '#',
      description: '供应链绩效评估的指标体系和计算方法',
      duration: '4小时'
    },
    {
      id: 'resource5',
      title: '供应链风险管理',
      type: 'article',
      difficulty: 'advanced',
      url: '#',
      description: '供应链风险的识别、评估和应对策略',
      duration: '6小时'
    },
    {
      id: 'resource6',
      title: '供应链数据分析项目实战',
      type: 'video',
      difficulty: 'advanced',
      url: '#',
      description: '完整的供应链数据分析项目案例',
      duration: '10小时'
    }
  ];

  const exercises: Question[] = [
    {
      id: 'exercise1',
      text: '下列关于供应链管理的说法，正确的是：',
      options: [
        '供应链管理只关注物流环节',
        '供应链管理包括从供应商到客户的全过程',
        '供应链管理与企业战略无关',
        '供应链管理不需要数据分析'
      ],
      correctAnswer: 1,
      explanation: '供应链管理是指从供应商到客户的全过程管理，包括物流、信息流和资金流的协调。',
      difficulty: 'easy'
    },
    {
      id: 'exercise2',
      text: '供应链数据的主要来源不包括：',
      options: [
        '企业内部系统',
        '供应商系统',
        '客户反馈',
        '竞争对手内部数据'
      ],
      correctAnswer: 3,
      explanation: '竞争对手内部数据通常无法直接获取，不是供应链数据的主要来源。',
      difficulty: 'medium'
    },
    {
      id: 'exercise3',
      text: '供应链绩效评估的核心指标不包括：',
      options: [
        '成本指标',
        '质量指标',
        '时间指标',
        '员工满意度'
      ],
      correctAnswer: 3,
      explanation: '员工满意度是企业内部管理指标，不是供应链绩效评估的核心指标。',
      difficulty: 'medium'
    },
    {
      id: 'exercise4',
      text: '供应链风险管理的首要步骤是：',
      options: [
        '风险评估',
        '风险识别',
        '风险应对',
        '风险监控'
      ],
      correctAnswer: 1,
      explanation: '供应链风险管理的首要步骤是风险识别，只有识别出风险才能进行后续的评估和应对。',
      difficulty: 'easy'
    },
    {
      id: 'exercise5',
      text: '下列关于供应链数据分析的说法，错误的是：',
      options: [
        '描述性分析用于了解过去的情况',
        '预测性分析用于预测未来趋势',
        '规范性分析用于提供决策建议',
        '供应链数据分析不需要考虑数据质量'
      ],
      correctAnswer: 3,
      explanation: '数据质量是供应链数据分析的基础，直接影响分析结果的准确性和可靠性。',
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
      description: '本课程是商务数据分析与应用专业的专业课程，旨在培养学生掌握供应链数据分析的基本技能，为企业供应链管理提供数据支持。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：供应链管理概述',
      description: '学习供应链管理的基本概念和方法，了解供应链管理在企业运营中的重要性。',
      topics: [
        '供应链管理的概念与意义',
        '供应链管理的发展历程',
        '供应链管理的核心流程',
        '供应链管理的挑战与机遇'
      ],
      resources: [
        '《供应链管理》',
        '供应链管理案例分析',
        '供应链管理最佳实践'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：供应链数据采集与预处理',
      description: '学习供应链数据的采集方法和预处理技术，为后续的数据分析打下基础。',
      topics: [
        '供应链数据的类型与来源',
        '供应链数据采集方法',
        '供应链数据质量评估',
        '供应链数据预处理技术',
        '供应链数据存储与管理'
      ],
      resources: [
        '《供应链数据管理》',
        '数据采集与预处理教程',
        '供应链数据管理案例'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：供应链数据分析方法',
      description: '学习供应链数据分析的基本方法和技术，掌握供应链数据分析的核心技能。',
      topics: [
        '描述性分析方法',
        '预测性分析方法',
        '规范性分析方法',
        '供应链数据分析工具',
        '供应链数据分析案例'
      ],
      resources: [
        '《供应链数据分析》',
        '数据分析方法教程',
        '供应链数据分析工具指南'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：供应链绩效分析',
      description: '学习供应链绩效分析的方法和技术，掌握供应链绩效评估的核心技能。',
      topics: [
        '供应链绩效指标体系',
        '供应链绩效评估方法',
        '供应链绩效分析工具',
        '供应链绩效改进策略',
        '供应链绩效分析案例'
      ],
      resources: [
        '《供应链绩效评估》',
        '供应链绩效指标体系指南',
        '供应链绩效分析案例'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：供应链风险管理',
      description: '学习供应链风险管理的方法和技术，掌握供应链风险评估和应对的核心技能。',
      topics: [
        '供应链风险的类型与特征',
        '供应链风险评估方法',
        '供应链风险预测模型',
        '供应链风险应对策略',
        '供应链风险管理案例'
      ],
      resources: [
        '《供应链风险管理》',
        '供应链风险评估工具',
        '供应链风险管理案例'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：供应链数据分析项目实战',
      description: '通过实际项目练习，综合运用所学知识，完成供应链数据分析的全流程。',
      topics: [
        '项目需求分析',
        '数据采集与预处理',
        '数据分析方案设计',
        '数据分析实现',
        '项目展示与评估'
      ],
      resources: [
        '供应链数据分析项目案例',
        '项目实战指导',
        '数据分析报告模板'
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
              <span className="text-4xl">📦</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            供应链数据分析
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业专业课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握供应链数据分析的基本技能，为企业供应链管理提供数据支持，
            使学生能够运用数据分析技术优化供应链运营。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：数据分析技术
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              后续课程：数据库原理与应用
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
              课程内容按照供应链管理的流程编排，涵盖从供应链基础到数据分析应用的全过程
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
                  <span className="text-gray-300">掌握供应链管理的基本概念和流程</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解供应链数据的类型和来源</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉供应链数据分析的方法和技术</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">掌握供应链绩效评估和风险管理的方法</span>
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
                  <span className="text-gray-300">能够采集和预处理供应链数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够运用数据分析方法分析供应链问题</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够评估供应链绩效并提出改进建议</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够完成完整的供应链数据分析项目</span>
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
                  <p className="text-gray-400">包括供应链数据分析练习、案例分析等</p>
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
                  <p className="text-gray-400">综合供应链数据分析项目</p>
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

      {/* 学习中心 */}
      <section className="py-16 px-4 relative z-10" data-learning-section="true">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              学习中心
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              管理学习进度、访问学习资源、进行练习测试
            </p>
          </div>
          
          {/* 标签页导航 */}
          <div className="flex flex-wrap justify-center mb-8">
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-6 py-3 mx-2 mb-4 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'progress'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-800/70 border border-gray-700 text-gray-300 hover:border-blue-500/50'
              }`}
            >
              学习进度
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 mx-2 mb-4 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'resources'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-800/70 border border-gray-700 text-gray-300 hover:border-blue-500/50'
              }`}
            >
              学习资源
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-3 mx-2 mb-4 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'exercises'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-800/70 border border-gray-700 text-gray-300 hover:border-blue-500/50'
              }`}
            >
              练习测试
            </button>
          </div>
          
          {/* 标签页内容 */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            {/* 学习进度标签页 */}
            {activeTab === 'progress' && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-100 mb-6">供应链数据分析课程学习进度</h3>
                {/* 总体进度条 */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">总体进度</span>
                    <span className="text-blue-400 font-medium">
                      {progressItems.reduce((total, item) => total + (item.children?.filter(sub => sub.completed).length || 0), 0)}/{progressItems.reduce((total, item) => total + (item.children?.length || 0), 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(progressItems.reduce((total, item) => total + (item.children?.filter(sub => sub.completed).length || 0), 0) / progressItems.reduce((total, item) => total + (item.children?.length || 0), 0)) * 100}%` 
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
                          {item.children?.filter(sub => sub.completed).length}/{item.children?.length}
                        </span>
                      </div>
                      {item.children && (
                        <div className="mt-3 ml-9 space-y-2">
                          {item.children.map(subItem => (
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
            
            {/* 学习资源标签页 */}
            {activeTab === 'resources' && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-100 mb-6">学习资源</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {learningResources.map((resource) => (
                    <div key={resource.id} className="border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-blue-500/20">
                          {resource.type === 'article' && '📄'}
                          {resource.type === 'video' && '🎥'}
                          {resource.type === 'document' && '📚'}
                          {resource.type === 'code' && '💻'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-100 mb-2">{resource.title}</h4>
                          <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className={`px-2 py-1 rounded-full mr-2 ${
                              resource.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                              resource.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {resource.difficulty === 'beginner' ? '初级' :
                               resource.difficulty === 'intermediate' ? '中级' :
                               '高级'}
                            </span>
                            <span>{resource.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 练习测试标签页 */}
            {activeTab === 'exercises' && !activeChapter && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h3 className="text-2xl font-semibold text-gray-100 mb-6">章节练习测试</h3>
                <p className="text-gray-400 mb-8">选择章节进行测试，每次测试包含30道题目（单选、多选、判断）</p>
                <div className="space-y-4">
                  {progressItems.map((item) => (
                    <div key={item.id} className="border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => {
                        setActiveChapter(item.id);
                        setActiveChapterMode('exercise');
                      }}>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-blue-400 text-xl">📝</span>
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
                    className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
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
          
          {/* 章节内容和练习 */}
          {activeChapter && activeChapterMode === 'content' && (
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setActiveChapter(null)}
                  className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
                >
                  <span className="mr-2">←</span> 返回学习中心
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
            <div className="mt-8">
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
                  <span className="mr-2">←</span> 返回学习中心
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
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-300">供应链数据分析课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}
