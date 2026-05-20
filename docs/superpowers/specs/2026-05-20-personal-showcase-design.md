# 个人展示网站 — 设计文档

**日期**: 2026-05-20
**作者**: WANG
**技术栈**: React 18 + Vite + Tailwind CSS + Framer Motion

---

## 1. 概述

高级感动效驱动的个人展示网站，单页滚动结构，5 个版块依次展示。简约大气、大字体排版、大量留白，配合丰富的鼠标交互和滚动动效。

## 2. 全局规范

### 字体规则
- **所有英文**: `Consolas`, `Courier New`, monospace
- **所有中文**: `仿宋`, `FangSong`, `STFangsong`, serif

### 配色
- 主背景: `#f9f9f7`
- 主文字黑: `#0a0a0a`
- 次级文字: `#888`, `#999`
- 面板白底: `#ffffff`
- 反转黑底: `#0a0a0a`
- 卡片边框: `#e5e5e0`, `#e8e8e4`

### 动效引擎
- Framer Motion（声明式 React 动画）

## 3. 版块设计

### 3.1 Hero 首屏

- **布局**: 全屏高度，两行水平居中
- **内容**:
  - 第一行: `Hello, I'm WANG` — Consolas bold, Hello 96px / WANG 108px，同行
  - 第二行: `AI Agent Engineer | 21岁 | 河南新乡` — Consolas 22px
- **交互效果**:
  - **中文揭示**: 60px 半径可见圆环跟随鼠标，圈内显示中文「你好，我是 王」/「AI Agent 工程师 | 21岁 | 河南新乡」，圈外显示英文。中文层 z=25（上层），深色背景 `#121212` 遮住英文，白色仿宋中文
  - **颜色反转圆**: z=20 层，白色圆 `mix-blend-mode: difference`，影响英文层和背景，不影响中文层
  - **3D 面向鼠标**: 以 Hero 中心为轴，`rotateX/Y` max ±15°，文字面向鼠标
  - **视差位移**: 第一行 20px，第二行 10px
- **入场动画**: 5 层 stagger 淡入（标签→标题→分隔线→描述→CTA）

### 3.2 Professional Skills

- **标题**: `Professional Skills` — Consolas 51px bold 居中 + 分隔线
- **布局**: 上 2 下 3，5 张翻转卡片水平分布
  - 上行: AI & Agent, Frontend
  - 下行: Backend, DevOps, Database
  - 面板 210×280px，间距 60px
- **3D 翻转**: 触碰卡片 → `rotateY(180deg)` 0.6s cubic-bezier
  - 正面白底: 分类名 21px bold + 技能标签 15px Consolas
  - 背面黑底: 分类名 18px bold (白) + 能力描述 16px 仿宋 (灰) + 年限/项目数 13px
- **滚动动画**: 卡片 stagger 依次淡入

### 3.3 Projects

- **标题**: `Projects` — Consolas 51px bold 居中 + 分隔线
- **布局**: 单列，4 张项目卡片，间距 28px
- **内容**: 项目名 24px Consolas bold + 描述 16px 仿宋 + 技术标签 12px Consolas
- **3D 背向倾斜**: 以每张卡片自身中心为轴，文字背向远离鼠标（与 Hero 方向相反），max ±10°
- **动画**: 滚动淡入 + hover 上浮 4px 阴影

### 3.4 Career

- **标题**: `Career` — Consolas 51px bold 居中 + 分隔线
- **布局**: 垂直时间线，左侧 1px 竖线 + 9px 圆点节点
- **内容**: 日期 13px Consolas + 职位 21px Consolas bold + 公司/描述 仿宋
- **动画**: 滚动入视口节点依次点亮，hover 右移 4px

### 3.5 Contact

- **标题**: `Contact` — Consolas 51px bold 居中 + 分隔线
- **引导语**: 仿宋 18px 居中
- **布局**: 3 个联系方式水平排列，间距 48px
  - Email / GitHub / WeChat
  - 圆形 SVG 图标 48×48px，hover 黑底白图反转
- **底部**: `© 2026 WANG · 河南新乡` Consolas 11px

## 4. 全局交互组件

### 自定义光标
- 隐藏默认光标，圆点跟随鼠标
- hover 可交互元素时放大/变形

### 顶部导航
- 固定顶部，透明背景 → 滚动后毛玻璃效果
- 版块名高亮当前滚动位置
- 点击平滑滚动到对应版块

### 滚动进度条
- 顶部细线，随滚动进度填充

## 5. 技术架构

```
src/
├── App.tsx
├── main.tsx
├── index.css              # Tailwind + 全局样式 + 字体
├── components/
│   ├── CustomCursor.tsx    # 自定义光标
│   ├── ScrollProgress.tsx  # 顶部进度条
│   └── Navigation.tsx      # 固定导航
├── sections/
│   ├── Hero.tsx            # 核心动效：鼠标视差 + 3D + 中文揭示
│   ├── About.tsx           # 5 面板 3D 翻转
│   ├── Projects.tsx        # 单列卡片 3D 背向倾斜
│   ├── Career.tsx          # 时间线
│   └── Contact.tsx         # 联系方式
└── hooks/
    └── useScrollSpy.ts     # 滚动监听
```

## 6. 动效清单

| 动效 | 实现 | 位置 |
|------|------|------|
| 鼠标视差 | `useMotionValue` + `useTransform` | Hero |
| 3D 面向倾斜 | `rotateX/Y` ±15° | Hero |
| 颜色反转圆 | `mix-blend-mode: difference` | Hero |
| 中文 clip-path 揭示 | `clip-path: circle()` | Hero |
| 3D 卡片翻转 | `rotateY(180deg)` CSS 3D | About |
| 3D 背向倾斜 | `rotateX/Y` ±10° 取反 | Projects |
| 滚动入场 | Framer Motion `whileInView` | 所有版块 |
| 自定义光标 | `useMotionValue` | 全局 |
| 滚动进度 | `useScroll` | 全局 |
| 导航高亮 | Intersection Observer | 全局 |
