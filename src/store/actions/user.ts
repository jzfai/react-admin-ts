import * as types from '../action-types'
import { getInfoReq } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { loginReq, logoutReq } from '@/api/user'
import { ObjTy } from '~/common'

export const A_USER_TOKEN = (data: string) => {
  return {
    type: types.USER_TOKEN,
    data
  }
}

export const A_USER_USER_INFO = (data: any) => {
  return {
    type: types.USER_USER_INFO,
    data
  }
}

export const A_resetUser = () => {
  return {
    type: types.USER_RESET
  }
}

export const A_login = (reqData: ObjTy) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    loginReq({ username: reqData.username.trim(), password: reqData.password })
      .then((res: ObjTy) => {
        const { jwtToken, msg } = res?.data
        if (res.code === 20000) {
          dispatch(A_USER_TOKEN(jwtToken))
          setToken(jwtToken)
          resolve(res?.data)
        } else {
          reject(msg)
        }
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}

export const A_logout = () => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    logoutReq()
      .then((res: ObjTy) => {
        if (res.code === 20000) {
          dispatch(A_resetUser())
          removeToken()
          resolve('')
        }
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}

export const A_getUserInfo = () => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    getInfoReq()
      .then((response: ObjTy) => {
        const { data } = response
        const { username } = data
        let userInfo = {
          role: 'admin',
          username: username
        }
        dispatch(A_USER_USER_INFO(userInfo))
        console.log('我返回了')
        resolve(data)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}
