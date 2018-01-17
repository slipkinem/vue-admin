/**
 * Created by slipkinem on 2016/12/9.
 */

const Monglass = require('mongolass')

const monglass = new Monglass('mongodb://localhost:27017/table')

const Schema = Monglass.Schema

const TableSchema = new Schema('table', {
  date: {type: 'string'},
  name: {type: 'string'},
  province: {type: 'string'},
  city: {type: 'string'},
  address: {type: 'string'},
  zip: {type: 'number'}
})

exports.Table = monglass.model('Table', TableSchema)