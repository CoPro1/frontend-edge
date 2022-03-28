import HttpRequest from '@/libs/axios'
import config from '@/config'

const baseUrl = config.baseUrl.log
const t = new HttpRequest(baseUrl)

export const getAllEdgeLog = () => {
  return t.request({
    url: 'ObjectLoggerServer/log/query?appName=EdgeManagement',
    method: 'get'
  })
}

export const getTaskLog = (id) => {
  return t.request({
    url: 'ObjectLoggerServer/log/query?appName=EdgeManagement&objectId=任务信息&operationName=' + id,
    method: 'get'
  })
}
