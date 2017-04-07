/**
 * Created by slipkinem on 2017/4/7.
 */
'use strict'
import router from '../../router'

export default function (request, next) {
  next(response => {
    if (response.status === 406) {
      router.push('/login')
    }
    return response
  })
}
