import { AUTH, LOGOUT, START_LOADING, END_LOADING } from '../constants'

export default (state = { isLoading: false, authData: null }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))

      return { ...state, authData: action?.payload }

    case LOGOUT:
      localStorage.clear()
      return { ...state, authData: null }

    default:
      return state
  }
}
