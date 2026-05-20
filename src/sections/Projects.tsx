import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Project {
  name: string
  desc: string
  tags: string[]
}

const projects: Project[] = [
  {
    name: 'AgentFlow',
    desc: '企业级 AI Agent 编排平台，支持多 Agent 协作、工作流可视化配置与实时监控。已落地 3 家企业客户，日均处理 10 万+ 任务。',
    tags: ['React', 'Python', 'LangChain', 'Docker', 'PostgreSQL'],
  },
  {
    name: 'DevOpsBot',
    desc: '智能化 CI/CD 运维助手，集成 GitHub Actions 与 Kubernetes，实现自动化部署、回滚与异常告警。',
    tags: ['Go', 'Kubernetes', 'GitHub Actions', 'Redis', 'Linux'],
  },
  {
    name: 'RAG-KB',
    desc: '基于 RAG 的企业知识库系统，支持多源文档解析、向量检索与智能问答，检索准确率 95%+。',
    tags: ['Next.js', 'FastAPI', 'Elasticsearch', 'LLM', 'MongoDB'],
  },
  {
    name: 'AutoTestX',
    desc: '自动化测试框架，支持 API / E2E / 性能测试，提供可视化报告与 CI 无缝集成。',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'CI/CD'],
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    card.style.transform = `rotateY(${-dx * 10}deg) rotateX(${dy * 10}deg)`
  }, [])

  const handleLeave = useCallback(() => {
    const card = cardRef.current
    if (card) card.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{ perspective: 600 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="bg-card-white border border-card-border rounded-md p-5 sm:p-8 cursor-pointer transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.12s ease-out, box-shadow 0.3s' }}
      >
        <h3 className="font-mono text-xl sm:text-2xl font-bold text-text-primary tracking-[-0.5px] mb-2.5">
          {project.name}
        </h3>
        <p className="font-fangsong text-base text-text-secondary leading-relaxed mb-4">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-xs text-text-muted px-3 py-1 border border-card-border rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center bg-bg py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-mono text-[clamp(32px,8vw,51px)] font-bold text-text-primary tracking-[-1px]">
          Projects
        </h2>
        <div className="w-10 h-px bg-[#ccc] mx-auto mt-[18px]" />
      </motion.div>

      <div className="flex flex-col gap-7 max-w-[800px] mx-auto px-[6vw]">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
