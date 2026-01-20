import { useState, useEffect } from 'react'
import { FaChartBar, FaBook, FaDownload, FaCalculator, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import Loading from '../components/common/Loading'
import GraficoDescargas from '../components/estadisticas/GraficoDescargas'
import estadisticaService from '../services/estadisticaService'
import libroService from '../services/libroService'

function Estadisticas() {
  const [estadisticas, setEstadisticas] = useState(null)
  const [librosPorIdioma, setLibrosPorIdioma] = useState(null)
  const [top10, setTop10] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [stats, porIdioma, topLibros] = await Promise.all([
          estadisticaService.getEstadisticasDescargas(),
          estadisticaService.getLibrosPorIdioma(),
          libroService.getTop10()
        ])

        setEstadisticas(stats)
        setLibrosPorIdioma(porIdioma)
        setTop10(topLibros)
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar estadísticas')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0'
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toLocaleString()
  }

  if (loading) return <Loading text="Cargando estadísticas..." />
  if (error) return <p className="text-red-500 text-center py-12">{error}</p>

  const statsCards = [
    {
      label: 'Total Libros',
      value: estadisticas?.totalLibros || 0,
      icon: FaBook,
      color: 'primary',
      bgColor: 'bg-primary/20',
      textColor: 'text-primary',
      method: 'count()'
    },
    {
      label: 'Total Descargas',
      value: formatNumber(estadisticas?.totalDescargas),
      icon: FaDownload,
      color: 'accent',
      bgColor: 'bg-accent/20',
      textColor: 'text-accent',
      method: 'sum()'
    },
    {
      label: 'Promedio',
      value: formatNumber(estadisticas?.promedioDescargas),
      icon: FaCalculator,
      color: 'green-500',
      bgColor: 'bg-green-500/20',
      textColor: 'text-green-500',
      method: 'average()'
    },
    {
      label: 'Máximo',
      value: formatNumber(estadisticas?.maxDescargas),
      icon: FaArrowUp,
      color: 'yellow-500',
      bgColor: 'bg-yellow-500/20',
      textColor: 'text-yellow-500',
      method: 'max()'
    },
    {
      label: 'Mínimo',
      value: formatNumber(estadisticas?.minDescargas),
      icon: FaArrowDown,
      color: 'red-500',
      bgColor: 'bg-red-500/20',
      textColor: 'text-red-500',
      method: 'min()'
    }
  ]

  return (
    <div className="animate-fade">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FaChartBar className="text-primary" />
          Estadísticas
        </h1>
        <p className="text-gray-400">
          Análisis de tu catálogo usando <code className="text-accent">DoubleSummaryStatistics</code>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="glass rounded-2xl p-6 border border-gray-800 text-center hover:border-gray-700 transition-all">
            <div className={`w-14 h-14 ${stat.bgColor} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
              <stat.icon className={`${stat.textColor} text-2xl`} />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="text-xs text-gray-600 mt-2 font-mono">{stat.method}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <GraficoDescargas librosPorIdioma={librosPorIdioma} top10={top10} />

      {/* Info Box */}
      <div className="mt-8 glass rounded-2xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">
          📊 Sobre DoubleSummaryStatistics
        </h3>
        <p className="text-gray-400 mb-4">
          Las estadísticas se calculan usando <code className="text-accent bg-dark-300 px-2 py-1 rounded">DoubleSummaryStatistics</code> de Java,
          que permite obtener en una sola pasada:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <code className="text-primary">getCount()</code>
            <p className="text-gray-500 text-xs mt-1">Total de elementos</p>
          </div>
          <div className="text-center">
            <code className="text-accent">getSum()</code>
            <p className="text-gray-500 text-xs mt-1">Suma total</p>
          </div>
          <div className="text-center">
            <code className="text-green-500">getAverage()</code>
            <p className="text-gray-500 text-xs mt-1">Promedio</p>
          </div>
          <div className="text-center">
            <code className="text-yellow-500">getMax()</code>
            <p className="text-gray-500 text-xs mt-1">Valor máximo</p>
          </div>
          <div className="text-center">
            <code className="text-red-500">getMin()</code>
            <p className="text-gray-500 text-xs mt-1">Valor mínimo</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Estadisticas
