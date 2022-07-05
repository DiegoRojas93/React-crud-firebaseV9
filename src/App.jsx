import React, { useState } from 'react'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

import './App.css'

import { app } from './firebase/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const auth = getAuth();



export const App = () => {

  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, userFb => {
    if(userFb){
      setUser(userFb)
    }else {
      setUser(userFb)
    }
  })

  return (
    <>
      { user ? <Home emailUser={user.email}/> : <Login /> }
    </>
  )
}
