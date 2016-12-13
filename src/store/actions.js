/**
 * Created by slipkinem on 2016/12/9.
 */
'use strict'
import Vue from 'vue'
import * as types from './mutation-types'
import { Message, MessageBox } from 'element-ui'

export default {
  /**
   * 获取数据
   * @param commit
   * @param page
   * @returns {Promise.<TResult>|*}
   */
  getTableData ({ commit }, page) {
    if (!page) page = {current: 1, size: 10}
    return Vue.http.post('/table', page)
      .then(response => {
        console.log(JSON.parse(response.body))
        commit(types.GET_TABLEDATA, JSON.parse(response.body))
      })
  },
  /**
   * 删除数据
   * @param commit
   * @param dispatch
   * @param id
   * @returns {Promise.<T>}
   */
  deleteData ({ commit, dispatch }, id) {
    return MessageBox.confirm('確定要刪除嗎？', '提醒！', {type: 'warning'})
      .then(() => {
        Vue.http.post('/delete', { id })
          .then(response => response.body.errorCode === 1 ? Message.success('已刪除') : Message.error('删除失败！'))
          .then(() => dispatch('getTableData'))
      })
      .catch(() => { console.log('cancel') })
  },
  /**
   * 编辑数据
   * @param commit
   * @param updateParams
   */
  editData ({ commit }, updateParams) {
    console.log(updateParams)
    Vue.http.post('/edit', updateParams)
      .then(response => response.body.errorCode === 1 ? Message.success('编辑成功') : (Message.error(`編輯失敗：${response.body.errorMessage}`)))
  }
}
