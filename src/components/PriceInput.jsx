import React from 'react'

const PriceInput = ({ value, onChange, currency = 'STX' }) => {
  return (
    <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="bg-gray-800 px-4 py-2 text-white outline-none"
        placeholder="0.00"
      />
      <span className="px-4 py-2 bg-gray-700 text-gray-300">{currency}</span>
    </div>
  )
}

export default PriceInput
