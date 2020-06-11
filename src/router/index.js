import Vue from 'vue'
import Router from 'vue-router'

import Login from "../views/Login"
import Main from '../views/Main'
import SysUser from '../components/sys/sys_user'
import addUser from '../components/sys/user_edit'

Vue.use(Router);

export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    {
      // 登录页
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // 首页
      path: '/main',
      name: 'Main',
      component: Main,
      children : [
        {
          path: '/sysUser',
          name: 'SysUser',
          component: SysUser
        },
        {
          path: '/addUser',
          name: 'addUser',
          component: addUser
        }
        ]
    }
  ]
});