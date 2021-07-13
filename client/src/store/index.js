import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import RecipeListReducer from './reducers/RecipeListReducer'
import AppReducer from './reducers/AppReducer'
import UserListReducer from './reducers/UserListReducer'

const store = createStore(
  combineReducers({
    recipeListState: RecipeListReducer, userListState: UserListReducer, appState: AppReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
