import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  LoadRecipeList,
  LoadSelectedRecipe
} from '../store/actions/RecipeListActions'
// import { Card } from 'react-rainbow-components'
import RecipeCard from './RecipeCard'

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
  // const { selectedRecipe } = props.recipeListState
  const { fetchRecipeList } = props

  useEffect(() => {
    fetchRecipeList()
  }, [fetchRecipeList])

  // useEffect(() => {
  //   props.fetchRecipeList()
  // }, [props.recipeListState.selectedRecipe])

  console.log(props)

  const recipesMap = props.recipeListState.recipes.map((recipe, idx) => {
    return (
      <RecipeCard
        key={idx}
        recipe={recipe}
        fetchRecipeDetails={props.fetchRecipeDetails}
        history={props.history}
      />
    )
  })

  return (
    <div>
      <div className="grid">{recipesMap}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
