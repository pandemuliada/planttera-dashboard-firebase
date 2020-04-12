import React, { useState, useContext } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useHistory } from 'react-router'

import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { FormikTextField } from '../components/inputs'
import { Button } from '../components/buttons'

import { api } from '../utils/request'
import { setLocalStorage, removeLocalStorage } from '../utils/helper'
import { formatError } from '../utils/format'

import background from '../static/images/login-bg.jpg'

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
  const [isError, setIsError] = useState(false)
  const [errors, setErrors] = useState({})

  if (!!currentUser) {
    history.push('/dashboard')
  }

  async function login(values) {
    const { email, password } = values

    api()
      .post('users/login', {
        email,
        password,
      })
      .then(response => {
        if (response.data.data.token) {
          setIsError(false)
          setLocalStorage('token', response.data.data.token)
          getCurrentUser()
          history.push('/dashboard')
        }
      })
      .catch(error => {
        setIsError(true)
        setErrors(formatError(error.response.data.errors))
        removeLocalStorage('token')
      })
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
                      {isError && (
                        <p className="text-red-500 mb-5 italic">
                          Login failed, <br /> Please check your email & password
                        </p>
                      )}

                      <FormikTextField
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="useremail@mail.com"
                        error={errors.email}
                      />
                      <FormikTextField
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="*************"
                        error={errors.password}
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
