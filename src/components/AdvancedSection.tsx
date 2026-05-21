import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link2, Brain, Shield, Zap, Clock, GitBranch } from 'lucide-react'

type TabId = 'hooks' | 'prompt' | 'memory'

export default function AdvancedSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<TabId>('hooks')

  return (
    <section id="advanced" ref={ref} className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm mb-4">
            <Zap size={16} />
            <span>进阶内容</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Hook 系统与记忆召回</h2>
          <p className="text-slate-400">深入理解 Serena 如何与 Claude Code 协作</p>
        </motion.div>

        <div className="flex gap-2 mb-6 justify-center">
          {[
            { id: 'hooks', label: 'Hook 机制', icon: Link2 },
            { id: 'prompt', label: '提示词增强', icon: Brain },
            { id: 'memory', label: '记忆召回', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'hooks' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Hook 系统架构</h3>
              <p className="text-slate-400 text-sm mb-4">
                Serena 通过 Claude Code 的 hook 机制注入行为，在特定时机干预 AI Agent 的决策过程。
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Zap,
                    name: 'activate',
                    trigger: 'SessionStart',
                    desc: '会话开始时激活项目，检查初始化状态',
                    color: 'from-green-500 to-emerald-500',
                  },
                  {
                    icon: Shield,
                    name: 'remind',
                    trigger: 'PreToolUse',
                    desc: '连续使用文本工具时提醒切换符号工具',
                    color: 'from-yellow-500 to-amber-500',
                  },
                  {
                    icon: GitBranch,
                    name: 'auto-approve',
                    trigger: 'PreToolUse',
                    desc: '自动批准 Serena 符号工具的执行',
                    color: 'from-blue-500 to-cyan-500',
                  },
                  {
                    icon: Clock,
                    name: 'cleanup',
                    trigger: 'SessionEnd',
                    desc: '会话结束时清理临时数据',
                    color: 'from-purple-500 to-pink-500',
                  },
                ].map((hook) => (
                  <div key={hook.name} className="bg-slate-900/80 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${hook.color} flex items-center justify-center`}>
                        <hook.icon className="text-white" size={16} />
                      </div>
                      <div>
                        <code className="text-indigo-400 font-mono text-sm">serena-hook {hook.name}</code>
                        <div className="text-slate-500 text-xs">{hook.trigger}</div>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">{hook.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">ToolUseCounter 追踪机制</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# hooks.py - ToolUseCounter
class ToolUseCounter:
    """追踪工具使用模式，判断是否需要提醒"""
    
    # 连续使用阈值
    CONSECUTIVE_GREP_LIMIT = 3      # 连续 grep 3次
    CONSECUTIVE_READ_LIMIT = 4      # 连续 read 4次
    MIXED_NON_SYMBOLIC_LIMIT = 4    # 混合非符号工具 4次
    
    # 冷却时间
    _MIN_DENY_INTERVAL_SECONDS = 120  # 2分钟内只拒一次
    
    def record_tool_use(self, tool_name: str):
        """记录工具使用"""
        if is_serena_symbolic_tool(tool_name):
            self.reset()
        else:
            self._increment_counter(tool_name)
    
    def should_deny(self) -> bool:
        """判断是否应该拒绝非符号工具"""
        if self._consecutive_grep >= self.CONSECUTIVE_GREP_LIMIT:
            return True
        if self._consecutive_read >= self.CONSECUTIVE_READ_LIMIT:
            return True
        if self._mixed_non_symbolic >= self.MIXED_NON_SYMBOLIC_LIMIT:
            return True
        return False`}
              </pre>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Hook 注册配置</h3>
              <p className="text-slate-400 text-sm mb-4">在 Claude Code 的 settings.json 中配置 hook：</p>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`// ~/.claude/settings.json
{
  "hooks": {
    "preToolUse": [
      {
        "matcher": ".*",
        "command": "serena-hook remind"
      },
      {
        "matcher": "^(find_symbol|rename_symbol|find_references).*",
        "command": "serena-hook auto-approve"
      }
    ],
    "sessionStart": [
      {
        "matcher": ".*",
        "command": "serena-hook activate"
      }
    ]
  }
}`}
              </pre>
            </div>
          </motion.div>
        )}

        {activeTab === 'prompt' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">系统提示词构建流程</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# agent.py - create_system_prompt()
def create_system_prompt(self, session_id: str | None = None) -> str:
    """构建完整的系统提示词"""
    
    parts = []
    
    # 1. 上下文系统提示词
    parts.append(self._context.prompt)
    
    # 2. 激活模式的提示词
    for mode in self._get_active_modes():
        parts.append(mode.prompt)
    
    # 3. 工具和标记列表
    parts.append(self._create_tools_prompt())
    parts.append(self._create_markers_prompt())
    
    # 4. 全局记忆列表（自动注入！）
    global_mems = self.memory_manager.list_global_memories()
    if global_mems:
        parts.append(f"## Available Global Memories:")
        for mem in global_mems:
            parts.append(f"  - {mem.name}: {mem.description}")
    
    # 5. 项目激活消息
    if self._project:
        parts.append(self.get_project_activation_message())
    
    return "\n\n".join(parts)`}
              </pre>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">项目激活消息</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# agent.py - get_project_activation_message()
def get_project_activation_message(self) -> str:
    """生成项目激活时的提示信息"""
    
    msg_parts = [
        f"Project: {project.name}",
        f"Location: {project.project_root}",
        f"Languages: {', '.join(languages)}",
        f"Encoding: {file_encoding}",
        "",
        "## Project Memories:",
        "Use the read_memory tool to read these memories:",
    ]
    
    # 列出项目记忆
    for mem in project_memory_manager.list_memories():
        msg_parts.append(f"  - {mem.name}")
    
    msg_parts.append("")
    
    # 提醒未完成 onboarding
    if not self._onboarding_performed:
        msg_parts.append("REMINDER: Run 'serena onboarding' to complete setup.")
    
    return "\n".join(msg_parts)`}
              </pre>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">提示词增强时机</h3>
              <div className="space-y-3">
                {[
                  { when: 'MCP 连接时', what: 'Connection Prompt', desc: '首次连接时的引导提示' },
                  { when: '会话开始', what: 'Activation Message', desc: '激活项目时注入项目信息和记忆列表' },
                  { when: '工具调用前', what: 'Hook Remind', desc: '连续文本操作时提醒可用符号工具' },
                  { when: '工具执行时', what: 'Auto-Approve', desc: '自动批准 Serena 工具，减少交互' },
                ].map((item) => (
                  <div key={item.when} className="flex items-start gap-3 p-3 bg-slate-900/80 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
                    <div>
                      <div className="text-white text-sm font-medium">{item.when} → {item.what}</div>
                      <div className="text-slate-500 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'memory' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">记忆系统架构</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-900/80 rounded-xl p-4">
                  <h4 className="text-indigo-400 font-medium mb-2">项目记忆 (Project)</h4>
                  <code className="text-slate-400 text-xs">$PROJECT/.serena/memories/</code>
                  <p className="text-slate-500 text-xs mt-1">仅当前项目可用</p>
                </div>
                <div className="bg-slate-900/80 rounded-xl p-4">
                  <h4 className="text-green-400 font-medium mb-2">全局记忆 (Global)</h4>
                  <code className="text-slate-400 text-xs">~/.serena/global_memories/</code>
                  <p className="text-slate-500 text-xs mt-1">所有项目共享</p>
                </div>
              </div>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# memory_manager.py - MemoryManager
class MemoryManager:
    """记忆管理器 - 支持项目和全局记忆"""
    
    def list_memories(self, topic: str | None = None) -> list[Memory]:
        """列出记忆（可按 topic 过滤）"""
        ...
    
    def list_global_memories(self) -> list[Memory]:
        """列出全局记忆（在系统提示词中自动注入）"""
        ...
    
    def read_memory(self, name: str) -> str:
        """读取记忆内容"""
        ...
    
    def write_memory(self, name: str, content: str, topic: str | None = None):
        """写入记忆"""
        ...`}
              </pre>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">自动召回机制</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="text-white text-sm font-medium">项目激活时注入</div>
                    <p className="text-slate-500 text-xs mt-1">
                      get_project_activation_message() 返回项目记忆列表，提示 AI Agent 使用 read_memory 工具
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="text-white text-sm font-medium">系统提示词包含全局记忆</div>
                    <p className="text-slate-500 text-xs mt-1">
                      create_system_prompt() 自动调用 list_global_memories() 并注入到提示词
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="text-white text-sm font-medium">AI Agent 主动读取</div>
                    <p className="text-slate-500 text-xs mt-1">
                      AI 根据任务上下文决定是否调用 read_memory 获取相关记忆
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="text-white text-sm font-medium">跨记忆引用</div>
                    <p className="text-slate-500 text-xs mt-1">
                      记忆可使用 mem:OtherMemory 格式引用其他记忆，实现记忆联动
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">记忆引用与相似度检测</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# memory_reference_analysis.py
class MemoryReferenceAnalyzer:
    """分析记忆间的引用关系"""
    
    # 引用前缀
    REFERENCE_PREFIX = "mem:"
    
    def find_stale_references(self) -> list[StaleReference]:
        """查找失效的 mem: 引用"""
        for memory in self.list_memories():
            for ref in self.extract_references(memory.content):
                if not self.memory_exists(ref.name):
                    yield StaleReference(
                        source=memory.name,
                        reference=ref.name,
                        location=ref.location
                    )
    
    def compute_name_similarity(self, name1: str, name2: str) -> float:
        """计算记忆名称相似度（用于建议）"""
        # Jaccard + SequenceMatcher
        tokens1 = set(name1.lower().split())
        tokens2 = set(name2.lower().split())
        jaccard = len(tokens1 & tokens2) / len(tokens1 | tokens2)
        seq_sim = SequenceMatcher(None, name1, name2).ratio()
        return (jaccard + seq_sim) / 2
    
    def auto_prefix_bare_references(self, content: str) -> str:
        """自动修复裸引用（如 UserAuth → mem:UserAuth）"""
        ...`}
              </pre>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Onboarding 记忆初始化</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# workflow_tools.py - OnboardingTool
class OnboardingTool(Tool):
    
    def apply(self, session_id: str | None = None) -> str:
        """首次使用时初始化记忆系统"""
        
        # 确保 maintenance 记忆存在
        self.memory_manager.ensure_memory_maintenance_memory()
        
        # 返回 onboarding 提示
        return self.prompt_factory.create_onboarding_prompt()

# memory_manager.py
def ensure_memory_maintenance_memory(self):
    """自动创建记忆维护模板"""
    if not self.exists("memory_maintenance"):
        self.write_memory(
            "memory_maintenance",
            """
# 记忆维护指南

## 何时更新记忆
- 完成重要架构决策时
- 解决复杂 bug 后
- 项目依赖变化时

## 记忆命名规范
- 使用小写+下划线: user_auth_architecture
- 包含 topic 前缀: auth/login_flow

## 引用其他记忆
- 使用 mem:other_memory_name 格式
            """,
            topic="system"
        )`}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
