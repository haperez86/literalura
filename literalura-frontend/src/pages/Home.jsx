import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBook, FaFeather, FaDownload, FaLanguage } from 'react-icons/fa'
import SearchBar from '../components/common/SearchBar'
import Top10Libros from '../components/libros/Top10Libros'
import libroService from '../services/libroService'
import estadisticaService from '../services/estadisticaService'

function Home() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalLibros: 0,
    totalAutores: 0,
    totalDescargas: 0,
    totalIdiomas: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [estadisticas, porIdioma] = await Promise.all([
          estadisticaService.getEstadisticasDescargas(),
          estadisticaService.getLibrosPorIdioma()
        ])

        setStats({
          totalLibros: estadisticas.totalLibros || 0,
          totalAutores: 0, // Se podría agregar endpoint
          totalDescargas: estadisticas.totalDescargas || 0,
          totalIdiomas: Object.keys(porIdioma || {}).length
        })
      } catch (error) {
        console.error('Error cargando estadísticas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const handleSearch = async (query) => {
    navigate(`/buscar?q=${encodeURIComponent(query)}`)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num?.toLocaleString() || '0'
  }

  const statsCards = [
    { icon: FaBook, label: 'Libros Registrados', value: stats.totalLibros, color: 'primary' },
    { icon: FaFeather, label: 'Autores', value: stats.totalAutores || '—', color: 'secondary' },
    { icon: FaDownload, label: 'Total Descargas', value: formatNumber(stats.totalDescargas), color: 'accent' },
    { icon: FaLanguage, label: 'Idiomas', value: stats.totalIdiomas, color: 'green-500' },
  ]

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <div className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Catálogo de Libros</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Explora, busca y descubre libros del proyecto Gutenberg.
          Guarda tus favoritos y analiza estadísticas de descargas.
        </p>

        {/* Quick Search */}
        <div className="max-w-xl mx-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Buscar un libro por título..."
            buttonText="Buscar"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`glass rounded-2xl p-4 sm:p-6 border border-gray-800 hover:border-${stat.color}/50 transition-all`}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${stat.color}/20 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`text-${stat.color} text-lg sm:text-xl`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xl sm:text-2xl font-bold text-white truncate">
                  {loading ? '...' : stat.value}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top 10 Section */}
      <Top10Libros />
    </div>
  )
}

export default Home
