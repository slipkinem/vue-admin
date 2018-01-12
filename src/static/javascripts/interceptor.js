/**
 * Created by slipkinem on 2017/4/7.
 */
import Router from '../../router'
import { baseURL, successCode } from '../../../constant'
import {Message} from 'element-ui'

// http配置
export const httpConfig = {
  baseURL,
  headers: {
    common: {
      'Authorization': 'AUTH_TOKEN'
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

export function response (response) {
  response = response.data
  if (response.hasOwnProperty('errorCode') && response.errorCode !== successCode) {
    Message.error(response.errorMessage || '未知错误')
    return Promise.reject(response)
  }

  return response
}

export function responseError (error) {
  let { status } = error.response
  if (status === 406) {
    return Router.push('/login')
  }
  return Promise.reject(error)
}
