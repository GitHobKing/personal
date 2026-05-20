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
    <section id="career" className="min-h-screen flex flex-col items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-mono text-[clamp(32px,8vw,51px)] font-bold text-text-primary tracking-[-1px]">
          Career
        </h2>
        <div className="w-10 h-px bg-[#ccc] mx-auto mt-[18px]" />
      </motion.div>

      <div className="relative max-w-[600px] mx-auto pl-8 sm:pl-10">
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
            {/* 节点圆点 */}
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
