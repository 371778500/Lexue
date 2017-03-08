/**
 * Created by victor on 2016/8/25.
 */
import { STORAGE_LOGIN } from './modules/Login'
//定义一个方法,捕捉所有的突变,执行localStorage的存储操作.
//这里不写对,预编译都不能通过.
const  localStoragePlugin = store =>{
  store.subscribe((mutation,  state )=>{
    // localStorage.setItem(STORAGE_LOGIN,JSON.stringify(state.login))
    if(mutation.type == 'SET_USERDATA'){
      localStorage.setItem('UserInfo',state.user)
    }
  })
}
export default localStoragePlugin
