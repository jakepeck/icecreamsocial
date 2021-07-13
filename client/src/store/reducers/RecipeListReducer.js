const {
  RECIPE_LIST_LOADING_TYPE,
  GET_RECIPE_LIST,
  SET_SELECTED_RECIPE
} = require('../types')

const iState = {
  recipes: [],
  recipesLoading: '', // Should be type enum('Loading', 'Loaded', 'Inactive')
  selectedRecipe: null
}

const RecipeListReducer = (state = iState, action) => {
  switch (action.type) {
    case RECIPE_LIST_LOADING_TYPE:
      return { ...state, recipesLoading: action.payload }
    case GET_RECIPE_LIST:
      return { ...state, recipes: action.payload }
    case SET_SELECTED_RECIPE:
      return { ...state, selectedRecipe: action.payload }
    default:
      return { ...state }
  }
}

export default RecipeListReducer
