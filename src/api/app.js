import request from '@/utils/request'

export const testApi = ({ params }) => request({
  url: `/api/test`,
  method: 'get',
  params: params,
})

export const postTestApi = ({ params, data }) => request({
  url: `/api/test`,
  method: 'post',
  params: params,
  data: data
})
