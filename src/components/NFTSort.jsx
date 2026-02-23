import React from 'react'

const NFTSort = ({ sortBy, onChange }) => {
  return (
    <select value={sortBy} onChange={(e) => onChange(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
    </select>
  )
}

export default NFTSort
