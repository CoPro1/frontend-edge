import axios from '@/libs/api.request'
import store from '@/store'

const url = '/process-manage'

export const getProcessList = () => axios.request({
  url: `${url}/user/${store.state.user.userId}`,
  method: 'get'
})

export const getProcess = (id) => axios.request({
  url: `${url}/${id}`,
  method: 'get'
})

export const getProcessByName = (name) => axios.request({
  url: `${url}/name/${name}`,
  method: 'get'
})

export const removeProcess = (id) => axios.request({
  url: `${url}/${id}`,
  method: 'delete'
})

export const banProcess = (id) => axios.request({
  url: `${url}/ban/${id}`,
  method: 'post'
})

export const enableProcess = (id) => axios.request({
  url: `${url}/enable/${id}`,
  method: 'post'
})

export const addProcess = (data) => axios.request({
  url: `${url}`,
  data: data,
  method: 'post'
})

export const issueProcess = (data) => axios.request({
  url: `${url}/issue`,
  data: data,
  method: 'post'
})

export const modifyProcess = (id, data) => axios.request({
  url: `${url}/${id}`,
  data: data,
  method: 'put'
})
