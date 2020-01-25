import React from 'react'
import posed from 'react-pose'
import { Button, OutlineButton } from './buttons'
import { IoIosClose } from 'react-icons/io'
import { colors } from '../theme'

const PosedDialogBackdrop = posed.div({
  open: {
    opacity: .5,
    zIndex: 20,
    delayChildren: 100,
    applyAtStart: { 
      display: 'block' 
    }
  },
  closed: {
    opacity: 0,
    zIndex: 0,
    delay: 100, 
    applyAtEnd: { 
      display: 'none' 
    }
  }
})

const PosedDialogBoardContainer = posed.div({
  open: {
    opacity: 1,
    applyAtStart: { 
      display: 'block' 
    }
  },
  closed: {
    opacity: 0,
    applyAtEnd: { 
      display: 'none' 
    }
  }
})

const PosedDialogBoard = posed.div({
  open: {
    opacity: 1,
    applyAtStart: { 
      display: 'block' 
    }
  },
  closed: {
    opacity: 0,
    applyAtEnd: { 
      display: 'none' 
    }
  }
})

const dialogBoardSizes = {
  small: 'w-1/5',
  medium: 'w-1/4',
  large: 'w-1/3',
}

const Dialog = (props) => {
  const {
    isOpen,
    onClose,
    title,
    size,
    color='secondary',
    children
  } = props

  return (<>
    <PosedDialogBackdrop pose={isOpen ? 'open': 'closed'} className='fixed top-0 left-0 w-screen h-screen bg-black opacity-50'/>

    <PosedDialogBoardContainer pose={isOpen ? 'open': 'closed'} className='fixed w-full h-full left-0 z-30 top-0' onClick={() => onClose()}>
      <PosedDialogBoard pose={isOpen ? 'open' : 'closed' } className={`relative bg-white px-6 pt-3 pb-5 z-40 rounded shadow mx-auto mt-64 ${size ? dialogBoardSizes[size] : dialogBoardSizes['medium']}`} onClick={(e) => e.stopPropagation()}>
        <div>
          <button className='absolute -mt-4 mr-3 right-0 text-gray-600 hover:text-gray-800' onClick={onClose}>
            <IoIosClose size={30} />
          </button>
          <h3 className={`text-2xl text-${colors[color]}-500 font-medium mt-4 mb-3`}>{title}</h3>
        </div>
        <hr className='mb-5'/>
        <div>
          {children}
        </div>
      </PosedDialogBoard>
    </PosedDialogBoardContainer>
  </>)
}

const ConfirmationDialog = (props) => {
  const { 
    descriptions,
    onAccept,
    acceptLabel='Delete',
    cancelLabel='Cancel',
    ...rest
  } = props
  
  return(<Dialog {...rest}>
    <p className='text-gray-600'>{descriptions}</p>
    <hr className='mt-5 mb-3'/>
    <div className='flex justify-end'>
      <div className='mr-2'>
        <Button color={rest.color} size='small' onClick={onAccept}>{acceptLabel}</Button>
      </div>
      <div>
        <OutlineButton color={rest.color} size='small' onClick={rest.onClose}>{cancelLabel}</OutlineButton>
      </div>
    </div>
  </Dialog>)
}


export { Dialog, ConfirmationDialog }