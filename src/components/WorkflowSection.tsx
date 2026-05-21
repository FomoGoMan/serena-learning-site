import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Play, FileSearch, Edit3, Save } from 'lucide-react'

const workflowSteps = [
  {
    icon: FileSearch,
    title: '符号发现',
    desc: '通过 LSP 或 JetBrains 插件分析代码结构，识别符号',
    tools: ['find_symbol', 'find_references', 'get_symbols_overview'],
  },
  {
    icon: Edit3,
    title: '符号操作',
    desc: '基于符号进行读取或编辑，精准定位代码',
    tools: ['replace_symbol_body', 'insert_after_symbol', 'safe_delete'],
  },
  {
    icon: Save,
    title: '变更应用',
    desc: '通过 CodeEditor 将变更写回文件，保持原子性',
    tools: ['EditedFileContext', 'CodeEditor'],
  },
]

export default function WorkflowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="workflow" ref={ref} className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm mb-4">
            <Play size={16} />
            <span>工作流程</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">工具调用工作流</h2>
          <p className="text-slate-400">理解 Serena 工具从调用到执行的整体流程</p>
        </motion.div>

        <div className="space-y-6">
          {workflowSteps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                  <step.icon className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white font-semibold">{step.title}</span>
                    <span className="text-slate-500 text-sm">({idx + 1}/3)</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tools.map((tool) => (
                      <code key={tool} className="px-3 py-1 bg-slate-900/80 rounded-lg text-purple-400 text-xs font-mono">
                        {tool}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-slate-800/30 border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
            <span>符号发现</span>
            <span className="text-slate-600">→</span>
            <span>符号操作</span>
            <span className="text-slate-600">→</span>
            <span>变更应用</span>
            <span className="text-slate-600">→</span>
            <span className="text-green-400">完成</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
