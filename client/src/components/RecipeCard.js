import React from 'react'
import { Card, Button } from 'react-rainbow-components'
import CommentForm from './CommentForm'
import RecipeCardComments from './RecipeCardComments'
import {
  LoadRecipeList,
  LoadSelectedRecipe
} from '../store/actions/RecipeListActions'
import { connect } from 'react-redux'

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
    fetchRecipeDetails: (recipeId) => dispatch(LoadSelectedRecipe(recipeId))
  }
}

const RecipeCard = (props) => {
  // console.log('recipe card props', props)

  const pushToRecipeDetailPage = (recipe_id) => {
    props.fetchRecipeDetails(recipe_id)
    props.history.push(`/recipes/${recipe_id}`)
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
          <button>Delete Recipe</button>
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
