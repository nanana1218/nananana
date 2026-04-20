import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  coreKnowledge: string[];
  businessScenario: string;
  tasks: string[];
  pitfalls: string[];
  deliverables: string[];
  codeExample: string;
  questions: Question[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  icon: string;
  color: string;
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
    duration: '2小时',
    icon: '🧹',
    color: 'from-blue-500 to-cyan-400',
    codeExample: `import pandas as pd
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
      }
    ]
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
    duration: '2小时',
    icon: '📊',
    color: 'from-purple-500 to-pink-400',
    codeExample: `import pandas as pd
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
      }
    ]
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
    duration: '2.5小时',
    icon: '🛒',
    color: 'from-green-500 to-emerald-400',
    codeExample: `import pandas as pd
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
      }
    ]
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
    duration: '3小时',
    icon: '🔍',
    color: 'from-orange-500 to-amber-400',
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
      }
    ]
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
    duration: '2.5小时',
    icon: '👥',
    color: 'from-red-500 to-rose-400',
    codeExample: `import pandas as pd
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
      }
    ]
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
    duration: '3小时',
    icon: '📈',
    color: 'from-indigo-500 to-violet-400',
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
      }
    ]
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
    duration: '3小时',
    icon: '🌲',
    color: 'from-teal-500 to-cyan-400',
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
      }
    ]
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
    duration: '3小时',
    icon: '⏰',
    color: 'from-yellow-500 to-orange-400',
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
      }
    ]
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
    duration: '2.5小时',
    icon: '🚨',
    color: 'from-rose-500 to-pink-400',
    codeExample: `import pandas as pd
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
      }
    ]
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
    duration: '5小时',
    icon: '🏆',
    color: 'from-emerald-500 to-green-400',
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
      }
    ]
  }
];

export default function DataAnalysisCourse() {
  const [learningState, setLearningState] = useState<LearningState>({
    currentProject: null,
    currentPhase: null,
    projectProgress: {}
  });
  
  const [testAnswers, setTestAnswers] = useState<Record<number, number | number[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const selectProject = (projectId: number) => {
    setLearningState(prev => ({
      ...prev,
      currentProject: projectId,
      currentPhase: 'learn'
    }));
    setTestAnswers({});
    setShowResults(false);
  };

  const goToPhase = (phase: 'learn' | 'practice' | 'test') => {
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
    project.questions.forEach(q => {
      const userAnswer = testAnswers[q.id];
      if (userAnswer !== undefined) {
        if (q.type === 'multiple' && Array.isArray(q.correctAnswer) && Array.isArray(userAnswer)) {
          if (userAnswer.length === q.correctAnswer.length && 
              userAnswer.every(a => q.correctAnswer.includes(a))) {
            correctCount++;
          }
        } else if (userAnswer === q.correctAnswer) {
          correctCount++;
        }
      }
    });

    const score = Math.round((correctCount / project.questions.length) * 100);
    
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-500 filter blur-[150px] opacity-10 pointer-events-none"
        style={{
          left: `${mousePosition.x - 250}px`,
          top: `${mousePosition.y - 250}px`,
          transition: 'left 0.2s ease, top 0.2s ease'
        }}
      ></div>

      {/* 页面头部 */}
      <header className="relative py-12 px-4 border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto">
          {!currentProject ? (
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
                  <span className="text-3xl">📊</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                Python数据分析全栈实战
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                十个独立项目，从入门到精通，边练边学，形成完整的学习闭环
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {['学习 → 实操 → 测试', '闭环学习', '可运行代码', '真实数据集'].map((tag, i) => (
                  <span key={i} className="px-4 py-1.5 bg-gray-800/70 backdrop-blur-sm rounded-full border border-blue-700/30 text-sm text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <button
                onClick={resetToProjectList}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all"
              >
                <span>←</span>
                <span>返回项目列表</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentProject.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {currentProject.title}
                  </h1>
                  <p className="text-sm text-gray-400">项目 {currentProject.id} / 10 · {currentProject.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${currentProject.difficulty === 'beginner' ? 'bg-green-500' : currentProject.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                <span className="text-sm text-gray-400">
                  {currentProject.difficulty === 'beginner' ? '入门' : currentProject.difficulty === 'intermediate' ? '进阶' : '高级'}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => {
                    const progress = learningState.projectProgress[project.id];
                    const isCompleted = progress?.learnCompleted && progress?.practiceCompleted && progress?.testScore !== null;
                    
                    return (
                      <motion.div
                        key={project.id}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border ${isCompleted ? 'border-green-500/50' : 'border-gray-700'} overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow