import React from 'react'
import { FiHome, FiBox, FiLogOut } from 'react-icons/fi'
import { cn } from '../utils/format'
import { auth } from '../firebase'
import { withRouter, Redirect, NavLink } from 'react-router-dom'

const sideNavStyles = {
  title: {
    default: [
      'text-blue-500',
      'text-3xl',
      'font-medium',
      'mb-12',
      'mt-8',
      'ml-12',
    ],
  },
  logOut: {
    default: [
      'flex',
      'items-center',
      'text-sm',
      'border-2',
      'border-red-500',
      'bg-red-100',
      'rounded-full',
      'py-2',
      'px-6',
      'text-red-500',
      'mb-2',
      'mt-24',
      'ml-12',
    ],
    hover: ['bg-red-500', 'text-white', 'shadow-lg'],
  },
}

const sideNavItemStyles = {
  container: {
    default: [
      'rounded-r-full',
      'block',
      'flex',
      'items-center',
      'py-3',
      'px-5',
      'text-gray-600',
      'mb-2',
    ],
    hover: [
      'bg-blue-100',
      'text-blue-500',
      'border-8',
      'border-blue-500',
      'font-medium',
    ],
  },
  icon: {
    default: ['ml-8'],
  },
  label: {
    default: ['ml-6'],
  },
}

const menus = [
  {
    key: '',
    label: 'Dashboard',
    icon: <FiHome size={26} className={cn(sideNavItemStyles.icon)} />,
  },
  {
    key: 'products',
    label: 'Product',
    icon: <FiBox size={26} className={cn(sideNavItemStyles.icon)} />,
  },
]

const SideNavItem = (props) => {
  const {
    menu: { key, label, icon },
  } = props

  return (<>
    <NavLink className={cn(sideNavItemStyles.container)} to={`/${key}`}>
      {icon} <span className={cn(sideNavItemStyles.label)}>{label}</span>
    </NavLink>
  </>)
}

const SideNav = (props) => {
  const { history } = props

  async function signOut() {
    await auth.signOut()
    return history.push('/login')
  }

  return (<div className=''>
    <h2 className={cn(sideNavStyles.title)}>Dashboard</h2>
    <div className='mr-8'>
      {menus.map((menu) => {
        return <SideNavItem key={menu.key} menu={menu} />
      })}
    </div>

    <div className='flex justify-start items-center'>
      <button className={cn(sideNavStyles.logOut)} onClick={signOut}>
        <FiLogOut size={21} className='mr-3' /> Sign Out
      </button>
    </div>
  </div>)
}

export default withRouter(SideNav)
