// 引入axios
import axios from 'axios'

// 向外暴露函数
export default function ajax(url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) { // 成功回调、失败回调
    let promise
    // 如果是GET请求方式，作字符串拼接
    if(type === 'GET'){
      let dataStr = ''
      // 拼接查询字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if(dataStr !== ''){
        // 截掉最后一个'&'
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        // 拼接url
        url = url + '?' + dataStr
      }
      // 发送GET请求
      promise = axios.get(url)  // 注意：返回的是一个promise对象
    }else{
      // 发送POST请求
      promise = axios.post(url, data)
    }
    // 响应数据
    promise.then(response => {
      // 成功回调
      resolve(response.data)
    }).catch(error => {
      // 失败回调
      reject(error)
    })
  })
}
