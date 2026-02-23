import React from 'react'

const CollectionInfo = ({ collection }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <img src={collection.image} alt={collection.name} className="w-24 h-24 rounded-full mb-4" />
      <h1 className="text-2xl font-bold">{collection.name}</h1>
      <p className="text-gray-400">{collection.description}</p>
      <div className="flex gap-4 mt-4">
        <span>{collection.items} items</span>
        <span>{collection.owners} owners</span>
      </div>
    </div>
  )
}

export default CollectionInfo
