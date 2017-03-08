/**
 * Created by victor on 2016/8/25.
 */
export const STORAGE_LOGIN = 'LexueData'
import Vue from 'vue'
const loginData = JSON.parse(localStorage.getItem(STORAGE_LOGIN))||{ count:0 }
const state ={
  count: 0,
  // users: loginData.users,
  // currentUser: loginData.currentUser
}
// 定义mutations,第一个参数是当前store的state的对象,
// mutations = {
//    increment(state,payload){
//          state.count += payload;
//      }  
//}
const mutations={
  increment (state, payload) {
    state.count = state.count + payload.account
  },

  //登录 用户名密码是否正确 ,通过,就把该用户的权限置为 true.
  //设计上有缺陷诶,如果用户密码输的不正确,
  LOGIN_IN (state, currentUser) {
    var user = state.users.find(u => u.username == currentUser.username && u.password == currentUser.password )
    if(user){
      user.privilege = true
      state.currentUser = user
    }else{
      state.currentUser = { }
    }
  },
  //注册 ,直接添加到数组中,用户名重复的判断在之前就被控制,重复,就不允许点击.
  SIGN_UP (state, currentUser){
    var user = state.users.find(u=>u.username == currentUser.username)
    if(!user){
      state.users.push(currentUser)
      currentUser.privilege = true
      state.currentUser = currentUser
      // Vue.set(state,"currentUser",currentUser)
    }else{
      currentUser.privilege = false
      state.currentUser = currentUser
    }
  }
}
// 定义actions,下面是actions的type
//  action = (contextState,payload){ 
//    contextState指的是当前action的store属性.
//    payload.负载参数,用来在actions中传递参数.最好是用作对象.便于拓展
// }
const actions ={ 
  //我们可以使用解构,来获取store中的commit,{ commit },其实就是老版本的dispatch,但是新版本中dispatch是用在actions中调用actions.
  // context看做store,可以访问store.getters,store.state.
  increment(context,payload){
    setTimeout(() =>{
      // 在被允许异步的actions中通过store的commit的方法,执行mutations的回调.(触发mutations)
      context.commit('increment',payload);
    },1000)
  }
 }
// 定义getters,被重复使用时,需用到这个getters,简单的操作直接在获取的地方,调用.
// 第二个参数允许使用别的地方中的getters.
const getters ={ 
  getData:(state) =>{
    return state.count;
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
