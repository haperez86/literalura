import api from './api'

const estadisticaService = {
  // Obtener estadísticas de descargas (DoubleSummaryStatistics)
  getEstadisticasDescargas: async () => {
    const response = await api.get('/estadisticas/descargas')
    return response.data
  },

  // Contar libros por idioma
  getLibrosPorIdioma: async () => {
    const response = await api.get('/estadisticas/por-idioma')
    return response.data
  },

  // Resumen general
  getResumen: async () => {
    const response = await api.get('/estadisticas/resumen')
    return response.data
  }
}

export default estadisticaService
