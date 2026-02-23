import React, { useState } from 'react'

const CreateCollection = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', description: '', image: null })
  
  return (
    <form onSubmit={() => onSubmit(form)} className="space-y-4">
      <input placeholder="Collection Name" className="w-full bg-gray-800 p-3 rounded" 
        onChange={(e) => setForm({...form, name: e.target.value})} />
      <textarea placeholder="Description" className="w-full bg-gray-800 p-3 rounded"
        onChange={(e) => setForm({...form, description: e.target.value})} />
      <button className="bg-purple-600 px-6 py-2 rounded">Create Collection</button>
    </form>
  )
}

export default CreateCollection
