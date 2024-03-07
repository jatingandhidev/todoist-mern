import axios from 'axios'
const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export const fetchItems = (id) => API.get(`/items/${id}`)
export const createItem = (newItem) => API.post(`/items`, newItem)
export const deleteItem = (id) => API.delete(`/items/${id}`)
export const updateItem = (id, updatedItem) =>
  API.patch(`/items/${id}`, updatedItem)

export const signin = (formData) => API.post(`/user/signin`, formData)
export const signup = (formData) => API.post(`/user/signup`, formData)
export const deleteUser = (id) => API.delete(`/user/${id}`)
export const updateUser = (id, updatedUser) =>
  API.patch(`/user/${id}`, updatedUser)
