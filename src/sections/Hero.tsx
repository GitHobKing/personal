import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const RADIUS = 60
const DIAMETER = RADIUS * 2

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: -999, y: -999 })
  const [isInside, setIsInside] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

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
      setTilt({ x: -dy * 15, y: dx * 15 })
    }

    const handleEnter = () => setIsInside(true)
    const handleLeave = () => {
      setIsInside(false)
      setTilt({ x: 0, y: 0 })
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

  const clipPath = isInside
    ? `circle(${RADIUS}px at ${mouse.x}px ${mouse.y}px)`
    : 'circle(0px at -999px -999px)'

  const invertStyle: React.CSSProperties = isInside
    ? {
        position: 'absolute' as const,
        left: mouse.x,
        top: mouse.y,
        width: DIAMETER,
        height: DIAMETER,
        transform: 'translate(-50%, -50%)',
      }
    : {
        position: 'absolute' as const,
        left: -999,
        top: -999,
        width: DIAMETER,
        height: DIAMETER,
        transform: 'translate(-50%, -50%)',
      }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg cursor-none"
    >
      {/* 颜色反转圆 - z=20，只影响英文和背景 */}
      <div
        className="rounded-full bg-white pointer-events-none z-20"
        style={{
          ...invertStyle,
          mixBlendMode: 'difference' as React.CSSProperties['mixBlendMode'],
        }}
      />

      {/* 中文揭示层 - z=25，深色背景遮盖英文，位于反转圆之上 */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-25 pointer-events-none"
        style={{
          clipPath,
          background: '#121212',
        }}
      >
        <div className="font-fangsong text-[clamp(56px,11vw,96px)] font-semibold text-white tracking-[2px] leading-none mb-9 whitespace-nowrap">
          你好，我是 王
        </div>
        <div className="font-fangsong text-[clamp(16px,2.5vw,22px)] text-[#bbb] tracking-[3px] whitespace-nowrap">
          AI Agent 工程师 &nbsp;|&nbsp; 21岁 &nbsp;|&nbsp; 河南新乡
        </div>
      </div>

      {/* 英文内容层 - z=1，3D 倾斜面向鼠标 */}
      <motion.div
        className="relative z-10 text-center px-[6vw] pointer-events-none"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'tween', duration: 0.1 }}
        style={{ transformStyle: 'preserve-3d', perspective: 600 }}
      >
        {/* 第一行 */}
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

        {/* 第三行（现在只有两行，实际是第二行） */}
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
