// 引入vue
import Vue from 'vue'

// 引入vueRouter
import vueRouter from 'vue-router'

// 使用router
Vue.use(vueRouter)

// 引入视图组件
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import PostIndex from '../views/Organization/Post/Index.vue'
import AddSupplierService from '../views/Organization/Post/AddSupplierService.vue'

import MaterialIndex from '../views/Material/Index.vue'

import StepOne from '../views/Organization/Post/StepOne.vue'
import StepTwo from '../views/Organization/Post/StepTwo.vue'
import StepThree from '../views/Organization/Post/StepThree.vue'
import StepFour from '../views/Organization/Post/StepFour.vue'
import Success from '../views/Organization/Post/Success.vue'

// 配置router
export default new vueRouter({
  routes:[
    {
      path : '/index',
      component : Index,
      children : [
        {
          path: '/material/index',
          component: MaterialIndex
        },
        {
          path:'/organization/post/addsupplier/success',
          component:Success
        },
        {
          path:'/organization/post/addsupplier',
          component:AddSupplierService,
          children:[
            {
              path:'/organization/post/addsupplier/stepone',
              component:StepOne
            },
            {
              path:'/organization/post/addsupplier/steptwo',
              component:StepTwo
            },
            {
              path:'/organization/post/addsupplier/stepthree',
              component:StepThree
            },
            {
              path:'/organization/post/addsupplier/stepfour',
              component:StepFour
            },
            {
              path:'/',
              redirect:'/organization/post/addsupplier/stepone'
            }
          ]
        },
        {
          path : '/organization/post/index',
          component : PostIndex,
        },
        {
          path : '/',
          redirect : '/material/index'
        },
      ]
    },
    {
      path : '/login',
      component : Login
    },
    {
      path : '/',
      redirect : '/index'
    }
  ]
})
