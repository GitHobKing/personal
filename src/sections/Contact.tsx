import { motion } from 'framer-motion'

const contacts = [
  {
    label: 'Email',
    value: 'wang@example.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-text-primary fill-none stroke-[1.5] group-hover:stroke-white transition-colors duration-300">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/wang',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-text-primary fill-none stroke-[1.5] group-hover:stroke-white transition-colors duration-300">
        <path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: 'WeChat',
    value: 'wang_xxxx',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-text-primary fill-none stroke-[1.5] group-hover:stroke-white transition-colors duration-300">
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
        <h2 className="font-mono text-[clamp(32px,8vw,51px)] font-bold text-text-primary tracking-[-1px]">
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
