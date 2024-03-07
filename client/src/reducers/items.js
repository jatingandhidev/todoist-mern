import {
  START_LOADING,
  END_LOADING,
  GET_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../constants'

export default (state = { isLoading: true, items: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case GET_ITEMS:
      return { ...state, items: action.payload }
    case CREATE_ITEM:
      return { ...state, items: [...state.items, action.payload] }
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      }
    default:
      return state
  }
}
