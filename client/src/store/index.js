import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import MovieListReducer from './reducers/MovieListReducer'

const store = createStore(
  combineReducers({
    movieListState: MovieListReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
