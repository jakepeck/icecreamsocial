import { Button, Form, Icon, Modal } from 'react-rainbow-components'
import { connect } from 'react-redux'
import Client from '../services'
import { useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import {
  LoadRecipeList,
  LoadSelectedRecipe
} from '../store/actions/RecipeListActions'
import React, { useEffect } from 'react'

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
  console.log('update recipes props:')
  console.log(props)
  const poster = props.appState.userCredentials.id
  useEffect(() => {
    props.fetchRecipeDetails(props.match.params.recipe_id)
  }, [props.match.params.recipe_id])

  const [recipeFormData, setRecipeFormData] = useState({
    title: props.recipeListState.selectedRecipe.recipe.title || '',
    photo: props.recipeListState.selectedRecipe.recipe.photo || '',
    content: props.recipeListState.selectedRecipe.recipe.content || ''
  })

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
      props.history.push(
        `/recipes/${props.recipeListState.selectedRecipe.recipe.id}`
      )
      // setPosts([...posts, res.data])
      // setRecipeFormData({ title: '', photo: '', content: '' })
      // toggleCreatePostOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Update your recipe!</h1>

      <form onSubmit={submitRecipeUpdate}>
        <label>Title</label>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          value={recipeFormData.title}
          placeholder={props.recipeListState.selectedRecipe.recipe.title}
        />

        <label>Image URL</label>
        <input
          onChange={handleChange}
          type="text"
          name="photo"
          value={recipeFormData.photo}
          placeholder={props.recipeListState.selectedRecipe.recipe.photo}
        />

        <label>Body</label>
        <textarea
          onChange={handleChange}
          type="text"
          name="content"
          value={recipeFormData.content}
          placeholder={props.recipeListState.selectedRecipe.recipe.content}
        />

        <button
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
        </button>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe)
