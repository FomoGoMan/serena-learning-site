import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Code2, FolderTree, Hash, GitBranch } from 'lucide-react'

export default function CodeAnalysisSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<'symbols' | 'files' | 'references'>('symbols')

  return (
    <section id="code" ref={ref} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm mb-4">
            <Code2 size={16} />
            <span>源码解析</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">核心模块解析</h2>
          <p className="text-slate-400">深入理解 Serena 的关键代码模块</p>
        </motion.div>

        <div className="flex gap-2 mb-8 justify-center">
          {[
            { id: 'symbols', label: '符号工具', icon: Hash },
            { id: 'files', label: '文件操作', icon: FolderTree },
            { id: 'references', label: '引用追踪', icon: GitBranch },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'symbols' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Symbol 模块结构</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap">
{`src/serena/symbol.py
├── LanguageServerSymbol      # LSP 符号表示
├── NamePathMatcher          # 符号路径匹配
├── LanguageServerSymbolRetriever  # 符号检索器
└── SymbolVisitor            # 符号遍历访问器`}
              </pre>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">NamePath 匹配规则</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <code className="text-green-400 bg-slate-900 px-2 py-1 rounded">method</code>
                  <span className="text-slate-400">→ 匹配任何名为 method 的符号</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-green-400 bg-slate-900 px-2 py-1 rounded">Class/method</code>
                  <span className="text-slate-400">→ 匹配 Class 下的 method</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-green-400 bg-slate-900 px-2 py-1 rounded">/Class/method</code>
                  <span className="text-slate-400">→ 绝对路径匹配</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-green-400 bg-slate-900 px-2 py-1 rounded">Class/method[0]</code>
                  <span className="text-slate-400">→ 匹配重载方法</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'files' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">文件操作工具</h3>
            <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap">
{`src/serena/tools/file_tools.py
├── ReadFileTool             # 读取文件内容
├── ReplaceContentTool       # 正则替换内容
├── SearchPatternTool        # 搜索模式
├── ListDirTool              # 列出目录
└── FindFileTool             # 查找文件

# 使用 EditedFileContext 确保原子性写入
with EditedFileContext(relative_path, editor) as ctx:
    ctx.set_updated_content(new_content)`}
            </pre>
          </motion.div>
        )}

        {activeTab === 'references' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">引用追踪机制</h3>
            <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap">
{`find_references(name_path)
  │
  ├─→ LSP "textDocument/references" 
  │     或 JetBrains find usages
  │
  ├─→ 过滤外部依赖引用
  │
  └─→ 返回引用位置列表
       [{ file, line, column, context }]`}
            </pre>
          </motion.div>
        )}
      </div>
    </section>
  )
}
