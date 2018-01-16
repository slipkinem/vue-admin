/**
 * Created by slipkinem on 2016/12/9.
 */

import { Vue } from '../ext-nb'
import { Message, MessageBox } from 'element-ui'
import { ActionContext } from 'vuex'
import { State, TableRow } from '../typings/state'
import { IPage } from '../typings/page'
import { IPageData } from '../typings/pageData'
import { format } from '../shard/utils'
import * as types from './mutation-types'

export default {
  /**
   * 获取数据
   * @param {Commit} commit
   * @param {State} state
   * @param {IPage} page
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getTableData ({ commit, state }: ActionContext<State, State>, page?: IPage) {
    if (!page) {
      page = {
        pageNum: 1,
        pageSize: 10
      }
    }

    try {
      const response = await Vue.http.get<IPageData<TableRow[]>>('/table', page)
      console.log(response)
      response.data.rows = response.data.rows.map(function (tableData) {
        tableData.date = format(new Date(tableData.date), 'yyyy-MM-dd')
        return tableData
      })
      commit(types.GET_TABLEDATA, response.data)
    } catch (e) {
      console.error(e)
    }
  },
  /**
   * 删除数据
   * @param commit
   * @param dispatch
   * @param row
   * @returns {Promise.<T>}
   */
  deleteData ({ commit, dispatch }: ActionContext<State, State>, row: TableRow) {
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
  async editData ({ commit, dispatch }: ActionContext<State, State>, updateParams: TableRow) {
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
  async insertData ({ commit, dispatch }: ActionContext<State, State>, tableData: TableRow) {
    try {
      await Vue.http.post('/table', tableData)
      Message.success('添加成功')
      dispatch('getTableData')
    } catch (e) {
      console.error(e)
    }
  }
}
