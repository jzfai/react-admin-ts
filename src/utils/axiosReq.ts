import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { ObjTy, AxiosReqTy, AxiosConfigTy } from '~/common'
import { Modal, message } from 'antd'
let reqConfig: any
let loadingE: ObjTy

const service: any = axios.create({})
// 请求拦截
service.interceptors.request.use(
  (req: AxiosReqTy) => {
    // @ts-ignore
    req.headers['AUTHORIZE_TOKEN'] = getToken()
    /* 下载文件*/
    if (req.isDownLoadFile) {
      req.responseType = 'blob'
    }
    if (req.isUploadFile) {
      // @ts-ignore
      req.headers['Content-Type'] = 'multipart/form-data'
    }
    reqConfig = req
    if (req.bfLoading) {
      // loadingE = ElLoading.service({
      //   lock: true,
      //   text: '数据载入中',
      //   spinner: 'el-icon-ElLoading',
      //   background: 'rgba(0, 0, 0, 0.1)'
      // })
    }
    /*
     *params会拼接到url上
     * */
    if (req.isParams) {
      req.params = req.data
      req.data = {}
    }
    //save req for res to using
    reqConfig = req
    return req
  },
  (err: any) => {
    Promise.reject(err)
  }
)
// 响应拦截
service.interceptors.response.use(
  (res: any) => {
    console.log('res', res)
    if (reqConfig.afHLoading && loadingE) {
      loadingE.close()
    }
    // 如果是下载文件直接返回
    if (reqConfig.isDownLoadFile) {
      return res.data
    }
    const { msg, code, isNeedUpdateToken, updateToken } = res.data
    //更新token保持登录状态
    if (isNeedUpdateToken) {
      setToken(updateToken)
    }
    const successCode = '0,200,20000'
    if (successCode.indexOf(code) !== -1) {
      return res.data
    } else {
      //token失效或者有问题
      if (code === 403) {
        if (location.href.indexOf('/login') === -1) {
          Modal.confirm({
            title: 'token失效,请重新登录',
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
              removeToken()
              location.reload()
            }
          })
        }
        return res.data
      }
      if (reqConfig.isAlertErrorMsg) {
        message.error(msg)
      }
      //返回错误信息
      //如果未catch 走unhandledrejection进行收集
      return Promise.reject(res.data)
    }
  },
  (err: any) => {
    if (loadingE) loadingE.close()
    message.error(err)
    //如果是跨域
    //Network Error,cross origin
    let errObj = {
      msg: err.toString(),
      reqUrl: reqConfig.baseURL + reqConfig.url,
      params: reqConfig.isParams ? reqConfig.params : reqConfig.data
    }
    return Promise.reject(JSON.stringify(errObj))
  }
)

export default function khReqMethod({
  url,
  data,
  method,
  isParams,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  baseURL,
  timeout,
  isAlertErrorMsg
}: AxiosConfigTy): any {
  return service({
    url: url,
    method: method ?? 'post',
    data: data ?? {},
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? false,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg: isAlertErrorMsg ?? true,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL,
    timeout: timeout ?? 15000
  })
}
