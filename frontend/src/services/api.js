const API_URL = `https://tender-monitor.herokuapp.com`
const API_VERSION = `api`

export const getData = (url) => {
  return `${API_URL}/${API_VERSION}/${url}`
}
