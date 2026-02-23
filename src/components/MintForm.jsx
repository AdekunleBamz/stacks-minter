import React, { useState } from 'react'
import Button from './ui/Button'
import Input from './ui/Input'

const MintForm = ({ onMint, loading }) => {
  const [formData, setFormData] = useState({ name: '', description: '', royalty: 0 })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onMint(formData)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="NFT Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
        placeholder="Description (optional)"
        rows={3}
      />
      <Input
        label="Royalty (%)"
        type="number"
        value={formData.royalty}
        onChange={(e) => setFormData({ ...formData, royalty: e.target.value })}
      />
      <Button type="submit" loading={loading} className="w-full">
        Mint NFT
      </Button>
    </form>
  )
}

export default MintForm
