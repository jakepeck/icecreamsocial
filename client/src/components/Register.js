import React, { useState } from 'react'
import { Button, Form, Icon, Modal } from 'react-rainbow-components'
import axios from 'axios'
import { BASE_URL } from '../globals'
const Register = (props) => {
  const [registerForm, handleRegisterForm] = useState({
    email: '',
    password: '',
    username: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, registerForm)
      props.toggleRegister(false)
      handleRegisterForm({ email: '', password: '', username: '' })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    handleRegisterForm({ ...registerForm, [name]: value })
  }

  return (
    <Modal open={props.registerOpen}>
      
        <Form onSubmit={handleSubmit}>
         
            <label>Your Name</label>
            <input
              type="text"
              name="username"
              placeholder="JaneDoe"
              value={registerForm.username}
              onChange={handleChange}
              required
            />
          
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="jane@mail.com"
              value={registerForm.email}
              onChange={handleChange}
              required
            />
          
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              value={registerForm.password}
              onChange={handleChange}
              required
            />
        
        <Button
          size="large"
          color="red"
          animated="fade"
          onClick={() => props.toggleRegister(false)}
        >
          Close
        </Button>
        <Button
          disabled={
            !registerForm.email || !registerForm.password || !registerForm.username
          }
          size="large"
          color="teal"
          animated="fade"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>

        </Form>
     
        
     
    </Modal>
  )
}

export default Register
