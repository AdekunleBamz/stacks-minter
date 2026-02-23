import React from 'react'

const SearchFilter = ({ search, onSearchChange, sortBy, onSortChange, filters }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        placeholder="Search NFTs..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 flex-1"
      />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
      >
        <option value="recent">Most Recent</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  )
}

export default SearchFilter
