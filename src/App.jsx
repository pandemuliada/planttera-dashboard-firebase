import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PageContainer from './components/PageContainer'
import PlantPage from './pages/PlantPage'
import CategoryPage from './pages/CategoryPage'

const App = () => {
  return (<AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <PageContainer>
            <PrivateRoute exact path='/dashboard' component={DashboardPage} />
            <PrivateRoute exact path='/plants' component={PlantPage} />
            <PrivateRoute path='/master-data/categories' component={CategoryPage} />
          </PageContainer>
        </Switch>
      </Router>
    </AuthProvider>
)
}

export default App
