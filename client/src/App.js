import './App.css';
import RecipeList from './components/RecipeList';
import Nav from './components/Nav';
import { Route, Switch } from 'react-router-dom'
import React from 'react'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      <h1>Successful Opening!</h1>
      </header> */}
      {/* <header><Nav/></header>
      
      <RecipeList /> */}
      
      <Switch>
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
