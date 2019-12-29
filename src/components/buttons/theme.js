import React from 'react'
import { IoIosAdd } from 'react-icons/io'

const buttonColors = {
  primary: {
    default: 'blue-500',
    hover: 'blue-400',
    disabled: 'blue-400',
  },
  danger: {
    default: 'red-500',
    hover: 'red-400',
    disabled: 'red-400',
  }
}

const buttonIcons = {
  add: <IoIosAdd size={24} />
}

export {
  buttonColors,
  buttonIcons,
}