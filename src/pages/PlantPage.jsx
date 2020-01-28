import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { IoIosCreate, IoIosTrash } from 'react-icons/io'
import { db, storage } from '../firebase'
import Table from '../components/Table'
import Panel from '../components/Panel'
import Tabs from '../components/Tabs'
import Toaster from '../components/Toaster'
import { TextField } from '../components/inputs'
import { Button, IconButton } from '../components/buttons'
import { ConfirmationDialog } from '../components/Dialog'
import PlantForm from '../components/forms/PlantForm'
import PictureForm from '../components/forms/PictureForm'

import defaultImage from '../static/images/no-image.png'

const PlantPage = () => {
  const [tableData, setTableData] = useState({ meta: {}, data: [] })
  const [isLoading, setIsLoading] = useState(false)

  const [isAdd, setIsAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  const [editedItem, setEditedItem] = useState(null)
  const [deletedItem, setDeletedItem] = useState(null)

  const [activeTab, setActiveTab] = useState('data')

  const defaultToastState = { 
    isShow: false, 
    type: 'default',
    duration: 4000, // remove duration property to prevent autoclose after 4s 
  }
  const [toast, setToast] = useState(defaultToastState)

  const columns = [
    { 
      key: 'name', 
      label: 'Name',
      render: ({ name, image_url }) => (
        <div className='flex items-center'>
          <img src={image_url || defaultImage} className='w-10 h-10 mr-3 rounded-full' alt=""/>
          <span>{name}</span>
        </div>
      )
    },
    { 
      key: 'price', 
      label: 'Price',
      render: ({price}) => ('Rp. ' + price)
    },
    { 
      key: 'stock', 
      label: 'Stock',
    },
    { 
      key: 'available', 
      label: 'Status',
      render: ({ available }) => (available ? 'Available' : 'Not available')
    },
    { 
      key: 'category', 
      label: 'Category',
      render: ({ category: { label } }) => label
    },
    { 
      key: 'created_at', 
      label: 'Created at',
      render: ({ created_at }) => dayjs(created_at).format('dddd, MMMM D YYYY')
    },
    { 
      key: 'options', 
      label: 'Options',
      render: ({ id, name, category: { key : category_id}, room: { key: room_id }, stock, price, available, image_url }) => (<div className='flex items-center'>
        <button 
          className='p-1 text-gray-400 hover:text-yellow-400' 
          onClick={() => { 
            setIsEdit(true) 
            setEditedItem({ id, name, category_id, room_id, stock, price, available, image_url })
          }}>
          <IoIosCreate size={22}/>
        </button>
        <button 
          className='p-1 text-gray-400 hover:text-red-400' 
          onClick={() => {
            setIsDelete(true)
            setDeletedItem({ id, name })
          }}>
          <IoIosTrash size={22}/>
        </button>
      </div>)
    },
  ]

  useEffect(() => {
    onLoadPage()
  }, [])

  async function onLoadPage() {
    const data = []
    setIsLoading(true)
    try {
      const docs = await db.collection('plants').orderBy('name', 'asc').get()
      
      docs.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      })
      
      const newTableData = {
        meta: { count: data.length },
        data
      }
  
      if (newTableData) setIsLoading(false)
      setTableData({...newTableData})
    } catch (error) {
      setToast({
        ...toast,
        isShow: true,
        type: 'warning',
        title: 'Network Problem',
        message: 'Cant\'t get plant data, reload the page' 
      })
    }
  }

  async function onCommitAdd(values) {
    setIsLoading(true)
    const saved = await db.collection("plants").add({
      ...values,
      created_at: Date.now()
    })

    if (saved) {
      setIsAdd(false)
      setIsLoading(false)
      onLoadPage()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Plant Added',
        message: 'A new plant has been added' 
      })
    }
  }

  async function onCommitEdit(values) {
    setIsLoading(true)
    const edited = await db.collection("plants").doc(editedItem.id).update({
      ...values,
      updated_at: Date.now()
    })

    if (edited === undefined) {
      onCancelEdit()
      setIsLoading(false)
      onLoadPage()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Plant Updated',
        message: `${editedItem.name} updated successfully` 
      })
    }
  }

  function onCancelEdit() {
    setIsEdit(false)
    setEditedItem(null)
  }

  async function onCommitDelete(item) {
    setIsLoading(true)
    const deleted = await db.collection('plants').doc(item.id).delete()

    if (deleted === undefined) {
      onCancelDelete()
      setIsLoading(false)
      onLoadPage()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Plant Updated',
        message: `${deletedItem.name} deleted successfully` 
      })
    }
  }

  function onCancelDelete() {
    setIsDelete(false)
    setDeletedItem(null)
  }

  async function onCommitChangeImage(file) {
    const fileExtension = file.type.split('/')[1]

    const storageRef = storage.ref('plants/' + 'plant_' + editedItem.id + "." +fileExtension)
    const snapshot = await storageRef.put(file)
    const url = await snapshot.ref.getDownloadURL()

    const updatedItem = await db.collection('plants').doc(editedItem.id).update({
      image_url: url
    })
    
    if (snapshot.state === 'success' && updatedItem === undefined) {
      onCancelEdit()
      onLoadPage()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Image Updated',
        message: `${editedItem.name} image changed successfully` 
      })
    }
  }

  return (<div>
    <Toaster
      isShow={toast.isShow}
      type={toast.type}
      duration={toast.duration}
      title={toast.title}
      message={toast.message}
      onClose={() => setToast({...toast, ...defaultToastState})}/>

    <Panel title='Plant' size='small' isOpen={isAdd} onClose={() => setIsAdd(false)}>
      <PlantForm
        onSubmit={onCommitAdd}
        onCancel={() => setIsAdd(false)} />
    </Panel>
    
    <Panel title='Plant' size='small' isOpen={isEdit} onClose={() => onCancelEdit()}>
      <div className='mb-5'>
        <Tabs
          items={[
            { key: 'data', label: 'Data' }, 
            { key: 'image', label: 'Image' }
          ]} 
          activeTab={activeTab}
          onChangeTab={(key) => setActiveTab(key)} />
      </div>
      {activeTab === 'data' &&
      <PlantForm
        initialValues={editedItem}
        onSubmit={onCommitEdit}
        onCancel={() => onCancelEdit()} />}
      
      {activeTab === 'image' &&
      <PictureForm
        initialImage={(!!editedItem && editedItem.image_url) || defaultImage}
        onSubmit={(file) => onCommitChangeImage(file)}
        onCancel={() => onCancelEdit()} />}
    </Panel>

    <ConfirmationDialog
      isOpen={isDelete} 
      onClose={() => onCancelDelete()}
      onAccept={() => onCommitDelete(deletedItem)}
      color='danger'
      title='Delete Plant'
      descriptions='Are you sure want to delete this plant?'/>

    <div className='flex items-center bg-white py-4 px-6 shadow mb-6 rounded'>
      <h1 className='text-2xl font-medium text-gray-600'>Plant</h1>
      <span className='ml-auto text-gray-600'>{dayjs().format("dddd, MMMM D YYYY")}</span>
    </div>
  
  
    <div className='bg-white py-4 px-6 shadow mb-8 rounded'>

      <div className='mb-6 flex'>
        <div>
          <Button color='primary' icon='add' size='small' onClick={() => setIsAdd(true)}>Add Plant</Button>
        </div>
        <div className='ml-auto flex'>
          <div className='mr-1 w-64'>
            <TextField noMargin size='small' name='name' placeholder='Find plant'/>
          </div>
          <IconButton icon='search' size='small'/>
        </div>
      </div>

      <Table
        tableData={tableData}
        columns={columns}
        loading={isLoading}
      />
    </div>
  </div>)
}

export default PlantPage