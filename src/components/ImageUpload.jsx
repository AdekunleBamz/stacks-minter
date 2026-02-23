import React, { useState } from 'react'

const ImageUpload = ({ onUpload, accept = 'image/*' }) => {
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const handleChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setLoading(true)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
    
    onUpload?.(file)
    setLoading(false)
  }
  
  return (
    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
      {preview ? (
        <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
      ) : (
        <div className="text-gray-400">
          <p>Drop image here or click to upload</p>
        </div>
      )}
      <input type="file" accept={accept} onChange={handleChange} className="hidden" />
    </div>
  )
}

export default ImageUpload
