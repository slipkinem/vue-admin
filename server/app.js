/**
 * Created by slipkinem on 2016/12/9.
 */
'use strict'
const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const app = express()

app.set('port',process.env.port || 3000)
app.use(bodyParser.json()) //获取request.payload里面的数据
app.use('/', router)

app.listen(app.get('port'), () => {
  console.log(`server start ${app.get('port')}`)
})
