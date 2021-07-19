import { NavLink, useHistory } from 'react-router-dom'
import React from 'react'
// import { Route, Switch } from 'react-router-dom'
import store from '../store'
import { SET_UNAUTHENTICATED } from '../store/types'
import { connect } from 'react-redux'
import {
  LoadUserList,
  LoadSelectedUser
} from '../store/actions/UserListActions'

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

  return (
    <div className="nav-bar">
      <div className="nav-links">
        <NavLink className="nav-link" to="/recipes">
          Recipes
        </NavLink>
        <NavLink className="nav-link" to="/users/all">
          Users
        </NavLink>
        {/* <NavLink className="nav-link" to="/reviews">
          Reviews
        </NavLink>
        <NavLink className="nav-link" to="/comments">
          Comments
        </NavLink> */}
        <NavLink className="nav-link" to="/createrecipe">
          Post
        </NavLink>

        <button
          onClick={
            !props.appState.authenticated
              ? handleClickRegister
              : handleClickMyAccount
          }
          className="nav-btn"
        >
          {!props.appState.authenticated ? 'Sign Up!' : 'My Account'}
        </button>
        <button
          // onClick={!props.authenticated ? handleClickLogIn : props.logOut}
          onClick={!props.appState.authenticated ? handleClickLogIn : logOut}
          className="nav-btn"
        >
          {!props.appState.authenticated ? 'Log In' : 'Log Out'}
        </button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
