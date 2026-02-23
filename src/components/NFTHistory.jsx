import React from 'react'

const NFTHistory = ({ events = [] }) => {
  return (
    <div className="space-y-2">
      {events.length === 0 ? (
        <p className="text-gray-400">No history yet</p>
      ) : (
        events.map((event, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-3 flex justify-between">
            <div>
              <p className="font-medium">{event.type}</p>
              <p className="text-gray-400 text-sm">{event.from} → {event.to}</p>
            </div>
            <p className="text-gray-400 text-sm">{new Date(event.timestamp).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default NFTHistory
