/**
 * Created by slipkinem on 2016/12/9.
 */
import * as types from './mutation-types'
import { TableData, State } from '../typings/state'

export const mutations = {
  [types.GET_TABLEDATA] (state: State, tableData: TableData) {
    state.tableData = tableData
  }
}
