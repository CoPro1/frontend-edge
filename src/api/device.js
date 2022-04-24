import axios from '@/libs/api.request'

export const getDeviceListApi = () => {
  return axios.request({
    url: 'device',
    method: 'get'
  })
}

export const addDeviceApi = (device) => {
  let { name, model, credibility, crafts, description, values, longitude, latitude, failure_rate, repair_time, load_material, lay_off, cleaning_time } = device
  values = values.map(({ name, type, protocol }) => ({ name, type, protocol }))
  return axios.request({
    url: 'device',
    method: 'post',
    data: {
      name,
      model,
      credibility,
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
  const { name, model, credibility, crafts, description, values, longitude, latitude, failure_rate, repair_time, load_material, lay_off, cleaning_time } = updateDeviceInfo
  return axios.request({
    url: `device/${id}`,
    method: 'put',
    data: {
      name,
      model,
      credibility,
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

export const getDeviceByIdApi = (deviceId) => {
  return axios.request({
    url: `device/${deviceId}`,
    method: 'get'
  })
}
