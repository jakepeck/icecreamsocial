import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  LoadReviewList,
  LoadSelectedReview
} from '../store/actions/ReviewListActions'
import { Card } from 'react-rainbow-components'
import store from '../store'

const mapStateToProps = ({ reviewListState }) => {
  return { reviewListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReviewList: () => dispatch(LoadReviewList()),
    fetchReviewDetails: (reviewId) => dispatch(LoadSelectedReview(reviewId))
  }
}

const ReviewList = (props) => {
  useEffect(() => {
    props.fetchReviewList()
  }, [props.reviewListState.selectedReview])

  const reviewsMap = props.reviewListState.reviews.map((review, idx) => {
    return (
      <Card key={idx}>
        <p>{review.created_at}</p>
        <h1>{review.rating}</h1>
        <p>{review.content}</p>
        <button
          onClick={() => {
            props.fetchReviewDetails(review.id)
          }}
        >
          View Review Details
        </button>
      </Card>
    )
  })

  return (
    <div>
      {props.reviewListState.selectedReview !== null ? (
        <div className="reviewDetails">
          <h1>{props.reviewListState.selectedReview.rating}</h1>
          <div>
            <h2>{props.reviewListState.selectedReview.created_at}</h2>
            <h3>{props.reviewListState.selectedReview.content}</h3>
          </div>
        </div>
      ) : (
        'Click on a review to expand details'
      )}
      Review List
      <div className="grid">{reviewsMap}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList)
