import React from 'react'

const TraitDisplay = ({ traits }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {traits?.map((trait, i) => (
        <div key={i} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
          <span className="text-gray-400">{trait.trait_type}:</span> {String(trait.value)}
        </div>
      ))}
    </div>
  )
}

export default TraitDisplay
