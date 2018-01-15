/**
 * Created by slipkinem on 2016/12/9.
 */
import * as types from './mutation-types'

export const mutations = {
  [types.GET_TABLEDATA] (state: any, tableData: any) {
    state.tableData = tableData
  }
}
