import './App.css'
import RecipeList from './components/RecipeList'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import Register from './components/Register'
import Login from './components/LogIn'
import Nav from './components/Nav'
import { Route, Switch } from 'react-router-dom'
import React from 'react'
import store from './store'

function App(props) {
  console.log('app props')
  console.log(props)
  console.log(store.getState())
  return (
    <div className="App">
      {/* <header className="App-header">
      <h1>Successful Opening!</h1>
      </header> */}
      {/* <header><Nav/></header>
      
      <RecipeList /> */}

      <Switch>
        <Route exact path="/users/all">
          {' '}
          <UserList />
        </Route>
        <Route path="/users/:user_id" component={UserDetail} />

        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/login" component={Login} />

        <Route path="/">
          <RecipeList />
        </Route>
      </Switch>

      <footer>
        <Nav />
      </footer>
    </div>
  )
}

export default App
