import React from 'react'

const NFTActivity = ({ activities }) => {
  return (
    <div className="space-y-3">
      {activities?.map((a, i) => (
        <div key={i} className="bg-gray-800 p-3 rounded flex justify-between">
          <span>{a.type}</span>
          <span className="text-gray-400">{a.price} STX</span>
        </div>
      ))}
    </div>
  )
}

export default NFTActivity
