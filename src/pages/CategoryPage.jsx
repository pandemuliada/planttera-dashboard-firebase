import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { IoIosCreate, IoIosTrash } from 'react-icons/io'
import { db } from '../firebase'
import Table from '../components/Table'
import { TextField } from '../components/inputs'
import { Button, IconButton } from '../components/buttons'
import Panel from '../components/Panel'
import CategoryForm from '../components/forms/CategoryForm'
import { ConfirmationDialog } from '../components/Dialog'

const CategoryPage = () => {
  const [tableData, setTableData] = useState({ meta: {}, data: [] })
  const [isLoading, setIsLoading] = useState(false)

  const [isAdd, setIsAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  const [editedItem, setEditedItem] = useState(null)
  const [deletedItem, setDeletedItem] = useState(null)

  const columns = [
    { 
      key: 'name', 
      label: 'Name',
      render: (item) => (item.name)
    },
    { 
      key: 'created_at', 
      label: 'Created at',
      render: ({ created_at }) => dayjs(created_at).format('dddd, MMMM D YYYY')
    },
    { 
      key: 'options', 
      label: 'Options',
      render: (item) => (<div className='flex items-center'>
        <button 
          className='p-1 text-gray-400 hover:text-yellow-400' 
          onClick={() => { 
            setIsEdit(true) 
            setEditedItem(item)
          }}>
          <IoIosCreate size={22}/>
        </button>
        <button 
          className='p-1 text-gray-400 hover:text-red-400' 
          onClick={() => {
            setIsDelete(true)
            setDeletedItem(item)
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
    const docs = await db.collection('categories').get()
    
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
  }

  async function onCommitAdd(values) {
    setIsLoading(true)
    const saved = db.collection("categories").add({
      ...values,
      created_at: Date.now()
    })

    if (saved) {
      setIsAdd(false)
      setIsLoading(false)
      onLoadPage()
    }
  }

  async function onCommitEdit(values) {
    setIsLoading(true)
    const edited = db.collection("categories").doc(editedItem.id).update({
      ...values,
      updated_at: Date.now()
    })

    if (edited) {
      onCancelEdit()
      setIsLoading(false)
      onLoadPage()
    }
  }

  function onCancelEdit() {
    setIsEdit(false)
    setEditedItem(null)
  }

  async function onCommitDelete(item) {
    setIsLoading(true)
    const deleted = db.collection('categories').doc(item.id).delete()

    if (deleted) {
      onCancelDelete()
      setIsLoading(false)
      onLoadPage()
    }
  }

  function onCancelDelete() {
    setIsDelete(false)
    setDeletedItem(null)
  }

  return (<div>
    <Panel title='Category' size='small' isOpen={isAdd} onClose={() => setIsAdd(false)}>
      <CategoryForm
        onSubmit={onCommitAdd}
        onCancel={() => setIsAdd(false)} />
    </Panel>
    
    <Panel title='Category' size='small' isOpen={isEdit} onClose={() => onCancelEdit()}>
      <CategoryForm
        initialValues={editedItem}
        onSubmit={onCommitEdit}
        onCancel={() => onCancelEdit()} />
    </Panel>

    <ConfirmationDialog
      isOpen={isDelete} 
      onClose={() => onCancelDelete()}
      onAccept={() => onCommitDelete(deletedItem)}
      color='danger'
      title='Delete Category'
      descriptions='Are you sure want to delete this category?'/>

    <div className='flex items-center bg-white py-4 px-6 shadow mb-6 rounded'>
      <h1 className='text-2xl font-medium text-gray-600'>Category</h1>
      <span className='ml-auto text-gray-600'>{dayjs().format("dddd, MMMM D YYYY")}</span>
    </div>
  
  
    <div className='bg-white py-4 px-6 shadow mb-8 rounded'>

      <div className='mb-6 flex'>
        <div>
          <Button color='primary' icon='add' size='small' onClick={() => setIsAdd(true)}>Add Category</Button>
        </div>
        <div className='ml-auto flex'>
          <div className='mr-1 w-64'>
            <TextField noMargin size='small' name='name' placeholder='Find category'/>
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

export default CategoryPage