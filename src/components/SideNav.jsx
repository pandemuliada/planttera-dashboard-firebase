import React, { useState } from 'react'
import { FaDatabase, FaLeaf, FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { cn } from '../utils/format'
import { auth } from '../firebase'
import { useLocation, useHistory, useRouteMatch, NavLink, Redirect } from 'react-router-dom'
import { useCurrentUser } from '../contexts/AuthContext'

const sideNavStyles = {
  logoutButton: {
    default: [
      'w-full',
      'flex',
      'items-center',
      'border-2',
      'border-red-500',
      'bg-red-100',
      'rounded',
      'py-2',
      'px-5',
      'text-red-500',
    ],
    hover: ['bg-red-500', 'text-white', 'shadow-lg'],
  },
}

const menus = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <FaHome size={23}/>,
  },
  {
    key: 'plants',
    label: 'Plant',
    icon: <FaLeaf size={23}/>,
  },
  {
    key: 'master-data',
    label: 'Master Data',
    icon: <FaDatabase size={23}/>,
    items: [
      { key: 'categories', label: 'Category' },
      { key: 'rooms', label: 'Room' },
    ]
  },
  {
    key: 'settings',
    label: 'Setting',
    icon: <FaCog size={23}/>,
    items: [
      { key: 'account', label: 'Account' },
    ]
  },
]

const Item = (props) => {
  const {
    menu: { key, label, icon, items },
  } = props

  let match = useRouteMatch(`/${key}`)
  const [isShowChild, setIsShowChild] = useState(false)

  const styles = {
    parrentItem: {
      default: [
        'cursor-pointer',
        'outline-none',
        'flex',
        'items-center',
        'block',
        'w-full',
        'rounded',
        'py-3',
        'px-5',
        'mb-2',
        match ? 'bg-teal-500 text-white font-medium shadow' : 'text-gray-700'
      ],
      hover: [
        'bg-teal-500',
        'text-gray-100',
        'font-medium',
      ],
      focus: [
        'outline-none'
      ]
    },
    childItem: {
      default: [
        'py-3',
        'px-4',
        'block',
        'text-gray-600'
      ],
      hover: ['bg-gray-200']
    },
    label: {
      default: ['ml-6'],
    },
  }

  return (<>
    {items && <div>
      <button className={cn(styles.parrentItem)} onClick={() => setIsShowChild(!isShowChild)}>
        {icon} <span className={cn(styles.label)}>{label}</span>
      </button>
      {isShowChild && <div className='shadow ml-16 rounded mb-2'>
        {items.map(item => (
          <NavLink key={item.key} to={`/${key}/${item.key}`} className={cn(styles.childItem)}>{item.label}</NavLink>
        ))}
      </div>}
    </div> }

    {!items &&
      <NavLink className={cn(styles.parrentItem)} to={`/${key}`}>
        {icon} <span className={cn(styles.label)}>{label}</span>
      </NavLink>}
  </>)
}

const SideNav = (props) => {
  let history = useHistory()
  
  const currentUser = useCurrentUser()

  async function signOut() {
    await auth.signOut()
    history.push('/login')
  }

  return (<div>
    <div className='mx-12 mb-5 mt-12'>
      <h2 className='font-normal text-xl text-gray-700'>Welcome back, <br/> <span className='text-teal-500 font-semibold text-2xl'>{!!currentUser && currentUser.displayName}</span></h2>
    </div>
    <hr className='mx-8' />
    <div className='mx-8 my-8'>
      {menus.map((menu) => {
        return <Item key={menu.key} menu={menu} />
      })}
    </div>
    <hr className='mx-8' />
    <div className='mx-8 mt-6'>
      <button className={cn(sideNavStyles.logoutButton)} onClick={signOut}>
        <FaSignOutAlt size={22} className='mr-6' /> Sign Out
      </button>
    </div>
  </div>)
}

export default SideNav
