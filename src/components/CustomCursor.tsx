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

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
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
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-text-primary/30"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: isHovering ? 32 : 12,
        height: isHovering ? 32 : 12,
        background: isHovering ? 'transparent' : '#ffffff',
        mixBlendMode: 'difference',
      }}
      animate={{
        width: isHovering ? 32 : 12,
        height: isHovering ? 32 : 12,
        background: isHovering ? 'transparent' : '#ffffff',
      }}
      transition={{ duration: 0.2 }}
    />
  )
}
