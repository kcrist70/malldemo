import axios from 'axios'

//方式四：
export function request(config){
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  //请求拦截器
  // instance.interceptors.request.use(config=> {
  //   return config
  // },error => {
  //   return error
  // } )
  //响应拦截器
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },error => {
    // console.log(error);
    return error
  })
  return instance(config)
}


