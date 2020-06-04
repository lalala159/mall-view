import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'


// 安装路由
Vue.use(VueRouter)

Vue.use(ElementUI)

Vue.use(VueAxios, axios)



new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        window.localStorage.removeItem('access_token');    
        next()
    } else {
        let user = window.localStorage.getItem('access_token');
		console.log(user);
        if (!user) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
});
