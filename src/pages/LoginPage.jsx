import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { auth } from '../firebase'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { Redirect, useHistory } from 'react-router'

import { FormikTextField } from '../components/inputs'
import { Button } from '../components/buttons'

import background from '../static/images/login-bg.jpg'
import { useContext } from 'react'
import { api } from '../utils/request'
import { setLocalStorage, removeLocalStorage } from '../utils/helper'

const initialValues = {
  email: '',
  password: '',
}

const loginValidation = object().shape({
  email: string()
    .required('Please enter your email')
    .email('Please enter your valid email address'),
  password: string().required('Please enter your password'),
})

const LoginPage = () => {
  let history = useHistory()

  const { currentUser, getCurrentUser } = useContext(CurrentUserContext)
  const [isFailed, setIsFailed] = useState(false)

  if (!!currentUser) {
    history.push('/dashboard')
  }

  async function login(values) {
    const { email, password } = values

    const response = await api().post('users/login', {
      email,
      password,
    })

    if (response.data.data.token) {
      setLocalStorage('token', response.data.data.token)
      getCurrentUser()
      history.push('/dashboard')
    } else {
      removeLocalStorage('token')
    }
  }

  return (
    <>
      <div className="w-full flex items-center h-screen bg-teal-400">
        <div
          className="flex items-center mx-auto bg-white rounded-lg shadow-xl"
          style={{ width: 1200, maxWidth: 1200 }}
        >
          <div className="h-full w-1/2 bg-gray-100 rounded-tl-lg rounded-bl-lg">
            <img src={background} alt="Login Vector" className="block mr-32 w-full" />
          </div>
          <div className="w-1/2 p-12">
            <div className="bg-white p-12 rounded">
              <Formik
                initialValues={initialValues}
                onSubmit={login}
                validationSchema={loginValidation}
              >
                {({ handleSubmit, isSubmitting, isValid }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <h1 className="text-4xl text-teal-500 mb-8 font-bold">Login to Dashboard</h1>
                      {isFailed && (
                        <p className="text-red-500 mb-5 italic">
                          Login failed, <br /> Please check your email & password
                        </p>
                      )}

                      <FormikTextField
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="useremail@mail.com"
                      />
                      <FormikTextField
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="*************"
                      />
                      <div className="mt-8">
                        <Button
                          block
                          color="primary"
                          type="submit"
                          disabled={!isValid}
                          loading={isSubmitting}
                        >
                          LOGIN
                        </Button>
                      </div>
                    </form>
                  )
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LoginPage
