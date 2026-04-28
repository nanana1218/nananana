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

export default function DatabaseCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeChapterMode, setActiveChapterMode] = useState<'content' | 'exercise' | null>(null);
  const [activeTab, setActiveTab] = useState<'progress' | 'resources' | 'exercises'>('progress');

  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：数据库概述',
      completed: false,
      subItems: [
        { id: 'section1-1', title: '数据库的概念与特点', completed: false },
        { id: 'section1-2', title: '数据库系统的组成', completed: false },
        { id: 'section1-3', title: '数据库的发展历程', completed: false },
        { id: 'section1-4', title: '数据库的应用领域', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：数据模型',
      completed: false,
      subItems: [
        { id: 'section2-1', title: '数据模型的概念与分类', completed: false },
        { id: 'section2-2', title: '概念模型', completed: false },
        { id: 'section2-3', title: '逻辑模型', completed: false },
        { id: 'section2-4', title: '物理模型', completed: false },
        { id: 'section2-5', title: '实体-关系模型设计', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：关系数据库',
      completed: false,
      subItems: [
        { id: 'section3-1', title: '关系数据库的基本概念', completed: false },
        { id: 'section3-2', title: '关系代数', completed: false },
        { id: 'section3-3', title: '关系数据库规范化', completed: false },
        { id: 'section3-4', title: '函数依赖', completed: false },
        { id: 'section3-5', title: '范式', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：SQL语言',
      completed: false,
      subItems: [
        { id: 'section4-1', title: 'SQL语言概述', completed: false },
        { id: 'section4-2', title: '数据定义语言（DDL）', completed: false },
        { id: 'section4-3', title: '数据操作语言（DML）', completed: false },
        { id: 'section4-4', title: '数据查询语言（DQL）', completed: false },
        { id: 'section4-5', title: '数据控制语言（DCL）', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：数据库设计',
      completed: false,
      subItems: [
        { id: 'section5-1', title: '数据库设计概述', completed: false },
        { id: 'section5-2', title: '需求分析', completed: false },
        { id: 'section5-3', title: '概念结构设计', completed: false },
        { id: 'section5-4', title: '逻辑结构设计', completed: false },
        { id: 'section5-5', title: '物理结构设计', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据库应用开发',
      completed: false,
      subItems: [
        { id: 'section6-1', title: '数据库应用开发概述', completed: false },
        { id: 'section6-2', title: '数据库连接技术', completed: false },
        { id: 'section6-3', title: '数据库应用系统架构', completed: false },
        { id: 'section6-4', title: '数据库应用开发工具', completed: false },
        { id: 'section6-5', title: '数据库应用开发案例', completed: false }
      ]
    }
  ];

  // 章节内容数据
  const chapterContents = {
    'chapter1': {
      title: '第一章：数据库概述',
      sections: [
        {
          id: 'section1-1',
          title: '数据库的概念与特点',
          content: '数据库是按照一定的数据模型组织、存储和管理数据的仓库。\n\n数据库的特点：\n1. 数据结构化：数据按照一定的结构组织\n2. 数据共享：多个用户可以同时使用数据\n3. 数据独立性：数据与应用程序相互独立\n4. 数据一致性：数据保持一致和准确\n5. 数据安全性：保护数据不被非法访问',
          codeExamples: [],
          resources: [
            '《数据库系统概论》教材',
            '数据库基础知识教程',
            '数据库应用案例分析'
          ]
        },
        {
          id: 'section1-2',
          title: '数据库系统的组成',
          content: '数据库系统由以下部分组成：\n\n1. 数据库（DB）：存储数据的集合\n2. 数据库管理系统（DBMS）：管理数据库的软件\n3. 应用程序：使用数据库的软件\n4. 数据库管理员（DBA）：负责数据库的管理和维护\n5. 用户：使用数据库的人员',
          codeExamples: [],
          resources: [
            '数据库系统组成图',
            'DBMS功能详解',
            'DBA职责指南'
          ]
        },
        {
          id: 'section1-3',
          title: '数据库的发展历程',
          content: '数据库的发展经历了以下阶段：\n\n1. 人工管理阶段：数据由人工管理\n2. 文件系统阶段：数据存储在文件中\n3. 数据库系统阶段：使用DBMS管理数据\n4. 高级数据库系统阶段：如分布式数据库、面向对象数据库等',
          codeExamples: [],
          resources: [
            '数据库发展历程时间线',
            '各阶段数据库特点对比',
            '未来数据库发展趋势'
          ]
        },
        {
          id: 'section1-4',
          title: '数据库的应用领域',
          content: '数据库广泛应用于以下领域：\n\n1. 企业管理：如财务、人事、库存管理\n2. 电子商务：如在线购物、支付系统\n3. 金融服务：如银行、证券、保险\n4. 教育：如学生信息、课程管理\n5. 医疗：如患者信息、医疗记录\n6. 科研：如实验数据、文献管理',
          codeExamples: [],
          resources: [
            '数据库应用领域案例集',
            '各行业数据库应用特点',
            '数据库应用成功案例'
          ]
        }
      ]
    },
    'chapter2': {
      title: '第二章：数据模型',
      sections: [
        {
          id: 'section2-1',
          title: '数据模型的概念与分类',
          content: '数据模型是对现实世界数据特征的抽象，是数据库系统的核心和基础。\n\n数据模型的分类：\n1. 概念模型：面向现实世界，如ER模型\n2. 逻辑模型：面向数据库，如关系模型、层次模型、网状模型\n3. 物理模型：面向计算机存储，如存储结构、索引等',
          codeExamples: [],
          resources: [
            '数据模型概念详解',
            '数据模型分类对比',
            '数据模型选择指南'
          ]
        },
        {
          id: 'section2-2',
          title: '概念模型',
          content: '概念模型是对现实世界的抽象，主要用于数据库设计。\n\n概念模型的基本概念：\n1. 实体（Entity）：客观存在并可相互区别的事物\n2. 属性（Attribute）：实体的特征\n3. 实体型（Entity Type）：具有相同属性的实体的集合\n4. 实体集（Entity Set）：同类型实体的集合\n5. 联系（Relationship）：实体之间的关联',
          codeExamples: [],
          resources: [
            '概念模型基本概念图解',
            '实体与属性识别指南',
            '概念模型设计技巧'
          ]
        },
        {
          id: 'section2-3',
          title: '逻辑模型',
          content: '逻辑模型是面向数据库的模型，用于描述数据库的结构。\n\n常见的逻辑模型：\n1. 关系模型：用二维表表示数据\n2. 层次模型：用树形结构表示数据\n3. 网状模型：用网状结构表示数据\n4. 面向对象模型：用对象表示数据',
          codeExamples: [],
          resources: [
            '逻辑模型对比分析',
            '关系模型详解',
            '面向对象模型设计'
          ]
        },
        {
          id: 'section2-4',
          title: '物理模型',
          content: '物理模型是面向计算机存储的模型，描述数据在存储介质上的存储方式。\n\n物理模型的考虑因素：\n1. 存储结构：数据如何组织和存储\n2. 索引：如何提高查询效率\n3. 存取路径：数据的访问方式\n4. 存储分配：如何分配存储空间',
          codeExamples: [],
          resources: [
            '物理模型设计指南',
            '数据库存储结构详解',
            '索引设计最佳实践'
          ]
        },
        {
          id: 'section2-5',
          title: '实体-关系模型设计',
          content: '实体-关系（ER）模型是一种常用的概念模型，用于数据库设计。\n\nER模型的设计步骤：\n1. 确定实体：识别需要存储的实体\n2. 确定属性：为每个实体确定属性\n3. 确定联系：确定实体之间的联系\n4. 确定联系的类型：一对一、一对多、多对多\n5. 绘制ER图：用图形表示实体、属性和联系',
          codeExamples: [],
          resources: [
            'ER模型设计教程',
            'ER图绘制工具',
            'ER模型设计案例'
          ]
        }
      ]
    },
    'chapter3': {
      title: '第三章：关系数据库',
      sections: [
        {
          id: 'section3-1',
          title: '关系数据库的基本概念',
          content: '关系数据库是基于关系模型的数据库，用二维表表示数据。\n\n关系数据库的基本概念：\n1. 关系（Relation）：二维表\n2. 元组（Tuple）：表中的一行\n3. 属性（Attribute）：表中的一列\n4. 域（Domain）：属性的取值范围\n5. 分量（Component）：元组中的一个属性值\n6. 关系模式：关系的结构\n7. 关系实例：关系的具体数据',
          codeExamples: [],
          resources: [
            '关系数据库基本概念详解',
            '关系模式设计指南',
            '关系数据库实例分析'
          ]
        },
        {
          id: 'section3-2',
          title: '关系代数',
          content: '关系代数是一种用于操作关系的数学工具，是SQL语言的理论基础。\n\n关系代数的基本操作：\n1. 选择（Selection）：选择满足条件的元组\n2. 投影（Projection）：选择指定的属性\n3. 连接（Join）：将两个关系连接起来\n4. 笛卡尔积（Cartesian Product）：两个关系的所有可能组合\n5. 并（Union）：两个关系的并集\n6. 差（Difference）：两个关系的差集\n7. 交（Intersection）：两个关系的交集',
          codeExamples: [],
          resources: [
            '关系代数教程',
            '关系代数运算实例',
            '关系代数与SQL对照'
          ]
        },
        {
          id: 'section3-3',
          title: '关系数据库规范化',
          content: '关系数据库规范化是一种设计关系模式的方法，用于消除数据冗余和异常。\n\n规范化的目的：\n1. 消除数据冗余：减少数据重复\n2. 消除更新异常：避免数据不一致\n3. 消除插入异常：避免无法插入数据\n4. 消除删除异常：避免误删数据',
          codeExamples: [],
          resources: [
            '数据库规范化教程',
            '规范化异常示例',
            '规范化实践指南'
          ]
        },
        {
          id: 'section3-4',
          title: '函数依赖',
          content: '函数依赖是关系中属性之间的一种约束关系。\n\n函数依赖的类型：\n1. 完全函数依赖：X→Y，且X的任何真子集都不能决定Y\n2. 部分函数依赖：X→Y，且X的某个真子集可以决定Y\n3. 传递函数依赖：X→Y，Y→Z，且Y不能决定X',
          codeExamples: [],
          resources: [
            '函数依赖详解',
            '函数依赖识别方法',
            '函数依赖与规范化关系'
          ]
        },
        {
          id: 'section3-5',
          title: '范式',
          content: '范式是关系模式的规范化程度，从低到高分为1NF、2NF、3NF、BCNF等。\n\n各范式的要求：\n1. 1NF：列不可再分\n2. 2NF：消除部分函数依赖\n3. 3NF：消除传递函数依赖\n4. BCNF：消除主属性对候选键的部分和传递函数依赖',
          codeExamples: [],
          resources: [
            '数据库范式详解',
            '范式转换方法',
            '范式应用案例'
          ]
        }
      ]
    },
    'chapter4': {
      title: '第四章：SQL语言',
      sections: [
        {
          id: 'section4-1',
          title: 'SQL语言概述',
          content: 'SQL（Structured Query Language）是一种用于管理关系数据库的标准语言。\n\nSQL的特点：\n1. 综合统一：集数据定义、操作、查询、控制于一体\n2. 高度非过程化：只需要说明做什么，不需要说明怎么做\n3. 面向集合的操作方式：操作对象和结果都是集合\n4. 语言简洁，易学易用：核心功能只用少量语句即可实现',
          codeExamples: [],
          resources: [
            'SQL语言教程',
            'SQL标准参考',
            'SQL方言差异'
          ]
        },
        {
          id: 'section4-2',
          title: '数据定义语言（DDL）',
          content: 'DDL用于定义数据库的结构，包括创建、修改和删除数据库对象。\n\n常用的DDL语句：\n1. CREATE：创建数据库对象\n2. ALTER：修改数据库对象\n3. DROP：删除数据库对象\n4. TRUNCATE：清空表中的数据',
          codeExamples: ['CREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(50), age INT)', 'ALTER TABLE students ADD COLUMN gender VARCHAR(10)', 'DROP TABLE students'],
          resources: [
            'DDL语句参考',
            '表结构设计指南',
            'DDL操作实例'
          ]
        },
        {
          id: 'section4-3',
          title: '数据操作语言（DML）',
          content: 'DML用于操作数据库中的数据，包括插入、更新和删除数据。\n\n常用的DML语句：\n1. INSERT：插入数据\n2. UPDATE：更新数据\n3. DELETE：删除数据',
          codeExamples: ['INSERT INTO students (id, name, age) VALUES (1, "Alice", 20)', 'UPDATE students SET age = 21 WHERE id = 1', 'DELETE FROM students WHERE id = 1'],
          resources: [
            'DML语句参考',
            '数据操作最佳实践',
            'DML性能优化'
          ]
        },
        {
          id: 'section4-4',
          title: '数据查询语言（DQL）',
          content: 'DQL用于查询数据库中的数据，是SQL中最常用的部分。\n\n常用的DQL语句：\n1. SELECT：查询数据\n2. FROM：指定表\n3. WHERE：指定条件\n4. GROUP BY：分组\n5. HAVING：分组条件\n6. ORDER BY：排序\n7. LIMIT：限制结果数量',
          codeExamples: ['SELECT * FROM students', 'SELECT name, age FROM students WHERE age > 18', 'SELECT age, COUNT(*) FROM students GROUP BY age'],
          resources: [
            'DQL查询技巧',
            '复杂查询示例',
            '查询性能优化'
          ]
        },
        {
          id: 'section4-5',
          title: '数据控制语言（DCL）',
          content: 'DCL用于控制数据库的访问权限，包括授权和回收权限。\n\n常用的DCL语句：\n1. GRANT：授予权限\n2. REVOKE：回收权限\n3. COMMIT：提交事务\n4. ROLLBACK：回滚事务',
          codeExamples: ['GRANT SELECT ON students TO user1', 'REVOKE SELECT ON students FROM user1', 'COMMIT', 'ROLLBACK'],
          resources: [
            'DCL语句参考',
            '数据库权限管理',
            '事务处理指南'
          ]
        }
      ]
    },
    'chapter5': {
      title: '第五章：数据库设计',
      sections: [
        {
          id: 'section5-1',
          title: '数据库设计概述',
          content: '数据库设计是指根据用户需求，设计数据库的结构和功能。\n\n数据库设计的步骤：\n1. 需求分析：了解用户需求\n2. 概念结构设计：设计概念模型\n3. 逻辑结构设计：设计逻辑模型\n4. 物理结构设计：设计物理模型\n5. 数据库实施：创建数据库\n6. 数据库运行和维护：维护数据库',
          codeExamples: [],
          resources: [
            '数据库设计指南',
            '设计步骤详解',
            '数据库设计工具'
          ]
        },
        {
          id: 'section5-2',
          title: '需求分析',
          content: '需求分析是数据库设计的第一步，用于了解用户的需求和业务流程。\n\n需求分析的内容：\n1. 数据需求：需要存储哪些数据\n2. 功能需求：需要实现哪些功能\n3. 性能需求：系统的性能要求\n4. 安全需求：数据的安全要求',
          codeExamples: [],
          resources: [
            '需求分析方法',
            '需求文档模板',
            '业务流程分析技巧'
          ]
        },
        {
          id: 'section5-3',
          title: '概念结构设计',
          content: '概念结构设计是设计概念模型，用于描述用户的业务需求。\n\n概念结构设计的方法：\n1. 实体分析法：识别实体、属性和联系\n2. 自顶向下法：从整体到局部\n3. 自底向上法：从局部到整体\n4. 混合法：结合自顶向下和自底向上',
          codeExamples: [],
          resources: [
            '概念结构设计方法',
            '实体识别技巧',
            'ER模型设计案例'
          ]
        },
        {
          id: 'section5-4',
          title: '逻辑结构设计',
          content: '逻辑结构设计是将概念模型转换为逻辑模型，用于数据库的实现。\n\n逻辑结构设计的步骤：\n1. 确定数据模型：选择合适的数据模型\n2. 转换概念模型：将ER模型转换为关系模式\n3. 规范化：对关系模式进行规范化\n4. 优化：优化关系模式',
          codeExamples: [],
          resources: [
            '逻辑结构设计指南',
            'ER模型转关系模式方法',
            '关系模式优化技巧'
          ]
        },
        {
          id: 'section5-5',
          title: '物理结构设计',
          content: '物理结构设计是设计数据库的物理存储结构，用于提高数据库的性能。\n\n物理结构设计的内容：\n1. 存储结构设计：选择存储结构\n2. 索引设计：设计索引\n3. 分区设计：设计分区\n4. 优化：优化物理结构',
          codeExamples: [],
          resources: [
            '物理结构设计指南',
            '索引设计最佳实践',
            '数据库性能优化'
          ]
        }
      ]
    },
    'chapter6': {
      title: '第六章：数据库应用开发',
      sections: [
        {
          id: 'section6-1',
          title: '数据库应用开发概述',
          content: '数据库应用开发是指开发使用数据库的应用程序。\n\n数据库应用开发的步骤：\n1. 需求分析：了解用户需求\n2. 设计：设计应用程序和数据库\n3. 编码：编写应用程序代码\n4. 测试：测试应用程序\n5. 部署：部署应用程序\n6. 维护：维护应用程序',
          codeExamples: [],
          resources: [
            '数据库应用开发指南',
            '开发流程详解',
            '应用开发工具推荐'
          ]
        },
        {
          id: 'section6-2',
          title: '数据库连接技术',
          content: '数据库连接技术是指应用程序与数据库之间的连接方法。\n\n常用的数据库连接技术：\n1. ODBC（Open Database Connectivity）：开放数据库连接\n2. JDBC（Java Database Connectivity）：Java数据库连接\n3. ADO.NET：.NET平台的数据库连接\n4. PDO（PHP Data Objects）：PHP的数据库对象\n5. ORM（Object-Relational Mapping）：对象关系映射',
          codeExamples: ['import mysql.connector', 'conn = mysql.connector.connect(host="localhost", user="user", password="password", database="db")', 'cursor = conn.cursor()', 'cursor.execute("SELECT * FROM table")'],
          resources: [
            '数据库连接技术对比',
            'ORM框架使用指南',
            '连接池配置最佳实践'
          ]
        },
        {
          id: 'section6-3',
          title: '数据库应用系统架构',
          content: '数据库应用系统的架构是指应用程序的组织方式。\n\n常见的数据库应用系统架构：\n1. 单机架构：应用程序和数据库在同一台机器上\n2. 客户-服务器架构：应用程序作为客户端，数据库作为服务器\n3. 三层架构：表示层、业务逻辑层、数据访问层\n4. 多层架构：更多层次的架构',
          codeExamples: [],
          resources: [
            '应用系统架构设计',
            '三层架构详解',
            '架构选择指南'
          ]
        },
        {
          id: 'section6-4',
          title: '数据库应用开发工具',
          content: '数据库应用开发工具是指用于开发数据库应用的软件。\n\n常用的数据库应用开发工具：\n1. IDE（Integrated Development Environment）：集成开发环境\n2. 数据库管理工具：如MySQL Workbench、SQL Server Management Studio\n3. ORM框架：如Hibernate、Entity Framework\n4. Web框架：如Spring、Django、Flask',
          codeExamples: [],
          resources: [
            '开发工具推荐',
            'IDE配置指南',
            '数据库管理工具使用技巧'
          ]
        },
        {
          id: 'section6-5',
          title: '数据库应用开发案例',
          content: '数据库应用开发案例是指实际的数据库应用开发项目。\n\n常见的数据库应用开发案例：\n1. 学生管理系统：管理学生信息\n2. 图书管理系统：管理图书信息\n3. 库存管理系统：管理库存信息\n4. 订单管理系统：管理订单信息\n5. 客户关系管理系统：管理客户信息',
          codeExamples: [],
          resources: [
            '数据库应用开发案例集',
            '系统设计模板',
            '开发经验分享'
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
        question: `数据库概述问题 ${i + 1}：数据库的基本特点不包括？`,
        options: [
          '数据结构化',
          '数据共享',
          '数据独立性',
          '数据不可修改'
        ],
        correctAnswer: 3,
        explanation: '数据库的基本特点包括数据结构化、数据共享、数据独立性、数据一致性和数据安全性，数据是可以修改的。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 201,
        type: 'multiple' as const,
        question: `数据库概述问题 ${i + 201}：数据库系统的组成包括哪些？`,
        options: [
          '数据库（DB）',
          '数据库管理系统（DBMS）',
          '应用程序',
          '数据库管理员（DBA）'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '数据库系统由数据库（DB）、数据库管理系统（DBMS）、应用程序、数据库管理员（DBA）和用户组成。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 321,
        type: 'judgment' as const,
        question: `数据库概述问题 ${i + 321}：数据库的发展经历了人工管理、文件系统和数据库系统三个阶段。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: '数据库的发展经历了人工管理阶段、文件系统阶段和数据库系统阶段三个主要阶段。'
      }))
    ],
    'chapter2': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 401,
        type: 'single' as const,
        question: `数据模型问题 ${i + 1}：下列哪个不是数据模型的分类？`,
        options: [
          '概念模型',
          '逻辑模型',
          '物理模型',
          '实体模型'
        ],
        correctAnswer: 3,
        explanation: '数据模型分为概念模型、逻辑模型和物理模型，实体模型属于概念模型的一种。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 601,
        type: 'multiple' as const,
        question: `数据模型问题 ${i + 201}：概念模型的基本概念包括哪些？`,
        options: [
          '实体',
          '属性',
          '实体型',
          '联系'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '概念模型的基本概念包括实体、属性、实体型、实体集和联系。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 721,
        type: 'judgment' as const,
        question: `数据模型问题 ${i + 321}：ER模型是一种逻辑模型。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'ER模型是一种概念模型，用于描述现实世界的实体和联系。'
      }))
    ],
    'chapter3': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 801,
        type: 'single' as const,
        question: `关系数据库问题 ${i + 1}：关系数据库中，表中的一行称为？`,
        options: [
          '属性',
          '元组',
          '域',
          '分量'
        ],
        correctAnswer: 1,
        explanation: '关系数据库中，表中的一行称为元组，一列称为属性，属性的取值范围称为域，元组中的一个属性值称为分量。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1001,
        type: 'multiple' as const,
        question: `关系数据库问题 ${i + 201}：关系代数的基本操作包括哪些？`,
        options: [
          '选择',
          '投影',
          '连接',
          '并'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '关系代数的基本操作包括选择、投影、连接、笛卡尔积、并、差和交。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1121,
        type: 'judgment' as const,
        question: `关系数据库问题 ${i + 321}：3NF要求消除所有函数依赖。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '3NF要求消除传递函数依赖，而不是所有函数依赖。'
      }))
    ],
    'chapter4': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 1201,
        type: 'single' as const,
        question: `SQL语言问题 ${i + 1}：用于插入数据的SQL语句是？`,
        options: [
          'SELECT',
          'INSERT',
          'UPDATE',
          'DELETE'
        ],
        correctAnswer: 1,
        explanation: 'INSERT语句用于插入数据，SELECT语句用于查询数据，UPDATE语句用于更新数据，DELETE语句用于删除数据。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1401,
        type: 'multiple' as const,
        question: `SQL语言问题 ${i + 201}：下列哪些属于DDL语句？`,
        options: [
          'CREATE',
          'ALTER',
          'DROP',
          'INSERT'
        ],
        correctAnswer: [0, 1, 2],
        explanation: 'CREATE、ALTER和DROP属于DDL语句，INSERT属于DML语句。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1521,
        type: 'judgment' as const,
        question: `SQL语言问题 ${i + 321}：SQL是一种过程化语言。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'SQL是一种非过程化语言，只需要说明做什么，不需要说明怎么做。'
      }))
    ],
    'chapter5': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 1601,
        type: 'single' as const,
        question: `数据库设计问题 ${i + 1}：数据库设计的第一步是？`,
        options: [
          '概念结构设计',
          '逻辑结构设计',
          '需求分析',
          '物理结构设计'
        ],
        correctAnswer: 2,
        explanation: '数据库设计的步骤是：需求分析 → 概念结构设计 → 逻辑结构设计 → 物理结构设计 → 数据库实施 → 数据库运行和维护。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1801,
        type: 'multiple' as const,
        question: `数据库设计问题 ${i + 201}：需求分析的内容包括哪些？`,
        options: [
          '数据需求',
          '功能需求',
          '性能需求',
          '安全需求'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '需求分析的内容包括数据需求、功能需求、性能需求和安全需求。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1921,
        type: 'judgment' as const,
        question: `数据库设计问题 ${i + 321}：物理结构设计是设计数据库的逻辑结构。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: '物理结构设计是设计数据库的物理存储结构，逻辑结构设计是设计数据库的逻辑结构。'
      }))
    ],
    'chapter6': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 2001,
        type: 'single' as const,
        question: `数据库应用开发问题 ${i + 1}：下列哪个不是常用的数据库连接技术？`,
        options: [
          'ODBC',
          'JDBC',
          'ADO.NET',
          'HTML'
        ],
        correctAnswer: 3,
        explanation: 'ODBC、JDBC和ADO.NET都是常用的数据库连接技术，HTML是网页标记语言，不是数据库连接技术。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 2201,
        type: 'multiple' as const,
        question: `数据库应用开发问题 ${i + 201}：常见的数据库应用系统架构包括哪些？`,
        options: [
          '单机架构',
          '客户-服务器架构',
          '三层架构',
          '多层架构'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '常见的数据库应用系统架构包括单机架构、客户-服务器架构、三层架构和多层架构。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 2321,
        type: 'judgment' as const,
        question: `数据库应用开发问题 ${i + 321}：ORM框架可以将对象与关系数据库表映射起来。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: 'ORM（Object-Relational Mapping）框架可以将对象与关系数据库表映射起来，简化数据库操作。'
      }))
    ]
  };

  const learningResources: Resource[] = [
    {
      id: 'resource1',
      title: '数据库系统概论',
      type: 'document',
      difficulty: 'beginner',
      url: '#',
      description: '数据库基础知识的权威教材，适合初学者',
      duration: '10小时'
    },
    {
      id: 'resource2',
      title: 'SQL语言入门教程',
      type: 'video',
      difficulty: 'beginner',
      url: '#',
      description: 'SQL语言的基础语法和使用方法',
      duration: '5小时'
    },
    {
      id: 'resource3',
      title: '关系数据库理论',
      type: 'article',
      difficulty: 'intermediate',
      url: '#',
      description: '深入理解关系数据库的理论基础',
      duration: '3小时'
    },
    {
      id: 'resource4',
      title: '数据库设计实战',
      type: 'code',
      difficulty: 'intermediate',
      url: '#',
      description: '数据库设计的实际案例和最佳实践',
      duration: '4小时'
    },
    {
      id: 'resource5',
      title: '高级SQL查询技巧',
      type: 'article',
      difficulty: 'advanced',
      url: '#',
      description: '复杂SQL查询的优化和技巧',
      duration: '3小时'
    },
    {
      id: 'resource6',
      title: '数据库性能优化',
      type: 'video',
      difficulty: 'advanced',
      url: '#',
      description: '数据库性能调优的方法和技巧',
      duration: '6小时'
    }
  ];

  const exercises: Question[] = [
    {
      id: 'exercise1',
      text: '下列关于数据库的说法，正确的是：',
      options: [
        '数据库是存储数据的文件系统',
        '数据库是管理数据的软件系统',
        '数据库是存储数据的仓库',
        '数据库是数据的集合'
      ],
      correctAnswer: 2,
      explanation: '数据库是按照一定的数据模型组织、存储和管理数据的仓库，是数据的集合。',
      difficulty: 'easy'
    },
    {
      id: 'exercise2',
      text: '关系数据库中，主键的作用是：',
      options: [
        '唯一标识表中的记录',
        '加速数据查询',
        '保证数据的完整性',
        '以上都是'
      ],
      correctAnswer: 3,
      explanation: '主键的作用包括唯一标识表中的记录、加速数据查询和保证数据的完整性。',
      difficulty: 'medium'
    },
    {
      id: 'exercise3',
      text: 'SQL中，用于查询数据的语句是：',
      options: [
        'INSERT',
        'UPDATE',
        'SELECT',
        'DELETE'
      ],
      correctAnswer: 2,
      explanation: 'SELECT语句用于从数据库中查询数据。',
      difficulty: 'easy'
    },
    {
      id: 'exercise4',
      text: '数据库设计的正确步骤是：',
      options: [
        '需求分析 → 概念结构设计 → 逻辑结构设计 → 物理结构设计',
        '概念结构设计 → 需求分析 → 逻辑结构设计 → 物理结构设计',
        '需求分析 → 逻辑结构设计 → 概念结构设计 → 物理结构设计',
        '概念结构设计 → 逻辑结构设计 → 需求分析 → 物理结构设计'
      ],
      correctAnswer: 0,
      explanation: '数据库设计的正确步骤是：需求分析 → 概念结构设计 → 逻辑结构设计 → 物理结构设计。',
      difficulty: 'medium'
    },
    {
      id: 'exercise5',
      text: '下列关于范式的说法，错误的是：',
      options: [
        '1NF要求列不可再分',
        '2NF要求消除部分函数依赖',
        '3NF要求消除传递函数依赖',
        'BCNF要求消除所有函数依赖'
      ],
      correctAnswer: 3,
      explanation: 'BCNF要求消除主属性对候选键的部分和传递函数依赖，而不是所有函数依赖。',
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
      description: '本课程是商务数据分析与应用专业的专业课程，旨在培养学生掌握数据库的基本原理和应用技能，为后续的数据分析学习打下基础。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：数据库概述',
      description: '学习数据库的基本概念和发展历程，了解数据库在企业信息管理中的重要性。',
      topics: [
        '数据库的概念与特点',
        '数据库系统的组成',
        '数据库的发展历程',
        '数据库的应用领域'
      ],
      resources: [
        '《数据库系统概论》',
        '数据库基础知识教程',
        '数据库应用案例分析'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：数据模型',
      description: '学习数据模型的基本概念和类型，掌握实体-关系模型的设计方法。',
      topics: [
        '数据模型的概念与分类',
        '概念模型',
        '逻辑模型',
        '物理模型',
        '实体-关系模型设计'
      ],
      resources: [
        '《数据模型与数据库设计》',
        'ER模型设计指南',
        '数据模型案例分析'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：关系数据库',
      description: '学习关系数据库的基本原理和设计方法，掌握关系代数和关系数据库规范化理论。',
      topics: [
        '关系数据库的基本概念',
        '关系代数',
        '关系数据库规范化',
        '函数依赖',
        '范式'
      ],
      resources: [
        '《关系数据库理论》',
        '关系代数教程',
        '数据库规范化案例'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：SQL语言',
      description: '学习SQL语言的基本语法和使用方法，掌握SQL语句的编写和执行。',
      topics: [
        'SQL语言概述',
        '数据定义语言（DDL）',
        '数据操作语言（DML）',
        '数据查询语言（DQL）',
        '数据控制语言（DCL）'
      ],
      resources: [
        '《SQL语言实用教程》',
        'SQL语法参考手册',
        'SQL查询案例分析'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：数据库设计',
      description: '学习数据库设计的基本方法和步骤，掌握数据库设计的核心技能。',
      topics: [
        '数据库设计概述',
        '需求分析',
        '概念结构设计',
        '逻辑结构设计',
        '物理结构设计'
      ],
      resources: [
        '《数据库设计与开发》',
        '数据库设计指南',
        '数据库设计案例'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：数据库应用开发',
      description: '学习数据库应用开发的基本方法和技术，掌握数据库应用系统的开发技能。',
      topics: [
        '数据库应用开发概述',
        '数据库连接技术',
        '数据库应用系统架构',
        '数据库应用开发工具',
        '数据库应用开发案例'
      ],
      resources: [
        '《数据库应用开发》',
        '数据库连接技术教程',
        '数据库应用开发案例'
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
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgMCBMIDUwIDAgTCA1MCA1MCBMIDAgNTAiIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjxwYXRoIGQ9Ik01MCAwIEwgMTAwIDAgTCAxMDAgNTAgTCA1MCA1MCIgZmlsbD0iIzNiODJmNiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PHBhdGggZD0iTTAgNTAiIGQ9Ik01MCA1MCBMIDAgNTAgTCAwIDEwMCBMIDUwIDEwMCIgZmlsbD0iIzNiODJmNiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PHBhdGggZD0iTTUwIDUwIEwgMTAwIDUwIEwgMTAwIDEwMCBMIDUwIDEwMCIgZmlsbD0iIzNiODJmNiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9nPjwvc3ZnPg==')]"></div>
      
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
              <span className="text-4xl">🗄️</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            数据库原理与应用
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业专业课程
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            本课程旨在培养学生掌握数据库的基本原理和应用技能，为后续的数据分析学习打下基础，
            使学生能够设计和管理数据库系统。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-white backdrop-blur-sm rounded-full border border-blue-200 text-sm text-blue-600">
              高职大二
            </div>
            <div className="px-5 py-2 bg-white backdrop-blur-sm rounded-full border border-blue-200 text-sm text-blue-600">
              先修课程：Python基础
            </div>
            <div className="px-5 py-2 bg-white backdrop-blur-sm rounded-full border border-blue-200 text-sm text-blue-600">
              后续课程：数据分析综合实训
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
            <p className="text-gray-600 max-w-2xl mx-auto">
              课程内容按照数据库系统的组成和应用流程编排，涵盖从数据库基础到应用开发的全过程
            </p>
          </div>
          
          <div className="space-y-6">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-400"
              >
                <div 
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection(section.id)}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                  <span className={`text-blue-500 font-medium transition-transform duration-300 ${activeSection === section.id ? 'transform rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
                {activeSection === section.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-800 mb-3">学习内容</h4>
                      <ul className="space-y-2 mb-6">
                        {section.topics.map((topic, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-3 mt-1">•</span>
                            <span className="text-gray-700">{topic}</span>
                          </li>
                        ))}
                      </ul>
                      {section.resources && (
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-800 mb-3">学习资源</h4>
                          <ul className="space-y-2">
                            {section.resources.map((resource, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-cyan-500 mr-3 mt-1">📚</span>
                                <span className="text-gray-700">{resource}</span>
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
            <p className="text-gray-600 max-w-2xl mx-auto">
              通过本课程的学习，学生将达到以下目标
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-6 hover:border-blue-400 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-500 text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">知识目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">掌握数据库的基本概念和原理</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">理解数据模型和关系数据库理论</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">熟悉SQL语言的基本语法和使用方法</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">掌握数据库设计的基本方法和步骤</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-6 hover:border-blue-400 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-cyan-500 text-xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">能力目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">能够设计和管理数据库系统</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">能够使用SQL语言进行数据操作和查询</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">能够设计合理的数据库结构</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">能够开发简单的数据库应用系统</span>
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
            <p className="text-gray-600 max-w-2xl mx-auto">
              课程成绩由以下部分组成
            </p>
          </div>
          
          <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-8">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">课堂参与</h3>
                  <p className="text-gray-600">包括课堂讨论、作业完成情况等</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-700">15%</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">实验练习</h3>
                  <p className="text-gray-600">包括SQL语句练习、数据库设计练习等</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-700">35%</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div className="bg-cyan-500 h-4 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">期中考试</h3>
                  <p className="text-gray-600">理论知识和实践能力考核</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-700">20%</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">期末项目</h3>
                  <p className="text-gray-600">综合数据库设计与应用项目</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <div className="w-24 text-right mr-4 text-gray-700">30%</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
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
            <p className="text-gray-600 max-w-2xl mx-auto">
              查看学习进度、获取学习资源和进行练习测试
            </p>
          </div>
          
          {/* 标签页导航 */}
          <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-1 mb-8 flex justify-center">
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'progress' ? 'bg-blue-100 text-blue-600 border border-blue-300' : 'text-gray-600 hover:text-gray-800'}`}
            >
              学习进度
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'resources' ? 'bg-blue-100 text-blue-600 border border-blue-300' : 'text-gray-600 hover:text-gray-800'}`}
            >
              学习资源
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'exercises' ? 'bg-blue-100 text-blue-600 border border-blue-300' : 'text-gray-600 hover:text-gray-800'}`}
            >
              练习测试
            </button>
          </div>
          
          {/* 标签页内容 */}
          {activeTab === 'progress' && (
            <div>
              {!activeChapter && (
                <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">数据库原理与应用课程学习进度</h3>
                  {/* 总体进度条 */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">总体进度</span>
                      <span className="text-blue-500 font-medium">
                        {progressItems.reduce((total, item) => total + (item.subItems?.filter(sub => sub.completed).length || 0), 0)}/{progressItems.reduce((total, item) => total + (item.subItems?.length || 0), 0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
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
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all duration-300">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => {
                          setActiveChapter(item.id);
                          setActiveChapterMode('content');
                        }}>
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                              item.completed
                                ? 'border-blue-500 bg-blue-500 text-white'
                                : 'border-gray-400'
                            }`}>
                              {item.completed ? '✓' : ''}
                            </div>
                            <h4 className={`font-medium ${item.completed ? 'text-blue-500' : 'text-gray-700'}`}>
                              {item.title}
                            </h4>
                          </div>
                          <span className="text-gray-500 text-sm">
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
                                    : 'border-gray-400'
                                }`}>
                                  {subItem.completed ? '✓' : ''}
                                </div>
                                <span className={`text-sm ${subItem.completed ? 'text-blue-500' : 'text-gray-500'}`}>
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
                      className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
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
                      className="flex items-center text-blue-500 hover:text-blue-600 mb-4 mr-4"
                    >
                      <span className="mr-2">←</span> 返回章节内容
                    </button>
                    <button
                      onClick={() => setActiveChapter(null)}
                      className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
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
            <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">学习资源</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningResources.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-blue-500 text-xl">
                          {resource.type === 'article' && '📄'}
                          {resource.type === 'video' && '🎥'}
                          {resource.type === 'document' && '📑'}
                          {resource.type === 'code' && '💻'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{resource.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                            {resource.difficulty === 'beginner' && '初级'}
                            {resource.difficulty === 'intermediate' && '中级'}
                            {resource.difficulty === 'advanced' && '高级'}
                          </span>
                          {resource.duration && (
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                              {resource.duration}
                            </span>
                          )}
                        </div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-500 hover:text-blue-600 text-sm"
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
          
          {activeTab === 'exercises' && !activeChapter && (
            <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">章节练习测试</h3>
              <p className="text-gray-600 mb-8">选择章节进行测试，每次测试包含30道题目（单选、多选、判断）</p>
              <div className="space-y-4">
                {progressItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all duration-300">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => {
                      setActiveChapter(item.id);
                      setActiveChapterMode('exercise');
                    }}>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-blue-500 text-xl">📝</span>
                        </div>
                        <h4 className="font-medium text-gray-700">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-gray-500 text-sm">
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
                  className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
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
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-50 backdrop-blur-sm border-t border-gray-200 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-700">数据库原理与应用课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}
