import axios from '@/libs/api.request'

export const getCraftListApi = () => {
  return axios.request({
    url: 'craft',
    method: 'get'
  })
}

export const getCraftById = (id) => {
  return axios.request({
    url: `craft/${id}`,
    method: 'get'
  })
}

export const addCraftUnit = (name) => {
  return axios.request({
    url: `craft/addCraftUnit/${name}`,
    method: 'post'
  })
}
