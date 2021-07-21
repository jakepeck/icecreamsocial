import Client from './index'

export const GetReviewList = async () => {
  try {
    const res = await Client.get('/reviews')
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const SetSelectedReview = async (reviewId) => {
  try {
    const res = await Client.get(`/reviews/${reviewId}`)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
