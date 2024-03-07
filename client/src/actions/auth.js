import { toast } from 'react-toastify'
import * as api from '../api'
import { AUTH, LOGOUT, START_LOADING, END_LOADING } from '../constants'

export const signin = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.signin(formData).catch((error) => {
      if (error.response && error.response.status === 400) {
        toast.error('Invalid Credentials')
      } else if (error.response && error.response.status === 404) {
        toast.error("User doesn't exist.")
      } else {
        toast('An error occurred. Please try again later.')
      }
    })
    dispatch({ type: AUTH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.message)
  }
}

export const signup = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.signup(formData).catch((error) => {
      if (error.response && error.response.status === 404) {
        toast.error('Account already exists for this email')
      } else {
        toast('An error occurred. Please try again later.')
      }
    })

    dispatch({ type: AUTH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.message)
  }
}

export const updateUser = (id, updatedUser) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, updatedUser)
    dispatch({ type: AUTH, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id)
    dispatch({ type: LOGOUT })
  } catch (error) {
    console.log(error.message)
  }
}
