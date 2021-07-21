import { useHistory } from 'react-router-dom'
import React from 'react'
import store from '../store'
import { SET_UNAUTHENTICATED } from '../store/types'
import { connect } from 'react-redux'
import {
  LoadUserList,
  LoadSelectedUser
} from '../store/actions/UserListActions'
import { Button } from 'react-rainbow-components'

const mapStateToProps = ({ appState, userListState }) => {
  return { appState, userListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserList: () => dispatch(LoadUserList()),
    fetchUserDetails: (userId) => dispatch(LoadSelectedUser(userId))
  }
}

const Nav = (props) => {
  const history = useHistory()

  const logOut = () => {
    store.dispatch({ type: SET_UNAUTHENTICATED })
    localStorage.clear()
    history.push('/recipes')
  }

  const handleClickLogIn = (e) => {
    e.preventDefault()
    history.push('/auth/login')
  }

  const handleClickRegister = (e) => {
    e.preventDefault()
    history.push('/auth/register')
  }

  const handleClickMyAccount = (e) => {
    e.preventDefault()
    props.fetchUserDetails(props.appState.userCredentials.id)
    history.push(`/users/${props.appState.userCredentials.id}`)
  }

  const handleClickRecipes = (e) => {
    e.preventDefault()
    history.push(`/recipes`)
  }

  const handleClickUsers = (e) => {
    e.preventDefault()
    history.push('/users/all')
  }

  const handleClickPost = (e) => {
    e.preventDefault()
    history.push('/createrecipe')
  }

  return (
    <div className="nav-bar">
      <div className="nav-links">
        <img src="https://i.imgur.com/tFH49uW.png" width="150" alt="logo"></img>

        <Button onClick={handleClickRecipes}>Recipes</Button>
        <Button onClick={handleClickUsers}>Users</Button>
        {props.appState.authenticated ? (
          <Button onClick={handleClickPost}>New Post</Button>
        ) : null}

        <Button
          onClick={
            !props.appState.authenticated
              ? handleClickRegister
              : handleClickMyAccount
          }
          className="nav-btn"
        >
          {!props.appState.authenticated ? 'Sign Up!' : 'My Account'}
        </Button>
        <Button
          onClick={!props.appState.authenticated ? handleClickLogIn : logOut}
          className="nav-btn"
        >
          {!props.appState.authenticated ? 'Log In' : 'Log Out'}
        </Button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
