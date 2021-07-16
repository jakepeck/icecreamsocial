import React from 'react'
import { Card, Button } from 'react-rainbow-components'
import CommentForm from './CommentForm'
import RecipeCardComments from './RecipeCardComments'
import {
  LoadRecipeList,
  LoadSelectedRecipe,
  LoadSelectedRecipeForUpdate
} from '../store/actions/RecipeListActions'
import { connect } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../globals'

const mapStateToProps = ({
  recipeListState,
  appState,
  userListState,
  commentListState
}) => {
  return { recipeListState, appState, userListState, commentListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipeList: () => dispatch(LoadRecipeList()),
    fetchRecipeDetails: (recipeId) => dispatch(LoadSelectedRecipe(recipeId)),
    fetchRecipeDetailsForUpdate: (recipe) =>
      dispatch(LoadSelectedRecipeForUpdate(recipe))
  }
}

const RecipeCard = (props) => {
  // console.log('recipe card props', props)

  const pushToRecipeDetailPage = (recipe_id) => {
    props.fetchRecipeDetails(recipe_id)
    props.history.push(`/recipes/${recipe_id}`)
  }

  const deleteHelper = async (recipe_id) => {
    console.log('delete recipes helpers called')
    console.log(recipe_id)
    const res = await axios.delete(`${BASE_URL}/recipes/${recipe_id}`)
    console.log(res)
  }

  return (
    <div className="rainbow-m-around_large">
      <Card
        icon={
          <span className="rainbow-background-color_success rainbow-border-radius_circle rainbow-align-content_center"></span>
        }
        title={props.recipe.recipe_poster.username}

        // actions={<Button variant="neutral" label="Add" />}
      >
        {props.appState.authenticated &&
        props.appState.userCredentials.id === props.recipe.recipe_poster.id ? (
          <div>
            <button
              onClick={() => {
                // console.log(props.recipeListState.selectedRecipe)
                // props.fetchRecipeDetails(props.recipe.recipe.id)
                deleteHelper(props.recipe.recipe.id)
              }}
            >
              Delete Recipe
            </button>{' '}
            <button
              onClick={() => {
                console.log(props.recipeListState.selectedRecipe)
                props.fetchRecipeDetailsForUpdate(props.recipe)
                console.log(props.recipeListState.selectedRecipe)
                props.history.push(`/updaterecipe/${props.recipe.recipe.id}`)
              }}
            >
              Update Recipe
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className="rainbow-p-around_xx-large rainbow-align-content_center rainbow-flex_column">
          <img
            src={`${props.recipe.recipe.photo}`}
            alt="picture of dessert"
            // width="200"
          />
          <h1 className="rainbow-p-top_large rainbow-font-size-heading_small">
            {props.recipe.recipe.title}{' '}
          </h1>
        </div>

        <button
          onClick={() => {
            pushToRecipeDetailPage(props.recipe.recipe.id)
          }}
        >
          View Recipe Details
        </button>
        <RecipeCardComments comments={props.recipe.comments} />
      </Card>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard)
