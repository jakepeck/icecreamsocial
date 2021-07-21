import { Card, Input, Button } from 'react-rainbow-components'
import { connect } from 'react-redux'
// import Client from '../services'
import { useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import {
  LoadRecipeList,
  LoadSelectedRecipe
} from '../store/actions/RecipeListActions'
import React from 'react'

const mapStateToProps = ({ appState, recipeListState }) => {
  return { appState, recipeListState }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipeList: () => dispatch(LoadRecipeList()),
    fetchRecipeDetails: (recipeId) => dispatch(LoadSelectedRecipe(recipeId))
  }
}

const UpdateRecipe = (props) => {
  const poster = props.appState.userCredentials.id

  const [recipeFormData, setRecipeFormData] = useState({
    title: props.recipeListState.selectedRecipe.recipe.title || '',
    photo: props.recipeListState.selectedRecipe.recipe.photo || '',
    content: props.recipeListState.selectedRecipe.recipe.content || ''
  })
  console.log(recipeFormData)
  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipeFormData({ ...recipeFormData, [name]: value })
  }

  const submitRecipeUpdate = async (e) => {
    e.preventDefault()
    try {
      console.log(recipeFormData)
      const recipe = { poster_id: poster, ...recipeFormData }
      console.log(recipe)
      const res = await axios.put(
        `${BASE_URL}/recipes/${props.recipeListState.selectedRecipe.recipe.id}`,
        recipe
      )
      console.log(res)
      setRecipeFormData({ title: '', photo: '', content: '' })
      props.history.push(`/recipes`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Card className="formCard">
        <h1>Update your recipe!</h1>

        <form className="recipeCreateForm" onSubmit={submitRecipeUpdate}>
          <label>Title</label>
          <br />
          <Input
            onChange={handleChange}
            type="text"
            name="title"
            value={recipeFormData.title}
            placeholder={props.recipeListState.selectedRecipe.recipe.title}
          />
          <br />
          <label>Image URL</label>
          <br />
          <Input
            onChange={handleChange}
            type="text"
            name="photo"
            value={recipeFormData.photo}
            placeholder={props.recipeListState.selectedRecipe.recipe.photo}
          />
          <br />
          <label>Body</label>
          <br />
          <textarea
            onChange={handleChange}
            type="text"
            name="content"
            value={recipeFormData.content}
            placeholder={props.recipeListState.selectedRecipe.recipe.content}
          />
          <br />
          <Button
            onClick={submitRecipeUpdate}
            disabled={
              !recipeFormData.title ||
              !recipeFormData.content ||
              !recipeFormData.photo
            }
            color="blue"
            fluid
          >
            Update Your Recipe
          </Button>
          <br />
        </form>
      </Card>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe)
