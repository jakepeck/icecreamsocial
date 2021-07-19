import React, { useEffect } from 'react'
import { Card, ButtonIcon, Button } from 'react-rainbow-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faTasks,
//   faShareAlt,
//   faAngleDown
// } from '@fortawesome/free-solid-svg-icons'
// import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import {
  faTrashAlt,
  faPencilAlt,
  faLocationArrow,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons'
import RecipeCardComments from './RecipeCardComments'
import CommentForm from './CommentForm'
import {
  LoadRecipeList,
  LoadSelectedRecipe
} from '../store/actions/RecipeListActions'
import { connect } from 'react-redux'

// const iconContainerStyles = {
//   width: '2.5rem',
//   height: '2.5rem'
// }
const mapStateToProps = ({ recipeListState, appState }) => {
  return { recipeListState, appState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipeList: () => dispatch(LoadRecipeList()),
    fetchRecipeDetails: (recipeId) => dispatch(LoadSelectedRecipe(recipeId))
  }
}
const RecipeDetail = (props) => {
  useEffect(() => {
    props.fetchRecipeDetails(props.match.params.recipe_id)
  }, [props.match.params.recipe_id])

  return (
    <div>
      <button
        onClick={() => {
          props.history.goBack()
        }}
      >
        Back
      </button>
      {props.recipeListState.selectedRecipe !== null ? (
        <div className="rainbow-m-around_large">
          <Card
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
            // actions={<Button variant="neutral" label="Add" />}
          >
            <div className="rainbow-p-around_xx-large rainbow-align-content_center rainbow-flex_column">
              <img
                src={`${props.recipeListState.selectedRecipe.recipe.photo}`}
                alt="picture of dessert"
              />
              <h1 className="rainbow-p-top_large rainbow-font-size-heading_small">
                {props.recipeListState.selectedRecipe.recipe.title}{' '}
              </h1>
              {/* <h1 className="rainbow-p-top_large rainbow-font-size-heading_small">
                {props.recipeListState.selectedRecipe.recipe_poster.username}{' '}
              </h1> */}
              <p>{props.recipeListState.selectedRecipe.recipe.content}</p>
            </div>

            <RecipeCardComments
              comments={props.recipeListState.selectedRecipe.comments}
            />
            <CommentForm
              recipe_id={props.recipeListState.selectedRecipe.recipe.id}
            />
            {/* <div className="rainbow-p-right_large">
              <ButtonIcon
                variant="border-filled"
                size="medium"
                tooltip="Edit"
                icon={<FontAwesomeIcon icon={faPencilAlt} />}
              />
            </div>
            <div className="rainbow-p-right_large">
              <ButtonIcon
                variant="border-filled"
                size="medium"
                tooltip="Delete"
                icon={<FontAwesomeIcon icon={faTrashAlt} />}
              />
            </div> */}

            {props.appState.authenticated &&
            props.appState.userCredentials.id ===
              props.recipeListState.selectedRecipe.recipe_poster.id ? (
              <div>
                {' '}
                <button>Delete Recipe</button> <button>Update Recipe</button>
              </div>
            ) : (
              <div></div>
            )}
          </Card>
        </div>
      ) : (
        'selected recipe is null'
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)
