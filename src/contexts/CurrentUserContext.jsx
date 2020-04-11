import React, { useState, useEffect, useContext } from 'react'
import { privateApi } from '../utils/request'

export const CurrentUserContext = React.createContext()

export const useCurrentUser = () => {
  return useContext(CurrentUserContext).currentUser
}

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  // Check if user logged in or not
  useEffect(() => {
    getCurrentUser()
  }, [])

  async function getCurrentUser() {
    const response = await privateApi().get('users/current_user')

    if (!!response.data.data) {
      setCurrentUser(response.data.data)
    } else {
      setCurrentUser(null)
    }
  }

  const authStore = {
    currentUser,
    setCurrentUser,
    getCurrentUser,
  }

  return <CurrentUserContext.Provider value={authStore}>{children}</CurrentUserContext.Provider>
}
