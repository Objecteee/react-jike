// 和用户相关的状态管理
import {createSlice} from '@reduxjs/toolkit'
import { setToken as _setToken , getToken,removeToken } from '@/utils'
import { loginAPI,getProfileAPI } from '@/apis/user'
const userStore=createSlice({
  name: 'user',
  initialState: {
    token: getToken() ||'',
    userInfo: {}
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 持久化存储token
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.userInfo = {}
      state.token = ''
      removeToken()
    }
    
   }
})

//解构出actionCreators

const {setToken,setUserInfo,clearUserInfo} = userStore.actions
//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token
const fetchLogin=(loginForm)=>{
    return async (dispatch)=>{
        //1.发送异步请求
        const res=await loginAPI(loginForm)
        //2.提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }
}

//获取个人信息异步方法
const fetchUserInfo=()=>{
    return async (dispatch)=>{
        const res=await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}

export {fetchLogin,setToken,fetchUserInfo,clearUserInfo}
export default userReducer