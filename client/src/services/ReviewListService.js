import Client from './index'


export const GetReviewList = async () => {
  try {
    // console.log('get users in list service called')
    const res = await Client.get('/reviews')
    // console.log(res)
    // console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const SetSelectedReview = async (reviewId) => {
  try {
    // console.log('set selected user in list service called')
    // console.log(userId)
    const res = await Client.get(`/reviews/${reviewId}`)
    // const res = await Client.get(`/recipes/${movieId}`, axiosConfig)
    // console.log(res.data.user)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
