/**
 * Created by slipkinem on 2017/4/18.
 */
'use strict'
var x = 'http://www.xxxx.com/mobile/fdsfsdfsda/index.html'
// www.xxxx.com/mobile

var x = 'http://www.xxxx.com/mobile/index.html'
x.match(/http:\/\/(.*)\//)
console.log(RegExp.$1)
