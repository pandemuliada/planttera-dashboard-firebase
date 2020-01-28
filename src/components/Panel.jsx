import React from 'react'
import { IoIosClose } from 'react-icons/io'
import posed from 'react-pose'

const PanelBackdrop = posed.div({
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

const PanelBoard = posed.div({
  open: {
    opacity: 1,
    x: '0px',
    transition: {
      ease: 'easeOut'
    },
    applyAtStart: { 
      display: 'block' 
    }
  },
  closed: {
    opacity: 0,
    x: '600px',
    transition: {
      ease: 'easeIn'
    },
    applyAtEnd: { 
      display: 'none' 
    }
  }
})

const panelBoardSize = {
  small: 400,
  medium: 500,
  large: 700,
}

const Panel = (props) => {
  const {
    size='medium',
    isOpen,
    onClose,
    title,
    children
  } = props
  
  return (<>
    <PanelBackdrop pose={isOpen ? 'open': 'closed'} className='fixed top-0 left-0 w-full h-screen bg-black opacity-50' onClick={() => onClose()}/>
    <PanelBoard pose={isOpen ? 'open' : 'closed' } className='fixed bg-white top-0 right-0 h-full px-6 z-30 overflow-y-auto pb-10' style={{ width: panelBoardSize[size] }}>
      <button className='absolute mt-3 mr-3 right-0 text-gray-600 hover:text-gray-800' onClick={onClose}>
        <IoIosClose size={30} />
      </button>
      <div className='pt-8 pb-4'>
        <h2 className='text-2xl text-gray-700 font-medium'>{title}</h2>
      </div>
      <hr/>
      <div className='mt-4'>
        {children}
      </div>
    </PanelBoard>
  </>
  )
}

export default Panel