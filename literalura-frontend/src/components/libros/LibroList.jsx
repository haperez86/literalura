import LibroCard from './LibroCard'
import Loading from '../common/Loading'

function LibroList({ libros, loading, error, onDelete }) {
  if (loading) {
    return <Loading text="Cargando libros..." />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!libros || libros.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No hay libros registrados</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
      {libros.map((libro) => (
        <LibroCard key={libro.id} libro={libro} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default LibroList
