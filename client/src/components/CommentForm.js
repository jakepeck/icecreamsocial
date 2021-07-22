import { connect } from 'react-redux'
import { useState } from 'react'
import { AddCommentsToSelectedRecipe } from '../store/actions/RecipeListActions'
import { Button, Input } from 'react-rainbow-components'
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
      props.postNewComment(
        commentFormData,
        props.appState.userCredentials.username
      )
      handleCommentForm({ content: '' })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="content"
          placeholder="Enter comment here"
          value={commentForm.content}
          onChange={handleChange}
        />
        <br />

        <Button
          disabled={!commentForm.content}
          size="small"
          color="teal"
          animated="fade"
          onClick={handleSubmit}
        >
          Post Comment
        </Button>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
