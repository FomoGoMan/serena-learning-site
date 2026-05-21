import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Wrench, Terminal } from 'lucide-react'

const exercises = [
  {
    title: '安装 Serena',
    command: 'uv tool install -p 3.13 serena-agent@latest --prerelease=allow',
    description: '通过 uv 包管理器安装 Serena',
  },
  {
    title: '初始化项目',
    command: 'serena init',
    description: '在项目目录下初始化 Serena',
  },
  {
    title: '查找符号',
    command: 'serena tools call find_symbol --name-path-pattern "UserService/*"',
    description: '查找 UserService 类下的所有方法',
  },
  {
    title: '查看工具列表',
    command: 'serena tools list',
    description: '查看所有可用工具及其说明',
  },
]

export default function PracticeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeExercise, setActiveExercise] = useState<number | null>(null)

  return (
    <section id="practice" ref={ref} className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm mb-4">
            <Wrench size={16} />
            <span>实践项目</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">动手实践</h2>
          <p className="text-slate-400">通过实际操作加深对 Serena 的理解</p>
        </motion.div>

        <div className="space-y-4">
          {exercises.map((exercise, idx) => (
            <motion.div
              key={exercise.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.05 }}
              className={`bg-slate-800/50 border rounded-xl overflow-hidden transition-all cursor-pointer ${
                activeExercise === idx ? 'border-green-500/50' : 'border-slate-700/50 hover:border-slate-600'
              }`}
              onClick={() => setActiveExercise(activeExercise === idx ? null : idx)}
            >
              <div className="flex items-center gap-4 p-4">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{exercise.title}</h3>
                  <p className="text-slate-500 text-sm">{exercise.description}</p>
                </div>
                <Terminal className="text-slate-500" size={18} />
              </div>
              
              {activeExercise === idx && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="border-t border-slate-700/50 p-4 bg-slate-900/50"
                >
                  <div className="relative">
                    <code className="block bg-slate-950 rounded-lg px-4 py-3 text-green-400 font-mono text-sm">
                      {exercise.command}
                    </code>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(exercise.command)
                      }}
                      className="absolute right-3 top-3 px-2 py-1 rounded text-xs bg-slate-800 text-slate-400 hover:text-white"
                    >
                      复制
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
