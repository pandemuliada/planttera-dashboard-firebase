import React from 'react'
import { CurrentUserProvider } from './contexts/CurrentUserContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PageContainer from './components/PageContainer'
import PlantPage from './pages/PlantPage'
import CategoryPage from './pages/CategoryPage'
import RoomPage from './pages/RoomPage'
import ShopProfilePage from './pages/ShopProfilePage'
import UserAccountPage from './pages/UserAccountPage'

const App = () => {
  return (<CurrentUserProvider>
    <Router>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <PageContainer>
          <PrivateRoute exact path='/' component={DashboardPage} />
          <PrivateRoute exact path='/dashboard' component={DashboardPage} />
          <PrivateRoute exact path='/plants' component={PlantPage} />
          <PrivateRoute exact path='/shop-profile' component={ShopProfilePage} />
          <PrivateRoute exact path='/master-data/categories' component={CategoryPage} />
          <PrivateRoute exact path='/master-data/rooms' component={RoomPage} />
          <PrivateRoute exact path='/settings/account' component={UserAccountPage} />
        </PageContainer>
      </Switch>
    </Router>
  </CurrentUserProvider>)
}

export default App
