import { createContext, useState } from 'react'
import Container from './components/Container'
import CreateJob from './components/CreateJob'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

export const dataContext = createContext()

function App() {
  const user = useSelector((state)=>state.userInfo.user)
  const [showOverlay, setShowOverlay] = useState(null)

  return (
    <>
      <dataContext.Provider value={{ showOverlay, setShowOverlay, user }}>
        <Routes>
          <Route path='/authentication' element={<LoginPage />} />
          <Route
            path='/'
            element={
              <>
                <Navbar />
                <div className="cover-div">
                  <Container />
                </div>
              </>
            }
          />
        </Routes>
        <CreateJob />
        <Toaster/>
      </dataContext.Provider>
    </>
  )
}

export default App
