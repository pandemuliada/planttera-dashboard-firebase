import React from 'react'
import { Formik } from "formik"
import { object, mixed } from "yup"
import { TextField } from "../inputs"
import { OutlineButton, Button } from '../buttons'

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png"
];

const defaultValues = {
  file: ""
}

const pictureFormSchema = object().shape({
  file: mixed().required('Please select a file')
    .test(
      "fileFormat",
      "Unsupported file format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )  
    .test(
      "fileSize",
      "File size is too large",
      value => value && (value.size / 1024 /1024) <= 1 // Set error if file size is more than 1mb
    )
})

const PictureForm = (props) => {
  const {
    initialImage,
    onSubmit,
    onCancel,
    description,
  } = props

  function onSubmitForm(values, callback) {
    onSubmit(values. file).then(() => {
      callback.resetForm();
    })
  }

  return (<div>
    <div className='mb-4'>
      <img src={initialImage} alt=""/>
    </div>
    <Formik initialValues={defaultValues} onSubmit={onSubmitForm} validationSchema={pictureFormSchema}>
      {({ values, handleSubmit, isSubmitting, handleReset, setFieldValue, errors }) => {
        return (<form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='mb-5'>
            <p className='text-gray-600 text-sm italic mb-2 mt-2'>{description}</p>
            <label className={`text-gray-600 px-4 py-3 cursor-pointer w-full block text-sm border-dashed border-2 ${isSubmitting ? 'cursor-not-allowed' : 'cursor-auto'} ${errors.file ? 'border-red-400 bg-red-100' : 'border-blue-200 bg-gray-100'}`}>
              <span>{!!values.file ? values.file.name : 'Browse file'}</span>
              <div className='hidden'>
                <TextField size='small' type='file' name='file' disabled={isSubmitting}  values={!!values.file ? values.file.name : ''} onChange={(e) => setFieldValue("file", e.currentTarget.files[0])} />
              </div>
            </label>
            <p className='text-xs italic mt-1 text-red-400'>{errors.file}</p>
          </div>

          <div className='flex justify-end'>
            <div className='mr-2'>
              <Button size='small' type='submit' disabled={errors.file} loading={isSubmitting}>Submit</Button>
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
    </Formik>
  </div>)
}

export default PictureForm