import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Plug, Bot, Server, Globe } from 'lucide-react'

const flowSteps = [
  { icon: Bot, title: 'AI Client', desc: 'Claude Code, Codex 等' },
  { icon: Plug, title: 'MCP Protocol', desc: '标准化工具调用协议' },
  { icon: Server, title: 'Serena MCP Server', desc: '请求路由和工具执行' },
  { icon: Globe, title: 'LSP / JetBrains', desc: '获取代码语义信息' },
]

export default function MCPSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="mcp" ref={ref} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm mb-4">
            <Plug size={16} />
            <span>MCP 协议</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">MCP 协议集成</h2>
          <p className="text-slate-400">Serena 如何通过 MCP 协议与 AI 客户端通信</p>
        </motion.div>

        <div className="relative mb-12">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-6">
            {flowSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-4 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block flex-1" />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${idx % 2 === 0 ? 'from-blue-500 to-purple-500' : 'from-purple-500 to-pink-500'} flex items-center justify-center z-10`}>
                  <step.icon className="text-white" size={20} />
                </div>
                <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 md:max-w-sm">
                  <h3 className="text-white font-medium mb-1">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h4 className="text-white font-medium mb-3">MCP 请求格式</h4>
            <pre className="text-slate-300 font-mono text-xs whitespace-pre-wrap">
{`{
  "name": "find_symbol",
  "arguments": {
    "name_path_pattern": "UserService/*",
    "max_matches": 10
  }
}`}
            </pre>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h4 className="text-white font-medium mb-3">响应格式</h4>
            <pre className="text-slate-300 font-mono text-xs whitespace-pre-wrap">
{`{
  "symbols": [{
    "name": "get_user",
    "name_path": "UserService/get_user",
    "kind": "method",
    "file": "user.py", "line": 42
  }]
}`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
