import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lightbulb, Target, Puzzle } from 'lucide-react'

export default function ConceptSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="concept" ref={ref} className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">核心设计理念</h2>
          <p className="text-slate-400">Serena 的设计围绕三个核心理念展开</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: 'Agent-First Tool Design',
              subtitle: '面向 AI Agent 的工具设计',
              desc: '区别于传统的 low-level 概念（行号、文本搜索），Serena 提供 high-level 抽象，让 AI 能够像人类开发者一样操作代码。',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: Lightbulb,
              title: 'Symbol-Level Abstraction',
              subtitle: '符号级抽象',
              desc: '用 NamePath（如 MyClass/my_method）代替行号，理解代码结构而非文本匹配，精准定位和修改。',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: Puzzle,
              title: 'IDE-Like Capabilities',
              subtitle: 'IDE 级别的能力',
              desc: '提供符号查找、引用分析、重构、编辑等 IDE 常见能力，让 AI Agent 拥有专业开发者的工具集。',
              color: 'from-green-500 to-emerald-500',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                <item.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-purple-400 mb-3">{item.subtitle}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
