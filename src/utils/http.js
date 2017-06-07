/**
 * Created by slipkinem on 5/22/2017.
 */
'use strict'
import Vue from 'vue'

export const $http = {
  get (url, params) {
    return Vue.http({
      type: 'GET',
      url,
      params
    })
  },
  post (url, data) {
    return Vue.http({
      type: 'POST',
      url,
      data
    })
  }
}