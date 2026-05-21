import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Box, Layers, Database, Cpu } from 'lucide-react'

export default function ArchitectureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<'overview' | 'tool' | 'registry'>('overview')

  return (
    <section id="architecture" ref={ref} className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm mb-4">
            <Layers size={16} />
            <span>架构设计</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">工具系统架构</h2>
          <p className="text-slate-400">理解 Serena 如何组织和管理工具</p>
        </motion.div>

        <div className="flex gap-2 mb-8 justify-center">
          {[
            { id: 'overview', label: '架构概览' },
            { id: 'tool', label: 'Tool 基类' },
            { id: 'registry', label: '注册表' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8"
          >
            <h3 className="text-white font-semibold mb-6 text-center">核心组件关系</h3>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {[
                { icon: Box, label: 'Component\n基类', color: 'from-slate-500 to-slate-600' },
                { icon: Cpu, label: 'Tool\n工具基类', color: 'from-blue-500 to-blue-600' },
                { icon: Database, label: 'ToolRegistry\n注册表', color: 'from-purple-500 to-purple-600' },
                { icon: Layers, label: 'MCP Server\n协议层', color: 'from-green-500 to-green-600' },
              ].map((item, idx) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="text-white" size={24} />
                  </div>
                  <span className="text-slate-400 text-xs text-center whitespace-pre-line">{item.label}</span>
                  {idx < 3 && (
                    <svg className="text-slate-600 rotate-90" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'tool' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Tool 基类设计</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`class Tool(Component):
    """所有工具的基类"""
    
    def apply(self, **kwargs) -> str:
        """子类必须实现的具体工具逻辑"""
        raise NotImplementedError
    
    def apply_ex(self, **kwargs) -> str:
        """执行入口：统一处理日志、异常、超时"""
        # 1. 检查工具是否激活
        # 2. 检查项目是否初始化
        # 3. 调用 apply()
        # 4. 记录工具使用
        # 5. 保存 LSP 缓存
        pass
    
    @classmethod
    def can_edit(cls) -> bool:
        """判断工具是否可编辑"""
        return issubclass(cls, ToolMarkerCanEdit)`}
              </pre>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">标记类 (Marker Classes)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {[
                    { name: 'ToolMarkerCanEdit', desc: '可编辑工具' },
                    { name: 'ToolMarkerSymbolicRead', desc: '符号读操作' },
                    { name: 'ToolMarkerSymbolicEdit', desc: '符号写操作' },
                  ].map((m) => (
                    <div key={m.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <code className="text-purple-400 text-sm">{m.name}</code>
                      <span className="text-slate-500 text-xs">- {m.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'ToolMarkerOptional', desc: '默认禁用' },
                    { name: 'ToolMarkerBeta', desc: 'Beta 功能' },
                    { name: 'ToolMarkerDoesNotRequireActiveProject', desc: '不需要项目' },
                  ].map((m) => (
                    <div key={m.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <code className="text-blue-400 text-sm">{m.name}</code>
                      <span className="text-slate-500 text-xs">- {m.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'registry' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">ToolRegistry 注册表</h3>
            <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`@singleton
class ToolRegistry:
    """全局工具注册表（单例模式）"""
    
    def __init__(self):
        self._tool_dict: dict[str, RegisteredTool] = {}
        self._discover_tools()
    
    def _discover_tools(self):
        """自动发现所有 Tool 子类"""
        for cls in iter_subclasses(Tool):
            if "apply" in cls.__dict__:
                name = cls.get_name_from_cls()
                self._tool_dict[name] = RegisteredTool(
                    tool_class=cls,
                    is_optional=issubclass(cls, ToolMarkerOptional),
                    tool_name=name
                )
    
    def get_tool_names_default_enabled(self) -> list[str]:
        """获取默认启用的工具名称"""
        return [t.tool_name for t in self._tool_dict.values() 
                if not t.is_optional]`}
            </pre>
          </motion.div>
        )}
      </div>
    </section>
  )
}
