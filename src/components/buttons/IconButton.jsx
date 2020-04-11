import React from 'react'
import { buttonColors, buttonIcons } from './theme'
import ReactLoading from 'react-loading'

import { cn } from '../../utils/format'

const sizeProps = {
  small: 'py-1 px-1 ',
  normal: 'py-2 px-2',
  large: 'py-3 px-3',
}

const IconButton = (props) => {
  let {
    children,
    disabled=false,
    color='primary',
    type='button',
    loading=false,
    icon,
    block,
    outline=false,
    size='normal',
    ...rest
  } = props

  if (loading) disabled = true
  
  const styles = {
    button: {
      default: [
        icon && 'flex',
        'items-center',
        'justify-center',
        'rounded',
        outline ? `text-${buttonColors[color].default}` : 'text-white',
        'border-2',
        'transition-all',
        outline ? 'bg-transparent' : `bg-${buttonColors[color].default}`,
        size ? sizeProps[size] : sizeProps['normal'], 
        block ? 'w-full block' : 'w-auto',
        disabled ? 'opacity-50' : 'opacity-100',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        disabled ? `border-${buttonColors[color].disabled}` : `border-${buttonColors[color].default}`,
      ],
      hover: [
        outline ? `bg-${buttonColors[color].outline}` : `bg-${buttonColors[color].hover}`,
        outline ? `text-${buttonColors[color].hover}` : `text-white`,
        `border-${buttonColors[color].hover}`
      ]
    }
  }

  return(<button className={cn(styles.button)} disabled={disabled} type={type} {...rest}>
    {icon && !loading && <span className='mr-1'>{buttonIcons[icon]}</span>}
    { loading ? <ReactLoading width={24} height={24} type='bubbles' className='mx-auto'/>  : children }
  </button>)
}

export default IconButton