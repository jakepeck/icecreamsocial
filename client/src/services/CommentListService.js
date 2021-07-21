import Client from './index'

export const GetCommentList = async () => {
  try {
    const res = await Client.get('/comments')
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const SetSelectedComment = async (commentId) => {
  try {
    const res = await Client.get(`/comments/${commentId}`)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const AddComment = async (comment) => {
  try {
    const res = await Client.post('/comments', comment)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
