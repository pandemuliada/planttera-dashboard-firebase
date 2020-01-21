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
  })

  // Check if user logged in or not
  useEffect(() => {
    getCurrentUser()
  }, [])


  function getCurrentUser() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
  }

  const authStore = {
    currentUser,
    setCurrentUser
  }
  
  return(<CurrentUserContext.Provider value={authStore}>
    {children}
  </CurrentUserContext.Provider>)
}