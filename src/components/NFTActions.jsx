import React from 'react'

const NFTActions = ({ nft, onBuy, onList, onTransfer }) => {
  return (
    <div className="flex gap-3">
      {onBuy && <button onClick={onBuy} className="bg-purple-600 px-4 py-2 rounded">Buy</button>}
      {onList && <button onClick={onList} className="bg-blue-600 px-4 py-2 rounded">List</button>}
      {onTransfer && <button onClick={onTransfer} className="bg-gray-600 px-4 py-2 rounded">Transfer</button>}
    </div>
  )
}

export default NFTActions
