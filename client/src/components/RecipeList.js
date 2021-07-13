import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  LoadRecipeList,
  LoadSelectedRecipe
} from '../store/actions/RecipeListActions'
import {Card} from 'react-rainbow-components'
import RainbowRecipeCard from './RainbowRecipeCard'


const mapStateToProps = ({ recipeListState }) => {
  return { recipeListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipeList: () => dispatch(LoadRecipeList()),
    fetchRecipeDetails: (recipeId) => dispatch(LoadSelectedRecipe(recipeId))
  }
}

const RecipeList = (props) => {
  useEffect(() => {
    props.fetchRecipeList()
  }, [props.recipeListState.selectedRecipe])

  console.log(props)

  const recipesMap = props.recipeListState.recipes.map((recipe, idx) => {
    return (
      // <Card key={idx} className="card">
      //   <div className="rainbow-p-around_xx-large rainbow-align-content_center rainbow-flex_column">
      //   <img
      //     src={`${recipe.recipe.photo}`}
      //     alt="picture of dessert"
      //     // width="200"
      //   />
      //     <h1 className="rainbow-p-top_large rainbow-font-size-heading_small">
      //     {recipe.recipe.title}{' '}
      //     </h1>
      //   </div>
        
        
      //   <button
      //     onClick={() => {
      //       props.fetchRecipeDetails(recipe.recipe.id)
      //     }}
      //   >
      //     View Recipe Details
      //   </button>
      // </Card>
      <RainbowRecipeCard key={idx} recipe={recipe} fetchRecipeDetails={props.fetchRecipeDetails}/>
    )
  })

  return (
    <div>
      {props.recipeListState.selectedRecipe !== null ? (
        <div className="recipeDetails">
          <img
            src={`${props.recipeListState.selectedRecipe.photo}`}
            alt="photo"
            width="200"
          />
          <h1>{props.recipeListState.selectedRecipe.title}</h1>
          <div>
            <h2>
              {props.recipeListState.selectedRecipe.content}
            </h2>
           
          </div>

      
        </div>
      ) : (
        'Click on a recipe to expand details'
      )}
      Recipe List
      <div className="grid">{recipesMap}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
