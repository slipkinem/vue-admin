/**
 * Created by slipkinem on 1/15/2018 at 3:15 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

import _ from 'lodash'
import { debouncePromise } from './debounce-promise'
import { baseURL, MagicCode } from '../../constant'
import axios, { AxiosRequestConfig } from 'axios'
import { response, responseError } from '../interceptor/httpInterceptor'

export class HttpResponse<T> {
  data: T
  errorCode: number
  errorMessage: string
}

/**
 * http 扩展
 * @type {{postParams: (function(*, *, *=)), postParamsClick, postClick}}
 */
class HttpExtension {
  /**
   * 带有节流函数的http请求，用于防止用户连续点击
   * @type {Function}
   * @private
   */
  private _postParamsClick = debouncePromise(function (url: string, params?: any, config?: AxiosRequestConfig) {
    return axios.request(
        _.assignIn({
          method: 'post',
          url,
          params
        }, config)
    ) as any
  })

  private _postClick = debouncePromise(function (url: string, params?: any, config?: AxiosRequestConfig) {
    return axios.post(url, params, config)
  })

  get postParamsClick (): Function {
    return this._postParamsClick
  }

  get postClick (): Function {
    return this._postClick
  }

  constructor () {
    axios.interceptors.response.use(response, responseError)
    // http配置
    _.assignIn(axios.defaults, {
      // todo 要发布的时候改成/api
      baseURL,
      headers: {
        common: {
          'Authorization': 'AUTH_TOKEN',
          source: MagicCode.source
        },
        post: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    })
  }

  /**
   * postParams
   * @description 方便post请求拼接发送params
   * @param {string} url
   * @param params
   * @param {AxiosRequestConfig} config
   * @returns {Promise<HttpResponse<T>>}
   */
  postParams<T> (url: string, params?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return axios.request(
        _.assignIn({
          method: 'post',
          url,
          params
        }, config)
    )
        .then(response => response.data)
  }

  /**
   * http get
   * @param {string} url
   * @param params
   * @param {AxiosRequestConfig} config
   * @returns {Promise<HttpResponse<T>>}
   */
  get<T> (url: string, params?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return axios.get(url, Object.assign({
      params
    }, config))
        .then(response => response.data)
  }

  /**
   * http post
   * @param {string} url
   * @param data
   * @param {AxiosRequestConfig} config
   * @returns {Promise<HttpResponse<T>>}
   */
  post<T> (url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return axios.post(url, data, config)
        .then(response => response.data)
  }

  /**
   * http delete
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @returns {Promise<HttpResponse<T>>}
   */
  delete<T> (url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return axios.delete(url, config)
        .then(response => response.data)
  }
}

export const httpExtension = new HttpExtension()
