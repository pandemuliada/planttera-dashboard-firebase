import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string, number } from 'yup'
import { Button, OutlineButton } from '../buttons'
import { FormikTextField, FormikCheckbox } from '../inputs'
import { FormikSelectField } from '../inputs'
import { privateApi } from '../../utils/request'
import { formatError } from '../../utils/format'

const defaultValues = {
  name: '',
  description: '',
  categoryId: '',
  roomId: '',
  stock: '',
  price: '',
  available: false,
}

const plantFormSchema = object().shape({
  name: string().required('Cannot be empty!'),
  description: string().required('Cannot be empty!'),
  categoryId: number().required('Cannot be empty!'),
  roomId: number().required('Cannot be empty!'),
  stock: number().required('Cannot be empty!').min(0, 'Minimal stock is 0!'),
  price: number().required('Cannot be empty!').min(1, 'Minimal price is 1!'),
})

const PlantForm = props => {
  const { initialValues, onSubmit, onCancel } = props

  const [categoryOptions, setCategoryOptions] = useState([])
  const [roomOptions, setRoomOptions] = useState([])

  useEffect(() => {
    onLoadCategory()
    onLoadRoom()
  }, [])

  async function onLoadCategory() {
    const response = await privateApi().get('categories')

    if (response && response.data.data) {
      setCategoryOptions(response.data.data)
    }
  }

  async function onLoadRoom() {
    const response = await privateApi().get('rooms')

    if (response && response.data.data) {
      setRoomOptions(response.data.data)
    }
  }

  function onSubmitForm(values, callback) {
    const { resetForm, setErrors, setSubmitting } = callback

    onSubmit(values)
      .then(() => {
        resetForm()
      })
      .catch(error => {
        setSubmitting(false)
        setErrors(formatError(error.response.data.errors))
      })
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues ? initialValues : defaultValues}
      validationSchema={plantFormSchema}
      onSubmit={onSubmitForm}
    >
      {({ handleSubmit, isSubmitting, isValid, handleReset }) => {
        return (
          <form onSubmit={handleSubmit}>
            <FormikTextField label="Name*" name="name" size="small" />
            <FormikTextField label="Description*" name="description" size="small" />

            <FormikSelectField
              label="Category*"
              name="categoryId"
              size="small"
              placeholder="Choose Category"
              options={categoryOptions}
              optionValueRef="id"
              optionPlaceholderRef="name"
            />

            <FormikSelectField
              label="Room*"
              name="roomId"
              size="small"
              placeholder="Choose Room"
              options={roomOptions}
              optionValueRef="id"
              optionPlaceholderRef="name"
            />

            <FormikTextField type="number" label="Stock*" name="stock" size="small" min="0" />

            <FormikTextField type="number" label="Price*" name="price" size="small" min="1" />

            <FormikCheckbox name="available" label="Available" size="small" />

            <div className="flex justify-end">
              <div className="mr-2">
                <Button size="small" type="submit" disabled={!isValid} loading={isSubmitting}>
                  Submit
                </Button>
              </div>
              <div className="mr-2">
                <OutlineButton
                  color="secondary"
                  size="small"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {
                    onCancel()
                    handleReset()
                  }}
                >
                  Cancel
                </OutlineButton>
              </div>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}

export default PlantForm
