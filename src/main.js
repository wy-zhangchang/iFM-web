import Vue from 'vue'
import App from './App'

// 引入router
import router from './router'
// 引入store
import store from './store'
// 引入mockserver模块
import './mock/mock_server'

// 引入iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// 使用iview
Vue.use(iView)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,  // 注册router
  store    // 注册store
})
