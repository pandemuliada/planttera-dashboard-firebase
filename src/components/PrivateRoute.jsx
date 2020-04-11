import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { useCurrentUser } from '../contexts/CurrentUserContext'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useCurrentUser()
  let location = useLocation()

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
        )
      }
    />
  )
}

export default PrivateRoute
