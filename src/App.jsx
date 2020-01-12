import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PageContainer from './components/PageContainer'
import PlantPage from './pages/PlantPage'
import CategoryPage from './pages/CategoryPage'
import RoomPage from './pages/RoomPage'

const App = () => {
  return (<AuthProvider>
    <Router>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <PageContainer>
          <PrivateRoute exact path='/' component={DashboardPage} />
          <PrivateRoute exact path='/dashboard' component={DashboardPage} />
          <PrivateRoute exact path='/plants' component={PlantPage} />
          <PrivateRoute exact path='/master-data/categories' component={CategoryPage} />
          <PrivateRoute exact path='/master-data/rooms' component={RoomPage} />
        </PageContainer>
      </Switch>
    </Router>
  </AuthProvider>)
}

export default App
