import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string, number } from 'yup'
import { Button, OutlineButton } from '../buttons'
import { FormikTextField, FormikCheckbox } from '../inputs'
import { FormikSelectField } from '../inputs'
import { db } from '../../firebase'

const defaultValues = {
  name: '',
  category_id: '',
  room_id: '',
  stock: '',
  price: '',
  available: false,
}

const plantFormSchema = object().shape({
  name: string().required('Cannot be empty'),
  category_id: string().required('Cannot be empty'),
  room_id: string().required('Cannot be empty'),
  stock: number().required('Cannot be empty').min(0, 'Minimal stock is 0'),
  price: number().required('Cannot be empty').min(1, 'Minimal price is 1')
})

const PlantForm = (props) => {
  const {
    initialValues,
    onSubmit,
    onCancel,
  } = props

  const [categoryOptions, setCategoryOptions] = useState([])
  const [roomOptions, setRoomOptions] = useState([])


  useEffect(() => {
    onLoadCategory()
    onLoadRoom()
  }, [])

  async function onLoadCategory() {
    const data = []
    const docs = await db.collection('categories').get()
    
    docs.forEach((doc) => {
      data.push({
        key: doc.id,
        label: doc.data().name
      })
    })
    
    if (!!data) {
      setCategoryOptions([...data])
    }
  }
  
  async function onLoadRoom() {
    const data = []
    const docs = await db.collection('rooms').get()
    
    docs.forEach((doc) => {
      data.push({
        key: doc.id,
        label: doc.data().name
      })
    })
    
    if (!!data) {
      setRoomOptions([...data])
    }
  }

  function onSubmitForm(values, callback) {
    values['category'] = categoryOptions.find(category => category.key === values.category_id)  
    values['room'] = roomOptions.find(room => room.key === values.room_id)  
    
    delete values.category_id
    delete values.room_id

    onSubmit(values).then(() => {
      callback.resetForm()
    }).catch(error => {
      console.log(error.response.data)
    })
  }
  
  return (<Formik enableReinitialize initialValues={initialValues ? initialValues : defaultValues} validationSchema={plantFormSchema} onSubmit={onSubmitForm}>
    {({ handleSubmit, isSubmitting, isValid, handleReset }) => {
      return (<form onSubmit={handleSubmit}>
        <FormikTextField label='Name*' name='name' size='small'/>
        
        <FormikSelectField label='Category*' name='category_id' size='small' placeholder='Choose Category'
          options={categoryOptions}/>
          
        <FormikSelectField label='Room*' name='room_id' size='small' placeholder='Choose Room'
          options={roomOptions}/>

        <FormikTextField type='number' label='Stock*' name='stock' size='small' min='0'/>
        
        <FormikTextField type='number' label='Price*' name='price' size='small' min='1'/>

        <FormikCheckbox name='available' label='Available' size='small'/>
        
        <div className='flex justify-end'>
          <div className='mr-2'>
            <Button size='small' type='submit' disabled={!isValid} loading={isSubmitting}>Submit</Button>
          </div>
          <div className='mr-2'>
            <OutlineButton color='secondary' size='small' type='submit' disabled={isSubmitting} onClick={() => {
              onCancel()
              handleReset()
            }}>Cancel</OutlineButton>
          </div>
        </div>
      </form>)
    }}

  </Formik>)
}

export default PlantForm