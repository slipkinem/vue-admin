/**
 * Created by slipkinem on 2016/12/9.
 */
'use strict'
import * as types from './mutation-types'
export default {
  [types.GET_TABLEDATA] (state, tableData) {
    state.tableData = tableData
    console.log(state.tableData)
  }
}
