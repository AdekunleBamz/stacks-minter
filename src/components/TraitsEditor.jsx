import React, { useState } from 'react'

const TraitsEditor = ({ traits, onChange }) => {
  const [newTrait, setNewTrait] = useState({ type: '', value: '' })
  
  const addTrait = () => {
    if (newTrait.type && newTrait.value) {
      onChange([...traits, { traitType: newTrait.type, value: newTrait.value }])
      setNewTrait({ type: '', value: '' })
    }
  }
  
  return (
    <div className="space-y-3">
      {traits.map((trait, i) => (
        <div key={i} className="flex gap-2">
          <input value={trait.traitType} readOnly className="bg-gray-700 rounded px-3 py-2 flex-1" />
          <input value={trait.value} readOnly className="bg-gray-700 rounded px-3 py-2 flex-1" />
        </div>
      ))}
      <div className="flex gap-2">
        <input 
          placeholder="Trait type" 
          value={newTrait.type}
          onChange={(e) => setNewTrait({ ...newTrait, type: e.target.value })}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 flex-1"
        />
        <input 
          placeholder="Value" 
          value={newTrait.value}
          onChange={(e) => setNewTrait({ ...newTrait, value: e.target.value })}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 flex-1"
        />
        <button onClick={addTrait} className="bg-purple-600 px-4 rounded">Add</button>
      </div>
    </div>
  )
}

export default TraitsEditor
