import Axios from 'axios'
import { BASE_URL, axiosConfig } from '../globals'

const Client = Axios.create({ baseURL: BASE_URL, axiosConfig })

export default Client
