import { Button, Form, Icon, Modal } from 'react-rainbow-components'

const CreateRecipe = (props) => {
  let handleChange = props.handleChange
  let newPost = props.newPost

  return (
    // <Modal open={props.modalOpen} centered={false}>
    //   <Modal.Actions>
    //     <Button icon color="red" onClick={props.closeModal}>
    //       <Icon name="close" />
    //     </Button>
    //   </Modal.Actions>
    //   <Modal.Header>Create A Post!</Modal.Header>
    //   <Modal.Content>
    //     <Form onSubmit={props.submitPost}>
    //       <Form.Field>
    //         <label>Title</label>
    //         <input
    //           onChange={handleChange}
    //           type="text"
    //           name="title"
    //           value={newPost.title}
    //           placeholder="Enter a title"
    //         />
    //       </Form.Field>
    //       <Form.Field>
    //         <label>Image URL</label>
    //         <input
    //           onChange={handleChange}
    //           type="text"
    //           name="image"
    //           value={newPost.image}
    //           placeholder="Enter an image url"
    //         />
    //       </Form.Field>
    //       <Form.Field>
    //         <label>Body</label>
    //         <textarea
    //           onChange={handleChange}
    //           type="text"
    //           name="body"
    //           value={newPost.body}
    //           placeholder="Tell us about your post."
    //         />
    //       </Form.Field>
    //       <Form.Button
    //         onClick={props.submitPost}
    //         disabled={!newPost.title || !newPost.body || !newPost.image}
    //         color="blue"
    //         fluid
    //       >
    //         Post It
    //       </Form.Button>
    //     </Form>
    //   </Modal.Content>
    // </Modal>
    <Modal open={props.modalOpen} centered={false}>
    
      <Button icon color="red" onClick={props.closeModal}>
        <Icon name="close" />
      </Button>
    <h1>Create A Post!</h1>
    
      <Form onSubmit={props.submitPost}>
        
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
        
        <Button
          onClick={props.submitPost}
          disabled={!newPost.title || !newPost.body || !newPost.image}
          color="blue"
          fluid
        >
          Post It
        </Button>
      </Form>
   
  </Modal>
  )
}

export default CreateRecipe
