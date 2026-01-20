import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaBook, FaFeather, FaSearch, FaChartBar, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Inicio', icon: FaHome },
    { path: '/libros', label: 'Libros', icon: FaBook },
    { path: '/autores', label: 'Autores', icon: FaFeather },
    { path: '/buscar', label: 'Buscar', icon: FaSearch },
    { path: '/estadisticas', label: 'Estadísticas', icon: FaChartBar },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-dark-300/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">📚</span>
            </div>
            <span className="text-xl font-bold gradient-text">LiterAlura</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="text-sm" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                  isActive(item.path)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon />
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
