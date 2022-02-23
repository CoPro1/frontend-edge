import axios from '@/libs/api.request'

export const getDeviceListApi = () => {
  return axios.request({
    url: 'device',
    method: 'get'
  })
}

export const addDeviceApi = (device) => {
  let { name, model, crafts, description, values, longitude, latitude, failure_rate, repair_time, load_material, lay_off, cleaning_time } = device
  values = values.map(({ name, type, protocol }) => ({ name, type, protocol }))
  return axios.request({
    url: 'device',
    method: 'post',
    data: {
      name,
      model,
      crafts,
      description,
      values,
      longitude,
      latitude,
      failure_rate,
      repair_time,
      load_material,
      lay_off,
      cleaning_time
    }
  })
}

export const deleteDeviceApi = (deviceId) => {
  return axios.request({
    url: `device/${deviceId}`,
    method: 'delete'
  })
}

export const modifyDeviceApi = (updateDeviceInfo) => {
  const { id, name, model, description, values } = updateDeviceInfo
  return axios.request({
    url: `device/${id}`,
    method: 'put',
    data: {
      name,
      model,
      description,
      values
    }
  })
}

export const getDeviceByIdApi = (deviceId) => {
  return axios.request({
    url: `device/${deviceId}`,
    method: 'get'
  })
}
