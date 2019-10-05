import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [token, setToken] = useState([])

  const getHeaders = () => ({
    headers: { Authorization: `bearer ${token}` },
  })

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    getAll()
  }, [baseUrl])

  const create = async (newObj) => {
    const config = getHeaders()

    const response = await axios.post(baseUrl, newObj, config)
    setResources(resources.concat(response.data))
    return response.data
  }

  const update = async (id, newObj) => {
    const config = getHeaders()

    const response = await axios.put(`${baseUrl}/${id}`, newObj, config)
    const updated = resources
      .map((r) => (r.id === id ? response.data : r))
    setResources(updated)
    return response.data
  }

  const remove = async (id) => {
    const config = getHeaders()
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    setResources(resources.filter((r) => r.id !== id))
    return response.data
  }

  const service = {
    setToken,
    create,
    update,
    remove,
  }

  return [
    resources,
    service,
  ]
}
