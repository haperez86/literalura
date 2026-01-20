import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaSearch, FaBook, FaUser, FaLanguage, FaDownload, FaCheck, FaSpinner } from 'react-icons/fa'
import libroService from '../services/libroService'

function BuscarLibro() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [resultado, setResultado] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setResultado(null)

    try {
      const libro = await libroService.buscar(query.trim())
      setResultado(libro)
    } catch (err) {
      setError(err.response?.data?.message || 'No se encontró el libro o hubo un error')
    } finally {
      setLoading(false)
    }
  }

  // Buscar automáticamente si viene con query param
  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      // Auto-submit
      const autoSearch = async () => {
        setLoading(true)
        try {
          const libro = await libroService.buscar(q)
          setResultado(libro)
        } catch (err) {
          setError(err.response?.data?.message || 'No se encontró el libro')
        } finally {
          setLoading(false)
        }
      }
      autoSearch()
    }
  }, [searchParams])

  return (
    <div className="animate-fade">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <FaSearch className="text-accent" />
            Buscar Libro en Gutendex
          </h1>
          <p className="text-gray-400">
            Busca un libro en la API de Gutenberg y agrégalo a tu catálogo
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="relative mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escribe el título del libro..."
              className="w-full px-6 py-4 bg-dark-300 border border-gray-700 rounded-xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              disabled={loading}
            />
            <FaBook className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full py-4 bg-gradient-to-r from-accent to-blue-500 rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <FaSearch />
                Buscar y Agregar al Catálogo
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="glass rounded-2xl p-6 border border-red-500/50 bg-red-500/10 mb-8">
            <p className="text-red-500 flex items-center gap-2">
              <span>❌</span> {error}
            </p>
          </div>
        )}

        {/* Result */}
        {resultado && (
          <div className="glass rounded-2xl p-6 border border-accent/50 bg-accent/5">
            <div className="flex items-center gap-2 text-accent mb-4">
              <FaCheck />
              <span className="font-medium">Libro encontrado y agregado:</span>
            </div>
            <div className="flex gap-6">
              <div className="w-32 h-44 bg-gradient-to-br from-accent/30 to-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaBook className="text-4xl text-accent/50" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{resultado.titulo}</h3>
                <p className="text-gray-400 mb-1 flex items-center gap-2">
                  <FaUser /> {resultado.autorNombre}
                </p>
                <p className="text-gray-400 mb-1 flex items-center gap-2">
                  <FaLanguage /> {resultado.idioma?.toUpperCase() || 'N/A'}
                </p>
                <p className="text-gray-400 mb-4 flex items-center gap-2">
                  <FaDownload /> {resultado.numeroDeDescargas?.toLocaleString()} descargas
                </p>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm inline-flex items-center gap-1">
                  <FaCheck />
                  Guardado en tu catálogo
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            💡 Tip: Puedes buscar por título completo o parcial. Ej: "Pride", "Romeo", "Don Quijote"
          </p>
        </div>
      </div>
    </div>
  )
}

export default BuscarLibro
