import React from 'react'

const NFTStatus = ({ status }) => {
  const colors = { listed: 'text-green-400', minted: 'text-purple-400', sold: 'text-gray-400' }
  return <span className={colors[status] || 'text-white'}>{status}</span>
}

export default NFTStatus
