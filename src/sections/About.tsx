import { motion } from 'framer-motion'

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
      className="group cursor-pointer"
      style={{ width: 210, height: 280, perspective: 800 }}
    >
      <div className="relative w-full h-full transition-transform duration-[0.6s] ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* 正面 - 白底 */}
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
        {/* 背面 - 黑底 */}
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
    <section id="about" className="min-h-screen flex flex-col items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-mono text-[clamp(32px,8vw,51px)] font-bold text-text-primary tracking-[-1px]">
          Professional Skills
        </h2>
        <div className="w-10 h-px bg-[#ccc] mx-auto mt-[18px]" />
      </motion.div>

      {/* 上行 2 个 */}
      <div className="flex justify-center gap-[30px] sm:gap-[60px] mb-[30px] sm:mb-[60px] flex-wrap">
        {skills.slice(0, 2).map((s, i) => (
          <FlipCard key={s.label} skill={s} index={i} />
        ))}
      </div>
      {/* 下行 3 个 */}
      <div className="flex justify-center gap-[30px] sm:gap-[60px] flex-wrap">
        {skills.slice(2, 5).map((s, i) => (
          <FlipCard key={s.label} skill={s} index={i + 2} />
        ))}
      </div>
    </section>
  )
}
