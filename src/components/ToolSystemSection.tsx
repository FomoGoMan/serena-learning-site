import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Wrench, Search, Edit3, GitBranch, Brain } from 'lucide-react'

type TabId = 'retrieval' | 'refactoring' | 'editing' | 'memory'

export default function ToolSystemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<TabId>('retrieval')

  const tools: Record<TabId, { name: string, tools: string[], desc: string }[]> = {
    retrieval: [
      { name: 'find_symbol', tools: ['name_path_pattern', 'max_matches'], desc: '按 NamePath 模式查找符号' },
      { name: 'find_references', tools: ['name_path', 'include_declaration'], desc: '查找所有引用位置' },
      { name: 'get_symbols_overview', tools: ['relative_path', 'depth'], desc: '获取文件的符号树结构' },
      { name: 'find_implementations', tools: ['name_path'], desc: '查找接口/抽象方法实现' },
      { name: 'query_project_dependencies', tools: ['symbol_name'], desc: '搜索项目外部依赖' },
    ],
    refactoring: [
      { name: 'rename_symbol', tools: ['name_path', 'new_name'], desc: '跨文件重命名符号' },
      { name: 'move_symbol', tools: ['name_path', 'target_path'], desc: '移动符号到新位置' },
      { name: 'safe_delete', tools: ['name_path'], desc: '安全删除未使用的代码' },
    ],
    editing: [
      { name: 'replace_symbol_body', tools: ['name_path', 'new_body'], desc: '替换符号的完整实现' },
      { name: 'insert_after_symbol', tools: ['name_path', 'content'], desc: '在符号后插入代码' },
      { name: 'insert_before_symbol', tools: ['name_path', 'content'], desc: '在符号前插入代码' },
      { name: 'replace_content', tools: ['pattern', 'replacement', 'path'], desc: '正则表达式替换' },
    ],
    memory: [
      { name: 'write_memory', tools: ['memory_name', 'content'], desc: '写入持久化记忆' },
      { name: 'read_memory', tools: ['memory_name'], desc: '读取记忆内容' },
      { name: 'list_memories', tools: ['topic'], desc: '列出记忆列表' },
      { name: 'rename_memory', tools: ['old_name', 'new_name'], desc: '重命名记忆' },
    ],
  }

  const tabConfig: Record<TabId, { icon: typeof Search, color: string }> = {
    retrieval: { icon: Search, color: 'from-blue-500 to-cyan-500' },
    refactoring: { icon: GitBranch, color: 'from-purple-500 to-pink-500' },
    editing: { icon: Edit3, color: 'from-green-500 to-emerald-500' },
    memory: { icon: Brain, color: 'from-orange-500 to-amber-500' },
  }

  return (
    <section id="tools" ref={ref} className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm mb-4">
            <Wrench size={16} />
            <span>工具系统</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">工具分类详解</h2>
          <p className="text-slate-400">Serena 提供的完整工具集及其使用场景</p>
        </motion.div>

        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          {(Object.keys(tools) as TabId[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-yellow-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {(() => {
                const Icon = tabConfig[tab].icon
                return <Icon size={14} />
              })()}
              {tab === 'retrieval' ? '检索' : tab === 'refactoring' ? '重构' : tab === 'editing' ? '编辑' : '记忆'}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {tools[activeTab].map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tabConfig[activeTab].color} flex items-center justify-center flex-shrink-0`}>
                  <Wrench className="text-white" size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <code className="text-yellow-400 font-mono text-sm">{tool.name}</code>
                    <span className="text-slate-500 text-xs">({tool.tools.join(', ')})</span>
                  </div>
                  <p className="text-slate-400 text-sm">{tool.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-slate-800/30 border border-slate-700/30 rounded-xl p-4"
        >
          <h4 className="text-white font-medium mb-2">工具命名规范</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400 mb-2">命名模式：动词 + 对象</p>
              <code className="text-green-400">find_symbol</code>
              <span className="text-slate-500 mx-2">|</span>
              <code className="text-green-400">rename_symbol</code>
            </div>
            <div>
              <p className="text-slate-400 mb-2">参数使用下划线命名</p>
              <code className="text-blue-400">name_path_pattern</code>
              <span className="text-slate-500 mx-2">|</span>
              <code className="text-blue-400">max_matches</code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
