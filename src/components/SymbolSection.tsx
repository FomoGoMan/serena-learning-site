import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Layers, ArrowRight } from 'lucide-react'

export default function SymbolSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<'namepath' | 'why' | 'vs'>('namepath')

  return (
    <section id="symbols" ref={ref} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-4">
            <Layers size={16} />
            <span>核心技术</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">符号系统 (Symbol System)</h2>
          <p className="text-slate-400">Serena 理解和操作代码的基础</p>
        </motion.div>

        <div className="flex gap-2 mb-8 justify-center">
          {[
            { id: 'namepath', label: 'NamePath' },
            { id: 'why', label: '为什么需要' },
            { id: 'vs', label: 'vs 文本操作' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'namepath' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">什么是 NamePath？</h3>
              <p className="text-slate-400 text-sm mb-4">
                NamePath 是代码符号在符号树中的路径，类似于文件系统中的路径。
              </p>
              <div className="bg-slate-900/80 rounded-xl p-4 font-mono text-sm">
                <div className="text-slate-500 mb-2">// Python 示例</div>
                <div className="text-purple-400">class UserService:</div>
                <div className="text-slate-600 pl-4"># NamePath: UserService</div>
                <div className="text-purple-400 pl-4">def get_user(self, id):</div>
                <div className="text-slate-600 pl-8"># NamePath: UserService/get_user</div>
                <div className="text-green-400 pl-8">return self.users[id]</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <div className="text-white font-medium mb-2">简单名称</div>
                <code className="text-green-400 text-sm">get_user</code>
                <p className="text-slate-500 text-xs mt-2">匹配任何名为 get_user 的符号</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <div className="text-white font-medium mb-2">相对路径</div>
                <code className="text-green-400 text-sm">UserService/get_user</code>
                <p className="text-slate-500 text-xs mt-2">匹配 UserService 下的 get_user</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'why' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">为什么需要符号抽象？</h3>
              <div className="space-y-4 text-slate-400 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <span className="text-white">位置无关</span>
                    <p className="text-slate-500 mt-1">代码移动后，符号引用仍然有效，不依赖行号</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <span className="text-white">语义理解</span>
                    <p className="text-slate-500 mt-1">理解代码结构，而不仅仅是文本匹配</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <span className="text-white">精确操作</span>
                    <p className="text-slate-500 mt-1">重命名时只影响目标符号，不影响同名但无关的代码</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'vs' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
              <h3 className="text-red-400 font-semibold mb-4">文本操作</h3>
              <div className="space-y-2 text-sm">
                <div className="text-slate-400">
                  <code className="text-red-300">grep -rn "get_user"</code>
                </div>
                <ArrowRight className="text-slate-600 my-2" size={16} />
                <div className="text-slate-500">→ 需要人工判断哪些是真正的引用</div>
                <div className="text-slate-500">→ 可能误伤其他文件中同名的变量</div>
                <div className="text-slate-500">→ 重命名后需要手动检查每一处</div>
              </div>
            </div>

            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
              <h3 className="text-green-400 font-semibold mb-4">符号操作</h3>
              <div className="space-y-2 text-sm">
                <div className="text-slate-400">
                  <code className="text-green-300">rename_symbol("UserService/get_user", "find_user")</code>
                </div>
                <ArrowRight className="text-slate-600 my-2" size={16} />
                <div className="text-green-300">→ 自动识别所有相关引用</div>
                <div className="text-green-300">→ 只影响 UserService 下的方法</div>
                <div className="text-green-300">→ 跨文件原子更新，零误伤</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
