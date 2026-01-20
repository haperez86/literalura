import api from './api'

const libroService = {
  // Listar todos los libros
  getAll: async () => {
    const response = await api.get('/libros')
    return response.data
  },

  // Obtener libro por ID
  getById: async (id) => {
    const response = await api.get(`/libros/${id}`)
    return response.data
  },

  // Buscar libro en API externa y guardar
  buscar: async (titulo) => {
    const response = await api.get('/libros/buscar', {
      params: { titulo }
    })
    return response.data
  },

  // Listar por idioma
  getByIdioma: async (idioma) => {
    const response = await api.get(`/libros/idioma/${idioma}`)
    return response.data
  },

  // Top 10 más descargados
  getTop10: async () => {
    const response = await api.get('/libros/top10')
    return response.data
  },

  // Eliminar libro
  delete: async (id) => {
    await api.delete(`/libros/${id}`)
  }
}

export default libroService
