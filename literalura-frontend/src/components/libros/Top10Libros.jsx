import { FaBook, FaDownload, FaTrophy } from 'react-icons/fa'
import { useTop10 } from '../../hooks/useLibros'
import Loading from '../common/Loading'

function Top10Libros() {
  const { top10, loading, error } = useTop10()

  if (loading) return <Loading text="Cargando Top 10..." />
  if (error) return <p className="text-red-500">{error}</p>

  const getMedalColor = (index) => {
    switch (index) {
      case 0: return 'bg-yellow-500 text-black'
      case 1: return 'bg-gray-400 text-black'
      case 2: return 'bg-amber-600 text-white'
      default: return 'bg-dark-100 border border-gray-600 text-white'
    }
  }

  const getGradient = (index) => {
    switch (index) {
      case 0: return 'from-yellow-500/20 to-orange-500/20 hover:border-yellow-500/50'
      case 1: return 'from-gray-500/20 to-slate-500/20 hover:border-gray-500/50'
      case 2: return 'from-amber-600/20 to-orange-600/20 hover:border-amber-600/50'
      default: return 'from-primary/20 to-secondary/20 hover:border-primary/50'
    }
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <FaTrophy className="text-yellow-500" />
          Top 10 Más Descargados
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {top10.slice(0, 5).map((libro, index) => (
          <div
            key={libro.id}
            className={`glass rounded-2xl p-3 sm:p-4 border border-gray-800 ${getGradient(index)} transition-all group cursor-pointer`}
          >
            <div className="relative mb-3">
              <div className={`absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 ${getMedalColor(index)} rounded-full flex items-center justify-center font-bold text-xs sm:text-sm`}>
                {index + 1}
              </div>
              <div className={`w-full h-24 sm:h-32 bg-gradient-to-br ${getGradient(index).split(' ')[0]} ${getGradient(index).split(' ')[1]} rounded-xl flex items-center justify-center`}>
                <FaBook className="text-3xl sm:text-4xl text-white/30" />
              </div>
            </div>
            <h3 className="font-semibold text-white text-xs sm:text-sm truncate group-hover:text-yellow-500 transition-colors">
              {libro.titulo}
            </h3>
            <p className="text-gray-500 text-xs truncate">{libro.autorNombre}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
              <FaDownload className="text-xs" />
              <span className="text-xs">{libro.numeroDeDescargas?.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Resto del Top 10 en formato lista */}
      {top10.length > 5 && (
        <div className="mt-6 glass rounded-2xl border border-gray-800 divide-y divide-gray-800">
          {top10.slice(5).map((libro, index) => (
            <div key={libro.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-white/5 transition-colors">
              <span className="w-6 h-6 sm:w-8 sm:h-8 bg-dark-100 border border-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                {index + 6}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm sm:text-base truncate">{libro.titulo}</h4>
                <p className="text-gray-500 text-xs sm:text-sm truncate">{libro.autorNombre}</p>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
                <FaDownload className="text-xs" />
                <span>{libro.numeroDeDescargas?.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Top10Libros
