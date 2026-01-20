import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Libros from './pages/Libros'
import Autores from './pages/Autores'
import BuscarLibro from './pages/BuscarLibro'
import Estadisticas from './pages/Estadisticas'

function App() {
  return (
    <div className="min-h-screen bg-dark-400">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/buscar" element={<BuscarLibro />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📚</span>
              </div>
              <span className="text-gray-400">LiterAlura © 2024 - Alura LATAM Challenge</span>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <span className="text-sm">Desarrollado con:</span>
              <span className="px-2 py-1 bg-dark-200 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-dark-200 rounded text-xs">Tailwind CSS</span>
              <span className="px-2 py-1 bg-dark-200 rounded text-xs">Spring Boot</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
