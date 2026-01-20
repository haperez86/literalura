import api from './api'

const autorService = {
  // Listar todos los autores
  getAll: async () => {
    const response = await api.get('/autores')
    return response.data
  },

  // Obtener autor por ID
  getById: async (id) => {
    const response = await api.get(`/autores/${id}`)
    return response.data
  },

  // Buscar autor por nombre
  buscarPorNombre: async (nombre) => {
    const response = await api.get('/autores/buscar', {
      params: { nombre }
    })
    return response.data
  },

  // Autores vivos en un año
  getVivosEnAnio: async (anio) => {
    const response = await api.get('/autores/vivos', {
      params: { anio }
    })
    return response.data
  },

  // Autores nacidos entre años
  getNacidosEntre: async (desde, hasta) => {
    const response = await api.get('/autores/nacidos', {
      params: { desde, hasta }
    })
    return response.data
  },

  // Autores fallecidos entre años
  getFallecidosEntre: async (desde, hasta) => {
    const response = await api.get('/autores/fallecidos', {
      params: { desde, hasta }
    })
    return response.data
  }
}

export default autorService
