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
import { SET_AUTHENTICATED } from './store/types'
import { useEffect } from 'react'
import RecipeDetail from './components/RecipeDetail'

function App(props) {
  console.log('app props')
  console.log(props)

  const getToken = () => {
    let token = localStorage.getItem('token')
    if (token) {
      store.dispatch({ type: SET_AUTHENTICATED })
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/users/all" component={UserList} />

        <Route path="/users/:user_id" component={UserDetail} />

        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/login" component={LogIn} />
        <Route exact path="/createrecipe" component={CreateRecipe} />
        <Route exact path="/recipes" component={RecipeList} />
        <Route exact path="/recipes/:recipe_id" component={RecipeDetail} />
      </Switch>

      <footer>
        <Nav />
      </footer>
    </div>
  )
}

export default App
