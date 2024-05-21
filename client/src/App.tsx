import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook';
import { initializeAuth } from './Store/reducers/authReducer';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <BrowserRouter>
    <Routes>
      <Route path='/' Component={PrivateOutlet} />
      <Route path='/login' Component={LoginPage} />
      <Route path='/signup' Component={Signup} />
    </Routes>
  </BrowserRouter>
}


const PrivateOutlet = () => {
  const {accessToken} = useAppSelector(state => state.auth)
  return accessToken ? <Home/> : <Navigate to={'/login'}/>
}

export default App
