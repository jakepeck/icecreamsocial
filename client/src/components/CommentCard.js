import { Link } from 'react-router-dom'

const CommentCard = (props) => {
  // console.log(props)
  // const { content } = props.comment
  // const username = props.commenter_username
  return props.comment ? (
    <div>
      <p>
        {' '}
        <Link to={`/users/${props.comment.commenter_id}`}>
          {props.commenter_username}
        </Link>
        : {props.comment.content}
      </p>
    </div>
  ) : (
    <div></div>
  )
}

export default CommentCard
