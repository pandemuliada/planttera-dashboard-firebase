import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { string, object } from 'yup'
import { FormikTextField } from '../inputs'
import { Button, OutlineButton } from '../buttons'

const defaultValues = {
  password: '',
}

const passwordFormSchema = object().shape({
  password: string().required('Cannot be empty'),
})

const PasswordForm = (props) => {
  const { 
    onSubmit,
    onCancel,
  } = props

  function onSubmitForm(values, callback) {
    onSubmit(values).then(() => {
      callback.resetForm()
    }).catch(error => {
      console.log(error.response)
    })
  }
  
  return (<Formik initialValues={defaultValues} validationSchema={passwordFormSchema} onSubmit={onSubmitForm}>
    {({ handleSubmit, isSubmitting, isValid, handleReset }) => {
      return(<form onSubmit={handleSubmit}>
        <FormikTextField size='small' name='password' label='New Password*' placeholder='Enter your new password' />

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

export default PasswordForm