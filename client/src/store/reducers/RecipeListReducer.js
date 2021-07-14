const {
  RECIPE_LIST_LOADING_TYPE,
  GET_RECIPE_LIST,
  SET_SELECTED_RECIPE,
  POST_RECIPE,
  DELETE_RECIPE
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
    case POST_RECIPE:
      return { ...state, recipes: [action.payload, ...state.recipes] }
    case DELETE_RECIPE:
      state.recipes.forEach((recipe, idx) => {
        if (recipe.id === action.payload) {
          state.recipes.splice(idx, 1)
        }
        return { ...state }
      })
    default:
      return { ...state }
  }
}

export default RecipeListReducer
