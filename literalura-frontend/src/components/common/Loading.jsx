function Loading({ text = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400">{text}</p>
    </div>
  )
}

export default Loading
