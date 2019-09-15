import ky from 'ky-universal'

const API_URL = `https://tender-monitor.herokuapp.com`
const API_VERSION = `api`

export const getData = (url) => {
  return `${API_URL}/${API_VERSION}/${url}`
}

export const searchByWord = async (query) => {
  const result = await ky(`${API_URL}/${API_VERSION}/tenders/all/?search_word=${query}`)
  const data = await result.json()
  return data
}

export const getAllCategories = async () => {
  const result = await ky(`${API_URL}/${API_VERSION}/categories/`)
  const data = await result.json()
  return data
}
