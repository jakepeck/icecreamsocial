import Client from './index'

export const GetUserList = async () => {
  try {
    const res = await Client.get('/users')
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const SetSelectedUser = async (userId) => {
  try {
    const res = await Client.get(`/super/users/${userId}`)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
