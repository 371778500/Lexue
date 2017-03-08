// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { routes } from './router-config'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import AwesomeSwiper from 'vue-awesome-swiper'
import * as filters from './filter'
import store from './vuex/store'
require('es6-promise').polyfill()
import 'flex.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//注册过滤器
Object.keys(filters).forEach((K)=>{
  Vue.filter(K,filters[K])
})

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(AwesomeSwiper)
// Vue.use(VueAnimatedList)
/* eslint-disable no-new */
// 配置滚动行为的方式
// https://github.com/vuejs/vue-router/blob/next/examples/scroll-behavior/app.js
const scrollBehavior = (to,from,savePosition) =>{
  // if(savePosition){
  //   return savePosition
  // }else{
  //   const position = {}
  //   if(to.hash){
  //     position.seletor = to.hash
  //   }
  //   if(to.matched.some(m =>m.meta.scrollTop)){
  //     position.x = 0
  //     position.y = 0
  //   }
  //   return position;
  // }
  //每次路由切换的时候,滑到顶部.
  return { x:0, y:0 }
}
const router = new VueRouter({
  routes,
  mode:'history',
  scrollBehavior
})
router.beforeEach((to,from,next)=>{
  console.log("to,",to);
  console.log("from,",from);
  document.body.style.overflow='auto'
  next();
})



// new Vue({
//   el: '#app',
//   render: h => h(App),
//   //挂在到根实例上

// })

const app = new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store,
})

Vue.http.options.emulateJSON = true;
// 配置拦截器.关于vue-resource的.详情参考
// https://github.com/vuejs/vue-resource/blob/master/docs/http.md#interceptors
// http://www.cnblogs.com/axl234/p/5899137.html
Vue.http.interceptors.push(function(request, next){
  const body = 'this is interceptor for processing response '
  next((res) =>{
    // 如果返回为response.ok为false,就路由进/notfound的界面.
    if(!res.ok){
      // 使用vue-resource中修改response的方法.修改返回的信息.
        request.respondWith(body, {
                  status: 404,
                  statusText: 'Not found!hah'
        })
        const data = "we can't  get resource from" + res.url;
        app.$router.push('/notfound?data=' + data);
    }
  })
})
