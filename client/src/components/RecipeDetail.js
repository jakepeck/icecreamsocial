import React, { useEffect } from 'react'
import { Card } from 'react-rainbow-components'

import { Link } from 'react-router-dom'

import RecipeCardComments from './RecipeCardComments'
import CommentForm from './CommentForm'
import {
  LoadRecipeList,
  LoadSelectedRecipe
} from '../store/actions/RecipeListActions'
import { connect } from 'react-redux'

const mapStateToProps = ({ recipeListState, appState, commentListState }) => {
  return { recipeListState, appState, commentListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipeList: () => dispatch(LoadRecipeList()),
    fetchRecipeDetails: (recipeId) => dispatch(LoadSelectedRecipe(recipeId))
  }
}
const RecipeDetail = (props) => {
  const { recipe_id } = props.match.params
  const { fetchRecipeDetails } = props

  useEffect(() => {
    fetchRecipeDetails(recipe_id)
  }, [recipe_id, fetchRecipeDetails])

  return (
    <div>
      {props.recipeListState.selectedRecipe !== null ? (
        <div className="rainbow-m-around_large">
          <Card
            className="recipeDetail"
            icon={
              <span className="rainbow-background-color_success rainbow-border-radius_circle rainbow-align-content_center"></span>
            }
            title={
              <Link
                to={`/users/${props.recipeListState.selectedRecipe.recipe_poster.id}`}
              >
                {props.recipeListState.selectedRecipe.recipe_poster.username}
              </Link>
            }
          >
            <div className="rainbow-p-around_xx-large rainbow-align-content_center rainbow-flex_column">
              <img
                src={`${props.recipeListState.selectedRecipe.recipe.photo}`}
                alt="dessert"
              />
              <h1 className="rainbow-p-top_large rainbow-font-size-heading_small">
                {props.recipeListState.selectedRecipe.recipe.title}{' '}
              </h1>

              <p>{props.recipeListState.selectedRecipe.recipe.content}</p>
              <br />
              <br />
              {props.recipeListState.selectedRecipe.comments ? (
                <RecipeCardComments
                  comments={props.recipeListState.selectedRecipe.comments}
                />
              ) : null}
              <br />
              {props.appState.authenticated ? (
                <CommentForm
                  recipe_id={props.recipeListState.selectedRecipe.recipe.id}
                />
              ) : null}

              <br />
              <br />
              <br />
            </div>
          </Card>
        </div>
      ) : (
        'Having trouble locating details for that recipe... Please go back to the main recipe list and click "View Details" again'
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)
