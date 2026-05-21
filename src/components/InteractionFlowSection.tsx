import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Bot, MessageSquare, Zap, FileCode, ArrowRight, Check } from 'lucide-react'

type StepId = 'user' | 'claude' | 'serena' | 'lsp' | 'result' | 'apply'

interface FlowStep {
  id: StepId
  icon: typeof Bot
  title: string
  description: string
  details?: string[]
  color: string
}

const flowSteps: FlowStep[] = [
  {
    id: 'user',
    icon: MessageSquare,
    title: '用户发送请求',
    description: '用户在 Claude Code 中描述想要完成的代码任务',
    details: ['如："帮我重命名 UserService 中的 get_user 方法为 find_user_by_id"'],
    color: 'from-slate-500 to-slate-600',
  },
  {
    id: 'claude',
    icon: Bot,
    title: 'Claude Code 分析',
    description: 'Claude 分析请求，决定调用 Serena 工具',
    details: [
      '识别这是一个重构任务',
      '选择 rename_symbol 工具',
      '构造工具参数',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'serena',
    icon: Zap,
    title: 'MCP 请求转发',
    description: '通过 MCP 协议将工具调用转发给 Serena MCP Server',
    details: [
      'MCP 协议标准化请求格式',
      'Serena 接收并解析请求',
      '路由到对应工具处理器',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'lsp',
    icon: FileCode,
    title: 'LSP 语义分析',
    description: 'Serena 调用 LSP 获取代码语义信息',
    details: [
      'LSP textDocument/rename',
      '分析符号定义和所有引用',
      '计算变更范围',
    ],
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'result',
    icon: Check,
    title: '返回结果',
    description: '将符号变更结果返回给 Claude Code',
    details: [
      '包含变更的文件列表',
      '每处引用的精确位置',
      '操作成功/失败状态',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'apply',
    icon: FileCode,
    title: 'Claude 确认并应用',
    description: 'Claude Code 根据结果执行代码变更',
    details: [
      '展示变更预览',
      '用户确认后执行',
      '多文件原子变更',
    ],
    color: 'from-yellow-500 to-amber-500',
  },
]

export default function InteractionFlowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeStep, setActiveStep] = useState<StepId | null>(null)

  return (
    <section id="interaction" ref={ref} className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-4">
            <Bot size={16} />
            <span>Claude Code × Serena</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">完整交互流程</h2>
          <p className="text-slate-400">以 Claude Code 为例，理解 Serena 如何与 AI Agent 协作</p>
        </motion.div>

        {/* 流程图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 overflow-x-auto">
            <div className="flex items-center justify-center min-w-[600px] gap-3">
              {flowSteps.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    className={`flex flex-col items-center cursor-pointer transition-all ${
                      activeStep === step.id ? 'scale-105' : ''
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-2 shadow-lg`}>
                      <step.icon className="text-white" size={24} />
                    </div>
                    <span className="text-xs text-slate-400 text-center max-w-[80px]">{step.title}</span>
                  </motion.div>
                  {idx < flowSteps.length - 1 && (
                    <ArrowRight className="text-slate-600 flex-shrink-0" size={20} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 详细说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {flowSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + idx * 0.05 }}
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              className={`bg-slate-800/50 border rounded-xl p-4 cursor-pointer transition-all ${
                activeStep === step.id ? 'border-purple-500/50 bg-purple-500/5' : 'border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                  <step.icon className="text-white" size={16} />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{step.title}</div>
                  <div className="text-slate-500 text-xs">{idx + 1} / {flowSteps.length}</div>
                </div>
              </div>
              <p className="text-slate-400 text-xs mb-2">{step.description}</p>
              {step.details && activeStep === step.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-3 pt-3 border-t border-slate-700/50 space-y-1"
                >
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                      <span className="text-slate-400">{detail}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* 完整对话示例 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4">实际对话示例</h3>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="text-blue-400" size={14} />
              </div>
              <div className="bg-slate-900/80 rounded-xl p-3 flex-1">
                <div className="text-slate-500 text-xs mb-1">用户</div>
                <div className="text-slate-300">帮我把 UserService 里的 get_user 方法重命名为 find_user_by_id</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Bot className="text-purple-400" size={14} />
              </div>
              <div className="bg-slate-900/80 rounded-xl p-3 flex-1">
                <div className="text-slate-500 text-xs mb-1">Claude Code (调用 Serena)</div>
                <div className="text-green-400">rename_symbol(</div>
                <div className="text-slate-400 pl-4">name_path: "UserService/get_user",</div>
                <div className="text-slate-400 pl-4">new_name: "find_user_by_id"</div>
                <div className="text-green-400">)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="text-green-400" size={14} />
              </div>
              <div className="bg-slate-900/80 rounded-xl p-3 flex-1">
                <div className="text-slate-500 text-xs mb-1">Serena 结果</div>
                <div className="text-green-400">✓ 已重命名 3 个文件中的 5 处引用</div>
                <div className="text-slate-500 text-xs mt-2">• services/user.py:42</div>
                <div className="text-slate-500 text-xs">• tests/test_user.py:15</div>
                <div className="text-slate-500 text-xs">• tests/integration.py:78</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
