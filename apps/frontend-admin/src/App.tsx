"use client"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App