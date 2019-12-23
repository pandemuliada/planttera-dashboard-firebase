import React, { useContext } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { auth } from '../firebase'
import SideNav from '../components/SideNav'

const DashboardPage = (props) => {
  return(<div>
    Dashboard
  </div>)
}

export default withRouter(DashboardPage)