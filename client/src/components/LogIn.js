import React, { useState } from 'react'
import { Button, Form, Icon, Modal } from 'react-rainbow-components'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { SET_AUTHENTICATED, SET_USER_CREDENTIALS } from '../store/types'
import store from '../store'
import { connect } from 'react-redux'

const mapStateToProps = ({ appState }) => {
  return { appState }
}

const LogIn = (props) => {
  console.log('Login componetnts props')
  console.log(props)
  const [loginForm, handleLoginForm] = useState({
    email: '',
    password: ''
  })

  // console.log(store.dispatch)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('log in handleSubmit called')
      const res = await axios.post(`${BASE_URL}/auth/login`, loginForm)
      console.log(res.data)
      localStorage.setItem('token', res.data.token)
      console.log(props.appState.authenticated)
      store.dispatch({ type: SET_AUTHENTICATED })
      console.log('after dispatch call')
      // console.log(store.getState().appState.authenticated)
      // console.log(store.getState().appState.userCredentials)
      store.dispatch({ type: SET_USER_CREDENTIALS, payload: res.data.payload })
      // console.log(store.getState().appState.userCredentials)
      store.getState()
      // props.toggleLogin(false)
      handleLoginForm({ email: '', password: '' })
      props.history.push(`/users/${res.data.payload.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    handleLoginForm({ ...loginForm, [name]: value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="jane@mail.com"
        value={loginForm.email}
        onChange={handleChange}
        required
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Your Password"
        value={loginForm.password}
        onChange={handleChange}
        required
      />

      <button
        size="large"
        color="red"
        animated="fade"
        // onClick={() => props.toggleLogin(false)}
      >
        Close
      </button>
      <button
        disabled={!loginForm.email || !loginForm.password}
        size="large"
        color="teal"
        animated="fade"
        onClick={handleSubmit}
      >
        LogIn
      </button>
    </form>

    // </Modal>
  )
}

export default connect(mapStateToProps)(LogIn)
