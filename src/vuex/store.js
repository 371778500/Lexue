/**
 * Created by victor on 2016/8/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import login from  './modules/Login'

import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'


import plugins from './plugin'
// import createLogger from 'vuex/logger'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
// root state object.
// each Vuex instance is just a single state tree.


// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.


// A Vuex instance is created by combining the state, the actions,
// and the mutations. Because the actions and mutations are just
// functions that do not depend on the instance itself, they can
// be easily tested or even hot-reloaded (see counter-hot example).

// 配置store,这个配置是最高级的,基本全适用,有控制台的logger.也利用了本地存储.
// 生产环境就不要createLogger了.

//配置需要用到的api接口,基于/api的请求都会被转发成对应的域名.
const state = { index:100,isLoading:false,api:{
  login:'/api/loginLx.ashx?key=6480-4230-27FD-8AA0&',
  lesson:'/api/getAllLessions.ashx?key=6480-4230-27FD-8AA0&',
  studyprogress:'/api/getStudyProgress.ashx?key=6480-4230-27FD-8AA0&',
  coursewares:'/api/getCoursewares.ashx?key=6480-4230-27FD-8AA0&',
  submit:'/api/getSubmit.ashx?key=6480-4230-27FD-8AA0&',
  allTypes:'/api/getPxType.ashx?key=6480-4230-27FD-8AA0',
  allCourse:'/api/getAllCourse.ashx?key=6480-4230-27FD-8AA0&',
  userInfo:'/api/getUserInfo.ashx?key=6480-4230-27FD-8AA0&',
  newsList:'/api/NewsList.ashx?key=6480-4230-27FD-8AA0&',
  getAllCertificate:'/api/getAllCertificate.ashx?key=6480-4230-27FD-8AA0&',
  getCertAllCourse:'/api/getCertAllCourse.ashx?key=6480-4230-27FD-8AA0&',
  applyCourse:'/api/courseOrderProcessing.ashx?key=6480-4230-27FD-8AA0&',
  applyCert:'/api/certOrderProcess.ashx?key=6480-4230-27FD-8AA0&',
  getUserCertificate:'/api/getUserCertificate.ashx?key=6480-4230-27FD-8AA0&'
},
    user:{

    }
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules:{
    login,
  },
  //createLogger其实不是很需要,如果我们使用了devtools作为开发工具的话,
  plugins:process.env.NODE_ENV !== 'production' ? [createLogger(),plugins] : [plugins],
  // 在开发,模式下,严禁在mutation外触发state的更改.
  strict: process.env.NODE_ENV !== 'production'

})
//是否是热重载模式
if(module.hot){
  //将需要热重载的模块添加进数组中.
  module.hot.accept([
    './mutations','./modules/Login'
  ],() =>{
    // 回调,更新store中的状态
    const newMutations = require('./mutations').default
    const newModuleLogin = require('./modules/Login').default
    store.hotUpdate({
      mutations:newMutations,
      modules:{
        login:newModuleLogin,
      }
    })
  })
}
export default store
