import axios from '@/libs/api.request'

export const getTaskListApi = () => {
  return axios.request({
    url: 'my_task',
    method: 'get'
  })
}

export const getTaskCraftList = () => {
  return axios.request({
    url: `my_task/getTaskCraftList`,
    method: 'get'
  })
}

export const getProcessDeviceApi = () => {
  return axios.request({
    url: `process-device`,
    method: 'get'
  })
}

export const getDeviceListByProName = (name) => {
  return axios.request({
    url: `my_task/getDeviceListByProName/${name}`,
    method: 'get'
  })
}

export const addTaskApi = (task) => {
  const { task_id, pro_name, times, deadline, next_edge, description } = task
  return axios.request({
    url: `my_task`,
    method: 'post',
    data: {
      task_id,
      pro_name,
      times,
      deadline,
      next_edge,
      description
    }
  })
}

export const updateStateApi = (data) => {
  return axios.request({
    url: `my_task/updateState`,
    method: 'post',
    data
  })
}
