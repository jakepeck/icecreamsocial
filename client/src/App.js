import './App.css';
import RecipeList from './components/RecipeList';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import Nav from './components/Nav';
import { Route, Switch } from 'react-router-dom'
import React from 'react'

function App(props) {
  console.log(props)
  return (
    <div className="App">
      {/* <header className="App-header">
      <h1>Successful Opening!</h1>
      </header> */}
      {/* <header><Nav/></header>
      
      <RecipeList /> */}
      
      
      <Switch>
        <Route exact path = "/users/all"> <UserList /></Route>
        {/* <Route path="/users/:user_id" > <UserDetail /></Route> */}



        <Route
          path="/"
          
        ><RecipeList/></Route>
        </Switch>
      
      <footer>
      <Nav/>
      </footer>
   
    </div>
  );
}

export default App;
