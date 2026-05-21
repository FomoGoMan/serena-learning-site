import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Code2, Database, GitBranch, FileCode, Cpu } from 'lucide-react'

type TabId = 'tool_execute' | 'symbol_retriever' | 'code_editor' | 'mcp_server'

export default function DeepDiveSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<TabId>('tool_execute')

  return (
    <section id="deepdive" ref={ref} className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm mb-4">
            <Code2 size={16} />
            <span>源码剖析</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">核心源码深度解析</h2>
          <p className="text-slate-400">深入理解 Serena 核心模块的实现细节</p>
        </motion.div>

        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          {[
            { id: 'tool_execute', label: '工具执行', icon: Cpu },
            { id: 'symbol_retriever', label: '符号检索', icon: GitBranch },
            { id: 'code_editor', label: '代码编辑', icon: FileCode },
            { id: 'mcp_server', label: 'MCP服务', icon: Database },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'tool_execute' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Tool.apply_ex 执行流程</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# tools_base.py - Tool.apply_ex 方法
def apply_ex(self, log_call=True, catch_exceptions=True, mcp_ctx=None, **kwargs) -> str:
    """工具执行入口"""
    
    # 1. 获取会话ID
    session_id = "global"
    if mcp_ctx is not None:
        session_id = "%x" % id(mcp_ctx.session)
    
    def task() -> str:
        apply_fn = self.get_apply_fn()
        
        # 2. 检查工具是否激活
        if not self.is_active():
            return f"Error: Tool '{self.get_name()}' is not active"
        
        # 3. 检查项目是否初始化
        if not isinstance(self, ToolMarkerDoesNotRequireActiveProject):
            if self.agent.get_active_project() is None:
                return "Error: No active project"
        
        # 4. 添加会话ID（如果工具需要）
        apply_kwargs = dict(kwargs)
        if self._is_session_aware:
            apply_kwargs["session_id"] = session_id
        
        # 5. 执行工具
        try:
            result = apply_fn(**apply_kwargs)
        except SolidLSPException as e:
            if e.is_language_server_terminated():
                # 重启 LSP 并重试
                self.agent.get_language_server_manager_or_raise()...
                result = apply_fn(**apply_kwargs)
        
        # 6. 记录工具使用
        self.agent.record_tool_usage(apply_kwargs, result, self)
        
        return result
    
    # 7. 在任务执行器中运行（带超时）
    task_exec = self.agent.issue_task(task, name=self.__class__.__name__)
    return task_exec.result(timeout=self.agent.serena_config.tool_timeout)`}
              </pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <h4 className="text-white font-medium mb-3">关键设计点</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>
                      <span className="text-purple-400">统一入口</span>
                      <p className="text-slate-500 text-xs">所有工具都通过 apply_ex 执行</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <div>
                      <span className="text-blue-400">异常恢复</span>
                      <p className="text-slate-500 text-xs">LSP 断开时自动重连重试</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                    <div>
                      <span className="text-green-400">超时控制</span>
                      <p className="text-slate-500 text-xs">通过 task_executor 管控</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <h4 className="text-white font-medium mb-3">执行上下文</h4>
                <pre className="text-slate-400 font-mono text-xs whitespace-pre-wrap">
{`ToolExecutionContext:
  ├── agent: SerenaAgent      # Agent 引用
  ├── project: Project       # 当前项目
  ├── session_id: str        # 会话标识
  ├── language_server: LSP   # LSP 连接
  └── config: SerenaConfig   # 配置信息`}
                </pre>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'symbol_retriever' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">NamePathMatcher 匹配逻辑</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# symbol.py - NamePathMatcher
class NamePathMatcher:
    """
    匹配符号的 name_path
    支持三种模式:
    - 简单名称: "method" 匹配任何名为 method 的符号
    - 相对路径: "Class/method" 匹配 Class 下的 method
    - 绝对路径: "/Class/method" 完全匹配
    """
    
    def matches_ls_symbol(self, symbol: "LanguageServerSymbol") -> bool:
        return self.matches_reversed_components(
            symbol.iter_name_path_components_reversed()
        )
    
    def matches_reversed_components(self, components_reversed: Iterator):
        """从后向前匹配"""
        for pattern_component in reversed(self._components):
            symbol_component = next(components_reversed)
            if not pattern_component.matches(symbol_component):
                return False
        return True

# 使用示例
matcher = NamePathMatcher("UserService/get_user", substring_matching=False)
matcher.matches_ls_symbol(symbol)  # True/False`}
              </pre>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">符号检索流程</h3>
              <div className="flex items-center justify-between text-sm overflow-x-auto pb-2">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg">find_symbol()</div>
                  <svg className="text-slate-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg">NamePathMatcher</div>
                  <svg className="text-slate-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg">LSP 搜索</div>
                  <svg className="text-slate-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <div className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg">结果过滤</div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'code_editor' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">EditedFileContext 原子编辑</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# tools_base.py - EditedFileContext
class EditedFileContext:
    """文件编辑上下文管理器，确保原子性写入"""
    
    def __init__(self, relative_path: str, code_editor: "CodeEditor"):
        self._relative_path = relative_path
        self._code_editor = code_editor
    
    def __enter__(self) -> Self:
        self._edited_file_context = self._code_editor.edited_file_context(
            self._relative_path
        )
        self._edited_file = self._edited_file_context.__enter__()
        return self
    
    def get_original_content(self) -> str:
        return self._edited_file.get_contents()
    
    def set_updated_content(self, content: str) -> None:
        self._edited_file.set_contents(content)
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # 只有在没有异常时才提交更改
        self._edited_file_context.__exit__(exc_type, exc_val, exc_tb)

# 使用方式
with EditedFileContext(path, editor) as ctx:
    original = ctx.get_original_content()
    updated = transform(original)
    ctx.set_updated_content(updated)
# 退出时自动写入文件`}
              </pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">为什么需要上下文管理器？</h4>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• 确保编辑内容的原子性</li>
                  <li>• 异常时自动回滚</li>
                  <li>• 支持撤销操作</li>
                  <li>• 统一文件写入接口</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">CodeEditor 抽象</h4>
                <pre className="text-slate-400 font-mono text-xs">
{`CodeEditor (ABC)
├── LanguageServerCodeEditor
│   └── 基于 LSP 的编辑
└── JetBrainsCodeEditor
    └── 基于 IDE 的编辑`}
                </pre>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'mcp_server' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">MCP Server 启动流程</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# mcp.py - SerenaMCPFactory.create_mcp_server
def create_mcp_server(self, ...) -> FastMCP:
    # 1. 加载配置
    config = self._create_default_serena_config()
    
    # 2. 创建 Agent
    self.agent = self._create_serena_agent(config)
    
    # 3. 配置 FastMCP
    Settings.model_config = SettingsConfigDict(
        env_prefix="FASTMCP_"
    )
    
    # 4. 创建 MCP 服务器
    mcp = FastMCP(
        name="Serena",
        lifespan=self.server_lifespan,
        instructions=self._get_initial_instructions()
    )
    
    # 5. 注册工具
    self._set_mcp_tools(mcp)
    
    return mcp

# 工具注册
def _set_mcp_tools(self, mcp, openai_tool_compatible=False):
    for tool in self._iter_tools():
        mcp_tool = self.make_mcp_tool(tool, ...)
        mcp._tool_manager._tools[tool.get_name()] = mcp_tool`}
              </pre>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">MCP 请求处理</h3>
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
{`# FastMCP 收到请求后的处理流程:
1. 解析 JSON-RPC 2.0 请求
2. 提取 method 和 params
3. 调用对应的 tool handler
4. Tool.apply_ex() 执行工具
5. 捕获结果或异常
6. 返回 JSON-RPC 响应

# 响应格式
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { ... }  // 或 "error": { ... }
}`}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

