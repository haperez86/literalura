import { FaBook, FaDownload, FaCalculator, FaArrowUp, FaArrowDown } from 'react-icons/fa'

function EstadisticasPanel({ estadisticas }) {
  if (!estadisticas) return null

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num?.toLocaleString() || '0'
  }

  const stats = [
    {
      label: 'Total Libros',
      value: estadisticas.totalLibros,
      icon: FaBook,
      color: 'primary',
      method: 'count()'
    },
    {
      label: 'Total Descargas',
      value: formatNumber(estadisticas.totalDescargas),
      icon: FaDownload,
      color: 'accent',
      method: 'sum()'
    },
    {
      label: 'Promedio',
      value: formatNumber(estadisticas.promedioDescargas),
      icon: FaCalculator,
      color: 'green-500',
      method: 'average()'
    },
    {
      label: 'Máximo',
      value: formatNumber(estadisticas.maxDescargas),
      icon: FaArrowUp,
      color: 'yellow-500',
      method: 'max()'
    },
    {
      label: 'Mínimo',
      value: formatNumber(estadisticas.minDescargas),
      icon: FaArrowDown,
      color: 'red-500',
      method: 'min()'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="glass rounded-2xl p-6 border border-gray-800 text-center">
          <div className={`w-14 h-14 bg-${stat.color}/20 rounded-xl mx-auto mb-4 flex items-center justify-center`}>
            <stat.icon className={`text-${stat.color} text-2xl`} />
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
          <p className="text-gray-500 text-sm">{stat.label}</p>
          <p className="text-xs text-gray-600 mt-2">{stat.method}</p>
        </div>
      ))}
    </div>
  )
}

export default EstadisticasPanel
