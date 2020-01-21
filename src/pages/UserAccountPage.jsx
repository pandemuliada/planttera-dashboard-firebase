import React, { useEffect, useContext } from 'react'
import dayjs from 'dayjs'
import { useState } from 'react'
import { db, auth } from '../firebase'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { IconButton } from '../components/buttons'
import Panel from '../components/Panel'
import UserAccountForm from '../components/forms/UserAccountForm'

const UserProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  const [isEdit, setIsEdit] = useState(false);

  async function onCommitEditData(values) {
    try {
      const updatedProfile = await auth.currentUser.updateProfile({
        displayName: values.displayName
      })

      const updatedEmail = await auth.currentUser.updateEmail(values.email)
      
      if (updatedProfile == undefined && updatedEmail == undefined) {
        setCurrentUser({...currentUser, ...values})
        onCancelEditData()
      } else {
        throw "Something went wrong!"
      }
    } catch (error) {
      console.error(error)
    }
  }

  function onCancelEditData() {
    setIsEdit(false)
  }

  return (<div>
    <Panel title='User Account' size='small' isOpen={isEdit} onClose={() => onCancelEditData()}>
      <UserAccountForm
        initialValues={currentUser}
        onSubmit={onCommitEditData} 
        onCancel={() => onCancelEditData()} />
    </Panel>

    <div className='flex items-center bg-white py-4 px-6 shadow mb-6 rounded'>
      <h1 className='text-2xl font-medium text-gray-600'>Account Detail</h1>
      <span className='ml-auto text-gray-600'>{dayjs().format("dddd, MMMM D YYYY")}</span>
    </div>
  
    <div className='flex'>
      <div className='bg-white w-1/3 mr-5 py-4 px-6 shadow mb-8 rounded'>
        <img src={currentUser && currentUser.photoURL} alt={currentUser && currentUser.displayName}/>
      </div>
      <div className='bg-white w-2/3 py-4 px-6 shadow mb-8 rounded'>
        <table className='table-auto rounded w-full'>
          <tbody>
            <tr className='bg-gray-100'>
              <td className='p-3 w-24'>Name</td>
              <td className='p-3'>: {!!currentUser ? currentUser.displayName : '-'}</td>
            </tr>
            <tr className='bg-white'>
              <td className='p-3 w-24'>Email</td>
              <td className='p-3'>: {!!currentUser ? currentUser.email : '-'}</td>
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