//注册根节点actions事件,模块里的actions事件在模块中注册
export const  change = ({ commit },payload) =>{
  commit('changeIndex', payload);
}

export const changeLoading = ({ commit },payload) =>{
  commit('changeLoading', payload);
}

export const setUserdata = ({ commit }, payload)  =>{
  console.log('payload',payload);
  commit('SET_USERDATA', payload)
}



