import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useCurrentUser } from '../contexts/AuthContext'

const PrivateRoute = ({ component: RouteComponent, location, ...rest }) => {
  const currentUser = useCurrentUser()

  return (<Route
    {...rest}
    render={routeProps =>
      !!currentUser ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )
    }
  />)
}

export default PrivateRoute
