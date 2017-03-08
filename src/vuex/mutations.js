//定义根节点的mutations事件.模块的在模块自身注册
import Vue from  'vue'
export const  changeIndex = (state, payload) =>{
    state.index = state.index + payload.index ; 
  }

export const changeLoading = (state, payload) =>{
  state.isLoading = !state.isLoading;
}
// Start
export const SET_USERDATA = (state, payload) =>{
  console.log('SET_USERDATA',payload)
  state.user = payload;
  // Vue.set(state,'user',payload)
   
} 