import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOG_OUT,
  TOGGLE_APP_LOADING,
  TOGGLE_REGISTER_OPEN,
  TOGGLE_REGISTER_CLOSED,
  SET_USER_CREDENTIALS
} from '../types'

const initialState = {
  appLoading: false,
  authenticated: false,
  registerOpen: false,
  createRecipeOpen: false,
  newRecipe: { title: '', photo: '', content: '' },
  userCredentials: null
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_APP_LOADING:
      return { ...state, appLoading: action.payload }
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true }
    case SET_UNAUTHENTICATED:
      return initialState
    case SET_USER_CREDENTIALS:
      return { ...state, userCredentials: action.payload }
    case TOGGLE_REGISTER_OPEN:
      return { ...state, registerOpen: true }
    case TOGGLE_REGISTER_CLOSED:
      return { ...state, registerOpen: false }
    case LOG_OUT:
      return { ...state, authenticated: false }
    default:
      return { ...state }
  }
}

export default AppReducer
