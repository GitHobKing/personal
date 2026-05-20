import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const over = () => setIsHovering(true)
    const out = () => setIsHovering(false)

    window.addEventListener('mousemove', move, { passive: true })

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', over)
        el.removeEventListener('mouseleave', out)
        el.addEventListener('mouseenter', over)
        el.addEventListener('mouseleave', out)
      })
    }

    attachHover()
    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', over)
        el.removeEventListener('mouseleave', out)
      })
    }
  }, []) // 空依赖，只在挂载时绑定一次

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#0a0a0a]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        width: isHovering ? 36 : 14,
        height: isHovering ? 36 : 14,
        background: isHovering ? 'transparent' : 'transparent',
      }}
      animate={{
        width: isHovering ? 36 : 14,
        height: isHovering ? 36 : 14,
      }}
      transition={{ duration: 0.15 }}
    />
  )
}
