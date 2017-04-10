// 系统配置参数
const config = require('config')
const port = config.get('server').port
const controllerRoot = config.get('server').controllerRoot
const controllerDir = __dirname + config.get('server').controllerDir
// 认证相关
const expressSession = require('express-session')
// 日志相关
const log = require('tracer').colorConsole({ level: config.get('log').level })
// 中间件应用服务
const express = require('express')
const bodyParser = require('body-parser')
const xcontroller = require(__dirname + '/xcontroller_modules/express-xcontroller/index.js')

// 初始化应用服务
const app = express()
app.use(bodyParser.json())
app.use(expressSession({
    secret: 'cheneyxu',
    resave: false,
    saveUninitialized: false
}))

// 加载所有控制器
xcontroller.loadController(app,controllerRoot,controllerDir)					// 应用实例,访问根路径,控制器目录路径

// 启动应用服务
app.listen(port)
log.info(`应用已启动,执行环境:${process.env.NODE_ENV},端口:${port}...`)
log.info(`RESTfulApi访问路径【host:${port}${controllerRoot}MODULE_NAME/*】`)