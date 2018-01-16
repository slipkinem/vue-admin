/**
 * Created by slipkinem on 1/15/2018 at 3:02 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export declare interface TableRow {
  id: string
  date: string
}

export declare interface TableData {
  rows: TableRow[]
  total: number
}

export declare interface State {
  tableData: TableData
}
