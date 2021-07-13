// import { GetMovieList, SetSelectedMovie } from '../../services/MovieListService'
// import { GET_MOVIELIST, SET_SELECTED_MOVIE } from '../types'

// export const LoadMovieList = () => {
//   return async (dispatch) => {
//     try {
//       const movieList = await GetMovieList()
//       console.log('Load movie list called')
//       dispatch({ type: GET_MOVIELIST, payload: movieList })
//     } catch (e) {
//       console.log(e)
//       throw e
//     }
//   }
// }

// export const LoadSelectedMovie = (movieId) => {
//   return async (dispatch) => {
//     try {
//       const movie = await SetSelectedMovie(movieId)
//       console.log('load selected movie calleed')
//       console.log(movie)
//       dispatch({ type: SET_SELECTED_MOVIE, payload: movie })
//     } catch (e) {
//       console.log(e)
//       throw e
//     }
//   }
// }
