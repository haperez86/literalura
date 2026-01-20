import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

function SearchBar({ onSearch, placeholder = 'Buscar...', buttonText = 'Buscar' }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all pr-20 sm:pr-32"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-medium hover:opacity-90 transition-all flex items-center gap-1 sm:gap-2"
        >
          <FaSearch className="text-sm" />
          <span className="hidden sm:inline">{buttonText}</span>
        </button>
      </div>
    </form>
  )
}

export default SearchBar
