import React, { useEffect } from 'react'
import { Card, ButtonIcon, Button } from 'react-rainbow-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faTasks,
//   faShareAlt,
//   faAngleDown
// } from '@fortawesome/free-solid-svg-icons'
// import { faHeart } from '@fortawesome/free-regular-svg-icons'
import RecipeCardComments from './RecipeCardComments'
import {
  LoadRecipeList,
  LoadSelectedRecipe
} from '../store/actions/RecipeListActions'
import { connect } from 'react-redux'

// const iconContainerStyles = {
//   width: '2.5rem',
//   height: '2.5rem'
// }
const mapStateToProps = ({ recipeListState }) => {
  return { recipeListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipeList: () => dispatch(LoadRecipeList()),
    fetchRecipeDetails: (recipeId) => dispatch(LoadSelectedRecipe(recipeId))
  }
}
const RecipeDetail = (props) => {
  console.log(props)

  useEffect(() => {
    console.log(props)
    console.log(props.recipeListState)
    props.fetchRecipeDetails(props.match.params.recipe_id)
  }, [props.match.params.recipe_id])

  return (
    <div>
      {props.recipeListState.selectedRecipe !== null ? (
        <div className="rainbow-m-around_large">
          <Card
            icon={
              <span className="rainbow-background-color_success rainbow-border-radius_circle rainbow-align-content_center"></span>
            }
            title={props.recipeListState.selectedRecipe.title}
            actions={<Button variant="neutral" label="Add" />}
          >
            <div className="rainbow-p-around_xx-large rainbow-align-content_center rainbow-flex_column">
              <img
                src={`${props.recipeListState.selectedRecipe.photo}`}
                alt="picture of dessert"
              />
              <h1 className="rainbow-p-top_large rainbow-font-size-heading_small">
                {props.recipeListState.selectedRecipe.title}{' '}
              </h1>
              <h1 className="rainbow-p-top_large rainbow-font-size-heading_small">
                {props.recipeListState.selectedRecipe.recipe_poster.username}{' '}
              </h1>
              <p>{props.recipeListState.selectedRecipe.content}</p>
            </div>

            {/* <RecipeCardComments comments={props.recipe.comments} /> */}
          </Card>
        </div>
      ) : (
        'selected recipe is null'
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)
