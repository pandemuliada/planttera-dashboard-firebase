import React, { useContext, useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PageContainer from './components/PageContainer'

const App = () => {
  return (<AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <PageContainer>
            <PrivateRoute exact path='/' component={DashboardPage} />
          </PageContainer>
        </Switch>
      </Router>
    </AuthProvider>
)
}

export default App
