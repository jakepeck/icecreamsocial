import Client from './index'
import { BASE_URL, axiosConfig } from '../globals'
import axios from 'axios'

export const GetRecipeList = async () => {
  try {
    console.log('get recipes in recipe list service called')
    const res = await Client.get('/recipes')

    return res.data.results
  } catch (error) {
  console.log(error)
    throw error
  }
}

export const SetSelectedRecipe = async (recipeId) => {
  try {
    console.log('set selected recipes in recipe list service called')
    console.log(recipeId)
    const res = await Client.get(`/recipes/${movieId}`)
    // const res = await Client.get(`/recipes/${movieId}`, axiosConfig)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
