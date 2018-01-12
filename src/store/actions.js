/**
 * Created by slipkinem on 2016/12/9.
 */
'use strict'
import Vue from 'vue'
import * as types from './mutation-types'
import { Message, MessageBox } from 'element-ui'

import util from '../utils/formate'

export default {
  /**
   * 获取数据
   * @param commit
   * @param page
   * @returns {Promise.<TResult>|*}
   */
  getTableData ({ commit }, page) {
    if (!page) {
      page = {
        current: 1,
        size: 10
      }
    }

    return Vue.http({
      type: 'GET',
      url: '/table',  // 不加 / 前缀不然会导致后台URL拼接失败，后台URL =》 http://localhost:8084/articlepr/
      params: page
    })
      .then(response => {
        if (response.errorCode === 0) {
          response.data.rows = response.data.rows.map(function (tableData) {
            tableData.date = util.format(new Date(tableData.date), 'yyyy-MM-dd')
            return tableData
          })
          commit(types.GET_TABLEDATA, response.data)
        } else {
          MessageBox.error(response.errorMessage)
        }
      })
      .catch(e => console.error(e))
  },
  /**
   * 删除数据
   * @param commit
   * @param dispatch
   * @param row
   * @returns {Promise.<T>}
   */
  deleteData ({ commit, dispatch }, row) {
    console.log(row)
    let id = row.id
    return MessageBox.confirm('確定要刪除嗎？', '提醒！', { type: 'warning' })
      .then(async () => {
        try {
          await Vue.http.delete('/table/' + id) // es5写法 {id: id}
          Message.success('已刪除')
          dispatch('getTableData')
        } catch (e) {
        }
      })
      .catch(() => {
        console.error('cancel')
      })
  },
  /**
   * 编辑数据
   * @param commit
   * @param dispatch
   * @param updateParams
   */
  async editData ({ commit, dispatch }, updateParams) {
    try {
      await Vue.http.post('/table/update', updateParams)
      Message.success('编辑成功')
      dispatch('getTableData')
    } catch (e) {
      console.error(e)
    }
  },
  /**
   * 添加数据
   * @param commit
   * @param dispatch
   * @param tableData
   */
  async insertData ({ commit, dispatch }, tableData) {
    try {
      await Vue.http.post('/table', tableData)
      Message.success('添加成功')
      dispatch('getTableData')
    } catch (e) {
      console.error(e)
    }
  }
}
