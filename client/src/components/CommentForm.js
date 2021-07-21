import { connect } from 'react-redux'
import { useState } from 'react'
import { AddCommentsToSelectedRecipe } from '../store/actions/RecipeListActions'
const mapStateToProps = ({ reviewListState, commentListState, appState }) => {
  return { reviewListState, commentListState, appState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postNewComment: (comment, username) =>
      dispatch(AddCommentsToSelectedRecipe(comment, username))
  }
}

const CommentForm = (props) => {
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
        content: commentForm.content,
        commenter_id: props.appState.userCredentials.id,
        recipe_id: props.recipe_id
      }
      console.log(commentFormData)
      props.postNewComment(
        commentFormData,
        props.appState.userCredentials.username
      )
      handleCommentForm({ content: '' })
    } catch (e) {
      console.log('register handleSubmit failed')
      console.log(e)
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
