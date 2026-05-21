import { motion } from 'framer-motion'
import { BookOpen, Code2, Bot, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="min-h-screen flex items-center pt-14 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm">
            <BookOpen size={16} />
            <span>开源项目学习指南</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            深入理解
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Serena </span>
            <br />
            AI Agent 代码工具的设计与实现
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Serena 是一个面向 AI Agent 的代码智能工具，通过 MCP 协议与 AI 客户端集成，
            提供符号级的代码理解和编辑能力。本指南将帮助你深入理解其核心设计理念。
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <Code2 className="text-blue-400" size={18} />
              <span className="text-slate-300 text-sm">符号级抽象</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <Bot className="text-green-400" size={18} />
              <span className="text-slate-300 text-sm">MCP 协议</span>
            </div>
          </div>

          <div className="pt-8">
            <a
              href="#concept"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>开始学习</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 text-center">
            {[
              { label: '编程语言', value: '40+' },
              { label: '工具类型', value: '15+' },
              { label: '代码行数', value: '~30K' },
              { label: '设计模式', value: '5+' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
