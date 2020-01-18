import React from 'react'
import dayjs from 'dayjs'
import { db } from '../firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import { IconButton } from '../components/buttons'
import Panel from '../components/Panel'
import ShopProfileForm from '../components/forms/ShopProfileForm'

const ShopProfilePage = () => {
  const defaultShopData = {
    name: '',
    address: '',
    phone: '',
  }

  const [shopData, setShopData] = useState(defaultShopData)
  const [isEdit, setIsEdit] = useState(false)
  const [editedData, setEditedData] = useState(null)

  useEffect(() => {
    getShopData()
  }, [])

  async function getShopData() {
    const doc = await db.collection('shops').doc('shop-profile').get()
  
    if (doc.exists) {
      setShopData(doc.data())
    } else {
      setShopData({...defaultShopData})
    }
  }

  async function onCommitEditData(values) {
    const edited = await db.collection('shops').doc('shop-profile').set({
      ...values
    })

    if (edited == undefined) {
      onCancelEditData()
      getShopData()
    }
  }

  function onCancelEditData() {
    setIsEdit(false)
    setEditedData(null)
  }

  return (<div>
    <Panel title='Shop Profile' size='small' isOpen={isEdit} onClose={() => onCancelEditData()}>
      <ShopProfileForm
        initialValues={editedData}
        onSubmit={onCommitEditData} 
        onCancel={() => onCancelEditData()} />
    </Panel>

    <div className='flex items-center bg-white py-4 px-6 shadow mb-6 rounded'>
      <h1 className='text-2xl font-medium text-gray-600'>Shop Profile</h1>
      <span className='ml-auto text-gray-600'>{dayjs().format("dddd, MMMM D YYYY")}</span>
    </div>
  
    <div className='bg-white py-4 px-6 shadow mb-8 rounded'>
      <table className='table-auto rounded w-full'>
        <tbody>
          <tr className='bg-gray-100'>
            <td className='p-3 w-24'>Name</td>
            <td className='p-3'>: {shopData.name ? shopData.name : '-'}</td>
          </tr>
          <tr className=''>
            <td className='p-3 w-24'>Address</td>
            <td className='p-3'>: {shopData.address ? shopData.address : '-'}</td>
          </tr>
          <tr className='bg-gray-100'>
            <td className='p-3 w-24'>Phone</td>
            <td className='p-3'>: {shopData.phone ? shopData.phone : '-'}</td>
          </tr>
        </tbody>
      </table>
      
      <div className='mt-4'>
        <IconButton
          outline 
          size='small' 
          icon='pencil' 
          onClick={() => {
            setIsEdit(true)
            setEditedData(shopData)
          }}/>
      </div>
    </div>
  </div>)
}

export default ShopProfilePage