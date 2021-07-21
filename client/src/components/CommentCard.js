import { Link } from 'react-router-dom'

const CommentCard = (props) => {
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
