import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ConceptSection from './components/ConceptSection'
import InteractionFlowSection from './components/InteractionFlowSection'
import SymbolSection from './components/SymbolSection'
import ToolSystemSection from './components/ToolSystemSection'
import ArchitectureSection from './components/ArchitectureSection'
import MCPSection from './components/MCPSection'
import DeepDiveSection from './components/DeepDiveSection'
import AdvancedSection from './components/AdvancedSection'
import PracticeSection from './components/PracticeSection'
import LearningPathSection from './components/LearningPathSection'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <main>
        <HeroSection />
        <ConceptSection />
        <InteractionFlowSection />
        <SymbolSection />
        <ToolSystemSection />
        <ArchitectureSection />
        <MCPSection />
        <DeepDiveSection />
        <AdvancedSection />
        <PracticeSection />
        <LearningPathSection />
      </main>
      <footer className="py-8 text-center text-slate-500 border-t border-slate-800">
        <p>Serena 学习指南 - 深入理解 AI Agent 代码智能工具的设计与实现</p>
      </footer>
    </div>
  )
}

export default App
