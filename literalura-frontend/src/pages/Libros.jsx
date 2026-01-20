import { useState } from 'react'
import { FaBook } from 'react-icons/fa'
import { useLibros } from '../hooks/useLibros'
import LibroList from '../components/libros/LibroList'

function Libros() {
  const { libros, loading, error, refetch, fetchByIdioma, deleteLibro } = useLibros()
  const [selectedIdioma, setSelectedIdioma] = useState('')
  const [sortBy, setSortBy] = useState('')

  const handleIdiomaChange = (e) => {
    const idioma = e.target.value
    setSelectedIdioma(idioma)
    if (idioma) {
      fetchByIdioma(idioma)
    } else {
      refetch()
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      await deleteLibro(id)
    }
  }

  // Ordenar libros
  const sortedLibros = [...libros].sort((a, b) => {
    switch (sortBy) {
      case 'descargas':
        return b.numeroDeDescargas - a.numeroDeDescargas
      case 'titulo':
        return a.titulo.localeCompare(b.titulo)
      default:
        return 0
    }
  })

  return (
    <div className="animate-fade">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FaBook className="text-primary" />
            Libros Registrados
          </h1>
          <p className="text-gray-400">{libros.length} libros en tu catálogo</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedIdioma}
            onChange={handleIdiomaChange}
            className="px-4 py-2 bg-dark-200 border border-gray-700 rounded-xl text-gray-300 focus:outline-none focus:border-primary w-full sm:w-auto"
          >
            <option value="">Todos los idiomas</option>
            <option value="en">Inglés (en)</option>
            <option value="es">Español (es)</option>
            <option value="fr">Francés (fr)</option>
            <option value="de">Alemán (de)</option>
            <option value="pt">Portugués (pt)</option>
            <option value="it">Italiano (it)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-dark-200 border border-gray-700 rounded-xl text-gray-300 focus:outline-none focus:border-primary w-full sm:w-auto"
          >
            <option value="">Ordenar por</option>
            <option value="descargas">Más descargados</option>
            <option value="titulo">Título A-Z</option>
          </select>
        </div>
      </div>

      <LibroList
        libros={sortedLibros}
        loading={loading}
        error={error}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Libros
