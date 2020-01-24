import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'

export const CurrentUserContext = React.createContext()

export const useCurrentUser = () => {
  return useContext(CurrentUserContext).currentUser
}

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    displayName: '',
    email: '',
    photoURL: '',
  })

  // Check if user logged in or not
  useEffect(() => {
    getCurrentUser()
  }, [])

  function getCurrentUser() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
  }

  const authStore = {
    currentUser,
    setCurrentUser,
    getCurrentUser
  }
  
  return(<CurrentUserContext.Provider value={authStore}>
    {children}
  </CurrentUserContext.Provider>)
}