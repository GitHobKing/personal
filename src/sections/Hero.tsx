import { useRef, useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const PARTICLE_COUNT = 30

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)

  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      size: 1.5 + Math.random() * 4,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 5,
    })), [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.width / 2
      const cy = rect.height / 2
      const dx = (e.clientX - rect.left - cx) / cx
      const dy = (e.clientY - rect.top - cy) / cy
      tiltX.set(-dy * 22)
      tiltY.set(dx * 22)
      glowX.set(e.clientX)
      glowY.set(e.clientY)
    }

    const handleEnter = () => setIsHovering(true)
    const handleLeave = () => {
      tiltX.set(0)
      tiltY.set(0)
      setIsHovering(false)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* ═══ 鼠标跟随光晕 ═══ */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[15] w-[320px] h-[320px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: glowX,
          y: glowY,
          background:
            'radial-gradient(circle, rgba(195,188,170,0.13) 0%, rgba(200,192,175,0.05) 35%, transparent 70%)',
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* ═══ 静态背景装饰 ═══ */}

      {/* W 水印 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-display text-[clamp(260px,45vw,550px)] font-black text-[#0a0a0a] leading-none"
          style={{ opacity: 0.012 }}
        >
          W
        </span>
      </div>

      {/* 右上同心弧 */}
      <svg
        className="absolute -top-[5vh] -right-[5vw] w-[50vw] h-[50vw] pointer-events-none"
        viewBox="0 0 500 500" fill="none" style={{ opacity: 0.06 }}
      >
        <circle cx="500" cy="0" r="480" stroke="#0a0a0a" strokeWidth="0.6" />
        <circle cx="500" cy="0" r="440" stroke="#0a0a0a" strokeWidth="0.35" />
        <circle cx="500" cy="0" r="400" stroke="#0a0a0a" strokeWidth="0.2" />
        <circle cx="500" cy="0" r="360" stroke="#0a0a0a" strokeWidth="0.15" />
        <line x1="80" y1="50" x2="280" y2="50" stroke="#0a0a0a" strokeWidth="0.4" />
        <line x1="180" y1="5" x2="180" y2="95" stroke="#0a0a0a" strokeWidth="0.4" />
      </svg>

      {/* 左下放射线 */}
      <svg
        className="absolute -bottom-[8vh] -left-[8vw] w-[42vw] h-[42vw] pointer-events-none"
        viewBox="0 0 400 400" fill="none" style={{ opacity: 0.05 }}
      >
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 0.5 + Math.PI * 0.12
          return (
            <line
              key={i} x1={200} y1={200}
              x2={200 + Math.cos(a) * 340}
              y2={200 + Math.sin(a) * 340}
              stroke="#0a0a0a" strokeWidth="0.35"
            />
          )
        })}
        <circle cx="200" cy="200" r="50" stroke="#0a0a0a" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="110" stroke="#0a0a0a" strokeWidth="0.2" />
        <circle cx="200" cy="200" r="170" stroke="#0a0a0a" strokeWidth="0.15" />
      </svg>

      {/* 左上菱形组 */}
      <svg
        className="absolute top-[13vh] left-[7vw] w-[16vw] h-[16vw] pointer-events-none"
        viewBox="0 0 200 200" fill="none" style={{ opacity: 0.05 }}
      >
        <rect x="70" y="10" width="60" height="60" stroke="#0a0a0a" strokeWidth="0.5" transform="rotate(45 100 40)" />
        <rect x="40" y="40" width="80" height="80" stroke="#0a0a0a" strokeWidth="0.3" transform="rotate(45 80 80)" />
        <rect x="20" y="60" width="30" height="30" stroke="#0a0a0a" strokeWidth="0.4" transform="rotate(45 35 75)" />
      </svg>

      {/* 侧边竖线 */}
      <div className="absolute top-[20vh] right-[6vw] w-px h-[22vh] bg-gradient-to-b from-transparent via-[#c4c4ba] to-transparent opacity-25 pointer-events-none" />
      <div className="absolute top-[55vh] left-[7vw] w-px h-[18vh] bg-gradient-to-b from-transparent via-[#c4c4ba] to-transparent opacity-20 pointer-events-none" />
      {/* 顶部水平线 */}
      <div className="absolute top-[10vh] left-[10vw] right-[10vw] h-px bg-gradient-to-r from-transparent via-[#b8b8ae] to-transparent opacity-25 pointer-events-none" />

      {/* ═══ 3D 透视层：所有跟随鼠标的元素统一放在一个容器内 ═══ */}
      <div
        className="relative z-10 pointer-events-none"
        style={{ perspective: 800, perspectiveOrigin: 'center' }}
      >
        <motion.div
          className="relative"
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ── 装饰环组 ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="relative w-[min(520px,82vw)] h-[min(520px,82vw)]"
            >
              {/* 外环虚线 */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="96" fill="none" stroke="#c2c2b8" strokeWidth="0.25" strokeDasharray="3 10" />
              </svg>
              {/* 第二环 */}
              <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border border-[#d5d5cd]" />
              {/* 第三环 */}
              <div className="absolute top-5 left-5 right-5 bottom-5 rounded-full border border-[#e0e0d8]" />
              {/* 第四环 — 半透明填充 */}
              <div className="absolute top-8 left-8 right-8 bottom-8 rounded-full border border-[#e8e8e2] bg-[#f5f5f0]/25" />

              {/* 4 颗主装饰点 */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#999]" />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.02 }}
                className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#999]" />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.14 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#999]" />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.26 }}
                className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#999]" />

              {/* 8 颗副装饰点 */}
              {[22, 68, 112, 158, 202, 248, 292, 338].map((deg, i) => (
                <motion.div
                  key={`sub-${deg}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.06 }}
                  className="absolute w-1 h-1 rounded-full bg-[#bbb]/50"
                  style={{
                    top: `${50 - 48.5 * Math.cos(deg * Math.PI / 180)}%`,
                    left: `${50 + 48.5 * Math.sin(deg * Math.PI / 180)}%`,
                  }}
                />
              ))}

              {/* 轨道旋转点 */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1, rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear', delay: 1.5 }}
                className="absolute inset-[-4px]"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#aaa]/50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#bbb]/25" />
              </motion.div>
            </motion.div>
          </div>

          {/* ── 四角角标 ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(580px,92vw)] h-[min(420px,60vw)] pointer-events-none">
            {/* 四个大角 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.0 }}
              className="absolute top-0 left-0 w-14 h-14 border-l border-t border-[#bdbdb3]" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.1 }}
              className="absolute top-0 right-0 w-14 h-14 border-r border-t border-[#bdbdb3]" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute bottom-0 left-0 w-14 h-14 border-l border-b border-[#bdbdb3]" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.3 }}
              className="absolute bottom-0 right-0 w-14 h-14 border-r border-b border-[#bdbdb3]" />

            {/* 角标延伸线 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}
              className="absolute top-0 left-14 w-8 h-px bg-[#c8c8be]" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.42 }}
              className="absolute top-0 right-14 w-8 h-px bg-[#c8c8be]" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.49 }}
              className="absolute top-14 left-0 w-px h-8 bg-[#c8c8be]" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.56 }}
              className="absolute bottom-14 left-0 w-px h-8 bg-[#c8c8be]" />
          </div>

          {/* ── 文字内容 ── */}
          <div className="relative text-center px-[10vw] py-[12vh]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 relative"
            >
              {/* 名字背后柔光 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(520px,88vw)] h-[130px] rounded-full bg-[#e6e6de]/40 blur-3xl" />
              <span className="relative font-display italic text-[clamp(64px,10vw,100px)] font-medium text-text-primary tracking-[-0.5px] leading-none">
                Hello, I'm&nbsp;
              </span>
              <span className="relative font-display text-[clamp(80px,13vw,132px)] font-bold text-text-primary tracking-[-1px] leading-none">
                WANG
              </span>
            </motion.div>

            {/* 分割线 */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
              className="flex items-center justify-center gap-5 mb-7"
            >
              <span className="w-14 sm:w-18 h-px bg-gradient-to-r from-transparent to-[#aaa]" />
              <span className="relative flex items-center justify-center w-3 h-3">
                <span className="absolute w-3 h-3 rounded-full bg-[#999]" />
                <span className="absolute w-5 h-5 rounded-full border border-[#c4c4ba]/50" />
              </span>
              <span className="w-14 sm:w-18 h-px bg-gradient-to-l from-transparent to-[#aaa]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-mono text-[clamp(14px,2.5vw,22px)] text-text-muted tracking-[2px]"
            >
              AI Agent Engineer &nbsp;|&nbsp; 21岁 &nbsp;|&nbsp; 河南新乡
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ═══ 悬浮粒子 ═══ */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none z-[5] rounded-full bg-[#a0a098]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* ═══ 滚动提示 ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-0"
      >
        <span className="font-mono text-[11px] text-[#bbb] tracking-[1px]">scroll</span>
        <div className="w-px h-7 bg-gradient-to-b from-[#ccc] to-transparent" />
      </motion.div>
    </section>
  )
}
