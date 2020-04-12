import React from 'react'
import { Formik } from 'formik'
import { string, object, ref } from 'yup'
import { FormikTextField } from '../inputs'
import { Button, OutlineButton } from '../buttons'
import { formatError } from '../../utils/format'

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
}

const passwordFormSchema = object().shape({
  oldPassword: string()
    .required('Password cannot be empty!')
    .min(6, 'Password should at least 6 characters!'),
  newPassword: string()
    .required('Password cannot be empty!')
    .min(6, 'Password should at least 6 characters!'),
  newPasswordConfirm: string()
    .required('Password cannot be empty!')
    .min(6, 'Password should at least 6 characters!')
    .oneOf([ref('newPassword')], 'Password does not match!'),
})

const PasswordForm = props => {
  const { onSubmit, onCancel } = props

  function onSubmitForm(values, callback) {
    const { resetForm, setErrors, setSubmitting } = callback

    onSubmit(values)
      .then(() => {
        resetForm()
      })
      .catch(error => {
        setErrors(formatError(error.response.data.errors))
        setSubmitting(false)
      })
  }

  return (
    <Formik
      enableReinitialize
      initialValues={defaultValues}
      validationSchema={passwordFormSchema}
      onSubmit={onSubmitForm}
    >
      {({ handleSubmit, isSubmitting, isValid, handleReset }) => {
        return (
          <form onSubmit={handleSubmit}>
            <FormikTextField
              type="password"
              size="small"
              name="oldPassword"
              label="Old Password*"
              placeholder="Enter your old password"
            />
            <FormikTextField
              type="password"
              size="small"
              name="newPassword"
              label="New Password*"
              placeholder="Enter your new password"
            />
            <FormikTextField
              type="password"
              size="small"
              name="newPasswordConfirm"
              label="Confirm Password*"
              placeholder="Confirm your new password"
            />

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

export default PasswordForm
