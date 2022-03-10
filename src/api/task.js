import axios from '@/libs/api.request'

export const getTaskListApi = () => {
  return axios.request({
    url: 'my_task',
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
