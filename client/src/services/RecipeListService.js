import Client from './index'

export const GetRecipeList = async () => {
  try {
    console.log('get recipes in recipe list service called')
    const res = await Client.get('/recipes/super')
    console.log(res)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const SetSelectedRecipe = async (recipeId) => {
  try {
    console.log('set selected recipes in recipe list service called')
    console.log(recipeId)
    const res = await Client.get(`/recipes/super/${recipeId}`)
    // const res = await Client.get(`/recipes/${movieId}`, axiosConfig)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const RemoveRecipe = async (recipeId) => {
  try {
    const res = await Client.delete(`/recipes/${recipeId}`)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
