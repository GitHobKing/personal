import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Career from './sections/Career'

function App() {
  return (
    <main className="min-h-screen bg-bg">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Career />
    </main>
  )
}

export default App
