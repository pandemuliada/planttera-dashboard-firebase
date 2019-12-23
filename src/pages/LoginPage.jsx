import React, { useContext, useCallback } from 'react'
import { auth } from '../firebase'
import { useCurrentUser } from '../contexts/AuthContext'
import { withRouter, Redirect } from 'react-router'

const LoginPage = ({ history }) => {

  const currentUser = useCurrentUser()

  async function login() {
    const user = await auth.signInWithEmailAndPassword('pandemuliada@gmail.com', 'pandemuliada@gmail.com')
    if (user) history.push('/')
  }

  if(!!currentUser) {
    return <Redirect to='/' />
  }


  return(
    <button onClick={login}>
      Login
    </button>
  )
}
export default withRouter(LoginPage)