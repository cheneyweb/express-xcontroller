const fs = require('fs')
const path = require('path')

/**
 * [xcontroller 自动路由加载器]
 * controllerRoot 控制器访问跟路径，默认是/xserver/
 * controllerDir 控制器目录路径，默认是{project}/src/controller
 * app 应用实例对象
 */
const xcontroller = {
    init(app, options) {
        const controllerRoot = options.controllerRoot || '/xserver'
        const controllerDir = `${process.cwd()}${options.controllerDir || '/src/controller/'}`
        // 加载所有控制器
        fs.readdirSync(controllerDir).forEach(function(filename) {
            const moduleName = `${controllerRoot}/${path.basename(filename, '.js')}` // 请求模块名称,user.js就是/user/*的映射
            const controller = require(controllerDir + filename)  // 模块路由
            app.use(moduleName, controller)                       // 加载路由
        })
    }
}

module.exports = xcontroller
