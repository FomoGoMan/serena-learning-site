import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { id: 'concept', label: '核心概念' },
  { id: 'interaction', label: '交互流程' },
  { id: 'symbols', label: '符号系统' },
  { id: 'tools', label: '工具系统' },
  { id: 'architecture', label: '架构设计' },
  { id: 'mcp', label: 'MCP协议' },
  { id: 'deepdive', label: '源码剖析' },
  { id: 'advanced', label: '进阶机制' },
  { id: 'practice', label: '实践项目' },
  { id: 'path', label: '学习路径' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-white font-semibold">Serena 学习指南</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
