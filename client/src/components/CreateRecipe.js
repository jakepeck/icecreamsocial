import { Button, Form, Icon, Modal, Card } from 'react-rainbow-components'
import { connect } from 'react-redux'
import Client from '../services'
import { useState } from 'react'
import { BASE_URL } from '../globals'

const mapStateToProps = ({ appState }) => {
  return { appState }
}

const CreateRecipe = (props) => {
  const poster = props.appState.userCredentials.id

  const [recipeFormData, setRecipeFormData] = useState({
    title: '',
    photo: '',
    content: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipeFormData({ ...recipeFormData, [name]: value })
  }

  const submitRecipe = async (e) => {
    e.preventDefault()
    try {
      console.log(recipeFormData)
      const recipe = { poster_id: poster, ...recipeFormData }
      console.log(recipe)
      const res = await Client.post(`${BASE_URL}/recipes`, recipe)
      props.history.push('/recipes')
      // setPosts([...posts, res.data])
      // setRecipeFormData({ title: '', photo: '', content: '' })
      // toggleCreatePostOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Card>
        <h1>Post Your Recipe!</h1>

        <form className="recipeCreateForm" onSubmit={submitRecipe}>
          <label>Recipe Title: </label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            value={recipeFormData.title}
            placeholder="Enter a title for your delicious recipe!"
          />

          <label>Recipe Image URL: </label>
          <input
            onChange={handleChange}
            type="text"
            name="photo"
            value={recipeFormData.photo}
            placeholder="Enter an image url here to show off your awesome creation"
          />

          <label>Recipe Content: </label>
          <textarea
            onChange={handleChange}
            type="text"
            name="content"
            value={recipeFormData.content}
            placeholder="Tell us about your recipe! Add ingredients, processes, expected time and all the other fun details here!"
          />

          <Button
            onClick={submitRecipe}
            disabled={
              !recipeFormData.title ||
              !recipeFormData.content ||
              !recipeFormData.photo
            }
            color="blue"
            fluid
          >
            Post Your Recipe
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default connect(mapStateToProps)(CreateRecipe)
