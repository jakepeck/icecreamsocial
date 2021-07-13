// const {
//   MOVIELIST_LOADING_TYPE,
//   GET_MOVIELIST,
//   SET_SELECTED_MOVIE
// } = require('../types')

// const iState = {
//   movies: [],
//   moviesLoading: '', // Should be type enum('Loading', 'Loaded', 'Inactive')
//   selectedMovie: null
// }

// const MovieListReducer = (state = iState, action) => {
//   switch (action.type) {
//     case MOVIELIST_LOADING_TYPE:
//       return { ...state, moviesLoading: action.payload }
//     case GET_MOVIELIST:
//       return { ...state, movies: action.payload }
//     case SET_SELECTED_MOVIE:
//       return { ...state, selectedMovie: action.payload }
//     default:
//       return { ...state }
//   }
// }

// export default MovieListReducer
