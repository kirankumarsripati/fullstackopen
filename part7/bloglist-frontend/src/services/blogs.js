import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const getHeaders = () => ({
  headers: { Authorization: `bearer ${token}` },
})

const setToken = (value) => {
  token = value
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
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

const remove = async (blogId) => {
  const config = getHeaders()
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const addComment = async (comment, blogId) => {
  const config = getHeaders()
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment }, config)
  return response.data
}

export default {
  setToken,
  getAll,
  get,
  create,
  update,
  remove,
  addComment,
}
