import React from 'react'
import { IoIosAdd, IoIosCreate, IoIosTrash, IoIosSearch, IoMdCreate } from 'react-icons/io'
import { colors } from '../../theme'

const buttonColors = {
  primary: {
    default: `${colors.primary}-400`,
    hover: `${colors.primary}-500`,
    disabled: `${colors.primary}-400`,
    outline: `${colors.primary}-100`
  },
  secondary: {
    default: `${colors.secondary}-400`,
    hover: `${colors.secondary}-500`,
    disabled: `${colors.secondary}-400`,
    outline: `${colors.secondary}-100`
  },
  danger: {
    default: `${colors.danger}-400`,
    hover: `${colors.danger}-500`,
    disabled: `${colors.danger}-400`,
    outline: `${colors.danger}-100`
  },
  warning: {
    default: `${colors.warning}-400`,
    hover: `${colors.warning}-500`,
    disabled: `${colors.warning}-400`,
    outline: `${colors.warning}-100`
  }
}

const buttonIcons = {
  add: <IoIosAdd size={24} />,
  edit: <IoIosCreate size={24} />,
  pencil: <IoMdCreate size={24} />,
  trash: <IoIosTrash size={24} />,
  search:  <IoIosSearch size={24} />,
}

const buttonSizes = {
  small: 'py-1 px-3',
  normal: 'py-2 px-4',
  large: 'py-3 px-5',
}

export {
  buttonColors,
  buttonIcons,
  buttonSizes
}