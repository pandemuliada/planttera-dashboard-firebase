import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'
import { setLocalStorage, removeLocalStorage, getLocalStorage } from '../utils/helper'

export const AuthContext = React.createContext(null)

export const useCurrentUser = () => {
  return JSON.parse(getLocalStorage('user'))
}

export const AuthProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(null)

  // Check if user logged in or not
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLocalStorage('user', JSON.stringify(user))
    }, 
    () => {
      setCurrentUser(null)
      removeLocalStorage('user')
    })
  }, [])

  const authStore = {
    currentUser,
    setCurrentUser
  }
  
  return(<AuthContext.Provider value={authStore}>
    {children}
  </AuthContext.Provider>)
}