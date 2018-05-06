// 引入mockjs
import Mock from 'mockjs'
// 引入模拟数据
import data from './data2.json'

// 注册请求url
Mock.mock('/organization', {
  code:0,
  data:data.data
})
