/**
 * Created by slipkinem on 2016/12/9.
 */

import { Vue } from '../ext-nb'
import * as types from './mutation-types'
import { Message, MessageBox } from 'element-ui'
import { format } from '../shard/utils'
import { ActionContext } from 'vuex'

export default {
  /**
   * 获取数据
   * @param commit
   * @param page
   * @returns {Promise.<TResult>|*}
   */
  getTableData ({ commit }: ActionContext<any, any>, page: any) {
    if (!page) {
      page = {
        current: 1,
        size: 10
      }
    }

    return Vue.http.get('/table', {
      params: page
    })
        .then(response => {
          // if (response.errorCode === 0) {
          //   response.data.rows = response.data.rows.map(function (tableData) {
          //     tableData.date = format(new Date(tableData.date), 'yyyy-MM-dd')
          //     return tableData
          //   })
          //   commit(types.GET_TABLEDATA, response.data)
          // } else {
          //   MessageBox.error(response.errorMessage)
          // }
        })
        .catch((e: Error) => console.error(e))
  },
  /**
   * 删除数据
   * @param commit
   * @param dispatch
   * @param row
   * @returns {Promise.<T>}
   */
  deleteData ({ commit, dispatch }: ActionContext<any, any>, row: any) {
    console.log(row)
    let id = row.id
    return MessageBox.confirm('確定要刪除嗎？', '提醒！', { type: 'warning' })
        .then(async () => {
          try {
            await Vue.http.delete('/table/' + id) // es5写法 {id: id}
            Message.success('已刪除')
            dispatch('getTableData')
          } catch (e) {
            console.error(e)
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
  async editData ({ commit, dispatch }: ActionContext<any, any>, updateParams: any) {
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
  async insertData ({ commit, dispatch }: ActionContext<any, any>, tableData: any) {
    try {
      await Vue.http.post('/table', tableData)
      Message.success('添加成功')
      dispatch('getTableData')
    } catch (e) {
      console.error(e)
    }
  }
}
