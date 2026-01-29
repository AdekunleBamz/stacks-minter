import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

export default App