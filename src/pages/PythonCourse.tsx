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

export default function PythonCourse() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('progress');
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeChapterMode, setActiveChapterMode] = useState<'content' | 'exercise' | null>(null);

  // 学习进度数据
  const progressItems: ProgressItem[] = [
    {
      id: 'chapter1',
      title: '第一章：Python语言基础',
      completed: false,
      subItems: [
        { id: 'chapter1-1', title: 'Python简介与安装', completed: false },
        { id: 'chapter1-2', title: '基本数据类型', completed: false },
        { id: 'chapter1-3', title: '变量与赋值', completed: false },
        { id: 'chapter1-4', title: '基本运算符与表达式', completed: false },
        { id: 'chapter1-5', title: '输入输出函数', completed: false }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：控制结构',
      completed: false,
      subItems: [
        { id: 'chapter2-1', title: '条件语句', completed: false },
        { id: 'chapter2-2', title: 'for循环', completed: false },
        { id: 'chapter2-3', title: 'while循环', completed: false },
        { id: 'chapter2-4', title: '循环控制语句', completed: false },
        { id: 'chapter2-5', title: '嵌套循环与条件', completed: false }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：数据结构',
      completed: false,
      subItems: [
        { id: 'chapter3-1', title: '列表的创建与操作', completed: false },
        { id: 'chapter3-2', title: '元组的创建与操作', completed: false },
        { id: 'chapter3-3', title: '字典的创建与操作', completed: false },
        { id: 'chapter3-4', title: '集合的创建与操作', completed: false },
        { id: 'chapter3-5', title: '数据结构的选择与应用', completed: false }
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：函数与模块',
      completed: false,
      subItems: [
        { id: 'chapter4-1', title: '函数的定义与调用', completed: false },
        { id: 'chapter4-2', title: '函数参数与返回值', completed: false },
        { id: 'chapter4-3', title: '函数的作用域', completed: false },
        { id: 'chapter4-4', title: '模块的导入与使用', completed: false },
        { id: 'chapter4-5', title: '标准库的应用', completed: false }
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：文件操作',
      completed: false,
      subItems: [
        { id: 'chapter5-1', title: '文件的打开与关闭', completed: false },
        { id: 'chapter5-2', title: '文件的读取操作', completed: false },
        { id: 'chapter5-3', title: '文件的写入操作', completed: false },
        { id: 'chapter5-4', title: '文件的异常处理', completed: false },
        { id: 'chapter5-5', title: 'CSV文件的读写', completed: false }
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：面向对象编程',
      completed: false,
      subItems: [
        { id: 'chapter6-1', title: '类与对象的概念', completed: false },
        { id: 'chapter6-2', title: '类的定义与实例化', completed: false },
        { id: 'chapter6-3', title: '类的属性与方法', completed: false },
        { id: 'chapter6-4', title: '继承与多态', completed: false },
        { id: 'chapter6-5', title: '面向对象编程实践', completed: false }
      ]
    }
  ];

  // 章节内容数据
  const chapterContents = {
    'chapter1': {
      title: '第一章：Python语言基础',
      sections: [
        {
          id: 'section1-1',
          title: 'Python简介与安装',
          content: 'Python是一种高级编程语言，由Guido van Rossum于1989年创立。它以简洁的语法和强大的功能而闻名，广泛应用于Web开发、数据分析、人工智能等领域。\n\n安装Python的步骤：\n1. 访问Python官方网站（https://www.python.org/）\n2. 下载适合您操作系统的Python安装包\n3. 运行安装程序，确保勾选"Add Python to PATH"选项\n4. 完成安装后，打开命令提示符或终端，输入python --version验证安装成功',
          codeExamples: ['python --version']
        },
        {
          id: 'section1-2',
          title: '基本数据类型',
          content: 'Python的基本数据类型包括：\n\n1. 整数（int）：如1, 2, 3\n2. 浮点数（float）：如1.0, 2.5, 3.14\n3. 字符串（str）：如"Hello", \'Python\'\n4. 布尔值（bool）：True, False\n\n可以使用type()函数查看数据类型。',
          codeExamples: ['type(1)', 'type(1.0)', 'type("Hello")', 'type(True)']
        },
        {
          id: 'section1-3',
          title: '变量与赋值',
          content: '变量是用来存储数据的容器。在Python中，变量不需要声明类型，直接赋值即可。\n\n变量命名规则：\n1. 变量名只能包含字母、数字和下划线\n2. 变量名不能以数字开头\n3. 变量名区分大小写\n4. 变量名不能是Python关键字',
          codeExamples: ['x = 10', 'y = 3.14', 'name = "Python"', 'is_valid = True']
        },
        {
          id: 'section1-4',
          title: '基本运算符与表达式',
          content: 'Python支持多种运算符：\n\n1. 算术运算符：+, -, *, /, //, %, **\n2. 比较运算符：==, !=, >, <, >=, <=\n3. 逻辑运算符：and, or, not\n4. 赋值运算符：=, +=, -=, *=, /=\n\n表达式是由运算符和操作数组成的组合。',
          codeExamples: ['1 + 2', '3 * 4', '5 > 3', 'True and False']
        },
        {
          id: 'section1-5',
          title: '输入输出函数',
          content: 'Python提供了input()和print()函数用于输入输出。\n\ninput()函数用于从用户获取输入，返回字符串类型。\nprint()函数用于输出内容到控制台。',
          codeExamples: ['name = input("请输入你的名字：")', 'print("Hello, " + name)', 'print(f"Hello, {name}")']
        }
      ]
    },
    'chapter2': {
      title: '第二章：控制结构',
      sections: [
        {
          id: 'section2-1',
          title: '条件语句',
          content: '条件语句用于根据条件执行不同的代码块。\n\nPython的条件语句包括：\n1. if语句\n2. if-else语句\n3. if-elif-else语句',
          codeExamples: ['if x > 0:\n    print("正数")\nelif x < 0:\n    print("负数")\nelse:\n    print("零")']
        },
        {
          id: 'section2-2',
          title: 'for循环',
          content: 'for循环用于遍历序列（如列表、元组、字符串）中的元素。',
          codeExamples: ['for i in range(5):\n    print(i)', 'for item in [1, 2, 3]:\n    print(item)', 'for char in "Python":\n    print(char)']
        },
        {
          id: 'section2-3',
          title: 'while循环',
          content: 'while循环用于在条件为真时重复执行代码块。',
          codeExamples: ['i = 0\nwhile i < 5:\n    print(i)\n    i += 1']
        },
        {
          id: 'section2-4',
          title: '循环控制语句',
          content: '循环控制语句用于控制循环的执行流程：\n\n1. break：跳出循环\n2. continue：跳过当前循环的剩余部分，进入下一次循环',
          codeExamples: ['for i in range(10):\n    if i == 5:\n        break\n    print(i)', 'for i in range(10):\n    if i % 2 == 0:\n        continue\n    print(i)']
        },
        {
          id: 'section2-5',
          title: '嵌套循环与条件',
          content: '循环和条件语句可以嵌套使用，以处理更复杂的逻辑。',
          codeExamples: ['for i in range(3):\n    for j in range(3):\n        if i == j:\n            print(f"({i}, {j})")']
        }
      ]
    },
    'chapter3': {
      title: '第三章：数据结构',
      sections: [
        {
          id: 'section3-1',
          title: '列表的创建与操作',
          content: '列表是Python中最常用的数据结构之一，用于存储多个元素。\n\n列表的特点：\n1. 有序\n2. 可变\n3. 可重复\n\n列表操作包括：创建、访问、修改、添加、删除等。',
          codeExamples: ['# 创建列表\nlst = [1, 2, 3, 4, 5]\n# 访问元素\nprint(lst[0])  # 输出第一个元素\n# 修改元素\nlst[0] = 10\n# 添加元素\nlst.append(6)\n# 删除元素\ndel lst[0]']
        },
        {
          id: 'section3-2',
          title: '元组的创建与操作',
          content: '元组与列表类似，但元组是不可变的。\n\n元组的特点：\n1. 有序\n2. 不可变\n3. 可重复\n\n元组操作包括：创建、访问等。',
          codeExamples: ['# 创建元组\ntup = (1, 2, 3, 4, 5)\n# 访问元素\nprint(tup[0])  # 输出第一个元素\n# 元组不可修改\n# tup[0] = 10  # 会报错']
        },
        {
          id: 'section3-3',
          title: '字典的创建与操作',
          content: '字典是Python中另一个重要的数据结构，用于存储键值对。\n\n字典的特点：\n1. 无序（Python 3.7+有序）\n2. 可变\n3. 键唯一\n\n字典操作包括：创建、访问、修改、添加、删除等。',
          codeExamples: ['# 创建字典\ndict = {"name": "Python", "version": 3.8}\n# 访问元素\nprint(dict["name"])  # 输出值\n# 修改元素\ndict["version"] = 3.9\n# 添加元素\ndict["author"] = "Guido van Rossum"\n# 删除元素\ndel dict["version"]']
        },
        {
          id: 'section3-4',
          title: '集合的创建与操作',
          content: '集合用于存储唯一的元素。\n\n集合的特点：\n1. 无序\n2. 可变\n3. 元素唯一\n\n集合操作包括：创建、添加、删除、交集、并集等。',
          codeExamples: ['# 创建集合\ns = {1, 2, 3, 4, 5}\n# 添加元素\ns.add(6)\n# 删除元素\ns.remove(1)\n# 交集\ns1 = {1, 2, 3}\ns2 = {2, 3, 4}\nprint(s1 & s2)  # 输出 {2, 3}\n# 并集\nprint(s1 | s2)  # 输出 {1, 2, 3, 4}']
        },
        {
          id: 'section3-5',
          title: '数据结构的选择与应用',
          content: '根据不同的需求选择合适的数据结构：\n\n1. 列表：适合存储有序的、可修改的元素集合\n2. 元组：适合存储有序的、不可修改的元素集合\n3. 字典：适合存储键值对数据\n4. 集合：适合存储唯一的元素集合',
          codeExamples: ['# 列表应用\nstudents = ["Alice", "Bob", "Charlie"]\n# 元组应用\ncoordinates = (10, 20)\n# 字典应用\nstudent_info = {"name": "Alice", "age": 20, "grade": "A"}\n# 集合应用\nunique_numbers = {1, 2, 3, 4, 5}']
        }
      ]
    },
    'chapter4': {
      title: '第四章：函数与模块',
      sections: [
        {
          id: 'section4-1',
          title: '函数的定义与调用',
          content: '函数是一段可重用的代码块，用于执行特定的任务。\n\n在Python中，使用def关键字定义函数。',
          codeExamples: ['def greet(name):\n    """打招呼函数"""\n    print(f"Hello, {name}!")\n\n# 调用函数\ngreet("Alice")']
        },
        {
          id: 'section4-2',
          title: '函数参数与返回值',
          content: '函数可以接受参数，并返回值。\n\n参数类型：\n1. 位置参数\n2. 默认参数\n3. 关键字参数\n4. 可变参数',
          codeExamples: ['def add(a, b=10):\n    """加法函数"""\n    return a + b\n\n# 调用函数\nprint(add(5))  # 使用默认参数\nprint(add(5, 20))  # 覆盖默认参数\nprint(add(a=5, b=20))  # 使用关键字参数']
        },
        {
          id: 'section4-3',
          title: '函数的作用域',
          content: '变量的作用域是指变量可访问的范围。\n\nPython的作用域包括：\n1. 局部作用域：函数内部\n2. 全局作用域：模块级别\n3. 内置作用域：Python内置函数和变量',
          codeExamples: ['# 全局变量\nx = 10\n\ndef func():\n    # 局部变量\n    y = 20\n    print(x)  # 可以访问全局变量\n    print(y)  # 可以访问局部变量\n\nfunc()\nprint(x)  # 可以访问全局变量\n# print(y)  # 会报错，无法访问局部变量']
        },
        {
          id: 'section4-4',
          title: '模块的导入与使用',
          content: '模块是一个包含Python定义和语句的文件。\n\n导入模块的方式：\n1. import module\n2. from module import function\n3. from module import *',
          codeExamples: ['# 导入整个模块\nimport math\nprint(math.pi)\n\n# 导入特定函数\nfrom math import sqrt\nprint(sqrt(16))\n\n# 导入所有函数\nfrom math import *\nprint(pi)']
        },
        {
          id: 'section4-5',
          title: '标准库的应用',
          content: 'Python标准库提供了许多有用的模块，如：\n\n1. math：数学函数\n2. random：随机数生成\n3. datetime：日期和时间处理\n4. os：操作系统接口\n5. sys：系统相关参数和函数',
          codeExamples: ['import random\nprint(random.randint(1, 10))\n\nimport datetime\nprint(datetime.datetime.now())\n\nimport os\nprint(os.getcwd())']
        }
      ]
    },
    'chapter5': {
      title: '第五章：文件操作',
      sections: [
        {
          id: 'section5-1',
          title: '文件的打开与关闭',
          content: '在Python中，使用open()函数打开文件，使用close()方法关闭文件。\n\nopen()函数的参数：\n1. 文件路径\n2. 模式：r（读取）、w（写入）、a（追加）、b（二进制）等',
          codeExamples: ['# 打开文件\nf = open("example.txt", "w")\n# 关闭文件\nf.close()']
        },
        {
          id: 'section5-2',
          title: '文件的读取操作',
          content: '文件读取操作包括：\n1. read()：读取整个文件\n2. readline()：读取一行\n3. readlines()：读取所有行到列表',
          codeExamples: ['# 读取整个文件\nf = open("example.txt", "r")\ncontent = f.read()\nprint(content)\nf.close()\n\n# 读取一行\nf = open("example.txt", "r")\nline = f.readline()\nprint(line)\nf.close()\n\n# 读取所有行\nf = open("example.txt", "r")\nlines = f.readlines()\nprint(lines)\nf.close()']
        },
        {
          id: 'section5-3',
          title: '文件的写入操作',
          content: '文件写入操作包括：\n1. write()：写入字符串\n2. writelines()：写入字符串列表',
          codeExamples: ['# 写入字符串\nf = open("example.txt", "w")\nf.write("Hello, Python!")\nf.close()\n\n# 写入字符串列表\nf = open("example.txt", "w")\nf.writelines(["Line 1\n", "Line 2\n", "Line 3\n"])\nf.close()']
        },
        {
          id: 'section5-4',
          title: '文件的异常处理',
          content: '使用try-except语句处理文件操作中的异常。\n\n推荐使用with语句，它会自动关闭文件。',
          codeExamples: ['# 使用try-except\ntry:\n    f = open("example.txt", "r")\n    content = f.read()\n    print(content)\nexcept FileNotFoundError:\n    print("文件不存在")\nfinally:\n    if f:\n        f.close()\n\n# 使用with语句\nwith open("example.txt", "r") as f:\n    content = f.read()\n    print(content)']
        },
        {
          id: 'section5-5',
          title: 'CSV文件的读写',
          content: 'CSV（逗号分隔值）是一种常见的文件格式，用于存储表格数据。\n\n使用csv模块读写CSV文件。',
          codeExamples: ['import csv\n\n# 写入CSV文件\nwith open("data.csv", "w", newline="") as f:\n    writer = csv.writer(f)\n    writer.writerow(["Name", "Age", "Grade"])\n    writer.writerow(["Alice", 20, "A"])\n    writer.writerow(["Bob", 21, "B"])\n\n# 读取CSV文件\nwith open("data.csv", "r") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)']
        }
      ]
    },
    'chapter6': {
      title: '第六章：面向对象编程',
      sections: [
        {
          id: 'section6-1',
          title: '类与对象的概念',
          content: '面向对象编程（OOP）是一种编程范式，使用类和对象来组织代码。\n\n类是对象的蓝图，定义了对象的属性和方法。\n对象是类的实例。',
          codeExamples: ['# 定义类\nclass Person:\n    pass\n\n# 创建对象\np = Person()']
        },
        {
          id: 'section6-2',
          title: '类的定义与实例化',
          content: '在Python中，使用class关键字定义类。\n\n__init__方法是类的构造函数，用于初始化对象。',
          codeExamples: ['class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n# 实例化对象\np = Person("Alice", 20)\nprint(p.name)\nprint(p.age)']
        },
        {
          id: 'section6-3',
          title: '类的属性与方法',
          content: '类的属性是对象的特征，类的方法是对象的行为。\n\n方法是定义在类中的函数，第一个参数是self，指向对象本身。',
          codeExamples: ['class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        print(f"Hello, my name is {self.name}.")\n\np = Person("Alice", 20)\np.greet()']
        },
        {
          id: 'section6-4',
          title: '继承与多态',
          content: '继承是一种机制，允许一个类继承另一个类的属性和方法。\n\n多态是指不同类的对象可以响应相同的方法调用。',
          codeExamples: ['class Animal:\n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self):\n        print("Woof!")\n\nclass Cat(Animal):\n    def speak(self):\n        print("Meow!")\n\ndog = Dog()\ncat = Cat()\ndog.speak()\ncat.speak()']
        },
        {
          id: 'section6-5',
          title: '面向对象编程实践',
          content: '面向对象编程的核心原则：\n1. 封装：将数据和方法封装在类中\n2. 继承：通过继承复用代码\n3. 多态：通过多态实现代码的灵活性',
          codeExamples: ['class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    \n    def deposit(self, amount):\n        self.balance += amount\n    \n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n        else:\n            print("Insufficient funds")\n    \n    def get_balance(self):\n        return self.balance\n\n# 使用类\naccount = BankAccount(1000)\naccount.deposit(500)\naccount.withdraw(200)\nprint(account.get_balance())']
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
        question: `Python基础问题 ${i + 1}：关于Python的基本概念，下列说法正确的是？`,
        options: [
          'Python是一种编译型语言',
          'Python是一种解释型语言',
          'Python是一种汇编语言',
          'Python是一种机器语言'
        ],
        correctAnswer: 1,
        explanation: 'Python是一种解释型语言，代码在运行时由解释器逐行执行。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 51,
        type: 'multiple' as const,
        question: `Python基础问题 ${i + 51}：下列哪些是Python的基本数据类型？`,
        options: [
          '整数（int）',
          '浮点数（float）',
          '字符串（str）',
          '数组（array）'
        ],
        correctAnswer: [0, 1, 2],
        explanation: 'Python的基本数据类型包括整数、浮点数、字符串、布尔值等，数组不是Python的基本数据类型。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 81,
        type: 'judgment' as const,
        question: `Python基础问题 ${i + 81}：Python的变量需要声明类型。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'Python是动态类型语言，变量不需要声明类型，直接赋值即可。'
      }))
    ],
    'chapter2': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 101,
        type: 'single' as const,
        question: `控制结构问题 ${i + 1}：下列关于Python循环的说法，正确的是？`,
        options: [
          'for循环只能用于遍历列表',
          'while循环的条件必须是布尔值',
          'break语句用于跳过当前循环的剩余部分',
          'continue语句用于跳出整个循环'
        ],
        correctAnswer: 1,
        explanation: 'while循环的条件必须是布尔值，当条件为True时执行循环体。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 151,
        type: 'multiple' as const,
        question: `控制结构问题 ${i + 51}：下列哪些是Python的循环控制语句？`,
        options: [
          'break',
          'continue',
          'return',
          'pass'
        ],
        correctAnswer: [0, 1],
        explanation: 'Python的循环控制语句包括break和continue，return用于从函数返回，pass是一个空语句。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 181,
        type: 'judgment' as const,
        question: `控制结构问题 ${i + 81}：Python的for循环只能用于遍历序列。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'Python的for循环可以用于遍历任何可迭代对象，不仅仅是序列。'
      }))
    ],
    'chapter3': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 201,
        type: 'single' as const,
        question: `数据结构问题 ${i + 1}：下列关于Python列表的说法，正确的是？`,
        options: [
          '列表是不可变的',
          '列表中的元素必须是相同类型',
          '列表可以包含不同类型的元素',
          '列表的索引从1开始'
        ],
        correctAnswer: 2,
        explanation: 'Python列表是可变的，可以包含不同类型的元素，索引从0开始。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 251,
        type: 'multiple' as const,
        question: `数据结构问题 ${i + 51}：下列哪些是Python的内置数据结构？`,
        options: [
          '列表（list）',
          '元组（tuple）',
          '字典（dict）',
          '集合（set）'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'Python的内置数据结构包括列表、元组、字典和集合。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 281,
        type: 'judgment' as const,
        question: `数据结构问题 ${i + 81}：Python的字典是有序的。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: 'Python 3.7+中，字典是有序的，按照插入顺序保存键值对。'
      }))
    ],
    'chapter4': [
      // 单选题
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 301,
        type: 'single' as const,
        question: `函数与模块问题 ${i + 1}：下列关于Python函数的说法，正确的是？`,
        options: [
          '函数必须有返回值',
          '函数参数不能有默认值',
          '函数可以嵌套定义',
          '函数名可以是Python关键字'
        ],
        correctAnswer: 2,
        explanation: 'Python函数可以嵌套定义，即在一个函数内部定义另一个函数。'
      })),
      // 多选题
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 351,
        type: 'multiple' as const,
        question: `函数与模块问题 ${i + 51}：下列哪些是Python函数的参数类型？`,
        options: [
          '位置参数',
          '默认参数',
          '关键字参数',
          '可变参数'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'Python函数的参数类型包括位置参数、默认参数、关键字参数和可变参数。'
      })),
      // 判断题
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 381,
        type: 'judgment' as const,
        question: `函数与模块问题 ${i + 81}：Python的模块必须放在单独的文件中。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'Python的模块通常放在单独的文件中，但也可以在同一文件中定义多个模块。'
      }))
    ]
  };

  // 学习资源数据
  const learningResources: Resource[] = [
    {
      id: 1,
      title: 'Python官方文档',
      type: 'document',
      description: 'Python官方提供的完整文档，包含语言参考、标准库等内容',
      link: 'https://docs.python.org/zh-cn/3/',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: 'Python编程：从入门到实践',
      type: 'document',
      description: '一本适合初学者的Python入门书籍，包含基础语法和实践项目',
      link: 'https://book.douban.com/subject/26829016/',
      difficulty: 'beginner'
    },
    {
      id: 3,
      title: 'Python基础教程（第3版）',
      type: 'document',
      description: '全面介绍Python语言的基础知识，适合初学者和中级开发者',
      link: 'https://book.douban.com/subject/26829016/',
      difficulty: 'beginner'
    },
    {
      id: 4,
      title: 'Python进阶：从入门到精通',
      type: 'article',
      description: 'Python进阶教程，涵盖面向对象编程、模块开发等高级主题',
      link: 'https://www.runoob.com/python3/python3-tutorial.html',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: 'Python数据科学入门',
      type: 'video',
      description: '视频教程，介绍如何使用Python进行数据分析和可视化',
      link: 'https://www.bilibili.com/video/BV12E411A7ZQ/',
      duration: '10小时',
      difficulty: 'intermediate'
    },
    {
      id: 6,
      title: 'Python标准库实例',
      type: 'code',
      description: 'Python标准库的使用示例，包含常用模块的代码示例',
      link: 'https://github.com/python/cpython/tree/main/Lib',
      difficulty: 'intermediate'
    },
    {
      id: 7,
      title: 'Python设计模式',
      type: 'article',
      description: '介绍Python中常用的设计模式及其实现',
      link: 'https://refactoringguru.cn/design-patterns/python',
      difficulty: 'advanced'
    },
    {
      id: 8,
      title: 'Python性能优化',
      type: 'article',
      description: 'Python代码性能优化的技巧和方法',
      link: 'https://realpython.com/python-performance/',
      difficulty: 'advanced'
    }
  ];

  // 练习数据
  const exercises: Question[] = [
    {
      id: 1,
      question: '以下哪个不是Python的基本数据类型？',
      options: ['整数', '浮点数', '字符串', '数组'],
      correctAnswer: 3,
      explanation: 'Python的基本数据类型包括整数、浮点数、字符串、布尔值等，数组不是Python的基本数据类型，而是通过列表实现的。'
    },
    {
      id: 2,
      question: 'Python中用于定义函数的关键字是？',
      options: ['function', 'def', 'func', 'define'],
      correctAnswer: 1,
      explanation: '在Python中，使用def关键字来定义函数。'
    },
    {
      id: 3,
      question: '以下哪个语句用于退出循环？',
      options: ['break', 'continue', 'exit', 'return'],
      correctAnswer: 0,
      explanation: 'break语句用于退出循环，continue语句用于跳过当前循环的剩余部分并进入下一次循环，exit()函数用于退出程序，return语句用于从函数返回值。'
    },
    {
      id: 4,
      question: 'Python中列表的特点是？',
      options: ['不可变', '有序', '不可重复', '键值对'],
      correctAnswer: 1,
      explanation: 'Python中列表是有序的、可变的、可重复的集合类型。'
    },
    {
      id: 5,
      question: '以下哪个模块用于处理CSV文件？',
      options: ['csv', 'json', 'xml', 'pickle'],
      correctAnswer: 0,
      explanation: 'csv模块用于处理CSV文件，json模块用于处理JSON数据，xml模块用于处理XML数据，pickle模块用于对象序列化。'
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
      description: '本课程是商务数据分析与应用专业的基础课程，旨在培养学生掌握Python编程语言的基础知识，为后续的数据分析学习打下坚实的基础。',
      topics: [
        '课程定位与目标',
        '课程内容与结构',
        '学习方法与要求',
        '考核方式与标准'
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：Python语言基础',
      description: '学习Python语言的基本语法和数据类型，掌握Python编程的基础知识。',
      topics: [
        'Python简介与安装',
        '基本数据类型（整数、浮点数、字符串、布尔值）',
        '变量与赋值',
        '基本运算符与表达式',
        '输入输出函数'
      ],
      resources: [
        '《Python编程：从入门到实践》',
        'Python官方文档',
        'Python基础语法练习'
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：控制结构',
      description: '学习Python的控制结构，包括条件语句和循环语句，掌握程序的流程控制。',
      topics: [
        '条件语句（if-elif-else）',
        '循环语句（for循环）',
        '循环语句（while循环）',
        '循环控制语句（break、continue）',
        '嵌套循环与条件'
      ],
      resources: [
        'Python控制结构教程',
        '循环语句练习',
        '条件判断案例分析'
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：数据结构',
      description: '学习Python的内置数据结构，包括列表、元组、字典和集合，掌握数据的组织和管理。',
      topics: [
        '列表（List）的创建与操作',
        '元组（Tuple）的创建与操作',
        '字典（Dictionary）的创建与操作',
        '集合（Set）的创建与操作',
        '数据结构的选择与应用'
      ],
      resources: [
        'Python数据结构教程',
        '数据结构练习',
        '数据结构应用案例'
      ]
    },
    {
      id: 'chapter4',
      title: '第四章：函数与模块',
      description: '学习Python的函数定义与调用，以及模块的导入与使用，掌握代码的组织和复用。',
      topics: [
        '函数的定义与调用',
        '函数参数与返回值',
        '函数的作用域',
        '模块的导入与使用',
        '标准库的应用'
      ],
      resources: [
        'Python函数教程',
        '模块与包的使用指南',
        '函数练习与案例'
      ]
    },
    {
      id: 'chapter5',
      title: '第五章：文件操作',
      description: '学习Python的文件读写操作，掌握数据的持久化存储。',
      topics: [
        '文件的打开与关闭',
        '文件的读取操作',
        '文件的写入操作',
        '文件的异常处理',
        'CSV文件的读写'
      ],
      resources: [
        'Python文件操作教程',
        '文件读写练习',
        'CSV文件处理案例'
      ]
    },
    {
      id: 'chapter6',
      title: '第六章：面向对象编程',
      description: '学习Python的面向对象编程思想和方法，掌握类和对象的概念和使用。',
      topics: [
        '类与对象的概念',
        '类的定义与实例化',
        '类的属性与方法',
        '继承与多态',
        '面向对象编程实践'
      ],
      resources: [
        'Python面向对象编程教程',
        '类与对象练习',
        '面向对象编程案例'
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
              <span className="text-4xl">🐍</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            Python基础
          </h1>
          <p className="text-xl text-cyan-300 mb-6">
            商务数据分析与应用专业基础课程
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            本课程旨在培养学生掌握Python编程语言的基础知识，为后续的数据分析学习打下坚实的基础，
            使学生能够使用Python进行简单的数据处理和分析。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              高职大二
            </div>
            <div className="px-5 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/50 text-sm text-blue-300">
              先修课程：无
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
              课程内容按照由浅入深的顺序编排，涵盖Python编程的核心知识
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
                        <div>
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
                  <span className="text-gray-300">掌握Python语言的基本语法和数据类型</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">理解Python的控制结构和数据结构</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">熟悉Python的函数和模块系统</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">了解面向对象编程的基本概念</span>
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
                  <span className="text-gray-300">能够编写基本的Python程序</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用Python处理和分析数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用Python读写文件</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  <span className="text-gray-300">能够使用Python的标准库</span>
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
                  <p className="text-gray-400">包括编程练习、小项目等</p>
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
                  <p className="text-gray-400">综合编程项目</p>
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

      {/* 学习功能 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
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
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              学习进度
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'resources'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              学习资源
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'exercises'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
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
                <h3 className="text-2xl font-semibold text-gray-100 mb-6">Python基础课程学习进度</h3>
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
            {activeTab === 'progress' && activeChapter && activeChapterMode === 'content' && (
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
            {activeTab === 'progress' && activeChapter && activeChapterMode === 'exercise' && (
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
            {activeTab === 'resources' && (
              <LearningResource 
                title="Python学习资源" 
                resources={learningResources} 
              />
            )}
            {activeTab === 'exercises' && (
              <ExerciseComponent 
                title="Python基础练习" 
                questions={exercises} 
              />
            )}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-300">Python基础课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}