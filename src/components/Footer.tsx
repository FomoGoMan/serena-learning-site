import { MessageCircle, ExternalLink } from 'lucide-react'

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const footerLinks = {
  Documentation: [
    { label: '用户指南', href: 'https://oraios.github.io/serena/02-usage/000_intro.html' },
    { label: '工具参考', href: 'https://oraios.github.io/serena/01-about/035_tools.html' },
    { label: '配置指南', href: 'https://oraios.github.io/serena/02-usage/050_configuration.html' },
    { label: '支持的语言', href: 'https://oraios.github.io/serena/01-about/020_programming-languages.html' },
  ],
  Resources: [
    { label: '评估报告', href: 'https://oraios.github.io/serena/04-evaluation/000_evaluation-intro.html' },
    { label: '更新日志', href: 'https://oraios.github.io/serena/CHANGELOG.html' },
    { label: '贡献指南', href: 'https://oraios.github.io/serena/CONTRIBUTING.html' },
    { label: '示例项目', href: 'https://github.com/oraios/serena/tree/main/examples' },
  ],
  Community: [
    { label: 'Discord', href: 'https://discord.com/invite/cVUNQmnV4r' },
    { label: 'GitHub', href: 'https://github.com/oraios/serena' },
    { label: 'Twitter', href: 'https://twitter.com/oraiosHQ' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-900/80 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-bold text-xl">Serena</span>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              给 AI Agent 装上 IDE 级别的代码理解能力，让 AI 编程进入符号级时代。
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/oraios/serena"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://twitter.com/oraiosHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://discord.com/invite/cVUNQmnV4r"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={12} className="opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 Serena. MIT License.
          </p>
          <p className="text-slate-500 text-sm">
            Built with ❤️ for AI Agents and Developers
          </p>
        </div>
      </div>
    </footer>
  )
}
