import AnimatedBackground from './components/AnimatedBackground'
import ScrollProgress from './components/ScrollProgress'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Career from './sections/Career'
import Contact from './sections/Contact'

function App() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Career />
      <Contact />
    </main>
  )
}

export default App
