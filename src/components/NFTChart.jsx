import React from 'react'

const NFTChart = ({ data }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="font-bold mb-4">Price History</h3>
      <div className="h-48 flex items-end gap-1">
        {data?.map((d, i) => (
          <div key={i} className="flex-1 bg-purple-600" style={{ height: `${d}%` }}></div>
        ))}
      </div>
    </div>
  )
}

export default NFTChart
