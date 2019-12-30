import React from 'react'
import { IoIosAdd } from 'react-icons/io'
import { colors } from '../../theme'

const buttonColors = {
  primary: {
    default: `${colors.primary}-500`,
    hover: `${colors.primary}-400`,
    disabled: `${colors.primary}-400`,
  },
  danger: {
    default: `${colors.danger}-500`,
    hover: `${colors.danger}-400`,
    disabled: `${colors.danger}-400`,
  }
}

const buttonIcons = {
  add: <IoIosAdd size={24} />
}

export {
  buttonColors,
  buttonIcons,
}