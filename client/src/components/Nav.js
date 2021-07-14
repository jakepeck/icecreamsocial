import { NavLink } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import store from '../store'
import { SET_UNAUTHENTICATED } from '../store/types'

const Nav = (props) => {
  console.log('nav props:', props)
  let authenticated = store.getState().appState.authenticated
  useEffect(() => {
    console.log('nav use effect firing')
    console.log(props)
    console.log(store)
    // authenticated = store.getState().appState.authenticated
    console.log(authenticated)
  }, [authenticated])

  const logOut = () => {
    console.log(
      'logOut function called, user auth status upon function entry was :'
    )
    console.log(store.getState().appState.authenticated)
    store.dispatch({ type: SET_UNAUTHENTICATED })
    console.log('user auth status after dispatching store')
    console.log(store.getState().appState.authenticated)
    localStorage.clear()
  }

  const handleClickLogIn = (e) => {
    e.preventDefault()
    console.log('handleClickLogIn function called')
    // props.toggleLoginOpen(true)
  }

  const handleClickRegister = (e) => {
    e.preventDefault()
    console.log('handleClickRegister function called')
    // props.toggleRegisterOpen(true)
  }
  // console.log('nav props:')
  // console.log(props)
  console.log(store.getState().appState.authenticated)
  // let authenticated = store.getState().appState.authenticated

  return (
    <div className="nav-bar">
      <div className="nav-links">
        <NavLink className="nav-link" to="/recipes">
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
        </NavLink>
        <NavLink className="nav-link" to="/auth/register">
          Sign Up
        </NavLink>
        <NavLink className="nav-link" to="/auth/login">
          Log In
        </NavLink>
      </div>

      <button
        onClick={
          !store.getState().appState.authenticated
            ? () => handleClickRegister
            : () =>
                props.history.push(
                  `/users/${store.getState().appState.userCredentials.id}`
                )
        }
        className="nav-btn"
      >
        {!store.getState().appState.authenticated ? 'Sign Up!' : 'My Account'}
      </button>
      <button
        // onClick={!props.authenticated ? handleClickLogIn : props.logOut}
        onClick={!store.getState().appState.authenticated ? () => {} : logOut}
        className="nav-btn"
      >
        {!store.getState().appState.authenticated ? 'Log In' : 'Log Out'}
      </button>
    </div>
  )
}

export default Nav
