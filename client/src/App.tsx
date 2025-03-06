import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Button } from './components/ui/button'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegisterPage />
    </>
  )
}

export default App
