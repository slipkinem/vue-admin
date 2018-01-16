/**
 * Created by slipkinem on 2017/4/7.
 */
import Router from '../../router'
import { MagicCode } from '../../constant'
import { Message } from 'element-ui'
import { AxiosError, AxiosResponse } from 'axios'
import { HttpResponse } from '../utils/http'

export function response (response: AxiosResponse<HttpResponse<any>>) {
  let { data } = response
  if (data.hasOwnProperty('errorCode') && data.errorCode !== MagicCode.successCode) {
    Message.error(data.errorMessage || '未知错误')
    return Promise.reject(data)
  }

  return response
}

export function responseError (error: AxiosError) {
  if (!error.response) return Promise.reject(error)

  let { status } = error.response
  if (status === 401) {
    Message.error('授权错误，请重新登录！')
    Router.push('/login')
  }
  return Promise.reject(error)
}
