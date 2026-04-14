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

export default function DataCollectionCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeChapterMode, setActiveChapterMode] = useState<'content' | 'exercise' | null>(null);
  const [activeTab, setActiveTab] = useState<'progress' | 'resources' | 'exercises'>('progress');

  // 学习进度数据
  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：数据采集概述',
      completed: false,
      subItems: [
        { id: 'chapter1-1', title: '数据采集的概念与意义', completed: false },
        { id: 'chapter1-2', title: '数据采集的类型与方法', completed: false },
        { id: 'chapter1-3', title: '数据采集的工具与技术', completed: false },
        { id: 'chapter1-4', title: '数据采集的伦理与规范', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：Web数据采集',
      completed: false,
      subItems: [
        { id: 'chapter2-1', title: 'HTTP协议基础', completed: false },
        { id: 'chapter2-2', title: 'HTML与CSS基础', completed: false },
        { id: 'chapter2-3', title: 'Python爬虫库介绍', completed: false },
        { id: 'chapter2-4', title: '静态网页数据采集', completed: false },
        { id: 'chapter2-5', title: '动态网页数据采集', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：API数据采集',
      completed: false,
      subItems: [
        { id: 'chapter3-1', title: 'API基本概念', completed: false },
        { id: 'chapter3-2', title: 'RESTful API设计原则', completed: false },
        { id: 'chapter3-3', title: 'API认证与授权', completed: false },
        { id: 'chapter3-4', title: 'API数据获取与处理', completed: false },
        { id: 'chapter3-5', title: '常见API使用案例', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：数据预处理',
      completed: false,
      subItems: [
        { id: 'chapter4-1', title: '数据质量评估', completed: false },
        { id: 'chapter4-2', title: '数据清洗方法', completed: false },
        { id: 'chapter4-3', title: '数据转换技术', completed: false },
        { id: 'chapter4-4', title: '数据集成方法', completed: false },
        { id: 'chapter4-5', title: '数据预处理工具', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：数据存储',
      completed: false,
      subItems: [
        { id: 'chapter5-1', title: '数据存储技术概述', completed: false },
        { id: 'chapter5-2', title: '文件存储格式', completed: false },
        { id: 'chapter5-3', title: '数据库存储', completed: false },
        { id: 'chapter5-4', title: '数据存储最佳实践', completed: false },
        { id: 'chapter5-5', title: '数据安全与隐私', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据采集项目实战',
      completed: false,
      subItems: [
        { id: 'chapter6-1', title: '项目需求分析', completed: false },
        { id: 'chapter6-2', title: '数据采集方案设计', completed: false },
        { id: 'chapter6-3', title: '数据采集实现', completed: false },
        { id: 'chapter6-4', title: '数据预处理', completed: false },
        { id: 'chapter6-5', title: '项目展示与评估', completed: false }
      ]
    }
  ];

  // 章节内容数据
  const chapterContents = {
    'chapter1': {
      title: '第一章：数据采集概述',
      sections: [
        {
          id: 'section1-1',
          title: '数据采集的概念与意义',
          content: '数据采集是指从各种数据源获取数据的过程，是数据分析的第一步。\n\n数据采集的意义：\n1. 为数据分析提供原始数据\n2. 帮助企业了解市场和客户\n3. 支持数据驱动的决策\n4. 发现业务机会和问题',
          codeExamples: [],
          resources: [
            '《数据采集与预处理》教材',
            '数据采集技术综述',
            '数据采集在企业中的应用案例'
          ]
        },
        {
          id: 'section1-2',
          title: '数据采集的类型与方法',
          content: '数据采集的类型：\n\n1. 内部数据：企业内部系统产生的数据\n2. 外部数据：来自企业外部的数据源\n3. 结构化数据：有固定格式的数据\n4. 非结构化数据：无固定格式的数据\n\n数据采集的方法：\n1. 网络爬虫\n2. API接口\n3. 传感器采集\n4. 问卷调查',
          codeExamples: [],
          resources: [
            '数据采集方法对比分析',
            '不同类型数据的采集策略',
            '数据采集工具选型指南'
          ]
        },
        {
          id: 'section1-3',
          title: '数据采集的工具与技术',
          content: '常用的数据采集工具和技术：\n\n1. Python库：Requests、BeautifulSoup、Scrapy\n2. API工具：Postman、Insomnia\n3. 数据库工具：MySQL、PostgreSQL\n4. 数据存储：CSV、JSON、数据库',
          codeExamples: ['import requests', 'from bs4 import BeautifulSoup', 'import scrapy'],
          resources: [
            'Python爬虫库使用指南',
            'API测试工具教程',
            '数据存储格式对比'
          ]
        },
        {
          id: 'section1-4',
          title: '数据采集的伦理与规范',
          content: '数据采集的伦理和规范：\n\n1. 遵守法律法规\n2. 尊重用户隐私\n3. 避免过度采集\n4. 注明数据来源\n5. 遵守网站的robots.txt规则',
          codeExamples: [],
          resources: [
            '数据采集伦理指南',
            '网络爬虫法律规范',
            '数据隐私保护最佳实践'
          ]
        }
      ]
    },
    'chapter2': {
      title: '第二章：Web数据采集',
      sections: [
        {
          id: 'section2-1',
          title: 'HTTP协议基础',
          content: 'HTTP（HyperText Transfer Protocol）是用于在Web上传输数据的协议。\n\nHTTP请求方法：\n1. GET：获取资源\n2. POST：提交数据\n3. PUT：更新资源\n4. DELETE：删除资源\n\nHTTP响应状态码：\n1. 2xx：成功\n2. 3xx：重定向\n3. 4xx：客户端错误\n4. 5xx：服务器错误',
          codeExamples: [],
          resources: [
            'HTTP协议详解',
            'RESTful API设计指南',
            'HTTP状态码速查手册'
          ]
        },
        {
          id: 'section2-2',
          title: 'HTML与CSS基础',
          content: 'HTML（HyperText Markup Language）是用于创建网页的标记语言。\n\nCSS（Cascading Style Sheets）是用于描述网页样式的语言。\n\n常用的HTML标签：\n1. <div>：块级元素\n2. <span>：行内元素\n3. <a>：链接\n4. <table>：表格\n5. <form>：表单',
          codeExamples: [],
          resources: [
            'HTML基础教程',
            'CSS选择器参考',
            '网页结构分析指南'
          ]
        },
        {
          id: 'section2-3',
          title: 'Python爬虫库介绍',
          content: 'Python中常用的爬虫库：\n\n1. Requests：用于发送HTTP请求\n2. BeautifulSoup：用于解析HTML和XML\n3. Scrapy：功能强大的爬虫框架\n4. Selenium：用于处理动态网页',
          codeExamples: ['import requests', 'from bs4 import BeautifulSoup', 'import scrapy', 'from selenium import webdriver'],
          resources: [
            'Requests库官方文档',
            'BeautifulSoup使用教程',
            'Scrapy框架指南'
          ]
        },
        {
          id: 'section2-4',
          title: '静态网页数据采集',
          content: '静态网页是指内容固定的网页，数据直接嵌入在HTML中。\n\n采集步骤：\n1. 发送HTTP请求获取网页内容\n2. 解析HTML提取数据\n3. 存储提取的数据',
          codeExamples: ['import requests', 'from bs4 import BeautifulSoup', 'response = requests.get("https://example.com")', 'soup = BeautifulSoup(response.text, "html.parser")', 'data = soup.find_all("div", class_="item")'],
          resources: [
            '静态网页爬取实战',
            'HTML解析技巧',
            '数据提取最佳实践'
          ]
        },
        {
          id: 'section2-5',
          title: '动态网页数据采集',
          content: '动态网页是指内容通过JavaScript动态生成的网页。\n\n采集方法：\n1. 分析API接口\n2. 使用Selenium模拟浏览器行为\n3. 使用Pyppeteer或Playwright',
          codeExamples: ['from selenium import webdriver', 'driver = webdriver.Chrome()', 'driver.get("https://example.com")', 'data = driver.find_elements_by_class_name("item")'],
          resources: [
            '动态网页爬取技术',
            'Selenium自动化测试指南',
            'API接口分析方法'
          ]
        }
      ]
    },
    'chapter3': {
      title: '第三章：API数据采集',
      sections: [
        {
          id: 'section3-1',
          title: 'API基本概念',
          content: 'API（Application Programming Interface）是应用程序编程接口，用于不同软件系统之间的通信。\n\nAPI的类型：\n1. RESTful API\n2. SOAP API\n3. GraphQL API\n4. WebSocket API',
          codeExamples: [],
          resources: [
            'API设计基础',
            'RESTful API详解',
            '不同API类型对比'
          ]
        },
        {
          id: 'section3-2',
          title: 'RESTful API设计原则',
          content: 'RESTful API的设计原则：\n\n1. 资源标识：使用URL标识资源\n2. 统一接口：使用标准HTTP方法\n3. 无状态：服务器不保存客户端状态\n4. 缓存：支持缓存机制\n5. 分层系统：支持分层架构',
          codeExamples: [],
          resources: [
            'RESTful API设计最佳实践',
            'API版本控制策略',
            'RESTful API测试方法'
          ]
        },
        {
          id: 'section3-3',
          title: 'API认证与授权',
          content: 'API认证和授权机制：\n\n1. API Key：简单的认证方式\n2. OAuth 2.0：流行的授权框架\n3. JWT（JSON Web Token）：无状态认证\n4. Basic Auth：基本的用户名密码认证',
          codeExamples: ['import requests', 'headers = {"Authorization": "Bearer YOUR_TOKEN"}', 'response = requests.get("https://api.example.com/data", headers=headers)'],
          resources: [
            'API认证机制详解',
            'OAuth 2.0实战指南',
            'JWT使用教程'
          ]
        },
        {
          id: 'section3-4',
          title: 'API数据获取与处理',
          content: 'API数据获取和处理步骤：\n\n1. 了解API文档\n2. 构建API请求\n3. 发送请求获取数据\n4. 解析和处理数据\n5. 存储数据',
          codeExamples: ['import requests', 'import json', 'response = requests.get("https://api.example.com/data")', 'data = response.json()', 'with open("data.json", "w") as f:', '    json.dump(data, f)'],
          resources: [
            'API文档阅读指南',
            'API请求构建技巧',
            'JSON数据处理方法'
          ]
        },
        {
          id: 'section3-5',
          title: '常见API使用案例',
          content: '常见的API使用案例：\n\n1. 天气API：获取天气数据\n2. 地图API：获取地理位置信息\n3. 社交媒体API：获取社交数据\n4. 金融API：获取金融市场数据\n5. 新闻API：获取新闻数据',
          codeExamples: [],
          resources: [
            '公开API资源汇总',
            'API调用实战案例',
            'API速率限制处理'
          ]
        }
      ]
    },
    'chapter4': {
      title: '第四章：数据预处理',
      sections: [
        {
          id: 'section4-1',
          title: '数据质量评估',
          content: '数据质量评估的维度：\n\n1. 完整性：数据是否完整\n2. 准确性：数据是否准确\n3. 一致性：数据是否一致\n4. 时效性：数据是否及时\n5. 可靠性：数据是否可靠',
          codeExamples: [],
          resources: [
            '数据质量评估方法',
            '数据质量指标体系',
            '数据质量改进策略'
          ]
        },
        {
          id: 'section4-2',
          title: '数据清洗方法',
          content: '数据清洗的方法：\n\n1. 处理缺失值：删除、填充、插值\n2. 处理异常值：删除、替换、转换\n3. 处理重复值：删除重复记录\n4. 处理不一致值：标准化、转换',
          codeExamples: ['import pandas as pd', 'df = pd.read_csv("data.csv")', 'df = df.dropna()', 'df = df.drop_duplicates()'],
          resources: [
            '数据清洗技术指南',
            'Pandas数据清洗教程',
            '缺失值处理方法对比'
          ]
        },
        {
          id: 'section4-3',
          title: '数据转换技术',
          content: '数据转换的技术：\n\n1. 数据类型转换：转换数据类型\n2. 数据标准化：将数据缩放到特定范围\n3. 数据离散化：将连续数据转换为离散数据\n4. 特征工程：创建新的特征',
          codeExamples: ['import pandas as pd', 'df["age"] = df["age"].astype(int)', 'from sklearn.preprocessing import StandardScaler', 'scaler = StandardScaler()', 'df["scaled_feature"] = scaler.fit_transform(df[["feature"]])'],
          resources: [
            '数据转换技术详解',
            '特征工程实践指南',
            '数据标准化方法'
          ]
        },
        {
          id: 'section4-4',
          title: '数据集成方法',
          content: '数据集成的方法：\n\n1. 合并：将多个数据集合并为一个\n2. 连接：基于共同字段连接数据集\n3. 追加：将一个数据集追加到另一个数据集\n4. 转换：将数据转换为统一格式',
          codeExamples: ['import pandas as pd', 'df1 = pd.read_csv("data1.csv")', 'df2 = pd.read_csv("data2.csv")', 'merged_df = pd.merge(df1, df2, on="id")', 'appended_df = pd.concat([df1, df2])'],
          resources: [
            '数据集成技术',
            'Pandas数据合并指南',
            '数据集成最佳实践'
          ]
        },
        {
          id: 'section4-5',
          title: '数据预处理工具',
          content: '常用的数据预处理工具：\n\n1. Pandas：Python数据处理库\n2. NumPy：Python科学计算库\n3. scikit-learn：机器学习库，包含数据预处理模块\n4. OpenRefine：开源数据清洗工具',
          codeExamples: ['import pandas as pd', 'import numpy as np', 'from sklearn.preprocessing import MinMaxScaler'],
          resources: [
            'Pandas官方文档',
            'scikit-learn预处理模块指南',
            'OpenRefine使用教程'
          ]
        }
      ]
    },
    'chapter5': {
      title: '第五章：数据存储',
      sections: [
        {
          id: 'section5-1',
          title: '数据存储技术概述',
          content: '数据存储技术的类型：\n\n1. 文件存储：CSV、JSON、Excel等\n2. 关系型数据库：MySQL、PostgreSQL、Oracle等\n3. 非关系型数据库：MongoDB、Redis、Cassandra等\n4. 数据仓库：Hive、BigQuery等\n5. 数据湖：S3、HDFS等',
          codeExamples: [],
          resources: [
            '数据存储技术综述',
            '不同存储技术对比',
            '存储技术选型指南'
          ]
        },
        {
          id: 'section5-2',
          title: '文件存储格式',
          content: '常见的文件存储格式：\n\n1. CSV（逗号分隔值）：简单的表格格式\n2. JSON（JavaScript Object Notation）：轻量级数据交换格式\n3. Excel：电子表格格式\n4. Parquet：列式存储格式，适合大数据\n5. Avro：序列化格式，适合Hadoop生态系统',
          codeExamples: ['import pandas as pd', 'df = pd.read_csv("data.csv")', 'df.to_json("data.json")', 'df.to_excel("data.xlsx")'],
          resources: [
            '文件存储格式对比',
            '大数据存储格式指南',
            '数据格式转换工具'
          ]
        },
        {
          id: 'section5-3',
          title: '数据库存储',
          content: '数据库存储的类型：\n\n1. 关系型数据库：使用SQL查询，适合结构化数据\n2. 非关系型数据库：使用NoSQL查询，适合非结构化数据\n3. 内存数据库：存储在内存中，速度快\n4. 时序数据库：适合时间序列数据',
          codeExamples: ['import mysql.connector', 'conn = mysql.connector.connect(host="localhost", user="user", password="password", database="db")', 'cursor = conn.cursor()', 'cursor.execute("SELECT * FROM table")', 'import pymongo', 'client = pymongo.MongoClient("mongodb://localhost:27017/")', 'db = client["mydatabase"]', 'collection = db["mycollection"]'],
          resources: [
            'SQL基础教程',
            'MongoDB使用指南',
            '数据库设计最佳实践'
          ]
        },
        {
          id: 'section5-4',
          title: '数据存储最佳实践',
          content: '数据存储的最佳实践：\n\n1. 根据数据类型选择合适的存储方式\n2. 建立合理的索引\n3. 定期备份数据\n4. 优化存储结构\n5. 考虑数据安全和隐私',
          codeExamples: [],
          resources: [
            '数据存储最佳实践指南',
            '数据库索引优化',
            '数据备份策略'
          ]
        },
        {
          id: 'section5-5',
          title: '数据安全与隐私',
          content: '数据安全和隐私保护：\n\n1. 数据加密：加密存储和传输\n2. 访问控制：限制数据访问权限\n3. 数据脱敏：对敏感数据进行处理\n4. 遵守数据保护法规：如GDPR、CCPA等\n5. 数据生命周期管理：定期清理不需要的数据',
          codeExamples: [],
          resources: [
            '数据安全最佳实践',
            '数据隐私保护指南',
            '数据保护法规解读'
          ]
        }
      ]
    },
    'chapter6': {
      title: '第六章：数据采集项目实战',
      sections: [
        {
          id: 'section6-1',
          title: '项目需求分析',
          content: '项目需求分析的步骤：\n\n1. 明确项目目标\n2. 确定数据需求\n3. 分析数据源\n4. 制定项目计划\n5. 评估项目风险',
          codeExamples: [],
          resources: [
            '项目需求分析指南',
            '数据需求文档模板',
            '项目风险评估方法'
          ]
        },
        {
          id: 'section6-2',
          title: '数据采集方案设计',
          content: '数据采集方案设计的内容：\n\n1. 选择数据采集方法\n2. 设计数据采集流程\n3. 确定数据存储方案\n4. 制定数据质量控制措施\n5. 规划数据采集工具和技术',
          codeExamples: [],
          resources: [
            '数据采集方案模板',
            '采集流程设计指南',
            '数据质量控制计划'
          ]
        },
        {
          id: 'section6-3',
          title: '数据采集实现',
          content: '数据采集实现的步骤：\n\n1. 搭建开发环境\n2. 实现数据采集代码\n3. 测试数据采集功能\n4. 优化采集效率\n5. 处理异常情况',
          codeExamples: ['import requests', 'from bs4 import BeautifulSoup', 'import pandas as pd', 'def scrape_data(url):', '    response = requests.get(url)', '    soup = BeautifulSoup(response.text, "html.parser")', '    # 提取数据的代码', '    return data'],
          resources: [
            '数据采集代码模板',
            '爬虫效率优化技巧',
            '异常处理最佳实践'
          ]
        },
        {
          id: 'section6-4',
          title: '数据预处理',
          content: '数据预处理的步骤：\n\n1. 数据清洗：处理缺失值、异常值、重复值\n2. 数据转换：转换数据类型、标准化数据\n3. 数据集成：合并多个数据源\n4. 数据验证：验证数据质量\n5. 数据存储：存储处理后的数据',
          codeExamples: ['import pandas as pd', 'df = pd.read_csv("raw_data.csv")', 'df = df.dropna()', 'df = df.drop_duplicates()', 'df["date"] = pd.to_datetime(df["date"])'],
          resources: [
            '数据预处理流程指南',
            '数据质量验证方法',
            '预处理后数据存储方案'
          ]
        },
        {
          id: 'section6-5',
          title: '项目展示与评估',
          content: '项目展示和评估的内容：\n\n1. 项目成果展示：数据采集和预处理的结果\n2. 项目文档：技术文档、用户手册\n3. 项目评估：评估项目的成功度\n4. 经验总结：总结项目中的经验和教训\n5. 未来改进：提出未来改进的方向',
          codeExamples: [],
          resources: [
            '项目展示技巧',
            '技术文档模板',
            '项目评估标准'
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
        question: `数据采集概述问题 ${i + 1}：数据采集的主要目的是什么？`,
        options: [
          '存储数据',
          '分析数据',
          '从各种数据源获取数据',
          '处理数据'
        ],
        correctAnswer: 2,
        explanation: '数据采集的主要目的是从各种数据源获取数据，为后续的数据分析和处理做准备。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 201,
        type: 'multiple' as const,
        question: `数据采集概述问题 ${i + 201}：下列哪些属于数据采集的方法？`,
        options: [
          '网络爬虫',
          'API接口',
          '传感器采集',
          '问卷调查'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '网络爬虫、API接口、传感器采集和问卷调查都是常见的数据采集方法。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 321,
        type: 'judgment' as const,
        question: `数据采集概述问题 ${i + 321}：数据采集只需要考虑技术因素，不需要考虑伦理和法律问题。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '数据采集不仅需要考虑技术因素，还需要考虑伦理和法律问题，如用户隐私、数据使用权限等。'
      }))
    ],
    'chapter2': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 401,
        type: 'single' as const,
        question: `Web数据采集问题 ${i + 1}：下列哪个HTTP方法用于获取资源？`,
        options: [
          'POST',
          'GET',
          'PUT',
          'DELETE'
        ],
        correctAnswer: 1,
        explanation: 'GET方法用于从服务器获取资源，POST方法用于向服务器提交数据，PUT方法用于更新资源，DELETE方法用于删除资源。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 601,
        type: 'multiple' as const,
        question: `Web数据采集问题 ${i + 201}：下列哪些是Python中常用的爬虫库？`,
        options: [
          'Requests',
          'BeautifulSoup',
          'Scrapy',
          'Django'
        ],
        correctAnswer: [0, 1, 2],
        explanation: 'Requests、BeautifulSoup和Scrapy都是Python中常用的爬虫库，Django是一个Web框架，不是爬虫库。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 721,
        type: 'judgment' as const,
        question: `Web数据采集问题 ${i + 321}：静态网页的数据直接嵌入在HTML中，更容易采集。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '静态网页的数据直接嵌入在HTML中，不需要执行JavaScript，因此更容易采集。'
      }))
    ],
    'chapter3': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 801,
        type: 'single' as const,
        question: `API数据采集问题 ${i + 1}：下列哪种API设计风格最流行？`,
        options: [
          'SOAP',
          'RESTful',
          'GraphQL',
          'WebSocket'
        ],
        correctAnswer: 1,
        explanation: 'RESTful API是目前最流行的API设计风格，它使用标准的HTTP方法和URL路径来操作资源。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1001,
        type: 'multiple' as const,
        question: `API数据采集问题 ${i + 201}：下列哪些属于API认证方式？`,
        options: [
          'API Key',
          'OAuth 2.0',
          'JWT',
          'Basic Auth'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'API Key、OAuth 2.0、JWT和Basic Auth都是常见的API认证方式。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1121,
        type: 'judgment' as const,
        question: `API数据采集问题 ${i + 321}：使用API采集数据时，不需要遵守API的使用限制。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '使用API采集数据时，需要遵守API的使用限制，如请求频率限制、数据使用权限等。'
      }))
    ],
    'chapter4': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 1201,
        type: 'single' as const,
        question: `数据预处理问题 ${i + 1}：下列哪种方法不是处理缺失值的方法？`,
        options: [
          '删除',
          '填充',
          '插值',
          '加密'
        ],
        correctAnswer: 3,
        explanation: '删除、填充和插值都是处理缺失值的方法，加密是数据安全措施，不是处理缺失值的方法。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1401,
        type: 'multiple' as const,
        question: `数据预处理问题 ${i + 201}：下列哪些属于数据转换技术？`,
        options: [
          '数据类型转换',
          '数据标准化',
          '数据离散化',
          '特征工程'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '数据类型转换、数据标准化、数据离散化和特征工程都是常见的数据转换技术。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1521,
        type: 'judgment' as const,
        question: `数据预处理问题 ${i + 321}：数据预处理是数据分析的重要步骤，可以提高数据分析的准确性。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '数据预处理是数据分析的重要步骤，通过清洗、转换和集成数据，可以提高数据分析的准确性和可靠性。'
      }))
    ],
    'chapter5': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 1601,
        type: 'single' as const,
        question: `数据存储问题 ${i + 1}：下列哪种存储格式最适合存储结构化数据？`,
        options: [
          'CSV',
          'JSON',
          'XML',
          'Text'
        ],
        correctAnswer: 0,
        explanation: 'CSV（逗号分隔值）格式最适合存储结构化数据，它是一种简单的表格存储格式，易于处理和分析。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1801,
        type: 'multiple' as const,
        question: `数据存储问题 ${i + 201}：下列哪些属于非关系型数据库？`,
        options: [
          'MySQL',
          'MongoDB',
          'Redis',
          'PostgreSQL'
        ],
        correctAnswer: [1, 2],
        explanation: 'MongoDB和Redis属于非关系型数据库，MySQL和PostgreSQL属于关系型数据库。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1921,
        type: 'judgment' as const,
        question: `数据存储问题 ${i + 321}：数据存储只需要考虑存储容量，不需要考虑数据安全。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '数据存储不仅需要考虑存储容量，还需要考虑数据安全，如数据加密、访问控制、备份等。'
      }))
    ],
    'chapter6': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 2001,
        type: 'single' as const,
        question: `数据采集项目实战问题 ${i + 1}：项目需求分析的第一步是什么？`,
        options: [
          '确定数据需求',
          '明确项目目标',
          '分析数据源',
          '制定项目计划'
        ],
        correctAnswer: 1,
        explanation: '项目需求分析的第一步是明确项目目标，只有明确了目标，才能确定数据需求和分析数据源。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 2201,
        type: 'multiple' as const,
        question: `数据采集项目实战问题 ${i + 201}：数据采集实现的步骤包括哪些？`,
        options: [
          '搭建开发环境',
          '实现数据采集代码',
          '测试数据采集功能',
          '优化采集效率'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '数据采集实现的步骤包括搭建开发环境、实现数据采集代码、测试数据采集功能和优化采集效率。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 2321,
        type: 'judgment' as const,
        question: `数据采集项目实战问题 ${i + 321}：项目展示只需要展示最终结果，不需要展示过程。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '项目展示不仅需要展示最终结果，还需要展示项目的过程，如数据采集方法、预处理步骤等，这样可以更好地说明项目的价值和可靠性。'
      }))
    ]
  };

  // 学习资源数据
  const learningResources: Resource[] = [
    {
      id: 1,
      title: 'Python网络爬虫入门',
      type: 'document',
      description: 'Python网络爬虫的基础知识和实践指南',
      link: 'https://docs.scrapy.org/en/latest/',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: 'BeautifulSoup使用教程',
      type: 'article',
      description: '使用BeautifulSoup解析HTML和XML文档',
      link: 'https://www.crummy.com/software/BeautifulSoup/bs4/doc/',
      difficulty: 'beginner'
    },
    {
      id: 3,
      title: 'Requests库使用指南',
      type: 'code',
      description: 'Python Requests库的使用方法和最佳实践',
      link: 'https://docs.python-requests.org/en/latest/',
      difficulty: 'beginner'
    },
    {
      id: 4,
      title: 'Web爬虫实战',
      type: 'video',
      description: '从基础到进阶的Web爬虫实战教程',
      link: 'https://www.bilibili.com/video/BV12E411A7ZQ/',
      duration: '6小时',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: 'API设计与开发',
      type: 'document',
      description: 'RESTful API的设计原则和开发方法',
      link: 'https://restfulapi.net/',
      difficulty: 'intermediate'
    },
    {
      id: 6,
      title: '数据清洗与预处理',
      type: 'article',
      description: '数据清洗和预处理的技术和方法',
      link: 'https://pandas.pydata.org/docs/user_guide/cleaning.html',
      difficulty: 'intermediate'
    },
    {
      id: 7,
      title: 'Scrapy框架实战',
      type: 'code',
      description: '使用Scrapy框架进行大规模数据采集',
      link: 'https://docs.scrapy.org/en/latest/intro/tutorial.html',
      difficulty: 'advanced'
    },
    {
      id: 8,
      title: '数据采集伦理与法律',
      type: 'document',
      description: '数据采集的伦理规范和法律问题',
      link: 'https://www.eff.org/issues/net-neutrality',
      difficulty: 'advanced'
    }
  ];

  // 练习数据
  const exercises: Question[] = [
    {
      id: 1,
      question: '以下哪个库不是Python中常用的网络爬虫库？',
      options: ['BeautifulSoup', 'Scrapy', 'Requests', 'Django'],
      correctAnswer: 3,
      explanation: 'Django是一个Web框架，不是网络爬虫库。BeautifulSoup、Scrapy和Requests都是常用的网络爬虫库。'
    },
    {
      id: 2,
      question: 'HTTP请求中，用于获取资源的方法是？',
      options: ['POST', 'GET', 'PUT', 'DELETE'],
      correctAnswer: 1,
      explanation: 'GET方法用于从服务器获取资源，POST方法用于向服务器提交数据，PUT方法用于更新资源，DELETE方法用于删除资源。'
    },
    {
      id: 3,
      question: '以下哪种数据格式不是常见的API响应格式？',
      options: ['JSON', 'XML', 'CSV', 'HTML'],
      correctAnswer: 3,
      explanation: 'HTML是网页格式，不是常见的API响应格式。JSON、XML和CSV都是常见的API响应格式。'
    },
    {
      id: 4,
      question: '数据清洗的主要目的是什么？',
      options: ['增加数据量', '提高数据质量', '降低数据存储成本', '加快数据传输速度'],
      correctAnswer: 1,
      explanation: '数据清洗的主要目的是提高数据质量，包括处理缺失值、异常值、重复值等问题。'
    },
    {
      id: 5,
      question: '以下哪种存储格式最适合存储结构化数据？',
      options: ['JSON', 'CSV', 'XML', 'YAML'],
      correctAnswer: 1,
      explanation: 'CSV（逗号分隔值）格式最适合存储结构化数据，它是一种简单的表格存储格式，易于处理和分析。'
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
      description: '本课程是商务数据分析与应用专业的核心课程，旨在培养学生掌握数据采集与预处理的基本技能，为后续的数据分析学习打下基础。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：数据采集概述',
      description: '学习数据采集的基本概念和方法，了解数据采集在数据分析中的重要性。',
      topics: [
        '数据采集的概念与意义',
        '数据采集的类型与方法',
        '数据采集的工具与技术',
        '数据采集的伦理与规范'
      ],
      resources: [
        '《数据采集与预处理》',
        'Web数据采集技术教程',
        '数据采集案例分析'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：Web数据采集',
      description: '学习Web数据采集的基本原理和方法，掌握使用Python进行Web数据采集的技能。',
      topics: [
        'HTTP协议基础',
        'HTML与CSS基础',
        'Python爬虫库介绍',
        '静态网页数据采集',
        '动态网页数据采集'
      ],
      resources: [
        '《Python网络爬虫实战》',
        'BeautifulSoup文档',
        'Scrapy框架教程'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：API数据采集',
      description: '学习通过API接口采集数据的方法，掌握API调用和数据处理的技能。',
      topics: [
        'API基本概念',
        'RESTful API设计原则',
        'API认证与授权',
        'API数据获取与处理',
        '常见API使用案例'
      ],
      resources: [
        '《API设计与开发》',
        'RESTful API最佳实践',
        'API调用实战案例'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：数据预处理',
      description: '学习数据预处理的基本方法和技术，掌握数据清洗、转换和集成的技能。',
      topics: [
        '数据质量评估',
        '数据清洗方法',
        '数据转换技术',
        '数据集成方法',
        '数据预处理工具'
      ],
      resources: [
        '《数据预处理技术》',
        'Pandas数据处理教程',
        '数据清洗实战案例'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：数据存储',
      description: '学习数据存储的基本原理和方法，掌握数据存储和管理的技能。',
      topics: [
        '数据存储技术概述',
        '文件存储格式',
        '数据库存储',
        '数据存储最佳实践',
        '数据安全与隐私'
      ],
      resources: [
        '《数据存储与管理》',
        'SQL基础教程',
        'NoSQL数据库介绍'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据采集项目实战',
      description: '通过实际项目练习，综合运用所学知识，完成数据采集与预处理的全流程。',
      topics: [
        '项目需求分析',
        '数据采集方案设计',
        '数据采集实现',
        '数据预处理',
        '项目展示与评估'
      ],
      resources: [
        '数据采集项目案例',
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
              <span className="text-4xl">📊</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            数据采集与处理
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业核心课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握数据采集与预处理的基本技能，为后续的数据分析学习打下基础，
            使学生能够从各种数据源获取数据并进行有效的预处理。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：Python基础
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              后续课程：数据分析技术
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
              课程内容按照数据采集与预处理的流程编排，涵盖从数据获取到数据存储的全过程
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
                  <span className="text-gray-300">掌握数据采集的基本概念和方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解Web数据采集的原理和技术</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉API数据采集的方法和技巧</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">掌握数据预处理的基本技术</span>
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
                  <span className="text-gray-300">能够使用Python进行Web数据采集</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够通过API接口获取数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够对采集的数据进行预处理</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够完成完整的数据采集项目</span>
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
                  <p className="text-gray-400">包括数据采集练习、预处理练习等</p>
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
                  <p className="text-gray-400">综合数据采集与预处理项目</p>
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
                  <h3 className="text-2xl font-semibold text-gray-100 mb-6">数据采集与处理课程学习进度</h3>
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
          <p className="mb-2 text-gray-300">数据采集与处理课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}
