import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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
  const bgOpacity = useTransform(scrollY, [0, 300], [0, 0.88])
  const shadowOpacity = useTransform(scrollY, [0, 300], [0, 0.04])
  const navRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    if (!navRef.current) return
    const el = navRef.current.querySelector(`[data-nav="${active}"]`)
    if (el) {
      const { offsetLeft, offsetWidth } = el as HTMLElement
      setIndicator({ left: offsetLeft, width: offsetWidth })
    }
  }, [active])

  useEffect(() => {
    if (!hovered || !navRef.current) return
    const el = navRef.current.querySelector(`[data-nav="${hovered}"]`)
    if (el) {
      const { offsetLeft, offsetWidth } = el as HTMLElement
      setIndicator({ left: offsetLeft, width: offsetWidth })
    }
  }, [hovered])

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 py-3 backdrop-blur-sm"
      style={{
        background: `rgba(249, 249, 247, ${bgOpacity.get()})`,
        boxShadow: `0 1px 3px rgba(0, 0, 0, ${shadowOpacity.get()})`,
      }}
    >
      {/* 左侧标识 */}
      <span className="font-display italic text-lg sm:text-xl text-text-primary tracking-tight select-none">
        WANG
      </span>

      {/* 右侧导航 */}
      <div className="relative flex gap-1">
        {/* 滑动指示器 */}
        <motion.div
          className="absolute inset-y-1 rounded-full bg-text-primary/8"
          animate={{ left: indicator.left, width: indicator.width }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />

        {sections.map(id => (
          <button
            key={id}
            data-nav={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className="relative font-mono text-[10px] sm:text-xs tracking-widest uppercase px-3 py-1.5 rounded-full transition-colors duration-300"
            style={{ color: active === id ? '#0a0a0a' : '#aaa' }}
          >
            {LABELS[id]}
            {active === id && (
              <motion.div
                layoutId="nav-dot"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-text-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.nav>
  )
}
