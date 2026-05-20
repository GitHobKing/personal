import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'

function App() {
  return (
    <main className="min-h-screen bg-bg">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Hero />
    </main>
  )
}

export default App
