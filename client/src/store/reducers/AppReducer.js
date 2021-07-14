const initialState = {
  appLoading: false,
  authenticated: false,
  registerOpen: false,
  createRecipeOpen: false,
  newRecipe: {title:'',photo:'', content:''}
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_APP_LOADING':
      return { ...state, appLoading: action.payload }
    default:
      return { ...state }
  }
}

export default AppReducer
