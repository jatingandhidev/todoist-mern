import * as api from '../api'
import {
  START_LOADING,
  END_LOADING,
  GET_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../constants'

export const getItems = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchItems(id)
    dispatch({ type: GET_ITEMS, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const addItem = (item) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createItem(item)
    dispatch({ type: CREATE_ITEM, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const updateItem = (id, updatedItem) => async (dispatch) => {
  try {
    const { data } = await api.updateItem(id, updatedItem)
    dispatch({ type: UPDATE_ITEM, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteItem = (id) => async (dispatch) => {
  try {
    await api.deleteItem(id)
    dispatch({ type: DELETE_ITEM, payload: id })
  } catch (error) {
    console.log(error)
  }
}
