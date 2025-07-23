import Crypto from './pages/Crypto'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
   
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/crypto/:cryptoId" element={<Crypto/>}/>
        </Routes>

      </div>
    
  )
}

export default App
