import AutorCard from './AutorCard'
import Loading from '../common/Loading'

function AutorList({ autores, loading, error }) {
  if (loading) {
    return <Loading text="Cargando autores..." />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!autores || autores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No hay autores registrados</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {autores.map((autor) => (
        <AutorCard key={autor.id} autor={autor} />
      ))}
    </div>
  )
}

export default AutorList
