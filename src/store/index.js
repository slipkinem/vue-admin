/**
 * Created by slipkinem on 2016/12/9.
 */
'use strict'
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutation'

Vue.use(Vuex)

const state = {
  tableData: {
    rows: [],
    total: 0
  },
  user: {}
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
