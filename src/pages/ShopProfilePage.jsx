import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { db, storage } from '../firebase'
import { IconButton } from '../components/buttons'
import Tabs from '../components/Tabs'
import Panel from '../components/Panel'
import ShopProfileForm from '../components/forms/ShopProfileForm'
import PictureForm from '../components/forms/PictureForm'
import SkeletonLoader from '../components/SkeletonLoader'
import Toaster from '../components/Toaster'

import defaultImage from '../static/images/no-image.png'

const ShopProfilePage = () => {
  const defaultShopData = {
    name: '',
    address: '',
    phone: '',
    logo_url: ''
  }

  const [shopData, setShopData] = useState(defaultShopData)
  const [isEdit, setIsEdit] = useState(false)
  const [editedData, setEditedData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('data')

  const defaultToastState = { 
    isShow: false, 
    type: 'default',
    duration: 3000, // remove duration property to prevent autoclose after 4s 
  }
  const [toast, setToast] = useState(defaultToastState)


  useEffect(() => {
    getShopData()
  }, [])

  async function getShopData() {
    setIsLoading(true)

    try {
      const doc = await db.collection('shops').doc('shop-profile').get()
    
      if (doc.exists) {
        setShopData(doc.data())
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setShopData({...defaultShopData})
      }
      
    } catch (error) {
      setIsLoading(false)
      setToast({
        ...toast,
        isShow: true,
        type: 'warning',
        title: 'Network Problem',
        message: 'Cant\'t get shop data, reload the page' 
      })
    }

  }

  async function onCommitEditData(values) {
    const edited = await db.collection('shops').doc('shop-profile').set({
      ...values
    })

    if (edited === undefined) {
      setIsEdit(false)
      getShopData()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Data Updated',
        message: 'Shop data has been updated' 
      })
    }
  }

  async function onCommitChangeLogo(file) {
    const fileExtension = file.type.split('/')[1]

    const storageRef = storage.ref('shops/' + shopData.name + '.' + fileExtension)
    const snapshot = await storageRef.put(file)
    const url = await snapshot.ref.getDownloadURL()

    const updated = await db.collection('shops').doc('shop-profile').set({
      ...shopData,
      logo_url:  url,
    })
    
    if (snapshot.state === 'success' && updated === undefined) {
      setIsEdit(false)
      getShopData()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Logo Updated',
        message: 'Shop logo changed successfully' 
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

    <Panel title='Shop Profile' size='small' isOpen={isEdit} 
      onClose={() => { 
        setIsEdit(false)
        setEditedData(shopData)
      } }>
      <div className='mb-5'>
        <Tabs 
          items={[
            { key: 'data', label: 'Data' },
            { key: 'logo', label: 'Logo' },
          ]}
          activeTab={activeTab}
          onChangeTab={(key) => setActiveTab(key)}
        />
      </div>
      {activeTab === 'data' && 
        <ShopProfileForm
          initialValues={!!editedData && editedData}
          onSubmit={onCommitEditData} 
          onCancel={() => { 
            setIsEdit(false)
            setEditedData({})
          }} />
      }
      {activeTab === 'logo' && 
        <PictureForm 
          initialImage={(!!editedData && editedData.logo_url) || defaultImage}
          onSubmit={(file) => onCommitChangeLogo(file)}
          onCancel={() => setIsEdit(false)} />
      }
    </Panel>

    <div className='flex items-center bg-white py-4 px-6 shadow mb-6 rounded'>
      <h1 className='text-2xl font-medium text-gray-600'>Shop Profile</h1>
      <span className='ml-auto text-gray-600'>{dayjs().format("dddd, MMMM D YYYY")}</span>
    </div>
  
    <div className='flex items-start'>
      <div className='bg-white w-1/3 mr-5 py-4 px-6 shadow mb-8 rounded justify-center'>
        {isLoading ? <SkeletonLoader height={150} /> : <img className='mx-auto' src={(!!shopData && shopData.logo_url) || defaultImage} alt={!!shopData ? shopData.name : ''}/>}
      </div>
      <div className='bg-white w-2/3 py-4 px-6 shadow mb-8 rounded'>
        <table className='table-auto rounded w-full'>
          {!isLoading && <tbody>
            <tr className='bg-gray-100'>
              <td className='p-3 w-24'>Name</td>
              <td className='p-3'>: {!!shopData.name ? shopData.name : '-'}</td>
            </tr>
            <tr className=''>
              <td className='p-3 w-24'>Address</td>
              <td className='p-3'>: {!!shopData.address ? shopData.address : '-'}</td>
            </tr>
            <tr className='bg-gray-100'>
              <td className='p-3 w-24'>Phone</td>
              <td className='p-3'>: {!!shopData.phone ? shopData.phone : '-'}</td>
            </tr>
          </tbody>}
        </table>
        {isLoading && <SkeletonLoader  count={3} height={35} />}
        <div className='flex justify-end mt-4'>
          {!isLoading && 
            <IconButton
              outline 
              size='small' 
              icon='pencil' 
              onClick={() => {
                setIsEdit(true)
                setEditedData(shopData)
              }}/>}
        </div>
      </div>
    </div>
  </div>)
}

export default ShopProfilePage