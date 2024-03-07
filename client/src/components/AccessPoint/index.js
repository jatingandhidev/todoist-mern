import React, { useState } from 'react'
import './styles.css'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { signin, signup } from '../../actions/auth'
import { toast } from 'react-toastify'
import { useGoogleLogin } from '@react-oauth/google'

const AccessPoint = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'firstName':
        setFormData({ ...formData, firstName: e.target.value })
        break
      case 'lastName':
        setFormData({ ...formData, lastName: e.target.value })
        break
      case 'email':
        setFormData({ ...formData, email: e.target.value })
        break
      case 'password':
        setFormData({ ...formData, password: e.target.value })
        break
      default:
        break
    }
  }
  const toggleForm = () => {
    setIsSignUp(!isSignUp)
  }

  const handleEnter = () => {
    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    if (isSignUp) {
      if (
        formData.firstName !== '' &&
        formData.lastName !== '' &&
        formData.email !== '' &&
        formData.password !== ''
      ) {
        if (!isEmailValid(formData.email)) {
          toast('Please provide a valid email address')
          return
        }
        toast('Redirecting to the dashboard!')
        dispatch(signup(formData))
      } else {
        toast('Please fill all the fields')
      }
    } else {
      if (formData.email !== '' && formData.password !== '') {
        if (!isEmailValid(formData.email)) {
          toast('Please provide a valid email address')
          return
        }
        toast('Redirecting to the dashboard!')
        dispatch(signin(formData))
      } else {
        toast('Please fill all the fields')
      }
    }
  }
  const googleSuccess = async (res) => {
    toast('Redirecting to the dashboard!')
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${res.access_token}`,
      },
    })

    const result = await response.json()

    dispatch(
      signup({
        firstName: result.given_name,
        lastName: result.family_name,
        email: `${result.email}.${process.env.REACT_APP_SECRET_GOOGLE_KEY}`,
        password: result.id,
      })
    )
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('Google SIgn In was unsuccessful. Try again later')
    toast('Google SIgn In was unsuccessful. Try again later')
  }
  const login = useGoogleLogin({
    onSuccess: googleSuccess,
    onFailure: googleFailure,
  })

  return (
    <div className="container">
      <div className="left"></div>
      <div className="right">
        <div className="card">
          <div className="card-title">{isSignUp ? 'Sign Up' : 'Sign In'}</div>
          {isSignUp && (
            <div className="inputBox">
              <input
                id="firstName"
                type="text"
                required="required"
                value={formData.firstName}
                onChange={handleChange}
              />
              <span>First Name</span>
            </div>
          )}
          {isSignUp && (
            <div className="inputBox">
              <input
                id="lastName"
                type="text"
                required="required"
                value={formData.lastName}
                onChange={handleChange}
              />
              <span>last name</span>
            </div>
          )}
          <div className="inputBox input-email">
            <input
              id="email"
              type="text"
              required="required"
              value={formData.email}
              onChange={handleChange}
            />
            <span>Email</span>
          </div>
          <div className="inputBox">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required="required"
              value={formData.password}
              onChange={handleChange}
            />
            <span>Password</span>
            <div
              className="visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
          <button className="enter" onClick={handleEnter}>
            Enter
          </button>
          <div className="google" onClick={login}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            Continue with Google
          </div>
          <p className="switch-link" onClick={toggleForm}>
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccessPoint
