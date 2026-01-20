import { FaBook, FaDownload, FaTrash } from 'react-icons/fa'

function LibroCard({ libro, onDelete, showDelete = true }) {
  const colors = [
    'from-primary/30 to-secondary/30',
    'from-secondary/30 to-pink-500/30',
    'from-accent/30 to-blue-500/30',
    'from-green-500/30 to-emerald-500/30',
    'from-yellow-500/30 to-orange-500/30',
    'from-red-500/30 to-pink-500/30',
  ]

  const borderColors = [
    'hover:border-primary/50',
    'hover:border-secondary/50',
    'hover:border-accent/50',
    'hover:border-green-500/50',
    'hover:border-yellow-500/50',
    'hover:border-red-500/50',
  ]

  const colorIndex = libro.id % colors.length

  const formatDownloads = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num?.toLocaleString() || '0'
  }

  return (
    <div className={`glass rounded-2xl overflow-hidden border border-gray-800 ${borderColors[colorIndex]} transition-all group`}>
      <div className={`h-48 bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center`}>
        <FaBook className="text-6xl text-white/30 group-hover:scale-110 transition-transform" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2">
            {libro.titulo}
          </h3>
          <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-lg flex-shrink-0 ml-2">
            {libro.idioma}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-3">{libro.autorNombre}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FaDownload />
            <span>{formatDownloads(libro.numeroDeDescargas)} descargas</span>
          </div>
          {showDelete && onDelete && (
            <button
              onClick={() => onDelete(libro.id)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group/btn"
            >
              <FaTrash className="text-gray-500 group-hover/btn:text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LibroCard
