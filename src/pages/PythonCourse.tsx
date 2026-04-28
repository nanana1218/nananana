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
          content: 'Python是一种高级编程语言，由Guido van Rossum于1989年创立。它以简洁的语法和强大的功能而闻名，广泛应用于Web开发、数据分析、人工智能等领域。\n\nPython的特点：\n1. 简单易学：语法简洁清晰，代码可读性高\n2. 解释执行：无需编译，直接运行\n3. 面向对象：支持面向对象编程范式\n4. 丰富的库：拥有强大的标准库和第三方库\n5. 跨平台：可在Windows、macOS、Linux等多种操作系统上运行\n\n安装Python的步骤：\n1. 访问Python官方网站（https://www.python.org/）\n2. 下载适合您操作系统的Python 3.x版本安装包\n3. 运行安装程序，确保勾选"Add Python to PATH"选项\n4. 完成安装后，打开命令提示符或终端，输入python --version验证安装成功\n5. 安装集成开发环境（IDE）如PyCharm、VS Code等以提高开发效率',
          codeExamples: ['python --version', 'python -c "print(\'Hello, Python!\')"'],
          resources: [
            'Python官方网站：https://www.python.org/',
            'Python安装指南',
            'Python入门视频教程',
            'PyCharm安装与配置',
            'VS Code Python插件使用指南'
          ]
        },
        {
          id: 'section1-2',
          title: '基本数据类型',
          content: 'Python的基本数据类型包括：\n\n1. 整数（int）：如1, 2, 3, -4, 0，支持任意大小的整数\n2. 浮点数（float）：如1.0, 2.5, 3.14, -0.5，双精度浮点数\n3. 字符串（str）：如"Hello", \'Python\', \"\"\"多行字符串\"\"\"，使用单引号、双引号或三引号包围\n4. 布尔值（bool）：True, False，用于逻辑判断\n5. 空值（None）：表示没有值\n\n数据类型转换：\n- int()：转换为整数\n- float()：转换为浮点数\n- str()：转换为字符串\n- bool()：转换为布尔值\n\n可以使用type()函数查看数据类型。',
          codeExamples: ['type(1)', 'type(1.0)', 'type("Hello")', 'type(True)', 'type(None)', 'int(3.14)', 'float(5)', 'str(123)'],
          resources: [
            'Python数据类型文档',
            '数据类型转换指南',
            '数据类型练习题库',
            'Python数值类型详解'
          ]
        },
        {
          id: 'section1-3',
          title: '变量与赋值',
          content: '变量是用来存储数据的容器。在Python中，变量不需要声明类型，直接赋值即可。\n\n变量命名规则：\n1. 变量名只能包含字母、数字和下划线\n2. 变量名不能以数字开头\n3. 变量名区分大小写\n4. 变量名不能是Python关键字（如if、for、while等）\n5. 变量名应具有描述性，便于理解代码\n\n赋值操作：\n- 基本赋值：x = 10\n- 多重赋值：x, y = 10, 20\n- 增量赋值：x += 5（等价于x = x + 5）\n- 链式赋值：x = y = 10\n\n变量作用域：\n- 局部变量：在函数内部定义，仅在函数内部可见\n- 全局变量：在函数外部定义，在整个模块中可见',
          codeExamples: ['x = 10', 'y = 3.14', 'name = "Python"', 'is_valid = True', 'x, y = 10, 20', 'x += 5', 'x = y = 10'],
          resources: [
            'Python变量命名规范',
            '变量作用域详解',
            '变量赋值技巧',
            'Python命名约定'
          ]
        },
        {
          id: 'section1-4',
          title: '基本运算符与表达式',
          content: 'Python支持多种运算符：\n\n1. 算术运算符：\n   - +：加法\n   - -：减法\n   - *：乘法\n   - /：除法（返回浮点数）\n   - //：整除（返回整数）\n   - %：取模（返回余数）\n   - **：幂运算\n\n2. 比较运算符：\n   - ==：等于\n   - !=：不等于\n   - >：大于\n   - <：小于\n   - >=：大于等于\n   - <=：小于等于\n\n3. 逻辑运算符：\n   - and：逻辑与\n   - or：逻辑或\n   - not：逻辑非\n\n4. 赋值运算符：\n   - =：基本赋值\n   - +=：加法赋值\n   - -=：减法赋值\n   - *=：乘法赋值\n   - /=：除法赋值\n   - //=：整除赋值\n   - %=：取模赋值\n   - **=：幂运算赋值\n\n表达式是由运算符和操作数组成的组合，Python会按照运算符优先级进行计算。',
          codeExamples: ['1 + 2', '3 * 4', '5 > 3', 'True and False', 'x = 10', 'x += 5', '2 ** 3', '10 // 3', '10 % 3'],
          resources: [
            'Python运算符优先级表',
            '表达式计算指南',
            '运算符练习题库',
            'Python运算符详解'
          ]
        },
        {
          id: 'section1-5',
          title: '输入输出函数',
          content: 'Python提供了input()和print()函数用于输入输出。\n\ninput()函数：\n- 用于从用户获取输入\n- 无论输入什么，都会返回字符串类型\n- 可以提供一个提示信息作为参数\n\nprint()函数：\n- 用于输出内容到控制台\n- 可以输出多个值，默认用空格分隔\n- 可以指定分隔符和结束符\n- 支持格式化输出\n\n格式化输出方法：\n1. 字符串拼接："Hello, " + name\n2. 格式化字符串：f"Hello, {name}"（f-string）\n3. format()方法："Hello, {}".format(name)\n4. 旧式格式化："Hello, %s" % name',
          codeExamples: ['name = input("请输入你的名字：")', 'print("Hello, " + name)', 'print(f"Hello, {name}")', 'print("Hello, {0}".format(name))', 'print("Hello, %s" % name)', 'print(1, 2, 3, sep=", ", end="!")'],
          resources: [
            'Python输入输出教程',
            'f-string格式化详解',
            'print函数高级用法',
            '输入输出练习题库'
          ]
        }
      ]
    },
    'chapter2': {
      title: '第二章：控制结构',
      sections: [
        {
          id: 'section2-1',
          title: '条件语句',
          content: '条件语句用于根据条件执行不同的代码块。\n\nPython的条件语句包括：\n1. if语句：当条件为真时执行代码块\n2. if-else语句：当条件为真时执行一个代码块，否则执行另一个代码块\n3. if-elif-else语句：多条件判断，按顺序检查条件\n\n条件表达式：\n- 可以是任何返回布尔值的表达式\n- 常用的比较运算符：==, !=, >, <, >=, <=\n- 常用的逻辑运算符：and, or, not\n- 可以使用in运算符检查元素是否在序列中\n- 可以使用is运算符检查对象是否相同',
          codeExamples: ['if x > 0:\n    print("正数")\nelif x < 0:\n    print("负数")\nelse:\n    print("零")', 'if "a" in "abc":\n    print("包含")', 'if not False:\n    print("真")'],
          resources: [
            'Python条件语句教程',
            '条件表达式详解',
            '逻辑运算符使用指南',
            '条件语句练习题库'
          ]
        },
        {
          id: 'section2-2',
          title: 'for循环',
          content: 'for循环用于遍历序列（如列表、元组、字符串）中的元素。\n\nrange()函数：\n- 用于生成一个整数序列\n- range(start, stop, step)\n- start：起始值（默认为0）\n- stop：结束值（不包含）\n- step：步长（默认为1）\n\n遍历技巧：\n- 遍历列表：for item in list:\n- 遍历字典：for key in dict: 或 for key, value in dict.items():\n- 遍历字符串：for char in string:\n- 同时获取索引和值：for index, value in enumerate(list):',
          codeExamples: ['for i in range(5):\n    print(i)', 'for item in [1, 2, 3]:\n    print(item)', 'for char in "Python":\n    print(char)', 'for i in range(1, 10, 2):\n    print(i)', 'for index, value in enumerate(["a", "b", "c"]):\n    print(index, value)'],
          resources: [
            'Python for循环教程',
            'range函数详解',
            'enumerate函数使用指南',
            'for循环练习题库'
          ]
        },
        {
          id: 'section2-3',
          title: 'while循环',
          content: 'while循环用于在条件为真时重复执行代码块。\n\nwhile循环的结构：\nwhile 条件:\n    代码块\n\n注意事项：\n- 确保循环条件最终会变为假，否则会导致无限循环\n- 在循环体中必须有改变条件的语句\n- 可以使用break语句提前退出循环\n- 可以使用continue语句跳过当前循环的剩余部分',
          codeExamples: ['i = 0\nwhile i < 5:\n    print(i)\n    i += 1', 'while True:\n    user_input = input("输入q退出：")\n    if user_input == "q":\n        break\n    print(f"你输入了：{user_input}")'],
          resources: [
            'Python while循环教程',
            '无限循环处理',
            'while循环练习题库'
          ]
        },
        {
          id: 'section2-4',
          title: '循环控制语句',
          content: '循环控制语句用于控制循环的执行流程：\n\n1. break语句：\n   - 用于跳出当前循环\n   - 只跳出最内层的循环\n   - 可以用于for循环和while循环\n\n2. continue语句：\n   - 跳过当前循环的剩余部分，进入下一次循环\n   - 只影响当前循环\n   - 可以用于for循环和while循环\n\n3. pass语句：\n   - 空语句，什么都不做\n   - 用于占位，保持代码结构完整',
          codeExamples: ['for i in range(10):\n    if i == 5:\n        break\n    print(i)', 'for i in range(10):\n    if i % 2 == 0:\n        continue\n    print(i)', 'for i in range(5):\n    if i == 2:\n        pass  # 占位符\n    print(i)'],
          resources: [
            'Python循环控制语句',
            'break和continue使用指南',
            '循环控制练习题库'
          ]
        },
        {
          id: 'section2-5',
          title: '嵌套循环与条件',
          content: '循环和条件语句可以嵌套使用，以处理更复杂的逻辑。\n\n嵌套循环：\n- 一个循环内部包含另一个循环\n- 外层循环执行一次，内层循环执行完整的一轮\n- 注意控制循环的深度，避免过度嵌套导致代码难以理解\n\n嵌套条件：\n- 一个条件语句内部包含另一个条件语句\n- 用于处理多层次的条件判断',
          codeExamples: ['for i in range(3):\n    for j in range(3):\n        if i == j:\n            print(f"({i}, {j})")', 'for i in range(1, 10):\n    if i % 2 == 0:\n        for j in range(1, i):\n            if j % 2 == 1:\n                print(f"{i} * {j} = {i*j}")'],
          resources: [
            'Python嵌套循环教程',
            '嵌套条件语句使用指南',
            '嵌套结构练习题库'
          ]
        }
      ]
    },
    'chapter3': {
      title: '第三章：数据结构',
      sections: [
        {
          id: 'section3-1',
          title: '列表的创建与操作',
          content: '列表是Python中最常用的数据结构之一，用于存储多个元素。\n\n列表的特点：\n1. 有序：元素按照插入顺序排列\n2. 可变：可以修改、添加、删除元素\n3. 可重复：可以包含相同的元素\n4. 异构：可以包含不同类型的元素\n\n列表操作：\n1. 创建列表：\n   - 直接创建：lst = [1, 2, 3]\n   - 使用list()函数：lst = list(range(5))\n   - 列表推导式：lst = [i*2 for i in range(5)]\n\n2. 访问元素：\n   - 索引访问：lst[0]（正向索引，从0开始）\n   - 负索引：lst[-1]（反向索引，从-1开始）\n   - 切片：lst[1:3]（获取子列表）\n\n3. 修改元素：lst[0] = 10\n\n4. 添加元素：\n   - append()：在末尾添加元素\n   - insert()：在指定位置插入元素\n   - extend()：扩展列表\n\n5. 删除元素：\n   - del：del lst[0]\n   - pop()：弹出并返回元素\n   - remove()：删除指定值的元素\n\n6. 其他操作：\n   - len()：获取长度\n   - in：检查元素是否存在\n   - sort()：排序\n   - reverse()：反转\n   - count()：统计元素出现次数\n   - index()：查找元素索引',
          codeExamples: ['# 创建列表\nlst = [1, 2, 3, 4, 5]\nlst2 = list(range(10))\nlst3 = [i*2 for i in range(5)]\n# 访问元素\nprint(lst[0])  # 输出第一个元素\nprint(lst[-1])  # 输出最后一个元素\nprint(lst[1:3])  # 输出子列表 [2, 3]\n# 修改元素\nlst[0] = 10\n# 添加元素\nlst.append(6)\nlst.insert(1, 15)\nlst.extend([7, 8, 9])\n# 删除元素\ndel lst[0]\nlst.pop()\nlst.remove(2)\n# 其他操作\nprint(len(lst))\nprint(3 in lst)\nlst.sort()\nlst.reverse()\nprint(lst.count(3))\nprint(lst.index(5))'],
          resources: [
            'Python列表详解',
            '列表推导式使用指南',
            '列表操作练习题库',
            'Python序列类型教程'
          ]
        },
        {
          id: 'section3-2',
          title: '元组的创建与操作',
          content: '元组与列表类似，但元组是不可变的。\n\n元组的特点：\n1. 有序：元素按照插入顺序排列\n2. 不可变：一旦创建，不能修改\n3. 可重复：可以包含相同的元素\n4. 异构：可以包含不同类型的元素\n5. 轻量：比列表更节省内存\n\n元组操作：\n1. 创建元组：\n   - 直接创建：tup = (1, 2, 3)\n   - 省略括号：tup = 1, 2, 3\n   - 单元素元组：tup = (1,)\n   - 使用tuple()函数：tup = tuple([1, 2, 3])\n\n2. 访问元素：\n   - 索引访问：tup[0]\n   - 负索引：tup[-1]\n   - 切片：tup[1:3]\n\n3. 其他操作：\n   - len()：获取长度\n   - in：检查元素是否存在\n   - count()：统计元素出现次数\n   - index()：查找元素索引\n\n注意：元组不可修改，尝试修改会引发TypeError',
          codeExamples: ['# 创建元组\ntup = (1, 2, 3, 4, 5)\ntup2 = 6, 7, 8\ntup3 = (9,)  # 单元素元组\ntup4 = tuple([10, 11, 12])\n# 访问元素\nprint(tup[0])  # 输出第一个元素\nprint(tup[-1])  # 输出最后一个元素\nprint(tup[1:3])  # 输出子元组 (2, 3)\n# 其他操作\nprint(len(tup))\nprint(3 in tup)\nprint(tup.count(3))\nprint(tup.index(5))\n# 元组不可修改\n# tup[0] = 10  # 会报错 TypeError'],
          resources: [
            'Python元组详解',
            '元组与列表的区别',
            '元组使用场景',
            '元组操作练习题库'
          ]
        },
        {
          id: 'section3-3',
          title: '字典的创建与操作',
          content: '字典是Python中另一个重要的数据结构，用于存储键值对。\n\n字典的特点：\n1. 无序（Python 3.7+有序，按照插入顺序）\n2. 可变：可以修改、添加、删除键值对\n3. 键唯一：每个键只能出现一次\n4. 键不可变：键必须是不可变类型（如字符串、数字、元组）\n\n字典操作：\n1. 创建字典：\n   - 直接创建：dict = {"name": "Python", "version": 3.8}\n   - 使用dict()函数：dict = dict(name="Python", version=3.8)\n   - 字典推导式：dict = {i: i*2 for i in range(5)}\n\n2. 访问元素：\n   - 键访问：dict["name"]\n   - get()方法：dict.get("name")（不存在时返回None）\n\n3. 修改元素：dict["version"] = 3.9\n\n4. 添加元素：dict["author"] = "Guido van Rossum"\n\n5. 删除元素：\n   - del：del dict["version"]\n   - pop()：弹出并返回值\n   - clear()：清空字典\n\n6. 其他操作：\n   - len()：获取长度\n   - keys()：获取所有键\n   - values()：获取所有值\n   - items()：获取所有键值对\n   - in：检查键是否存在',
          codeExamples: ['# 创建字典\ndict = {"name": "Python", "version": 3.8}\ndict2 = dict(name="Python", version=3.8)\ndict3 = {i: i*2 for i in range(5)}\n# 访问元素\nprint(dict["name"])  # 输出值\nprint(dict.get("name"))  # 输出值\nprint(dict.get("nonexistent", "默认值"))  # 不存在时返回默认值\n# 修改元素\ndict["version"] = 3.9\n# 添加元素\ndict["author"] = "Guido van Rossum"\n# 删除元素\ndel dict["version"]\ndict.pop("author")\ndict.clear()\n# 其他操作\nprint(len(dict))\nprint(dict.keys())\nprint(dict.values())\nprint(dict.items())\nprint("name" in dict)'],
          resources: [
            'Python字典详解',
            '字典推导式使用指南',
            '字典操作练习题库',
            'Python映射类型教程'
          ]
        },
        {
          id: 'section3-4',
          title: '集合的创建与操作',
          content: '集合用于存储唯一的元素。\n\n集合的特点：\n1. 无序：元素没有固定顺序\n2. 可变：可以添加、删除元素\n3. 元素唯一：自动去重\n4. 元素不可变：元素必须是不可变类型\n\n集合操作：\n1. 创建集合：\n   - 直接创建：s = {1, 2, 3}\n   - 使用set()函数：s = set([1, 2, 3])\n   - 集合推导式：s = {i for i in range(5)}\n\n2. 添加元素：\n   - add()：添加单个元素\n   - update()：添加多个元素\n\n3. 删除元素：\n   - remove()：删除指定元素（不存在时报错）\n   - discard()：删除指定元素（不存在时不报错）\n   - pop()：弹出任意元素\n   - clear()：清空集合\n\n4. 集合运算：\n   - 交集：s1 & s2 或 s1.intersection(s2)\n   - 并集：s1 | s2 或 s1.union(s2)\n   - 差集：s1 - s2 或 s1.difference(s2)\n   - 对称差集：s1 ^ s2 或 s1.symmetric_difference(s2)\n   - 子集：s1 <= s2 或 s1.issubset(s2)\n   - 超集：s1 >= s2 或 s1.issuperset(s2)',
          codeExamples: ['# 创建集合\ns = {1, 2, 3, 4, 5}\ns2 = set([4, 5, 6, 7])\ns3 = {i for i in range(10) if i % 2 == 0}\n# 添加元素\ns.add(6)\ns.update([7, 8, 9])\n# 删除元素\ns.remove(1)\ns.discard(10)  # 不存在，不会报错\ns.pop()\ns.clear()\n# 集合运算\ns1 = {1, 2, 3}\ns2 = {2, 3, 4}\nprint(s1 & s2)  # 交集 {2, 3}\nprint(s1 | s2)  # 并集 {1, 2, 3, 4}\nprint(s1 - s2)  # 差集 {1}\nprint(s1 ^ s2)  # 对称差集 {1, 4}\nprint(s1 <= s2)  # 子集 False\nprint(s1 >= s2)  # 超集 False'],
          resources: [
            'Python集合详解',
            '集合运算使用指南',
            '集合操作练习题库',
            'Python集合类型教程'
          ]
        },
        {
          id: 'section3-5',
          title: '数据结构的选择与应用',
          content: '根据不同的需求选择合适的数据结构：\n\n1. 列表（List）：\n   - 适用场景：存储有序的、需要修改的元素集合\n   - 优点：灵活，支持多种操作\n   - 缺点：查找速度较慢（线性时间）\n\n2. 元组（Tuple）：\n   - 适用场景：存储有序的、不需要修改的元素集合\n   - 优点：轻量，速度快，可作为字典键\n   - 缺点：不可修改\n\n3. 字典（Dictionary）：\n   - 适用场景：存储键值对数据，需要快速查找\n   - 优点：查找速度快（常数时间）\n   - 缺点：内存消耗较大\n\n4. 集合（Set）：\n   - 适用场景：存储唯一元素，需要去重或集合运算\n   - 优点：自动去重，集合运算高效\n   - 缺点：无序，元素必须不可变\n\n选择数据结构的原则：\n- 根据数据的特性和操作需求选择\n- 考虑时间复杂度和空间复杂度\n- 优先选择最适合当前场景的数据结构',
          codeExamples: ['# 列表应用：存储学生姓名\nstudents = ["Alice", "Bob", "Charlie"]\n# 元组应用：存储坐标点\ncoordinates = (10, 20)\n# 字典应用：存储学生信息\nstudent_info = {"name": "Alice", "age": 20, "grade": "A"}\n# 集合应用：存储唯一的数字\nunique_numbers = {1, 2, 3, 4, 5}\n# 集合应用：去重\nduplicate_list = [1, 2, 2, 3, 3, 3]\nunique_list = list(set(duplicate_list))\nprint(unique_list)  # [1, 2, 3]'],
          resources: [
            'Python数据结构选择指南',
            '数据结构时间复杂度分析',
            '数据结构应用案例',
            '数据结构综合练习题库'
          ]
        }
      ]
    },
    'chapter4': {
      title: '第四章：函数与模块',
      sections: [
        {
          id: 'section4-1',
          title: '函数的定义与调用',
          content: '函数是一段可重用的代码块，用于执行特定的任务。\n\n函数的定义：\n- 使用def关键字定义函数\n- 函数名应具有描述性\n- 括号内是参数列表\n- 冒号后是函数体\n- 函数体需要缩进\n- 可以使用文档字符串（三引号）添加函数说明\n\n函数的调用：\n- 使用函数名加括号调用\n- 括号内传入实际参数\n- 可以将函数调用结果赋值给变量',
          codeExamples: ['def greet(name):\n    """打招呼函数\n    \n    Args:\n        name: 用户名\n    \n    Returns:\n        None\n    """\n    print(f"Hello, {name}!")\n\n# 调用函数\ngreet("Alice")\n\n# 函数调用结果\ndef add(a, b):\n    return a + b\n\nresult = add(3, 5)\nprint(result)  # 输出 8'],
          resources: [
            'Python函数定义指南',
            '函数文档字符串规范',
            '函数调用练习题库',
            'Python函数式编程入门'
          ]
        },
        {
          id: 'section4-2',
          title: '函数参数与返回值',
          content: '函数可以接受参数，并返回值。\n\n参数类型：\n1. 位置参数：按照位置顺序传递的参数\n2. 默认参数：带有默认值的参数\n3. 关键字参数：使用参数名传递的参数\n4. 可变位置参数：*args，接收任意数量的位置参数\n5. 可变关键字参数：**kwargs，接收任意数量的关键字参数\n\n返回值：\n- 使用return语句返回值\n- 可以返回多个值（作为元组）\n- 如果没有return语句，默认返回None',
          codeExamples: ['# 位置参数\ndef add(a, b):\n    return a + b\n\n# 默认参数\ndef add(a, b=10):\n    """加法函数"""\n    return a + b\n\n# 关键字参数\ndef person(name, age):\n    print(f"Name: {name}, Age: {age}")\n\n# 可变位置参数\ndef sum_numbers(*args):\n    return sum(args)\n\n# 可变关键字参数\ndef print_info(**kwargs):\n    for key, value in kwargs.items():\n        print(f"{key}: {value}")\n\n# 调用函数\nprint(add(5))  # 使用默认参数\nprint(add(5, 20))  # 覆盖默认参数\nprint(add(a=5, b=20))  # 使用关键字参数\nperson(name="Alice", age=20)\nprint(sum_numbers(1, 2, 3, 4, 5))\nprint_info(name="Bob", age=21, city="New York")'],
          resources: [
            'Python函数参数详解',
            '默认参数使用指南',
            '可变参数使用技巧',
            '函数参数练习题库'
          ]
        },
        {
          id: 'section4-3',
          title: '函数的作用域',
          content: '变量的作用域是指变量可访问的范围。\n\nPython的作用域包括：\n1. 局部作用域（Local）：函数内部定义的变量\n2. 闭包作用域（Enclosing）：嵌套函数中的外层函数变量\n3. 全局作用域（Global）：模块级别定义的变量\n4. 内置作用域（Built-in）：Python内置函数和变量\n\n作用域规则：\n- 变量查找遵循LEGB原则：Local → Enclosing → Global → Built-in\n- 在函数内部修改全局变量需要使用global关键字\n- 在嵌套函数中修改外层函数变量需要使用nonlocal关键字',
          codeExamples: ['# 全局变量\nx = 10\n\ndef outer():\n    # 闭包作用域变量\n    y = 20\n    \n    def inner():\n        # 局部变量\n        z = 30\n        print(z)  # 访问局部变量\n        print(y)  # 访问闭包作用域变量\n        print(x)  # 访问全局变量\n    \n    inner()\n\nouter()\nprint(x)  # 可以访问全局变量\n# print(y)  # 会报错，无法访问闭包作用域变量\n# print(z)  # 会报错，无法访问局部变量\n\n# 修改全局变量\ndef modify_global():\n    global x\n    x = 100\n\nmodify_global()\nprint(x)  # 输出 100'],
          resources: [
            'Python作用域详解',
            'LEGB原则说明',
            'global和nonlocal关键字',
            '作用域练习题库'
          ]
        },
        {
          id: 'section4-4',
          title: '模块的导入与使用',
          content: '模块是一个包含Python定义和语句的文件。\n\n导入模块的方式：\n1. import module：导入整个模块\n2. from module import function：导入模块中的特定函数\n3. from module import *：导入模块中的所有函数\n4. import module as alias：给模块起别名\n5. from module import function as alias：给函数起别名\n\n模块搜索路径：\n- 当前目录\n- PYTHONPATH环境变量中的目录\n- Python安装目录中的标准库目录\n\n创建自己的模块：\n- 创建一个.py文件\n- 在文件中定义函数、类等\n- 在其他文件中导入使用',
          codeExamples: ['# 导入整个模块\nimport math\nprint(math.pi)\nprint(math.sqrt(16))\n\n# 导入特定函数\nfrom math import sqrt, pi\nprint(pi)\nprint(sqrt(16))\n\n# 导入所有函数\nfrom math import *\nprint(pi)\nprint(sqrt(16))\n\n# 给模块起别名\nimport math as m\nprint(m.pi)\n\n# 给函数起别名\nfrom math import sqrt as square_root\nprint(square_root(16))'],
          resources: [
            'Python模块导入指南',
            '模块搜索路径说明',
            '创建自定义模块',
            '模块导入练习题库'
          ]
        },
        {
          id: 'section4-5',
          title: '标准库的应用',
          content: 'Python标准库提供了许多有用的模块，如：\n\n1. math：数学函数\n   - 常用函数：pi, sqrt(), sin(), cos(), tan(), log()等\n\n2. random：随机数生成\n   - 常用函数：randint(), random(), choice(), shuffle()等\n\n3. datetime：日期和时间处理\n   - 常用类：datetime, date, time, timedelta\n   - 常用方法：now(), strftime(), strptime()等\n\n4. os：操作系统接口\n   - 常用函数：getcwd(), chdir(), mkdir(), remove(), listdir()等\n\n5. sys：系统相关参数和函数\n   - 常用属性：argv, path, version\n   - 常用函数：exit(), getsizeof()等\n\n6. json：JSON数据处理\n   - 常用函数：dumps(), loads(), dump(), load()\n\n7. csv：CSV文件处理\n   - 常用类：reader, writer',
          codeExamples: ['import random\nprint(random.randint(1, 10))  # 生成1-10的随机整数\nprint(random.random())  # 生成0-1的随机浮点数\nprint(random.choice(["apple", "banana", "cherry"]))  # 随机选择元素\n\nimport datetime\nnow = datetime.datetime.now()\nprint(now)  # 当前时间\nprint(now.strftime("%Y-%m-%d %H:%M:%S"))  # 格式化时间\n\nimport os\nprint(os.getcwd())  # 当前工作目录\nos.mkdir("test")  # 创建目录\nprint(os.listdir("."))  # 列出当前目录内容\n\nimport sys\nprint(sys.version)  # Python版本\nprint(sys.argv)  # 命令行参数'],
          resources: [
            'Python标准库详解',
            '常用标准库使用指南',
            '标准库练习题库',
            'Python标准库文档'
          ]
        }
      ]
    },
    'chapter5': {
      title: '第五章：文件操作',
      sections: [
        {
          id: 'section5-1',
          title: '文件的打开与关闭',
          content: '在Python中，使用open()函数打开文件，使用close()方法关闭文件。\n\nopen()函数的参数：\n1. 文件路径：可以是绝对路径或相对路径\n2. 模式：\n   - r：读取模式（默认）\n   - w：写入模式（会覆盖现有文件）\n   - a：追加模式（在文件末尾添加内容）\n   - x：创建模式（创建新文件，已存在则报错）\n   - b：二进制模式\n   - t：文本模式（默认）\n   - +：读写模式\n\n文件对象的方法：\n- close()：关闭文件\n- read()：读取文件内容\n- write()：写入文件内容\n- seek()：移动文件指针\n- tell()：获取文件指针位置\n\n注意：打开文件后一定要关闭，否则会占用系统资源',
          codeExamples: ['# 打开文件\nf = open("example.txt", "w")  # 写入模式\n# 关闭文件\nf.close()\n\n# 打开文件（读写模式）\nf = open("example.txt", "r+")\n# 关闭文件\nf.close()\n\n# 二进制模式\nf = open("image.jpg", "rb")\nf.close()'],
          resources: [
            'Python文件操作指南',
            '文件模式详解',
            '文件操作练习题库',
            'Python文件IO教程'
          ]
        },
        {
          id: 'section5-2',
          title: '文件的读取操作',
          content: '文件读取操作包括：\n1. read()：读取整个文件内容，返回字符串\n   - 可选参数size：指定读取的字节数\n2. readline()：读取一行内容，返回字符串\n   - 每次调用读取一行，移动文件指针\n3. readlines()：读取所有行到列表，返回列表\n   - 每个元素是文件中的一行\n4. 迭代文件对象：直接遍历文件对象，每次返回一行\n   - 内存效率高，适合大文件\n\n读取技巧：\n- 对于小文件，使用read()一次性读取\n- 对于大文件，使用迭代或readline()逐行读取\n- 使用with语句自动关闭文件',
          codeExamples: ['# 读取整个文件\nwith open("example.txt", "r") as f:\n    content = f.read()\n    print(content)\n\n# 读取一行\nwith open("example.txt", "r") as f:\n    line = f.readline()\n    print(line)\n    line = f.readline()  # 读取下一行\n    print(line)\n\n# 读取所有行\nwith open("example.txt", "r") as f:\n    lines = f.readlines()\n    print(lines)\n\n# 迭代文件对象（推荐）\nwith open("example.txt", "r") as f:\n    for line in f:\n        print(line.strip())  # strip()去除换行符'],
          resources: [
            'Python文件读取技巧',
            '大文件处理方法',
            '文件读取练习题库',
            'Python文件IO性能优化'
          ]
        },
        {
          id: 'section5-3',
          title: '文件的写入操作',
          content: '文件写入操作包括：\n1. write()：写入字符串，返回写入的字符数\n   - 不会自动添加换行符\n2. writelines()：写入字符串列表\n   - 不会自动添加换行符，需要在每个字符串后手动添加\n\n写入模式：\n- w：写入模式，会覆盖现有文件\n- a：追加模式，在文件末尾添加内容\n- x：创建模式，创建新文件，已存在则报错\n\n注意：写入操作后需要调用flush()或close()将数据刷新到磁盘',
          codeExamples: ['# 写入字符串\nwith open("example.txt", "w") as f:\n    f.write("Hello, Python!\n")\n    f.write("Welcome to file operations.\n")\n\n# 写入字符串列表\nwith open("example.txt", "w") as f:\n    lines = ["Line 1\n", "Line 2\n", "Line 3\n"]\n    f.writelines(lines)\n\n# 追加内容\nwith open("example.txt", "a") as f:\n    f.write("Appended line.\n")'],
          resources: [
            'Python文件写入指南',
            '文件写入模式详解',
            '文件写入练习题库',
            'Python文件IO最佳实践'
          ]
        },
        {
          id: 'section5-4',
          title: '文件的异常处理',
          content: '文件操作中可能出现的异常：\n- FileNotFoundError：文件不存在\n- PermissionError：权限不足\n- IsADirectoryError：路径是目录\n- IOError：IO操作错误\n\n使用try-except语句处理异常：\n- 捕获特定异常\n- 提供友好的错误提示\n- 确保文件正确关闭\n\n推荐使用with语句：\n- 自动管理文件资源\n- 自动关闭文件，即使发生异常\n- 代码更简洁，可读性更高',
          codeExamples: ['# 使用try-except\ntry:\n    f = open("example.txt", "r")\n    content = f.read()\n    print(content)\nexcept FileNotFoundError:\n    print("文件不存在")\nexcept PermissionError:\n    print("权限不足")\nfinally:\n    if f in locals() and f:\n        f.close()\n\n# 使用with语句（推荐）\ntry:\n    with open("example.txt", "r") as f:\n        content = f.read()\n        print(content)\nexcept FileNotFoundError:\n    print("文件不存在")\nexcept PermissionError:\n    print("权限不足")'],
          resources: [
            'Python异常处理指南',
            'with语句详解',
            '文件异常处理练习题库',
            'Python错误处理最佳实践'
          ]
        },
        {
          id: 'section5-5',
          title: 'CSV文件的读写',
          content: 'CSV（逗号分隔值）是一种常见的文件格式，用于存储表格数据。\n\n使用csv模块读写CSV文件：\n1. csv.reader：读取CSV文件\n   - 返回一个reader对象，可迭代\n   - 每次迭代返回一行数据，作为列表\n2. csv.writer：写入CSV文件\n   - writerow()：写入一行\n   - writerows()：写入多行\n3. csv.DictReader：按字典格式读取\n   - 使用第一行作为字段名\n   - 每次迭代返回一个字典\n4. csv.DictWriter：按字典格式写入\n   - 需要指定字段名\n\nCSV文件的特点：\n- 以逗号分隔值\n- 第一行通常是字段名\n- 支持引号包围包含逗号的值',
          codeExamples: ['import csv\n\n# 写入CSV文件\nwith open("data.csv", "w", newline="") as f:\n    writer = csv.writer(f)\n    writer.writerow(["Name", "Age", "Grade"])\n    writer.writerow(["Alice", 20, "A"])\n    writer.writerow(["Bob", 21, "B"])\n\n# 读取CSV文件\nwith open("data.csv", "r") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)\n\n# 使用DictReader\nwith open("data.csv", "r") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row["Name"], row["Age"], row["Grade"]);\n\n# 使用DictWriter\nwith open("data2.csv", "w", newline="") as f:\n    fieldnames = ["Name", "Age", "Grade"]\n    writer = csv.DictWriter(f, fieldnames=fieldnames)\n    writer.writeheader()\n    writer.writerow({"Name": "Charlie", "Age": 22, "Grade": "C"})\n    writer.writerow({"Name": "David", "Age": 23, "Grade": "B"})'],
          resources: [
            'Python CSV模块详解',
            'CSV文件格式说明',
            'CSV文件处理练习题库',
            'Python数据文件处理指南'
          ]
        }
      ]
    },
    'chapter6': {
      title: '第六章：面向对象编程',
      sections: [
        {
          id: 'section6-1',
          title: '类与对象的概念',
          content: '面向对象编程（OOP）是一种编程范式，使用类和对象来组织代码。\n\n核心概念：\n1. 类（Class）：对象的蓝图或模板，定义了对象的属性和方法\n2. 对象（Object）：类的实例，具有类定义的属性和方法\n3. 属性（Attribute）：对象的特征，如颜色、大小等\n4. 方法（Method）：对象的行为，如说话、移动等\n\n面向对象编程的优点：\n- 代码复用：通过继承实现\n- 模块化：将相关代码组织在一起\n- 可维护性：代码结构清晰\n- 可扩展性：容易添加新功能',
          codeExamples: ['# 定义类\nclass Person:\n    pass\n\n# 创建对象\np = Person()\nprint(type(p))  # 输出 <class \'__main__.Person\'>\n\n# 检查对象是否是类的实例\nprint(isinstance(p, Person))  # 输出 True'],
          resources: [
            'Python面向对象编程入门',
            '类与对象概念详解',
            '面向对象编程练习题库',
            'Python OOP设计原则'
          ]
        },
        {
          id: 'section6-2',
          title: '类的定义与实例化',
          content: '在Python中，使用class关键字定义类。\n\n类的定义：\n- class ClassName:\n- 类名通常使用驼峰命名法\n- 类体包含属性和方法\n\n构造函数：\n- __init__方法是类的构造函数，用于初始化对象\n- 第一个参数是self，指向对象本身\n- 可以接受多个参数\n\n实例化对象：\n- 使用类名加括号创建对象\n- 括号内传入构造函数所需的参数',
          codeExamples: ['class Person:\n    def __init__(self, name, age):\n        self.name = name  # 实例属性\n        self.age = age\n\n# 实例化对象\np = Person("Alice", 20)\nprint(p.name)  # 输出 Alice\nprint(p.age)  # 输出 20\n\n# 创建多个对象\np1 = Person("Bob", 21)\np2 = Person("Charlie", 22)\nprint(p1.name, p2.name)  # 输出 Bob Charlie'],
          resources: [
            'Python类的定义指南',
            '构造函数使用详解',
            '对象实例化练习题库',
            'Python类设计最佳实践'
          ]
        },
        {
          id: 'section6-3',
          title: '类的属性与方法',
          content: '类的属性是对象的特征，类的方法是对象的行为。\n\n属性：\n1. 实例属性：每个对象独有的属性，在__init__方法中定义\n2. 类属性：所有对象共享的属性，在类体中定义\n\n方法：\n1. 实例方法：第一个参数是self，操作实例属性\n2. 类方法：使用@classmethod装饰器，第一个参数是cls\n3. 静态方法：使用@staticmethod装饰器，没有特殊参数\n\n访问控制：\n- 公开属性/方法：直接访问\n- 私有属性/方法：以双下划线开头，只能在类内部访问',
          codeExamples: ['class Person:\n    # 类属性\n    species = "Homo sapiens"\n    \n    def __init__(self, name, age):\n        self.name = name  # 实例属性\n        self.age = age\n        self.__private_attr = "私有属性"  # 私有属性\n    \n    # 实例方法\n    def greet(self):\n        print(f"Hello, my name is {self.name}.")\n    \n    # 类方法\n    @classmethod\n    def get_species(cls):\n        return cls.species\n    \n    # 静态方法\n    @staticmethod\n    def is_adult(age):\n        return age >= 18\n\np = Person("Alice", 20)\np.greet()  # 调用实例方法\nprint(Person.get_species())  # 调用类方法\nprint(Person.is_adult(18))  # 调用静态方法\nprint(Person.species)  # 访问类属性\n# print(p.__private_attr)  # 会报错，无法访问私有属性'],
          resources: [
            'Python类属性与方法详解',
            '实例方法、类方法、静态方法',
            '属性访问控制',
            '类方法练习题库'
          ]
        },
        {
          id: 'section6-4',
          title: '继承与多态',
          content: '继承是一种机制，允许一个类继承另一个类的属性和方法。\n\n继承的概念：\n- 父类（基类）：被继承的类\n- 子类（派生类）：继承父类的类\n- 子类可以重写父类的方法\n- 子类可以扩展父类的功能\n\n多态的概念：\n- 不同类的对象可以响应相同的方法调用\n- 方法的具体实现取决于对象的类型\n- 提高代码的灵活性和可扩展性\n\nPython的继承特点：\n- 支持单继承和多继承\n- 使用super()函数调用父类方法\n- 方法解析顺序（MRO）：解决多继承中的方法调用顺序',
          codeExamples: ['# 父类\nclass Animal:\n    def speak(self):\n        print("动物发出声音")\n    \n    def eat(self):\n        print("动物进食")\n\n# 子类\nclass Dog(Animal):\n    def speak(self):  # 重写父类方法\n        print("Woof!")\n    \n    def fetch(self):  # 扩展父类功能\n        print("狗去取东西")\n\nclass Cat(Animal):\n    def speak(self):  # 重写父类方法\n        print("Meow!")\n\n# 多态\ndef animal_speak(animal):\n    animal.speak()\n\ndog = Dog()\ncat = Cat()\nanimal_speak(dog)  # 输出 Woof!\nanimal_speak(cat)  # 输出 Meow!\n\n# 调用父类方法\ndog.eat()  # 输出 动物进食'],
          resources: [
            'Python继承机制详解',
            '多态的实现与应用',
            '方法解析顺序（MRO）',
            '继承与多态练习题库'
          ]
        },
        {
          id: 'section6-5',
          title: '面向对象编程实践',
          content: '面向对象编程的核心原则：\n1. 封装（Encapsulation）：\n   - 将数据和方法封装在类中\n   - 隐藏内部实现细节\n   - 提供公共接口\n\n2. 继承（Inheritance）：\n   - 通过继承复用代码\n   - 建立类的层次结构\n   - 实现代码的可扩展性\n\n3. 多态（Polymorphism）：\n   - 通过多态实现代码的灵活性\n   - 不同对象响应相同的方法调用\n   - 提高代码的可维护性\n\n4. 抽象（Abstraction）：\n   - 隐藏复杂的实现细节\n   - 关注核心功能\n   - 提高代码的可读性\n\n面向对象设计原则：\n- 单一职责原则：一个类只负责一项职责\n- 开放封闭原则：对扩展开放，对修改封闭\n- 里氏替换原则：子类可以替换父类\n- 依赖倒置原则：依赖抽象，不依赖具体实现\n- 接口隔离原则：使用多个专门的接口，而不是一个统一的接口',
          codeExamples: ['class BankAccount:\n    def __init__(self, balance=0):\n        self.__balance = balance  # 私有属性\n    \n    def deposit(self, amount):\n        """存款"""\n        if amount > 0:\n            self.__balance += amount\n            return True\n        return False\n    \n    def withdraw(self, amount):\n        """取款"""\n        if amount > 0 and amount <= self.__balance:\n            self.__balance -= amount\n            return True\n        print("Insufficient funds")\n        return False\n    \n    def get_balance(self):\n        """获取余额"""\n        return self.__balance\n\n# 使用类\naccount = BankAccount(1000)\naccount.deposit(500)\naccount.withdraw(200)\nprint(account.get_balance())  # 输出 1300\n\n# 继承示例\nclass SavingsAccount(BankAccount):\n    def __init__(self, balance=0, interest_rate=0.01):\n        super().__init__(balance)\n        self.interest_rate = interest_rate\n    \n    def add_interest(self):\n        """添加利息"""\n        interest = self.get_balance() * self.interest_rate\n        self.deposit(interest)\n\nsavings = SavingsAccount(1000, 0.05)\nsavings.add_interest()\nprint(savings.get_balance())  # 输出 1050'],
          resources: [
            '面向对象编程核心原则',
            'SOLID设计原则',
            '面向对象设计模式',
            '面向对象编程练习题库'
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
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 201,
        type: 'multiple' as const,
        question: `Python基础问题 ${i + 201}：下列哪些是Python的基本数据类型？`,
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
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 321,
        type: 'judgment' as const,
        question: `Python基础问题 ${i + 321}：Python的变量需要声明类型。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'Python是动态类型语言，变量不需要声明类型，直接赋值即可。'
      }))
    ],
    'chapter2': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 401,
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
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 601,
        type: 'multiple' as const,
        question: `控制结构问题 ${i + 201}：下列哪些是Python的循环控制语句？`,
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
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 721,
        type: 'judgment' as const,
        question: `控制结构问题 ${i + 321}：Python的for循环只能用于遍历序列。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'Python的for循环可以用于遍历任何可迭代对象，不仅仅是序列。'
      }))
    ],
    'chapter3': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 801,
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
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1001,
        type: 'multiple' as const,
        question: `数据结构问题 ${i + 201}：下列哪些是Python的内置数据结构？`,
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
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1121,
        type: 'judgment' as const,
        question: `数据结构问题 ${i + 321}：Python的字典是有序的。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: 'Python 3.7+中，字典是有序的，按照插入顺序保存键值对。'
      }))
    ],
    'chapter4': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 1201,
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
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1401,
        type: 'multiple' as const,
        question: `函数与模块问题 ${i + 201}：下列哪些是Python函数的参数类型？`,
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
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1521,
        type: 'judgment' as const,
        question: `函数与模块问题 ${i + 321}：Python的模块必须放在单独的文件中。`,
        options: ['正确', '错误'],
        correctAnswer: 1,
        explanation: 'Python的模块通常放在单独的文件中，但也可以在同一文件中定义多个模块。'
      }))
    ],
    'chapter5': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 1601,
        type: 'single' as const,
        question: `文件操作问题 ${i + 1}：Python中打开文件的函数是？`,
        options: [
          'open()',
          'file()',
          'read()',
          'write()'
        ],
        correctAnswer: 0,
        explanation: 'Python中使用open()函数打开文件。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 1801,
        type: 'multiple' as const,
        question: `文件操作问题 ${i + 201}：下列哪些是Python文件打开模式？`,
        options: [
          'r（读取）',
          'w（写入）',
          'a（追加）',
          'b（二进制）'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'Python文件打开模式包括r（读取）、w（写入）、a（追加）、b（二进制）等。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 1921,
        type: 'judgment' as const,
        question: `文件操作问题 ${i + 321}：Python的with语句会自动关闭文件。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: 'Python的with语句会在退出代码块时自动关闭文件，无需手动调用close()方法。'
      }))
    ],
    'chapter6': [
      // 单选题
      ...Array.from({ length: 200 }, (_, i) => ({
        id: i + 2001,
        type: 'single' as const,
        question: `面向对象编程问题 ${i + 1}：Python中定义类的关键字是？`,
        options: [
          'class',
          'def',
          'object',
          'type'
        ],
        correctAnswer: 0,
        explanation: 'Python中使用class关键字定义类。'
      })),
      // 多选题
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 2201,
        type: 'multiple' as const,
        question: `面向对象编程问题 ${i + 201}：下列哪些是面向对象编程的核心原则？`,
        options: [
          '封装',
          '继承',
          '多态',
          '抽象'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: '面向对象编程的核心原则包括封装、继承、多态和抽象。'
      })),
      // 判断题
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 2321,
        type: 'judgment' as const,
        question: `面向对象编程问题 ${i + 321}：Python支持多重继承。`,
        options: ['正确', '错误'],
        correctAnswer: 0,
        explanation: 'Python支持多重继承，一个类可以继承多个父类。'
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
      link: 'https://book.douban.com/subject/27015030/',
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
    },
    {
      id: 9,
      title: 'Python语法精讲',
      type: 'article',
      description: '详细讲解Python的语法规则和最佳实践',
      link: 'https://docs.python.org/zh-cn/3/tutorial/',
      difficulty: 'beginner'
    },
    {
      id: 10,
      title: 'Python数据类型详解',
      type: 'article',
      description: '深入讲解Python的各种数据类型及其使用方法',
      link: 'https://docs.python.org/zh-cn/3/library/stdtypes.html',
      difficulty: 'beginner'
    },
    {
      id: 11,
      title: 'Python函数编程指南',
      type: 'article',
      description: '详细介绍Python函数的定义、参数、返回值等',
      link: 'https://docs.python.org/zh-cn/3/tutorial/controlflow.html#defining-functions',
      difficulty: 'intermediate'
    },
    {
      id: 12,
      title: 'Python面向对象编程详解',
      type: 'article',
      description: '深入讲解Python的面向对象编程特性',
      link: 'https://docs.python.org/zh-cn/3/tutorial/classes.html',
      difficulty: 'intermediate'
    },
    {
      id: 13,
      title: 'Python模块与包',
      type: 'article',
      description: '详细介绍Python模块和包的创建与使用',
      link: 'https://docs.python.org/zh-cn/3/tutorial/modules.html',
      difficulty: 'intermediate'
    },
    {
      id: 14,
      title: 'Python文件操作指南',
      type: 'article',
      description: '详细介绍Python的文件读写操作',
      link: 'https://docs.python.org/zh-cn/3/tutorial/inputoutput.html',
      difficulty: 'intermediate'
    },
    {
      id: 15,
      title: 'Python异常处理',
      type: 'article',
      description: '详细介绍Python的异常处理机制',
      link: 'https://docs.python.org/zh-cn/3/tutorial/errors.html',
      difficulty: 'intermediate'
    },
    {
      id: 16,
      title: 'Python标准库常用模块',
      type: 'article',
      description: '介绍Python标准库中最常用的模块',
      link: 'https://docs.python.org/zh-cn/3/library/',
      difficulty: 'intermediate'
    },
    {
      id: 17,
      title: 'Python数据分析库',
      type: 'article',
      description: '介绍Python中常用的数据分析库，如NumPy、Pandas等',
      link: 'https://pandas.pydata.org/docs/',
      difficulty: 'advanced'
    },
    {
      id: 18,
      title: 'Python网络编程',
      type: 'article',
      description: '介绍Python的网络编程相关模块和技术',
      link: 'https://docs.python.org/zh-cn/3/library/socket.html',
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
          <p className="text-gray-600 max-w-3xl mx-auto">
            本课程旨在培养学生掌握Python编程语言的基础知识，为后续的数据分析学习打下坚实的基础，
            使学生能够使用Python进行简单的数据处理和分析。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-blue-300/50 text-sm text-blue-600">
              高职大二
            </div>
            <div className="px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-blue-300/50 text-sm text-blue-600">
              先修课程：无
            </div>
            <div className="px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-blue-300/50 text-sm text-blue-600">
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
            <p className="text-gray-600 max-w-2xl mx-auto">
              课程内容按照由浅入深的顺序编排，涵盖Python编程的核心知识
            </p>
          </div>
          
          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-500/50 shadow-sm"
              >
                <div 
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection(section.id)}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                  <span className={`text-blue-400 font-medium transition-transform duration-300 ${activeSection === section.id ? 'transform rotate-180' : ''}`}>
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
            <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-6 hover:border-blue-500/50 transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-500 text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">知识目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">掌握Python语言的基本语法和数据类型</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">理解Python的控制结构和数据结构</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">熟悉Python的函数和模块系统</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">了解面向对象编程的基本概念</span>
                </li>
              </ul>
            </div>

            <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-6 hover:border-blue-500/50 transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-cyan-500 text-xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">能力目标</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">能够编写基本的Python程序</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">能够使用Python处理和分析数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">能够使用Python读写文件</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">能够使用Python的标准库</span>
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
          
          <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-8 shadow-sm">
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
                  <p className="text-gray-600">包括编程练习、小项目等</p>
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
                  <p className="text-gray-600">综合编程项目</p>
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
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              学习进度
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'resources'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              学习资源
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'exercises'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              练习测试
            </button>
          </div>
          
          {/* 标签页内容 */}
          <div className="mt-8">
            {activeTab === 'progress' && !activeChapter && (
              <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Python基础课程学习进度</h3>
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
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
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
            {activeTab === 'exercises' && !activeChapter && (
              <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">章节练习测试</h3>
                <p className="text-gray-600 mb-8">选择章节进行测试，每次测试包含30道题目（单选、多选、判断）</p>
                <div className="space-y-4">
                  {progressItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
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
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-50 backdrop-blur-sm border-t border-gray-200 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-gray-700">Python基础课程学习页面</p>
          <p className="text-gray-500 text-sm">© 2026 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}