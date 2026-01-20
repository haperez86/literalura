import { useState } from 'react'
import { FaFeather, FaSearch, FaHeart, FaBaby, FaCross, FaFilter } from 'react-icons/fa'
import { useAutores } from '../hooks/useAutores'
import AutorList from '../components/autores/AutorList'

function Autores() {
  const {
    autores,
    loading,
    error,
    refetch,
    buscarPorNombre,
    fetchVivosEnAnio,
    fetchNacidosEntre,
    fetchFallecidosEntre
  } = useAutores()

  const [searchNombre, setSearchNombre] = useState('')
  const [anioVivos, setAnioVivos] = useState('')
  const [nacidosDesde, setNacidosDesde] = useState('')
  const [nacidosHasta, setNacidosHasta] = useState('')
  const [fallecidosDesde, setFallecidosDesde] = useState('')
  const [fallecidosHasta, setFallecidosHasta] = useState('')

  const handleBuscarNombre = (e) => {
    e.preventDefault()
    if (searchNombre.trim()) {
      buscarPorNombre(searchNombre.trim())
    }
  }

  const handleFiltrarVivos = () => {
    if (anioVivos) {
      fetchVivosEnAnio(parseInt(anioVivos))
    }
  }

  const handleFiltrarNacidos = () => {
    if (nacidosDesde && nacidosHasta) {
      fetchNacidosEntre(parseInt(nacidosDesde), parseInt(nacidosHasta))
    }
  }

  const handleFiltrarFallecidos = () => {
    if (fallecidosDesde && fallecidosHasta) {
      fetchFallecidosEntre(parseInt(fallecidosDesde), parseInt(fallecidosHasta))
    }
  }

  const handleLimpiarFiltros = () => {
    setSearchNombre('')
    setAnioVivos('')
    setNacidosDesde('')
    setNacidosHasta('')
    setFallecidosDesde('')
    setFallecidosHasta('')
    refetch()
  }

  return (
    <div className="animate-fade">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FaFeather className="text-secondary" />
            Autores
          </h1>
          <p className="text-gray-400">{autores.length} autores en tu catálogo</p>
        </div>

        {/* Search by name */}
        <form onSubmit={handleBuscarNombre} className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchNombre}
              onChange={(e) => setSearchNombre(e.target.value)}
              placeholder="Buscar autor..."
              className="pl-10 pr-4 py-2 bg-dark-200 border border-gray-700 rounded-xl text-gray-300 focus:outline-none focus:border-secondary w-64"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-secondary rounded-xl text-white hover:bg-secondary/80 transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Filter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Filtro Vivos en Año */}
        <div className="glass rounded-xl p-4 border border-gray-800">
          <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <FaHeart className="text-red-500" />
            Autores Vivos en Año
          </h4>
          <div className="flex gap-2">
            <input
              type="number"
              value={anioVivos}
              onChange={(e) => setAnioVivos(e.target.value)}
              placeholder="Ej: 1850"
              className="flex-1 px-3 py-2 bg-dark-300 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-secondary"
            />
            <button
              onClick={handleFiltrarVivos}
              className="px-4 py-2 bg-secondary rounded-lg text-white hover:bg-secondary/80 transition-colors"
            >
              Filtrar
            </button>
          </div>
        </div>

        {/* Filtro Nacidos entre */}
        <div className="glass rounded-xl p-4 border border-gray-800">
          <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <FaBaby className="text-green-500" />
            Nacidos entre Años
          </h4>
          <div className="flex gap-2">
            <input
              type="number"
              value={nacidosDesde}
              onChange={(e) => setNacidosDesde(e.target.value)}
              placeholder="Desde"
              className="flex-1 px-3 py-2 bg-dark-300 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-green-500"
            />
            <input
              type="number"
              value={nacidosHasta}
              onChange={(e) => setNacidosHasta(e.target.value)}
              placeholder="Hasta"
              className="flex-1 px-3 py-2 bg-dark-300 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-green-500"
            />
            <button
              onClick={handleFiltrarNacidos}
              className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors"
            >
              <FaFilter />
            </button>
          </div>
        </div>

        {/* Filtro Fallecidos entre */}
        <div className="glass rounded-xl p-4 border border-gray-800">
          <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <FaCross className="text-gray-500" />
            Fallecidos entre Años
          </h4>
          <div className="flex gap-2">
            <input
              type="number"
              value={fallecidosDesde}
              onChange={(e) => setFallecidosDesde(e.target.value)}
              placeholder="Desde"
              className="flex-1 px-3 py-2 bg-dark-300 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-gray-500"
            />
            <input
              type="number"
              value={fallecidosHasta}
              onChange={(e) => setFallecidosHasta(e.target.value)}
              placeholder="Hasta"
              className="flex-1 px-3 py-2 bg-dark-300 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-gray-500"
            />
            <button
              onClick={handleFiltrarFallecidos}
              className="px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors"
            >
              <FaFilter />
            </button>
          </div>
        </div>
      </div>

      {/* Limpiar Filtros */}
      <div className="mb-6">
        <button
          onClick={handleLimpiarFiltros}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          ✕ Limpiar filtros y mostrar todos
        </button>
      </div>

      <AutorList autores={autores} loading={loading} error={error} />
    </div>
  )
}

export default Autores
