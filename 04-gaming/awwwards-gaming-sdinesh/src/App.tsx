import Hero from "./components/Hero"
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'
function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <About />
      <Navbar />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  )
}

export default App