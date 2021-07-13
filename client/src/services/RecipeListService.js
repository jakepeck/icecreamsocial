import Client from './index'
import { BASE_URL, axiosConfig } from '../globals'
import axios from 'axios'

export const GetMovieList = async () => {
  try {
    console.log('get movies in movie service called')
    const res = await Client.get('/discover/movie')
    // const res = await Client.get('/discover/movie', axiosConfig)
    return res.data.results
  } catch (error) {
    throw error
  }
}

export const SetSelectedMovie = async (movieId) => {
  try {
    console.log('set selecettd movies in movie list service called')
    console.log(movieId)
    const res = await Client.get(`/movie/${movieId}`)
    // const res = await Client.get(`/movie/${movieId}`, axiosConfig)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
