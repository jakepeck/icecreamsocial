import Client from './index'


export const GetUserList = async () => {
  try {
    console.log('get users in list service called')
    const res = await Client.get('/users')
    console.log(res)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const SetSelectedUser = async (userId) => {
  try {
    console.log('set selected user in list service called')
    console.log(userId)
    const res = await Client.get(`/users/${userId}`)
    // const res = await Client.get(`/recipes/${movieId}`, axiosConfig)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
