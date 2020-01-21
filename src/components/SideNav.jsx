import React, { useState } from 'react'
import { cn } from '../utils/format'
import { auth } from '../firebase'
import { useLocation, useHistory, useRouteMatch, NavLink } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { IoMdHome, IoIosLeaf, IoIosAnalytics, IoMdSettings, IoMdLogOut, IoIosApps } from 'react-icons/io'
import { useContext } from 'react'

const sideNavStyles = {
  logoutButton: {
    default: [
      'w-full',
      'flex',
      'items-center',
      'border-2',
      'border-red-400',
      'bg-red-100',
      'rounded',
      'py-2',
      'px-5',
      'text-red-400',
    ],
    hover: ['bg-red-400', 'text-white', 'shadow-lg'],
  },
}

const menus = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <IoMdHome size={23}/>,
  },
  {
    key: 'plants',
    label: 'Plant',
    icon: <IoIosLeaf size={23}/>,
  },
  {
    key: 'master-data',
    label: 'Master Data',
    icon: <IoIosAnalytics size={23}/>,
    items: [
      { key: 'categories', label: 'Category' },
      { key: 'rooms', label: 'Room' },
    ]
  },
  {
    key: 'shop-profile',
    label: 'Shop Profile',
    icon: <IoIosApps size={23}/>,
  },
  {
    key: 'settings',
    label: 'Setting',
    icon: <IoMdSettings size={23}/>,
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
  let { pathname } = useLocation()
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
        'py-2',
        'px-4',
        'mb-2',
        'transition-all',
        match ? 'bg-teal-400 text-white font-medium shadow' : 'text-gray-500'
      ],
      hover: [
        'bg-teal-400',
        'text-white',
      ],
      focus: [
        'outline-none'
      ]
    },
    childItem: {
      default: [
        'py-2',
        'px-4',
        'block',
        'text-gray-500',
        'transition-all',
      ]
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
        {items.map(item => {
          const active = '/'+key+'/'+item.key === pathname
          return (<NavLink key={item.key} to={`/${key}/${item.key}`} className={cn(styles.childItem) + (active && ' bg-gray-200')}>{item.label}</NavLink>)
        })}
      </div>}
    </div> }

    {!items &&
      <NavLink className={cn(styles.parrentItem)} to={`/${key}`}>
        {icon} <span className={cn(styles.label)}>{label}</span>
      </NavLink>}
  </>)
}

const SideNav = () => {
  let history = useHistory()
  
  const { currentUser } = useContext(CurrentUserContext)

  async function signOut() {
    await auth.signOut()
    history.push('/login')
  }

  return (<>
    <div className='mx-12 mb-5 mt-12'>
      <h2 className='font-normal text-xl text-gray-700'>Welcome back, <br/> <span className='text-teal-400 font-semibold text-2xl'>{!!currentUser && currentUser.displayName}</span></h2>
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
        <IoMdLogOut size={22} className='mr-6' /> Sign Out
      </button>
    </div>
  </>)
}

export default SideNav
