import Client from './index'

export const GetRecipeList = async () => {
  try {
    const res = await Client.get('/recipes/super')
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const SetSelectedRecipe = async (recipeId) => {
  try {
    const res = await Client.get(`/recipes/super/${recipeId}`)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const RemoveRecipe = async (recipeId) => {
  try {
    const res = await Client.delete(`/recipes/${recipeId}`)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
