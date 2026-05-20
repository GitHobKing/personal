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
      className="fixed top-0 left-0 right-0 z-40 flex justify-center gap-4 sm:gap-8 py-4 backdrop-blur-sm"
      style={{
        background: `rgba(249, 249, 247, ${bgOpacity.get()})`,
        borderBottom: `1px solid rgba(0, 0, 0, ${borderOpacity.get()})`,
      }}
    >
      {sections.map(id => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-colors duration-300 cursor-none"
          style={{ color: active === id ? '#0a0a0a' : '#bbb' }}
        >
          {LABELS[id]}
        </button>
      ))}
    </motion.nav>
  )
}
