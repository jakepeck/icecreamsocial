import { connect } from 'react-redux'
import { useState } from 'react'
import Client from '../services'
import { BASE_URL } from '../globals'
import { AddComment } from '../services/CommentListService'
import { AddNewComment } from '../store/actions/CommentListActions'
const mapStateToProps = ({ reviewListState, commentListState, appState }) => {
  return { reviewListState, commentListState, appState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchReviewList: () => dispatch(LoadReviewList()),
    // fetchReviewDetails: (reviewId) => dispatch(LoadSelectedReview(reviewId)),
    postNewComment: (comment) => dispatch(AddComment(comment))
  }
}

const CommentForm = (props) => {
  console.log('comment form props', props)
  const [commentForm, handleCommentForm] = useState({
    content: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    handleCommentForm({ ...commentForm, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let commentFormData = {
        // recipe_id: props.recipeListState.selectedRecipe,

        content: commentForm.content,
        commenter_id: props.appState.userCredentials.id,
        recipe_id: props.recipe_id
      }
      console.log(commentFormData)
      // const res = await Client.post(`${BASE_URL}/comments`, commentFormData)
      // // // props.toggleRegister(false)
      // // // props.dispatch({ type: TOGGLE_REGISTER_CLOSED })
      // // console.log('Register handleSubmit called')
      // console.log(res)
      // console.log(res.data)
      props.postNewComment(commentFormData)
      handleCommentForm({ content: '' })
    } catch (error) {
      console.log('register handleSubmit failed')
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Add Comment Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          placeholder="Enter comment here"
          value={commentForm.content}
          onChange={handleChange}
          required
        />

        <button
          disabled={!commentForm.content}
          size="large"
          color="teal"
          animated="fade"
          onClick={handleSubmit}
        >
          Post Comment
        </button>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
