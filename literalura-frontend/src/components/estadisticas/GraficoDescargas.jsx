import { FaLanguage, FaTrophy } from 'react-icons/fa'

function GraficoDescargas({ librosPorIdioma, top10 }) {
  const idiomas = librosPorIdioma ? Object.entries(librosPorIdioma) : []
  const totalLibros = idiomas.reduce((acc, [, count]) => acc + count, 0)

  const idiomaColors = {
    en: 'from-primary to-secondary',
    es: 'from-accent to-blue-500',
    fr: 'from-green-500 to-emerald-500',
    de: 'from-yellow-500 to-orange-500',
    pt: 'from-red-500 to-pink-500',
    it: 'from-purple-500 to-violet-500',
  }

  const idiomaNames = {
    en: 'Inglés',
    es: 'Español',
    fr: 'Francés',
    de: 'Alemán',
    pt: 'Portugués',
    it: 'Italiano',
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico por Idioma */}
      <div className="glass rounded-2xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <FaLanguage className="text-primary" />
          Libros por Idioma
        </h3>
        <div className="space-y-4">
          {idiomas.map(([idioma, count]) => {
            const percentage = totalLibros > 0 ? (count / totalLibros) * 100 : 0
            const gradient = idiomaColors[idioma] || 'from-gray-500 to-gray-600'
            const name = idiomaNames[idioma] || idioma.toUpperCase()

            return (
              <div key={idioma}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{name} ({idioma})</span>
                  <span className="text-white font-medium">{count} libros</span>
                </div>
                <div className="h-3 bg-dark-300 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top 5 Descargas */}
      <div className="glass rounded-2xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Top 5 Descargas
        </h3>
        <div className="space-y-4">
          {top10?.slice(0, 5).map((libro, index) => {
            const maxDescargas = top10[0]?.numeroDeDescargas || 1
            const percentage = (libro.numeroDeDescargas / maxDescargas) * 100

            const medalColors = ['bg-yellow-500', 'bg-gray-400', 'bg-amber-600', 'bg-dark-100 border border-gray-600', 'bg-dark-100 border border-gray-600']
            const barColors = ['bg-yellow-500', 'bg-gray-400', 'bg-amber-600', 'bg-primary', 'bg-secondary']

            return (
              <div key={libro.id} className="flex items-center gap-4">
                <span className={`w-6 h-6 ${medalColors[index]} rounded-full flex items-center justify-center ${index < 3 ? 'text-black' : 'text-white'} font-bold text-xs`}>
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium truncate">{libro.titulo}</p>
                  <div className="h-2 bg-dark-300 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full ${barColors[index]} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{libro.numeroDeDescargas?.toLocaleString()}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GraficoDescargas
