import { useState, useEffect } from 'react'
import autorService from '../services/autorService'

export function useAutores() {
  const [autores, setAutores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAutores = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await autorService.getAll()
      setAutores(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar autores')
    } finally {
      setLoading(false)
    }
  }

  const buscarPorNombre = async (nombre) => {
    try {
      setLoading(true)
      setError(null)
      const data = await autorService.buscarPorNombre(nombre)
      setAutores(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al buscar autor')
    } finally {
      setLoading(false)
    }
  }

  const fetchVivosEnAnio = async (anio) => {
    try {
      setLoading(true)
      setError(null)
      const data = await autorService.getVivosEnAnio(anio)
      setAutores(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al filtrar autores vivos')
    } finally {
      setLoading(false)
    }
  }

  const fetchNacidosEntre = async (desde, hasta) => {
    try {
      setLoading(true)
      setError(null)
      const data = await autorService.getNacidosEntre(desde, hasta)
      setAutores(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al filtrar por nacimiento')
    } finally {
      setLoading(false)
    }
  }

  const fetchFallecidosEntre = async (desde, hasta) => {
    try {
      setLoading(true)
      setError(null)
      const data = await autorService.getFallecidosEntre(desde, hasta)
      setAutores(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al filtrar por fallecimiento')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAutores()
  }, [])

  return {
    autores,
    loading,
    error,
    refetch: fetchAutores,
    buscarPorNombre,
    fetchVivosEnAnio,
    fetchNacidosEntre,
    fetchFallecidosEntre
  }
}
