import { GetRecipeList, SetSelectedRecipe } from '../../services/RecipeListService'
import { GET_RECIPE_LIST, SET_SELECTED_RECIPE } from '../types'

export const LoadRecipeList = () => {
  return async (dispatch) => {
    try {
      const recipeList = await GetRecipeList()
      console.log('Load recipe list called')
      dispatch({ type: GET_RECIPE_LIST, payload: recipeList })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const LoadSelectedRecipe = (recipeId) => {
  return async (dispatch) => {
    try {
      const recipe = await SetSelectedRecipe(recipeId)
      console.log('load selected recipe called')
      console.log(recipe)
      dispatch({ type: SET_SELECTED_RECIPE, payload: recipe })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
