import { useRef, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.width / 2
      const cy = rect.height / 2
      const dx = (e.clientX - rect.left - cx) / cx
      const dy = (e.clientY - rect.top - cy) / cy
      tiltX.set(-dy * 20)
      tiltY.set(dx * 20)
    }

    const handleLeave = () => {
      tiltX.set(0)
      tiltY.set(0)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* 透视容器：perspective 必须作用在被旋转元素的父级上 */}
      <div
        className="relative z-10 text-center px-[6vw] pointer-events-none"
        style={{ perspective: 800, perspectiveOrigin: 'center' }}
      >
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 第一行 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-9"
          >
            <span className="font-display italic text-[clamp(64px,10vw,100px)] font-medium text-text-primary tracking-[-0.5px] leading-none">
              Hello, I'm&nbsp;
            </span>
            <span className="font-display text-[clamp(80px,13vw,132px)] font-bold text-text-primary tracking-[-1px] leading-none">
              WANG
            </span>
          </motion.div>

          {/* 第二行 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-mono text-[clamp(14px,2.5vw,22px)] text-text-muted tracking-[2px]"
          >
            AI Agent Engineer &nbsp;|&nbsp; 21岁 &nbsp;|&nbsp; 河南新乡
          </motion.div>
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-0">
        <span className="font-mono text-[11px] text-[#bbb] tracking-[1px]">scroll</span>
        <div className="w-px h-7 bg-gradient-to-b from-[#ccc] to-transparent" />
      </div>
    </section>
  )
}
