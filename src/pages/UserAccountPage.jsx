import React, { useContext } from 'react'
import dayjs from 'dayjs'
import { useState } from 'react'
import { auth, storage } from '../firebase'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { IconButton } from '../components/buttons'
import Tabs from '../components/Tabs'
import Panel from '../components/Panel'
import Toaster from '../components/Toaster'
import UserAccountForm from '../components/forms/UserAccountForm'
import PasswordForm from '../components/forms/PasswordForm'
import PictureForm from '../components/forms/PictureForm'

import defaultImage from '../static/images/no-image.png'

const UserProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  const [isEdit, setIsEdit] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const defaultToastState = { 
    isShow: false, 
    type: 'default',
    duration: 4000, // remove duration property to prevent autoclose after 4s 
  }
  const [toast, setToast] = useState(defaultToastState)

  async function onCommitEditData(values) {
    try {
      const updatedProfile = await auth.currentUser.updateProfile({
        displayName: values.displayName,
      })

      const updatedEmail = await auth.currentUser.updateEmail(values.email)
      
      if (updatedProfile === undefined && updatedEmail === undefined) {
        setCurrentUser({...currentUser, ...values})
        setIsEdit(false)
        setToast({
          ...toast, 
          isShow: true,
          type: 'primary',
          title: 'Data Updated',
          message: 'Your data has been updated' 
        })
      }
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        setIsEdit(false)
        setToast({
          ...toast, 
          isShow: true,
          type: 'danger',
          title: 'Sensitive Operation',
          message: 'Login again before retrying change your email'
        })
      }
    }
  }

  async function onCommitChangePassword(values) {
    try {
      const updatedPassword = await auth.currentUser.updatePassword(values.password)
      if (updatedPassword === undefined) {
        setIsEdit(false)
        setToast({
          ...toast, 
          isShow: true,
          type: 'primary',
          title: 'Password Updated',
          message: 'Password updated successfully' 
        })
      }
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        setIsEdit(false)
        setToast({
          ...toast, 
          isShow: true,
          type: 'danger',
          title: 'Sensitive Operation',
          message: 'Login again before retrying change your password' 
        })
      }
    } 
  }

  async function onCommitChangePicture(file) {
    const fileExtension = file.type.split('/')[1]

    const storageRef = storage.ref('profiles/' + 'user_' + currentUser.uid + '.' + fileExtension)
    const snapshot = await storageRef.put(file)
    const url = await snapshot.ref.getDownloadURL()

    const updatedProfile = await auth.currentUser.updateProfile({
      photoURL:  url,
    })
    
    if (snapshot.state === 'success' && updatedProfile === undefined) {
      setIsEdit(false)
      setToast({
        ...toast, 
        isShow: true,
        type: 'primary',
        title: 'Picture Updated',
        message: 'Profile picture changed successfully' 
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

    <Panel title='User Account' size='small' isOpen={isEdit} onClose={() => setIsEdit(false)}>
      <div className='mb-5'>
        <Tabs 
          items={[
            { key: 'profile', label: "Profile" },
            { key: 'password', label: "Password" },
            { key: 'picture', label: "Picture" },
          ]}
          activeTab={activeTab}
          onChangeTab={(key) => setActiveTab(key)}
        />
      </div>
      {activeTab === 'profile' && 
        <UserAccountForm
          initialValues={currentUser}
          onSubmit={onCommitEditData} 
          onCancel={() => setIsEdit(false)} />}
      {activeTab === 'password' && 
        <PasswordForm 
          onSubmit={onCommitChangePassword} 
          onCancel={() => setIsEdit(false)} />}
      {activeTab === 'picture' && 
        <PictureForm 
          initialImage={(!!currentUser && currentUser.photoURL) || defaultImage}
          onSubmit={(file) => onCommitChangePicture(file)}
          onCancel={() => setIsEdit(false)} />}
    </Panel>

    <div className='flex items-center bg-white py-4 px-6 shadow mb-6 rounded'>
      <h1 className='text-2xl font-medium text-gray-600'>Account Detail</h1>
      <span className='ml-auto text-gray-600'>{dayjs().format("dddd, MMMM D YYYY")}</span>
    </div>
  
    <div className='flex items-start'>
      <div className='bg-white w-1/3 mr-5 py-4 px-6 shadow mb-8 rounded'>
        <img className='mx-auto' src={(!!currentUser && currentUser.photoURL) || defaultImage} alt={!!currentUser.displayName ? currentUser.displayName : ''}/>
      </div>
      <div className='bg-white w-2/3 py-4 px-6 shadow mb-8 rounded'>
        <table className='table-auto rounded w-full'>
          <tbody>
            <tr className='bg-gray-100'>
              <td className='p-3 w-24'>Name</td>
              <td className='p-3'>: {!!currentUser.displayName ? currentUser.displayName : '-'}</td>
            </tr>
            <tr className='bg-white'>
              <td className='p-3 w-24'>Email</td>
              <td className='p-3'>: {!!currentUser.email ? currentUser.email : '-'}</td>
            </tr>
          </tbody>
        </table>
        <div className='flex justify-end mt-4'>
          <IconButton
            outline 
            size='small' 
            icon='pencil' 
            onClick={() => {
              setIsEdit(true)
            }}/>
        </div>
      </div>
    </div>
  </div>)
}

export default UserProfilePage