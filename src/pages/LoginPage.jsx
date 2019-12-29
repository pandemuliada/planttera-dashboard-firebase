import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { auth } from '../firebase'
import { useCurrentUser } from '../contexts/AuthContext'
import { withRouter, Redirect } from 'react-router'

import { FormikTextField } from '../components/inputs'
import { Button } from '../components/buttons'

import BusinessVector from '../static/images/business-vector.svg'

const initialValues = {
  email: '',
  password: '',
}

const loginValidation = object().shape({
  email: string().required('Please enter your email').email('Please enter your valid email address'),
  password: string().required('Please enter your password'),
}) 

const LoginPage = ({ history }) => {
  const currentUser = useCurrentUser()
  const [isFailed, setIsFailed] = useState(false)

  if(!!currentUser) {
    return <Redirect to='/' />
  }

  async function login(values) {
    const { email, password } = values

    try {
      const user = await auth.signInWithEmailAndPassword(email, password)
      if (user) { 
        history.push('/')
        setIsFailed(false)
      }
    } catch (error) {
      if (error) setIsFailed(true)
    }
  }

  return(<>
    <div className='w-full flex items-center h-screen bg-blue-200'>
      <div className='flex items-center mx-auto bg-white rounded-lg shadow-lg' style={{ width: 1200, maxWidth: 1200 }}>
        <div className='h-full w-1/2 p-24 bg-gray-100 rounded-tl-lg rounded-bl-lg'>
          <img src={BusinessVector} alt='Login Vector' className="block mr-32 w-full"/>
        </div>
        <div className='w-1/2 p-12'>
          <div className='bg-white p-12 rounded'>
            <Formik initialValues={initialValues} onSubmit={login} validationSchema={loginValidation}>
              {({ handleSubmit, isSubmitting, isValid }) => {
                return (<form onSubmit={handleSubmit}>
                  <h1 className='text-4xl text-blue-500 mb-8 font-bold'>Login to Dashboard</h1>
                  {isFailed && <p className='text-red-500 mb-5 italic'>Login failed, <br/> Please check your email & password</p>}

                  <FormikTextField type='email' label='Email' name='email' placeholder='useremail@mail.com' />
                  <FormikTextField type='password' name='password' label='Password' placeholder='*************' />
                  <div className='mt-8'>
                    <Button block color='primary' type='submit' disabled={!isValid} loading={isSubmitting}>LOGIN</Button>
                  </div>
                </form>)
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default withRouter(LoginPage)