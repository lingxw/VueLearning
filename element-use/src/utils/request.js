import axios from 'axios'
import baseUrl from '../api/baseUrl'

const service = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
})

// 请求拦截器
service.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  return Promise.reject(error);
})
// 响应拦截器
service.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
})

export default service