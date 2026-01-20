import { FaUser, FaBook } from 'react-icons/fa'

function AutorCard({ autor }) {
  const colors = [
    'from-secondary to-pink-500',
    'from-accent to-blue-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-primary to-violet-500',
    'from-yellow-500 to-amber-500',
  ]

  const borderColors = [
    'hover:border-secondary/50',
    'hover:border-accent/50',
    'hover:border-green-500/50',
    'hover:border-orange-500/50',
    'hover:border-primary/50',
    'hover:border-yellow-500/50',
  ]

  const colorIndex = autor.id % colors.length

  const formatYears = () => {
    const nacimiento = autor.fechaDeNacimiento || '?'
    const fallecimiento = autor.fechaDeFallecimiento || 'presente'
    return `${nacimiento} - ${fallecimiento}`
  }

  return (
    <div className={`glass rounded-2xl p-6 border border-gray-800 ${borderColors[colorIndex]} transition-all text-center group`}>
      <div className={`w-20 h-20 bg-gradient-to-br ${colors[colorIndex]} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <FaUser className="text-3xl text-white" />
      </div>
      <h3 className="font-semibold text-white text-lg">{autor.nombre}</h3>
      <p className="text-gray-500 text-sm mb-3">{formatYears()}</p>
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full flex items-center gap-1">
          <FaBook />
          {autor.cantidadLibros} libros
        </span>
      </div>
    </div>
  )
}

export default AutorCard
