/**
 * Created by slipkinem on 2016/12/9.
 */
'use strict'
import Vue from 'vue'
import * as types from './mutation-types'

export default {
  getTableData ({ commit }, page) {
    return Vue.http.post('/table', page)
      .then(response => {
        console.log(JSON.parse(response.body))
        commit(types.GET_TABLEDATA, JSON.parse(response.body))
      })
  }
}
