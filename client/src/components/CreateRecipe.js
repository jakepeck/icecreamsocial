import { Button, Form, Icon, Modal } from 'react-rainbow-components'
import { connect } from 'react-redux'

const mapStateToProps = ({ appState }) => {
  return { appState }
}

const CreateRecipe = (props) => {
  let handleChange = props.handleChange
  let newPost = props.newPost

  return (
    <div>
      <h1>Create A Post!</h1>

      <form onSubmit={props.submitPost}>
        <label>Title</label>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          value={newPost.title}
          placeholder="Enter a title"
        />

        <label>Image URL</label>
        <input
          onChange={handleChange}
          type="text"
          name="image"
          value={newPost.image}
          placeholder="Enter an image url"
        />

        <label>Body</label>
        <textarea
          onChange={handleChange}
          type="text"
          name="body"
          value={newPost.body}
          placeholder="Tell us about your post."
        />

        <button
          onClick={props.submitPost}
          disabled={!newPost.title || !newPost.body || !newPost.image}
          color="blue"
          fluid
        >
          Post It
        </button>
      </form>
    </div>
  )
  {
    /* </Modal> */
  }
}

export default connect(mapStateToProps)(CreateRecipe)
