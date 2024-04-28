import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './Components/Login'
import Signup from './Components/Signup'

const App = () => {
  // const userState = 
  return <BrowserRouter>
      <Routes>
        <Route path='/' Component={LoginPage}/>
        <Route path='/signup' Component={Signup}/>
      </Routes>
  </BrowserRouter>
}

export default App
