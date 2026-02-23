import React from 'react'

const NFTFilter = ({ filters, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, i) => (
        <button
          key={i}
          onClick={() => onChange(filter.value)}
          className="bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-purple-600"
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default NFTFilter
