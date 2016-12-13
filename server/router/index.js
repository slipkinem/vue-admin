/**
 * Created by slipkinem on 2016/12/9.
 */
'use strict'
const router = require('express').Router()
const Table = require('../models').Table

router.get('/hello', (req, res) => {
  res.end('hello world')
})
/**
 * 分页获取数据
 */
router.post('/table', (req, res) => {
  var tableData = {}
  const {current, size} = req.body
  // console.log(current, size)
  Table
    .count()
    .then((total) => {
    tableData.total = total
  })

  Table
    .find()
    .sort({_id: 1})
    .limit(size)
    .skip((current - 1) * size)
    .then(TableData => {
      tableData.data = TableData
      console.log(JSON.stringify(tableData))
      res.send(JSON.stringify(tableData))
    })
})
/**
 * 删除数据
 */
router.post('/delete', (req, res) => {
  var dataId = req.body.id
  Table
    .remove({_id: dataId})
    .then(() => res.send({errorCode: 1}),err => res.send({errorMessage: '500服务器错误'}))
})
/**
 * 编辑数据
 */
router.post('/edit', (req, res) => {
  var formData = req.body
  var id = formData._id
    Table
      .update({ _id: id }, {$set: formData})
      .then(result => res.send({errorCode: 1}),err => res.send({errorMessage: '500服务器错误'}))
})

module.exports = router