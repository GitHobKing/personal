# 个人展示网站 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个动效驱动的单页个人展示网站，5 个版块滚动导航，空气感动态风格。

**Architecture:** React 18 + Vite + TypeScript，Tailwind CSS 处理样式，Framer Motion 驱动所有动效。单页面应用，5 个 section 组件纵向排列，全局自定义光标、滚动进度条和固定导航。

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS 3, Framer Motion 11, Vitest

---

### Task 1: 项目脚手架与依赖安装

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `postcss.config.js`, `tailwind.config.ts`
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`

- [ ] **Step 1: 使用 Vite 创建 React + TypeScript 项目**

```bash
cd F:/Codes/personal
npm create vite@latest . -- --template react-ts
```

- [ ] **Step 2: 安装依赖**

```bash
npm install
npm install tailwindcss@3 postcss autoprefixer framer-motion
npm install -D @types/react @types/react-dom vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: 初始化 Tailwind CSS**

```bash
npx tailwindcss init -p
```

- [ ] **Step 4: 配置 `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Consolas', 'Courier New', 'monospace'],
        fangsong: ['FangSong', '仿宋', 'STFangsong', 'serif'],
      },
      colors: {
        bg: '#f9f9f7',
        'text-primary': '#0a0a0a',
        'text-secondary': '#888',
        'text-muted': '#999',
        'card-white': '#ffffff',
        'card-dark': '#0a0a0a',
        'card-border': '#e5e5e0',
        'border-light': '#e8e8e4',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 5: 写入 `src/index.css` — 全局样式与字体**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  cursor: none;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #f9f9f7;
  color: #0a0a0a;
  font-family: 'Consolas', 'Courier New', monospace;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}
```

- [ ] **Step 6: 写入 `src/main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 7: 写入最小 `src/App.tsx`**

```tsx
function App() {
  return (
    <main className="min-h-screen">
      <h1 className="font-mono text-4xl">Hello</h1>
    </main>
  )
}

export default App
```

- [ ] **Step 8: 验证项目启动**

```bash
npm run dev
```
确认 http://localhost:5173 显示 "Hello"，背景为 `#f9f9f7`。

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: scaffold Vite + React + TS + Tailwind + Framer Motion"
```

---

### Task 2: CustomCursor 组件

**Files:**
- Create: `src/components/CustomCursor.tsx`

- [ ] **Step 1: 写入 `src/components/CustomCursor.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const over = () => setIsHovering(true)
    const out = () => setIsHovering(false)

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })
    return () => {
      window.removeEventListener('mousemove', move)
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', over)
        el.removeEventListener('mouseleave', out)
      })
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-text-primary/30 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: isHovering ? 32 : 12,
        height: isHovering ? 32 : 12,
        background: isHovering ? 'transparent' : '#fff',
      }}
      transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
    />
  )
}
```

- [ ] **Step 2: 在 App.tsx 中引入 CustomCursor**

```tsx
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <h1 className="font-mono text-4xl">Hello</h1>
    </main>
  )
}
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```
确认鼠标在浏览器中显示为白色圆点跟随移动，hover 链接时放大。

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add CustomCursor component with spring physics"
```

---

### Task 3: ScrollProgress 组件

**Files:**
- Create: `src/components/ScrollProgress.tsx`

- [ ] **Step 1: 写入 `src/components/ScrollProgress.tsx`**

```tsx
import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-text-primary origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

- [ ] **Step 2: 在 App.tsx 中加入 `<ScrollProgress />`**

```tsx
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

function App() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <h1 className="font-mono text-4xl">Hello</h1>
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add ScrollProgress bar"
```

---

### Task 4: useScrollSpy Hook 与 Navigation 组件

**Files:**
- Create: `src/hooks/useScrollSpy.ts`
- Create: `src/components/Navigation.tsx`

- [ ] **Step 1: 写入 `src/hooks/useScrollSpy.ts`**

```ts
import { useState, useEffect } from 'react'

const SECTION_IDS = ['hero', 'about', 'projects', 'career', 'contact']

export function useScrollSpy() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return { active, scrollTo, sections: SECTION_IDS }
}
```

- [ ] **Step 2: 写入 `src/components/Navigation.tsx`**

```tsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollSpy } from '../hooks/useScrollSpy'

const LABELS: Record<string, string> = {
  hero: 'Home',
  about: 'Skills',
  projects: 'Projects',
  career: 'Career',
  contact: 'Contact',
}

export default function Navigation() {
  const { active, scrollTo, sections } = useScrollSpy()
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 300], [0, 0.85])
  const borderOpacity = useTransform(scrollY, [0, 300], [0, 0.05])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 flex justify-center gap-8 py-4 backdrop-blur-sm"
      style={{ background: `rgba(249,249,247,${bgOpacity.get()})`, borderBottom: `1px solid rgba(0,0,0,${borderOpacity.get()})` }}
    >
      {sections.map(id => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="font-mono text-xs tracking-widest uppercase transition-colors duration-300"
          style={{ color: active === id ? '#0a0a0a' : '#bbb' }}
        >
          {LABELS[id]}
        </button>
      ))}
    </motion.nav>
  )
}
```

- [ ] **Step 3: 在 App.tsx 中加入 Navigation**

```tsx
import Navigation from './components/Navigation'
// ...加入 <Navigation /> 在 CustomCursor 之后
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Navigation with scroll spy hook"
```

---

### Task 5: Hero 版块

**Files:**
- Create: `src/sections/Hero.tsx`

Hero 版块是最复杂的部分，包含四个叠加效果：
1. 颜色反转圆（CSS `mix-blend-mode: difference`）
2. 中文 clip-path 揭示圆
3. 3D 面向鼠标倾斜
4. 视差位移

- [ ] **Step 1: 写入 `src/sections/Hero.tsx`**

```tsx
import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const RADIUS = 60
const DIAMETER = RADIUS * 2

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: -999, y: -999 })
  const [isInside, setIsInside] = useState(false)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMouse({ x, y })

      const cx = rect.width / 2
      const cy = rect.height / 2
      const dx = (x - cx) / cx
      const dy = (y - cy) / cy
      tiltX.set(-dy * 15)
      tiltY.set(dx * 15)
    }

    const handleEnter = () => setIsInside(true)
    const handleLeave = () => {
      setIsInside(false)
      tiltX.set(0)
      tiltY.set(0)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [tiltX, tiltY])

  const clipPath = isInside
    ? `circle(${RADIUS}px at ${mouse.x}px ${mouse.y}px)`
    : 'circle(0px at -999px -999px)'

  const invertStyle: React.CSSProperties = isInside
    ? {
        left: mouse.x,
        top: mouse.y,
        width: DIAMETER,
        height: DIAMETER,
      }
    : { left: -999, top: -999, width: DIAMETER, height: DIAMETER }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
    >
      {/* 颜色反转圆 - z=20 */}
      <div
        className="absolute rounded-full bg-white pointer-events-none z-20"
        style={{
          ...invertStyle,
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 中文揭示层 - z=25，深色背景遮盖英文 */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-25 pointer-events-none"
        style={{
          clipPath,
          background: '#121212',
        }}
      >
        <div className="font-fangsong text-[96px] font-semibold text-white tracking-wide leading-none mb-9 whitespace-nowrap">
          你好，我是 王
        </div>
        <div className="font-fangsong text-[22px] text-[#bbb] tracking-[3px] whitespace-nowrap">
          AI Agent 工程师 &nbsp;|&nbsp; 21岁 &nbsp;|&nbsp; 河南新乡
        </div>
      </div>

      {/* 英文内容层 - z=1，3D 倾斜 */}
      <motion.div
        className="relative z-10 text-center px-[6vw] pointer-events-none"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
          perspective: 600,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-9"
        >
          <span className="font-mono text-[clamp(56px,11vw,96px)] font-bold text-text-primary tracking-[-1.5px] leading-none">
            Hello, I'm&nbsp;
          </span>
          <span className="font-mono text-[clamp(64px,12vw,108px)] font-bold text-text-primary tracking-[-1.5px] leading-none">
            WANG
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-[clamp(16px,2.5vw,22px)] text-text-muted tracking-[2px]"
        >
          AI Agent Engineer &nbsp;|&nbsp; 21岁 &nbsp;|&nbsp; 河南新乡
        </motion.div>
      </motion.div>

      {/* 滚动提示 */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-0">
        <span className="font-mono text-[11px] text-[#bbb] tracking-[1px]">scroll</span>
        <div className="w-px h-7 bg-gradient-to-b from-[#ccc] to-transparent" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 在 App.tsx 中引入 Hero**

```tsx
import Hero from './sections/Hero'

function App() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```
确认 Hero 全屏显示，鼠标移动时出现反转圆 + 中文揭示 + 3D 倾斜。

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Hero section with color inversion, Chinese reveal, and 3D tilt"
```

---

### Task 6: About (Professional Skills) 版块

**Files:**
- Create: `src/sections/About.tsx`

- [ ] **Step 1: 写入 `src/sections/About.tsx`**

```tsx
import { motion } from 'framer-motion'
import { useRef } from 'react'

interface SkillData {
  label: string
  front: string[]
  back: string[]
  meta: string
}

const skills: SkillData[] = [
  {
    label: 'AI & Agent',
    front: ['AI Agent', 'LangChain', 'RAG', 'Coze', 'Dify', 'Prompt Eng.'],
    back: ['自主搭建 Agent 工作流', '多 Agent 协作编排', '知识库 + RAG 检索', 'LLM 微调与部署', 'Prompt 工程优化'],
    meta: '2+ 年 · 8 个项目',
  },
  {
    label: 'Frontend',
    front: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vue 3'],
    back: ['组件库设计与封装', 'SSR / SSG 性能优化', '动效与交互设计', '响应式跨端适配', '前端工程化构建'],
    meta: '4+ 年 · 20+ 项目',
  },
  {
    label: 'Backend',
    front: ['Node.js', 'Python', 'Go', 'FastAPI', 'Express'],
    back: ['RESTful API 设计', '微服务架构', '高并发与异步处理', '数据库建模优化', '接口文档自动化'],
    meta: '4+ 年 · 15+ 项目',
  },
  {
    label: 'DevOps',
    front: ['Docker', 'Kubernetes', 'Linux', 'CI/CD', 'Git', 'GitHub Actions'],
    back: ['容器化与编排部署', '自动化 CI/CD 流水线', '服务监控与告警', '日志收集与分析', '云原生架构实践'],
    meta: '3+ 年 · 10+ 项目',
  },
  {
    label: 'Database',
    front: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL', 'Elasticsearch'],
    back: ['复杂查询与索引优化', '缓存策略设计', '数据分片与主从', '全文检索方案', '数据备份与恢复'],
    meta: '4+ 年 · 12+ 项目',
  },
]

function FlipCard({ skill, index }: { skill: SkillData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group perspective-[800px] cursor-pointer"
      style={{ width: 210, height: 280 }}
    >
      <div className="relative w-full h-full transition-transform duration-[0.6s] ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* 正面 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card-white border border-card-border rounded-md p-5 [backface-visibility:hidden]">
          <div className="font-mono text-[21px] font-bold text-text-primary tracking-[1px] mb-4 pb-3.5 border-b border-[#eee] w-full text-center">
            {skill.label}
          </div>
          {skill.front.map(s => (
            <span key={s} className="font-mono text-[15px] text-[#777] leading-[2.4] block">
              {s}
            </span>
          ))}
        </div>
        {/* 背面 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card-dark rounded-md p-5 [backface-visibility:hidden] [transform:rotateY(180deg)] text-center">
          <div className="font-mono text-[18px] font-bold text-white tracking-[1px] mb-[18px]">
            {skill.label}
          </div>
          {skill.back.map(s => (
            <span key={s} className="font-fangsong text-[16px] text-[#bbb] leading-[2.2] block">
              {s}
            </span>
          ))}
          <span className="font-mono text-[13px] text-[#666] mt-2.5">{skill.meta}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center bg-bg py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-mono text-[51px] font-bold text-text-primary tracking-[-1px]">
          Professional Skills
        </h2>
        <div className="w-10 h-px bg-[#ccc] mx-auto mt-[18px]" />
      </motion.div>

      {/* 上行 2 个 */}
      <div className="flex justify-center gap-[60px] mb-[60px]">
        {skills.slice(0, 2).map((s, i) => (
          <FlipCard key={s.label} skill={s} index={i} />
        ))}
      </div>
      {/* 下行 3 个 */}
      <div className="flex justify-center gap-[60px]">
        {skills.slice(2, 5).map((s, i) => (
          <FlipCard key={s.label} skill={s} index={i + 2} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 在 App.tsx 中引入 About**

```tsx
import About from './sections/About'
// 在 <Hero /> 之后加入 <About />
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```
确认 Skills 版块显示上 2 下 3 翻转卡片，hover 翻转至背面。

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add About section with 3D flip cards"
```

---

### Task 7: Projects 版块

**Files:**
- Create: `src/sections/Projects.tsx`

- [ ] **Step 1: 写入 `src/sections/Projects.tsx`**

```tsx
import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Project {
  name: string
  desc: string
  tags: string[]
}

const projects: Project[] = [
  {
    name: 'AgentFlow',
    desc: '企业级 AI Agent 编排平台，支持多 Agent 协作、工作流可视化配置与实时监控。已落地 3 家企业客户，日均处理 10 万+ 任务。',
    tags: ['React', 'Python', 'LangChain', 'Docker', 'PostgreSQL'],
  },
  {
    name: 'DevOpsBot',
    desc: '智能化 CI/CD 运维助手，集成 GitHub Actions 与 Kubernetes，实现自动化部署、回滚与异常告警。',
    tags: ['Go', 'Kubernetes', 'GitHub Actions', 'Redis', 'Linux'],
  },
  {
    name: 'RAG-KB',
    desc: '基于 RAG 的企业知识库系统，支持多源文档解析、向量检索与智能问答，检索准确率 95%+。',
    tags: ['Next.js', 'FastAPI', 'Elasticsearch', 'LLM', 'MongoDB'],
  },
  {
    name: 'AutoTestX',
    desc: '自动化测试框架，支持 API / E2E / 性能测试，提供可视化报告与 CI 无缝集成。',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'CI/CD'],
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    card.style.transform = `rotateY(${-dx * 10}deg) rotateX(${dy * 10}deg)`
  }, [])

  const handleLeave = useCallback(() => {
    const card = cardRef.current
    if (card) card.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="[perspective:600px]"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="bg-card-white border border-card-border rounded-md p-8 cursor-pointer transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.12s ease-out, box-shadow 0.3s' }}
      >
        <h3 className="font-mono text-2xl font-bold text-text-primary tracking-[-0.5px] mb-2.5">
          {project.name}
        </h3>
        <p className="font-fangsong text-base text-text-secondary leading-relaxed mb-4">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-xs text-text-muted px-3 py-1 border border-card-border rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center bg-bg py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-mono text-[51px] font-bold text-text-primary tracking-[-1px]">
          Projects
        </h2>
        <div className="w-10 h-px bg-[#ccc] mx-auto mt-[18px]" />
      </motion.div>

      <div className="flex flex-col gap-7 max-w-[800px] mx-auto px-[6vw]">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 在 App.tsx 中引入 Projects**

```tsx
import Projects from './sections/Projects'
// 在 <About /> 之后加入 <Projects />
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```
确认 Projects 版块单列显示 4 张卡片，鼠标移动时卡片背向鼠标 3D 倾斜。

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Projects section with 3D tilt-away cards"
```

---

### Task 8: Career 版块

**Files:**
- Create: `src/sections/Career.tsx`

- [ ] **Step 1: 写入 `src/sections/Career.tsx`**

```tsx
import { motion } from 'framer-motion'

interface CareerItem {
  date: string
  title: string
  sub: string
  desc: string
}

const careers: CareerItem[] = [
  {
    date: '2024.06 — Now',
    title: 'AI Agent 工程师',
    sub: '某科技公司 · 全职',
    desc: '负责企业级 Agent 平台架构设计与核心开发，多 Agent 编排与自动化工作流落地。',
  },
  {
    date: '2023.03 — 2024.05',
    title: '全栈开发工程师',
    sub: '某互联网公司 · 全职',
    desc: '负责前后端开发与 DevOps 基础设施搭建，推动自动化部署与监控体系建设。',
  },
  {
    date: '2021.09 — 2023.01',
    title: '初级开发工程师',
    sub: '某创业团队 · 全职',
    desc: '参与多个 Web 应用开发，从需求分析到上线交付全流程实践，积累全栈能力。',
  },
  {
    date: '2019.09 — 2021.06',
    title: '自学编程 & 项目实践',
    sub: '河南新乡',
    desc: '系统学习计算机基础与 Web 开发，完成多个个人项目，建立技术博客。',
  },
]

export default function Career() {
  return (
    <section id="career" className="min-h-screen flex flex-col items-center justify-center bg-bg py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-mono text-[51px] font-bold text-text-primary tracking-[-1px]">
          Career
        </h2>
        <div className="w-10 h-px bg-[#ccc] mx-auto mt-[18px]" />
      </motion.div>

      <div className="relative max-w-[600px] mx-auto pl-10">
        {/* 时间线竖线 */}
        <div className="absolute left-[13px] top-1 bottom-0 w-px bg-[#e0e0db]" />

        {careers.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="relative mb-9 cursor-default transition-transform duration-300 hover:translate-x-1"
          >
            {/* 节点 */}
            <div className="absolute -left-[34px] top-1 w-[9px] h-[9px] bg-text-primary rounded-full border-2 border-bg outline outline-1 outline-[#e0e0db]" />

            <div className="font-mono text-[13px] text-text-muted tracking-[1px] mb-1.5">
              {item.date}
            </div>
            <div className="font-mono text-[21px] font-bold text-text-primary tracking-[-0.5px] mb-1">
              {item.title}
            </div>
            <div className="font-fangsong text-[15px] text-text-secondary mb-1.5">
              {item.sub}
            </div>
            <div className="font-fangsong text-sm text-text-muted leading-relaxed">
              {item.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 在 App.tsx 中引入 Career**

```tsx
import Career from './sections/Career'
// 在 <Projects /> 之后加入 <Career />
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```
确认 Career 版块垂直时间线，节点依次点亮，hover 右移。

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Career timeline section"
```

---

### Task 9: Contact 版块

**Files:**
- Create: `src/sections/Contact.tsx`

- [ ] **Step 1: 写入 `src/sections/Contact.tsx`**

```tsx
import { motion } from 'framer-motion'

const contacts = [
  {
    label: 'Email',
    value: 'wang@example.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-text-primary fill-none stroke-[1.5] group-hover:stroke-white transition-colors">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/wang',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-text-primary fill-none stroke-[1.5] group-hover:stroke-white transition-colors">
        <path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: 'WeChat',
    value: 'wang_xxxx',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-text-primary fill-none stroke-[1.5] group-hover:stroke-white transition-colors">
        <path d="M8.5 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        <path d="M15.5 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        <path d="M3 18c0-3.5 4-6 9-6s9 2.5 9 6" />
        <path d="M8 14l2 4 4-3" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-bg py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="font-mono text-[51px] font-bold text-text-primary tracking-[-1px]">
          Contact
        </h2>
        <div className="w-10 h-px bg-[#ccc] mx-auto mt-[18px]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-fangsong text-lg text-text-secondary mb-3 leading-relaxed"
      >
        若有合作意向或技术交流，欢迎随时联系
      </motion.p>
      <div className="w-10 h-px bg-[#e0e0db] mx-auto mb-9" />

      <div className="flex justify-center gap-12 flex-wrap">
        {contacts.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 border border-[#e0e0db] rounded-full transition-all duration-300 group-hover:border-text-primary group-hover:bg-text-primary">
              {item.icon}
            </div>
            <div className="font-mono text-sm font-bold text-text-primary tracking-[1px] mb-1">
              {item.label}
            </div>
            <div className="font-mono text-xs text-text-muted tracking-[0.5px]">
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 font-mono text-[11px] text-[#bbb] tracking-[2px]">
        &copy; 2026 WANG &middot; 河南新乡
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 在 App.tsx 中引入 Contact**

```tsx
import Contact from './sections/Contact'
// 在 <Career /> 之后加入 <Contact />
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```
确认 Contact 版块显示 3 个联系方式 + SVG 图标，hover 圆形边框变黑。

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Contact section with SVG icons"
```

---

### Task 10: App.tsx 最终整合与验证

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 确认最终 `src/App.tsx`**

```tsx
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Career from './sections/Career'
import Contact from './sections/Contact'

function App() {
  return (
    <main className="min-h-screen bg-bg">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Career />
      <Contact />
    </main>
  )
}

export default App
```

- [ ] **Step 2: 全站验证**

```bash
npm run dev
```
验证：
- 滚动全部 5 个版块，确认布局正确
- 鼠标自定义光标正常显示
- 顶部进度条正确反映滚动位置
- 导航栏高亮当前版块
- Hero: 反转圆 + 中文揭示 + 3D 倾斜
- About: 5 张翻转卡片
- Projects: 4 张卡片 3D 背向倾斜
- Career: 时间线节点动画
- Contact: 3 个联系方式
- 所有英文 Consolas，所有中文仿宋
- 配色一致

- [ ] **Step 3: 构建验证**

```bash
npm run build
```
确认无错误。

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: integrate all sections into App.tsx"
```

---

### Task 11: 响应式适配

**Files:**
- Modify: `src/sections/Hero.tsx`, `src/sections/About.tsx`, `src/sections/Projects.tsx`, `src/sections/Career.tsx`, `src/sections/Contact.tsx`, `src/components/Navigation.tsx`

- [ ] **Step 1: Hero 移动端适配 — 减小字号**

在 Hero.tsx 中将 clamp 最小值适当降低（已在 clamp 中处理），Hero 容器添加 `px-4`。

- [ ] **Step 2: About 移动端改为单列**

```tsx
// 在 About.tsx 中将两行 wrap 处理
<div className="flex justify-center gap-[60px] mb-[60px] flex-wrap">
```

- [ ] **Step 3: Projects 移动端减小内边距**

在 `ProjectCard` 中 `p-8` 改 `p-5 sm:p-8`。

- [ ] **Step 4: Career 移动端 `pl-8` + 节点缩小**

时间线 `pl-10` 改 `pl-8 sm:pl-10`。

- [ ] **Step 5: Navigation 移动端间距缩小**

`gap-8` 改 `gap-4 sm:gap-8`，`text-xs` 改 `text-[10px] sm:text-xs`。

- [ ] **Step 6: 验证移动端**

```bash
npm run dev
```
浏览器 DevTools 切换到移动端视口（375px），确认所有版块可读、不错位。注意 Hero 中文揭示效果在移动端降级（触摸设备无 hover）。

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add responsive design for mobile"
```
