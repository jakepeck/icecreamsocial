import {
  GetRecipeList,
  RemoveRecipe,
  SetSelectedRecipe
} from '../../services/RecipeListService'
import { AddComment } from '../../services/CommentListService'

import {
  ADD_COMMENT_TO_RECIPE,
  GET_RECIPE_LIST,
  SET_SELECTED_RECIPE,
  DELETE_RECIPE
} from '../types'

export const LoadRecipeList = () => {
  return async (dispatch) => {
    try {
      const recipeList = await GetRecipeList()
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

      console.log('load selected recipe is ', recipe)
      dispatch({ type: SET_SELECTED_RECIPE, payload: recipe })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const LoadSelectedRecipeForUpdate = (recipe) => {
  return async (dispatch) => {
    try {
      console.log('load selected recipe is ', recipe)
      dispatch({ type: SET_SELECTED_RECIPE, payload: recipe })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const AddCommentsToSelectedRecipe = (comment, username) => {
  return async (dispatch) => {
    try {
      console.log(comment)
      const myComment = await AddComment(comment)
      const myNewComment = { comment: myComment, commenter_username: username }
      dispatch({ type: ADD_COMMENT_TO_RECIPE, payload: myNewComment })
    } catch (e) {
      throw e
    }
  }
}

export const DeleteRecipeFromRecipes = (recipeId) => {
  return async (dispatch) => {
    try {
      const recipeToDelete = await RemoveRecipe(recipeId)
      console.log(recipeToDelete)
      dispatch({ type: DELETE_RECIPE, payload: recipeToDelete.payload })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
