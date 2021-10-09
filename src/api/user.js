import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/prop-api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  console.log('token-key:', token)
  return new Promise((resolve) => {
    const response = {
      code: 200,
      data: {
        token: token || '123456',
        name: 'weely.cc',
        avatar: 'https://avatars.githubusercontent.com/u/21010325?s=60&v=4',
        introduction: '明天，你好',
        roles: ["admin"]
      }
    }
    resolve(response)
  })
  // return request({
  //   url: '/prop-api/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}
