import { combineReducers } from 'redux'
import items from './items'
import auth from './auth'

export default combineReducers({ items, auth })
