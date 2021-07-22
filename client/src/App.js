import './App.css'
import RecipeList from './components/RecipeList'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import Register from './components/Register'
import LogIn from './components/LogIn'
import Nav from './components/Nav'
import CreateRecipe from './components/CreateRecipe'
import { Route, Switch } from 'react-router-dom'
import React from 'react'
import store from './store'
import { SET_AUTHENTICATED, SET_USER_CREDENTIALS } from './store/types'
import { useEffect } from 'react'
import RecipeDetail from './components/RecipeDetail'
import { BASE_URL } from './globals'
import axios from 'axios'
import UpdateRecipe from './components/UpdateRecipe'

function App(props) {
  const getToken = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      const res = await axios.get(`${BASE_URL}/auth/login`)
      store.dispatch({ type: SET_AUTHENTICATED })
      store.dispatch({ type: SET_USER_CREDENTIALS, payload: res.data })
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/users/all" component={UserList} />
        <Route exact path="/users/:user_id" component={UserDetail} />
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/login" component={LogIn} />
        <Route exact path="/updaterecipe/:recipe_id" component={UpdateRecipe} />
        <Route exact path="/createrecipe" component={CreateRecipe} />
        <Route exact path="/recipes" component={RecipeList} />
        <Route exact path="/recipes/:recipe_id" component={RecipeDetail} />
        <Route path="/" component={RecipeList} />
      </Switch>

      <footer></footer>
    </div>
  )
}

export default App
