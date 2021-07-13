import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import RecipeListReducer from './reducers/RecipeListReducer'
import AppReducer from './reducers/AppReducer'

const store = createStore(
  combineReducers({
    recipeListState: RecipeListReducer, appState: AppReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
