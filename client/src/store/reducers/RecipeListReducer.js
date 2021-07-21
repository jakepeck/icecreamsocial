const {
  RECIPE_LIST_LOADING_TYPE,
  GET_RECIPE_LIST,
  SET_SELECTED_RECIPE,
  POST_RECIPE,
  DELETE_RECIPE,
  ADD_COMMENT_TO_RECIPE
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
    case ADD_COMMENT_TO_RECIPE:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          comments: [...state.selectedRecipe.comments, action.payload]
        }
      }
    case POST_RECIPE:
      return { ...state, recipes: [action.payload, ...state.recipes] }
    case DELETE_RECIPE:
      const copyOfRecipes = [...state.recipes]
      copyOfRecipes.forEach((recipe, idx) => {
        if (recipe.recipe.id === action.payload) {
          copyOfRecipes.splice(idx, 1)
        }
      })
      return { ...state, recipes: copyOfRecipes }
    default:
      return { ...state }
  }
}

export default RecipeListReducer
