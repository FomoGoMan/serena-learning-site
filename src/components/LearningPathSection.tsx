import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Map, BookOpen, Code2, Puzzle, Rocket } from 'lucide-react'

const learningPath = [
  { icon: BookOpen, title: '基础概念', desc: '理解 Serena 的核心设计理念和符号抽象', duration: '1-2 天' },
  { icon: Code2, title: '工具系统', desc: '学习 Tool 基类、标记类、注册表的设计', duration: '2-3 天' },
  { icon: Puzzle, title: 'MCP 协议', desc: '掌握 MCP 协议集成和工具调用流程', duration: '1-2 天' },
  { icon: Rocket, title: '实战应用', desc: '在真实项目中应用 Serena 解决问题', duration: '持续' },
]

export default function LearningPathSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="path" ref={ref} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 px-4 py-2 rounded-full text-sm mb-4">
            <Map size={16} />
            <span>学习路径</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">学习路径建议</h2>
          <p className="text-slate-400">循序渐进，深入理解 Serena 的设计与实现</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningPath.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 relative"
            >
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4`}>
                <step.icon className="text-white" size={18} />
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm mb-3">{step.desc}</p>
              <div className="text-xs text-purple-400">{step.duration}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 text-center"
        >
          <h3 className="text-white font-semibold mb-2">推荐学习资源</h3>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="https://oraios.github.io/serena/02-usage/000_intro.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
            >
              官方文档
            </a>
            <a
              href="https://github.com/oraios/serena"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
            >
              GitHub 源码
            </a>
            <a
              href="https://discord.com/invite/cVUNQmnV4r"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
            >
              Discord 社区
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
