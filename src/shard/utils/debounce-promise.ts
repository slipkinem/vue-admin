// @flow
/**
 * Created by slipkinem on 9/8/2017 at 5:15 PM.
 */
import _ from 'lodash'
// 解决debounce 不返回promise的问题
export const debouncePromise = (fn: Function, wait: number = 500, immediate: boolean = false): Function => {
  let timer = 0
  return function cb (): Promise<any> {
    let args = [].slice.call(arguments)
    let _resolve = _.noop

    let promise = new Promise(resolve => {
      _resolve = resolve
    })
        .then(() => {
          return fn(...args)
        })

    if (immediate && !timer) {
      _resolve()
    }

    timer && window.clearTimeout(timer)

    timer = window.setTimeout(() => {
      timer = 0
      if (!immediate) {
        _resolve()
      }
    }, wait)
    return promise
  }
}
