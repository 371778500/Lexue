//存放根节点中的getters事件,其余的在模块中的getters中存放.
// 获取当前的用户.
export const getCurrentUser = state =>{
  return state.login.currentUser;
}

export const getNavData = state =>{
  return state.globalstate.navData;
}

export const getIndex = state =>{
  return state.index;
}

export const isLoading = state =>{
  return state.isLoading;
}
