import React, { useState } from 'react'
import Client from '../services'
import { BASE_URL } from '../globals'
import { Card, Button, Input } from 'react-rainbow-components'

const Register = (props) => {
  const [registerForm, handleRegisterForm] = useState({
    email: '',
    password: '',
    username: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await Client.post(`${BASE_URL}/auth/register`, registerForm)
      handleRegisterForm({ email: '', password: '', username: '' })
      props.history.push('/auth/login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    handleRegisterForm({ ...registerForm, [name]: value })
  }

  return (
    <div>
      <Card className="formCard">
        <h1>Become an Ice Cream Socialite!</h1>
        <form className="recipeCreateForm" onSubmit={handleSubmit}>
          <label>Desired Username: </label>
          <br />
          <Input
            type="text"
            name="username"
            placeholder="JaneDoe"
            value={registerForm.username}
            onChange={handleChange}
          />
          <br />

          <label>Email: </label>
          <br />
          <Input
            type="email"
            name="email"
            placeholder="jane@mail.com"
            value={registerForm.email}
            onChange={handleChange}
          />
          <br />
          <label>Password: </label>
          <br />
          <Input
            type="password"
            name="password"
            placeholder="Your Password"
            value={registerForm.password}
            onChange={handleChange}
          />
          <br />

          <Button
            disabled={
              !registerForm.email ||
              !registerForm.password ||
              !registerForm.username
            }
            size="small"
            color="teal"
            animated="fade"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Register
