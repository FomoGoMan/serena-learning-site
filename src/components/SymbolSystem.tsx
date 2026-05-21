import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronRight, Code, Layers, Target } from 'lucide-react'

export default function SymbolSystem() {
  const [activeTab, setActiveTab] = useState<'concept' | 'example' | 'comparison'>('concept')

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm mb-4">
            <Layers size={16} />
            <span>核心概念</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">符号系统 (Symbol System)</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Serena 使用「符号」而不是「行号」来理解和操作代码。
            符号是代码结构的高层抽象，让 AI 能够精确地操作代码。
          </p>
        </motion.div>

        <div className="flex gap-2 mb-8 justify-center">
          {[
            { id: 'concept', label: '概念' },
            { id: 'example', label: '示例' },
            { id: 'comparison', label: '对比' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'concept' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Target,
                title: 'NamePath 符号路径',
                desc: 'MyClass/my_method 表示「MyClass 类中的 my_method 方法」',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Layers,
                title: '符号识别',
                desc: '自动识别类、方法、变量等代码结构',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Code,
                title: '位置无关',
                desc: '基于符号而非行号，移动代码不会导致引用失效',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'example' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
              <div className="text-purple-400 font-medium mb-4">// 代码示例：Python 类结构</div>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap">
{`class UserService:           # NamePath: UserService
    def __init__(self):      # NamePath: UserService/__init__
        self.users = []
    
    def get_user(self, id):   # NamePath: UserService/get_user
        return self.users[id]`}
              </pre>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
              <div className="text-green-400 font-medium mb-4">// 符号操作示例</div>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap">
{`# 查找符号
find_symbol("UserService/get_user")
→ 返回: { name: "get_user", kind: "method", ... }

# 重命名符号 (跨文件)
rename_symbol("UserService/get_user", "find_user_by_id")
→ 自动更新所有引用

# 查找引用
find_references("UserService/get_user")
→ 返回所有引用此方法的代码位置`}
              </pre>
            </div>
          </motion.div>
        )}

        {activeTab === 'comparison' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="bg-slate-800/50 border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">❌ 传统方式 (基于文本)</h3>
              <div className="space-y-3 text-slate-400">
                <div className="flex items-start gap-2">
                  <span className="text-red-500">1.</span>
                  <code className="bg-slate-900 px-2 py-1 rounded font-mono text-sm">grep -r "method_name"</code>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">2.</span>
                  <span>手动阅读找到的文件</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">3.</span>
                  <code className="bg-slate-900 px-2 py-1 rounded font-mono text-sm">sed -i 's/old/new/g'</code>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">4.</span>
                  <span>检查是否破坏其他代码</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">5.</span>
                  <span>重复以上步骤...</span>
                </div>
              </div>
              <div className="mt-4 text-red-400 text-sm">
                ⚠️ 容易出错、效率低下、无法保证正确性
              </div>
            </div>

            <div className="bg-slate-800/50 border border-green-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-green-400 mb-4">✓ Serena 方式 (符号级)</h3>
              <div className="space-y-3 text-slate-400">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">1.</span>
                  <code className="bg-slate-900 px-2 py-1 rounded text-green-300 font-mono text-sm">rename_symbol("Class/method", "new_name")</code>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  <span className="text-green-300">自动分析影响范围</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  <span className="text-green-300">精准修改，零误伤</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  <span className="text-green-300">所有引用自动更新</span>
                </div>
              </div>
              <div className="mt-4 text-green-400 text-sm">
                ✨ 原子操作、可预测、安全可靠
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-purple-400">
            <ChevronRight size={20} />
            <span>继续了解工具架构设计</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
