import { useState, useEffect } from 'react'
import libroService from '../services/libroService'

export function useLibros() {
  const [libros, setLibros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchLibros = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await libroService.getAll()
      setLibros(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar libros')
    } finally {
      setLoading(false)
    }
  }

  const fetchByIdioma = async (idioma) => {
    try {
      setLoading(true)
      setError(null)
      const data = await libroService.getByIdioma(idioma)
      setLibros(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al filtrar por idioma')
    } finally {
      setLoading(false)
    }
  }

  const deleteLibro = async (id) => {
    try {
      await libroService.delete(id)
      setLibros(libros.filter(libro => libro.id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar libro')
    }
  }

  useEffect(() => {
    fetchLibros()
  }, [])

  return {
    libros,
    loading,
    error,
    refetch: fetchLibros,
    fetchByIdioma,
    deleteLibro
  }
}

export function useTop10() {
  const [top10, setTop10] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        setLoading(true)
        const data = await libroService.getTop10()
        setTop10(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar Top 10')
      } finally {
        setLoading(false)
      }
    }

    fetchTop10()
  }, [])

  return { top10, loading, error }
}
