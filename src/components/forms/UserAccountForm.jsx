import React from 'react'
import { Formik } from 'formik'
import { string, object } from 'yup'
import { FormikTextField } from '../inputs'
import { Button, OutlineButton } from '../buttons'

const defaultValues = {
  displayName: '',
  email: '',
}

const userAccountFormSchema = object().shape({
  displayName: string().required('Cannot be empty'),
  email: string().required('Cannot be empty'),
})

const UserAccountForm = (props) => {
  const { 
    initialValues,
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
  
  return (<Formik enableReinitialize initialValues={initialValues ? initialValues : defaultValues} validationSchema={userAccountFormSchema} onSubmit={onSubmitForm}>
    {({ handleSubmit, isSubmitting, isValid, handleReset }) => {
      return(<form onSubmit={handleSubmit}>
        <FormikTextField size='small' name='displayName' label='Name*' />
        <FormikTextField size='small' name='email' label='Email*' />

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

export default UserAccountForm