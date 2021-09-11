import axios from 'axios'
import { paramToUrl } from '@/utils/index'
import Qs from 'qs'

// create an axios instance
const service = axios.create({
  // baseURL: '/', // url = base url + request url
  withCredentials: true,
  timeout: 10000, // 超时设置
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = Qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    const status = res.data.code || 200
    if (status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } 
    return res
  },
  error => {

    return Promise.reject(error)
  }
)

export const request_jsonp = ({ url, params }) => {
  if (!url) throw new Error('url参数必须')
  url = /^(https?:)?\/\//g.test(url) ? url : url

  const callback = 'CALLBACK' + Math.random().toString().substr(9, 18)
  const JSONP = document.createElement('script')
  JSONP.setAttribute('type', 'text/javascript')

  const ret = paramToUrl(params)

  JSONP.src = `${url}?callback=${callback}&${ret}`
  window[callback] = (res) => {
    res
  }
  document.body.appendChild(JSONP)
}

export default service
