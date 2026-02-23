import React from 'react'

const OwnerFilter = ({ owners, selectedOwner, onChange }) => {
  return (
    <select
      value={selectedOwner || ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
    >
      <option value="">All Owners</option>
      {owners?.map((owner, i) => (
        <option key={i} value={owner}>{owner.slice(0, 8)}...</option>
      ))}
    </select>
  )
}

export default OwnerFilter
