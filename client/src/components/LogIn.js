import React, { useState } from 'react'
import { Card, Button, Input } from 'react-rainbow-components'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, loginForm)
      localStorage.setItem('token', res.data.token)
      store.dispatch({ type: SET_AUTHENTICATED })
      store.dispatch({ type: SET_USER_CREDENTIALS, payload: res.data.payload })
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
    <Card className="formCard">
      <h1>Log-In to IceCreamSocial!</h1>
      <form className="recipeCreateForm" onSubmit={handleSubmit}>
        <label>Email: </label>
        <br />
        <Input
          type="email"
          name="email"
          placeholder="jane@mail.com"
          value={loginForm.email}
          onChange={handleChange}
        />
        <br />

        <label>Password: </label>
        <br />
        <Input
          type="password"
          name="password"
          placeholder="Your Password"
          value={loginForm.password}
          onChange={handleChange}
        />
        <br />
        <Button
          disabled={!loginForm.email || !loginForm.password}
          size="small"
          color="teal"
          animated="fade"
          onClick={handleSubmit}
        >
          LogIn
        </Button>
      </form>
    </Card>
  )
}

export default connect(mapStateToProps)(LogIn)
