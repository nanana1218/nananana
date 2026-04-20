import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 设置随机种子，保证结果可复现
np.random.seed(42)

# ====================== 1. 项目1：数据预处理高阶版（user_behavior.csv） ======================
print("正在生成 user_behavior 数据...")
n_users = 1000
user_ids = [f"U{str(i).zfill(4)}" for i in range(1, n_users+1)]

# 生成基础数据
df_user = pd.DataFrame({
    "用户ID": user_ids,
    "消费金额": np.random.lognormal(mean=5, sigma=1.2, size=n_users).round(2),  # 对数正态分布，符合真实消费
    "消费频次": np.random.poisson(lam=5, size=n_users),  # 泊松分布，符合购买频次
    "最近消费天数": np.random.randint(1, 366, size=n_users),
    "性别": np.random.choice(["男", "女", np.nan], size=n_users, p=[0.48, 0.47, 0.05]),
    # 修复：地区概率总和改为1
    "地区": np.random.choice(["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉", np.nan], size=n_users, p=[0.15, 0.15, 0.12, 0.12, 0.1, 0.1, 0.1, 0.16]),
    "注册时间": pd.date_range(start="2023-01-01", end="2025-04-16", periods=n_users),
    "浏览时长": np.random.exponential(scale=10, size=n_users).round(1)  # 指数分布，符合浏览时长
})

# 人为加入脏数据
# 缺失值
df_user.loc[np.random.choice(n_users, size=30), "消费金额"] = np.nan
df_user.loc[np.random.choice(n_users, size=20), "消费频次"] = np.nan
df_user.loc[np.random.choice(n_users, size=15), "注册时间"] = np.nan

# 异常值
df_user.loc[np.random.choice(n_users, size=10), "消费金额"] = np.random.uniform(10000, 50000, size=10).round(2)
df_user.loc[np.random.choice(n_users, size=8), "浏览时长"] = np.random.uniform(100, 500, size=8).round(1)

# 重复值
df_duplicates = df_user.sample(n=5, random_state=42)
df_user = pd.concat([df_user, df_duplicates], ignore_index=True)

# ====================== 2. 项目3：购物车关联规则挖掘（cart_data.csv） ======================
print("正在生成 cart_data 数据...")
n_orders = 2000
order_ids = [f"ORD{str(i).zfill(6)}" for i in range(1, n_orders+1)]

# 商品列表（包含常见关联组合）
products = [
    "手机", "耳机", "充电器", "手机壳", "钢化膜",
    "笔记本电脑", "鼠标", "键盘", "电脑包", "散热器",
    "牛奶", "面包", "鸡蛋", "黄油", "奶酪",
    "洗发水", "护发素", "沐浴露", "牙膏", "牙刷",
    "T恤", "牛仔裤", "运动鞋", "袜子", "帽子"
]

# 生成购物车数据（每个订单1-5个商品）
cart_data = []
for order_id in order_ids:
    # 加入强关联组合
    if np.random.random() < 0.3:
        if np.random.random() < 0.5:
            items = np.random.choice(["手机", "耳机", "充电器", "手机壳", "钢化膜"], size=np.random.randint(2, 4), replace=False)
        else:
            items = np.random.choice(["牛奶", "面包", "鸡蛋", "黄油"], size=np.random.randint(2, 4), replace=False)
    else:
        items = np.random.choice(products, size=np.random.randint(1, 6), replace=False)
    
    for item in items:
        cart_data.append({"订单ID": order_id, "商品名称": item})

df_cart = pd.DataFrame(cart_data)

# ====================== 3. 项目4：KMeans聚类分析实战（goods_data.csv） ======================
print("正在生成 goods_data 数据...")
n_goods = 500
goods_ids = [f"G{str(i).zfill(4)}" for i in range(1, n_goods+1)]

df_goods = pd.DataFrame({
    "商品ID": goods_ids,
    "销量": np.random.poisson(lam=100, size=n_goods),
    "客单价": np.random.lognormal(mean=4, sigma=1, size=n_goods).round(2),
    "好评率": np.random.uniform(0.7, 0.99, size=n_goods).round(2),
    "库存": np.random.randint(10, 1000, size=n_goods)
})

# 加入异常值
df_goods.loc[np.random.choice(n_goods, size=5), "销量"] = np.random.randint(1000, 5000, size=5)
df_goods.loc[np.random.choice(n_goods, size=3), "好评率"] = 0.999

# ====================== 4. 项目5：RFM模型用户分层（user_rfm.csv） ======================
print("正在生成 user_rfm 数据...")
# 从user_behavior中提取RFM数据（保证数据一致性）
df_rfm = df_user[["用户ID", "最近消费天数", "消费频次", "消费金额"]].dropna().copy()
df_rfm.columns = ["用户ID", "最近消费天数", "消费频次", "消费金额"]

# ====================== 5. 项目6&7：线性回归+随机森林（sales_data.csv） ======================
print("正在生成 sales_data 数据...")
# 修复：先定义日期序列，再动态获取长度，适配闰年366天
dates = pd.date_range(start="2024-01-01", end="2024-12-31", freq="D")
n_days = len(dates)  # 自动获取日期实际长度，避免硬编码错误

# 生成有真实相关性的数据
np.random.seed(42)
advertising = np.random.uniform(100, 1000, size=n_days).round(2)  # 广告费
activities = np.random.randint(0, 5, size=n_days)  # 活动次数
price = np.random.uniform(50, 150, size=n_days).round(2)  # 客单价
competitor_price = np.random.uniform(40, 160, size=n_days).round(2)  # 竞品价格

# 销量与广告费正相关，与活动次数正相关，与客单价负相关，与竞品价格正相关
sales = (
    100 
    + 0.5 * advertising 
    + 20 * activities 
    - 0.8 * price 
    + 0.3 * competitor_price 
    + np.random.normal(0, 50, size=n_days)
).round(0).astype(int)
sales = np.maximum(sales, 0)  # 确保销量非负

df_sales = pd.DataFrame({
    "日期": dates,
    "销量": sales,
    "广告费": advertising,
    "活动次数": activities,
    "客单价": price,
    "竞品价格": competitor_price
})

# ====================== 6. 项目8：时间序列完整分析（time_series_sales.csv） ======================
print("正在生成 time_series_sales 数据...")
# 生成包含趋势、季节性和噪声的时间序列数据
dates_daily = pd.date_range(start="2023-01-01", end="2024-12-31", freq="D")
n_daily = len(dates_daily)

# 趋势：逐年上升
trend = np.linspace(200, 500, n_daily)
# 季节性：年度周期（6月和11月销量高）
seasonal = 100 * np.sin(2 * np.pi * (dates_daily.dayofyear / 365)) + 50 * np.sin(2 * np.pi * (dates_daily.dayofyear / 30))
# 特殊事件：双11、618
holiday = np.zeros(n_daily)
holiday[(dates_daily.month == 6) & (dates_daily.day >= 18) & (dates_daily.day <= 20)] = 200
holiday[(dates_daily.month == 11) & (dates_daily.day >= 10) & (dates_daily.day <= 12)] = 300
# 噪声
noise = np.random.normal(0, 30, n_daily)

ts_sales = trend + seasonal + holiday + noise
ts_sales = np.maximum(ts_sales, 0).round(0).astype(int)

df_ts = pd.DataFrame({
    "日期": dates_daily,
    "销量": ts_sales
})

# ====================== 7. 项目9：综合异常检测（order_data.csv） ======================
print("正在生成 order_data 数据...")
n_orders = 5000
order_ids = [f"ORD{str(i).zfill(6)}" for i in range(1, n_orders+1)]
user_ids_order = np.random.choice(user_ids, size=n_orders)
order_dates = pd.date_range(start="2024-01-01", end="2024-12-31", periods=n_orders)

df_order = pd.DataFrame({
    "订单ID": order_ids,
    "用户ID": user_ids_order,
    "订单金额": np.random.lognormal(mean=4, sigma=1, size=n_orders).round(2),
    "下单时间": order_dates,
    "支付状态": np.random.choice(["已支付", "未支付", "已取消"], size=n_orders, p=[0.8, 0.15, 0.05]),
    "收货地址": np.random.choice(["北京市朝阳区", "上海市浦东新区", "广州市天河区", "深圳市南山区", "杭州市西湖区"], size=n_orders)
})

# 计算下单频次和支付时长
user_order_counts = df_order["用户ID"].value_counts().reset_index()
user_order_counts.columns = ["用户ID", "下单频次"]
df_order = df_order.merge(user_order_counts, on="用户ID", how="left")

# 支付时长（小时）
df_order["支付时长"] = np.random.exponential(scale=2, size=n_orders).round(1)
df_order.loc[df_order["支付状态"] != "已支付", "支付时长"] = np.nan

# 加入异常订单
# 高金额异常
df_order.loc[np.random.choice(n_orders, size=20), "订单金额"] = np.random.uniform(10000, 100000, size=20).round(2)
# 高频下单异常
df_order.loc[np.random.choice(n_orders, size=15), "下单频次"] = np.random.randint(50, 200, size=15)
# 未支付高金额异常
df_order.loc[(df_order["订单金额"] > 10000) & (df_order["支付状态"] == "未支付"), "支付状态"] = "未支付"

print("\n✅ 所有数据集生成完成！（沙盒环境不支持本地文件保存，仅生成内存中的DataFrame）")
