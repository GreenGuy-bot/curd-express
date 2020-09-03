const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');
app.use('/node_modules/',express.static('/node_modules/'))
app.use('/public/',express.static('/public/'))
app.engine('html',require('express-art-template'))
app.use(bodyParser.urlencoded({extended:false})) //一定要挂载在路由之前
app.use(bodyParser.json())
app.use(router)

app.listen(3000,function () {
  console.log('running 3000......')
})
