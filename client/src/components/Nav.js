import { NavLink } from 'react-router-dom'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Nav = (props) => {
  // const handleClickLogIn = (e) => {
  //   e.preventDefault()
  //   // props.toggleLoginOpen(true)
  // }

  // const handleClickRegister = (e) => {
  //   e.preventDefault()
  //   // props.toggleRegisterOpen(true)
  // }

  return (
    <div className="nav-bar">
      
      <div className="nav-links"><NavLink className="nav-link" to="/recipes">
          Recipes
        </NavLink>
        <NavLink className="nav-link" to="/users/all">
          Users
        </NavLink>
        <NavLink className="nav-link" to="/reviews">
          Reviews
        </NavLink>
        <NavLink className="nav-link" to="/comments">
          Comments
        </NavLink>
        <NavLink className="nav-link" to="/createrecipe">
          Post
        </NavLink></div>
       
        
        
        <button
          // onClick={
          //   !props.authenticated
          //     ? handleClickRegister
          //     : () => props.history.push('/account')
          // }
          className="nav-btn"
        >
          {!props.authenticated ? 'Sign Up!' : 'My Account'}
        </button>
        <button
          // onClick={!props.authenticated ? handleClickLogIn : props.logOut}
          className="nav-btn"
        >
          {!props.authenticated ? 'Log In' : 'Log Out'}
        </button>

    </div>

      
  )
}

export default Nav
