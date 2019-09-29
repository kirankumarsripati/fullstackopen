import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const getHeaders = () => {
  return {
    headers: { Authorization: token },
  }
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObj) => {
  const config = getHeaders()

  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = async (blogId, newObj) => {
  const config = getHeaders()

  const response = await axios.put(`${baseUrl}/${blogId}`, newObj, config)
  return response.data
}

const remove = (blogId) => {
  const config = getHeaders()
  const response = axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { setToken, getAll, create, update, remove }
