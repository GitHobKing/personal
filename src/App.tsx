import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navigation from './components/Navigation'

function App() {
  return (
    <main className="min-h-screen bg-bg">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <h1 className="font-mono text-4xl text-text-primary p-20">Hello</h1>
    </main>
  )
}

export default App
