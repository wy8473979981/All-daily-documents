/**
 * actor jiinfo-team
 * date 2020 5 22
 * file 自动化编码补丁
 */
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const jsbeautify = require('js-beautify')

// 封装美化
const beautify = function(fileName, str, config) {
  if (path.extname(fileName) === '.vue') {
    return jsbeautify.html(str, config)
  } else if (path.extname(fileName) === '.html') {
    return jsbeautify.html(str, config)
  } else if (path.extname(fileName) === '.js') {
    return jsbeautify.js(str, config)
  } else if (path.extname(fileName) === '.css') {
    return jsbeautify.css(str, config)
  } else if (path.extname(fileName) === '.scss') {
    return jsbeautify.css(str, config)
  } else if (path.extname(fileName) === '.sass') {
    return jsbeautify.css(str, config)
  } else if (path.extname(fileName) === '.compass') {
    return jsbeautify.css(str, config)
  } else {
    return str
  }
}

class AutoCodePlugin {
  // 构造方法
  constructor(options) {
    // 观察者
    this.watcher = []
    // 文件操作
    class AutoFile {
      constructor(options) {
        this.watchQueue = options
        // 文件数据
        this.file = {}
      }
      // 创建文件数据
      setFileData(d) {
        if (!d.key) { console.error('缺少文件key信息'); return }
        this.file[d.key] = d
      }
      // 写入文件
      write(d) {
        // 获取文件主体信息
        const bodyData = Object.keys(this.file).reduce((add, d) => {
          return add += this.file[d].value
        }, '')
        // 获取文件数据 && JS美化
        const data = beautify(this.watchQueue.outPath, this.watchQueue.out ? this.watchQueue.out(bodyData, this.file) : bodyData,
          d.beauty ? d.beauty : { indent_size: 4 }
        )
        // 写入文件
        fs.writeFileSync(this.watchQueue.outPath, data)
      }
      // 移除文件夹
      delete(key) {
        delete this.file[key]
      }
      // 获取文件等级
      getLevel(p1, p2) {
        const p1Resolve = this.getPath(p1)
        const p2Resolve = this.getPath(p2)
        const replace = p2Resolve.replace(p1Resolve, '')
        return (replace.split('/').length) - 1
      }
      // 获取路径
      getPath(p) {
        return path.resolve(p).split(path.sep).join('/')
      }
    }
    // 当监听层级 > 1时候执行 fs.wtachFile轮询
    // 当监听层级 = 1时候执行 fs.watch监听
    const usePolling = options.some(d => d.maxlevel > 1)
    // 启动
    options.forEach(d => {
      // 创建异步闭包
      (async d => {
        // 验证必要参数
        if (!d.inPath) { console.error('缺少inPath参数'); return }
        if (!d.templateEach) { console.error('缺少templateEach参数'); return }
        // 文件夹等级(创建默认参数)
        const level = Number(d.maxlevel) ? Number(d.maxlevel) : 1
        // 输出文本(创建默认参数)
        if (!d.out) d.out = template => template
        // 输出文件(创建默认参数)
        if (!d.outPath) {
          const p = path.resolve(d.inPath).split(path.sep)
          p[p.length] = 'index.js'
          d.outPath = p.join('/')
        }
        // 实列化
        const autoFile = new AutoFile(d)
        // 监听层级
        const watchLevel = d.maxlevel ? d.maxlevel : 1
        // 观察者配置
        const op = {
          // 层级
          depth: watchLevel,
          usePolling
        }
        if (usePolling) {
          // 轮询节奏
          op.interval = 1000
          op.binaryInterval = 1000
        }
        // 创建观察者
        const watcher = chokidar.watch(d.inPath, op)

        this.watcher.push(watcher)
        // 先写文件
        autoFile.write(d)
        // 增加
        const addFile = (dirName, kind) => {
          // 判断是否在最大监听文件目录等级内
          const lev = autoFile.getLevel(d.inPath, dirName)
          if (lev <= level && lev > 0) {
            // 判断环境
            let product = (process.env.NODE_ENV === 'production')
            // 可配置生产 || 测试环境 AutoCodePlugin.NODE_ENV = 'pro';
            if (this.NODE_ENV) product = (process.env.NODE_ENV === this.NODE_ENV)
            // 是不是空文件夹
            const isEmptyDir = (kind === 'dir' && fs.readdirSync(path.resolve(dirName)).length === 0)
            // 判断是不是开发环境 && 是不是文件夹 && 是不是空文件夹 && 存在入口文件config
            if (!product && kind === 'dir' && isEmptyDir && d.addIndex) {
              // 创建自定义模板
              d.addIndex.forEach(autoTempalte => {
                ((autoTempalte, dirName) => {
                  if (autoTempalte.state === 'file') {
                    // 默认创建文件
                    let name = ''
                    if (!autoTempalte.name) name = 'index.js'
                    if (!autoTempalte.template) autoTempalte.template = () => ''
                    // 增加命名函数逻辑
                    if (Array.prototype.toString.call(autoTempalte.name) === '[object Function]') {
                      name = autoTempalte.name(path.resolve(dirName).split(path.sep).pop(), autoFile.getPath(dirName))
                    } else {
                      name = autoTempalte.name
                    }
                    const template = beautify(name, autoTempalte.template(path.resolve(dirName).split(path.sep).pop(), autoFile.getPath(dirName)),
                      d.beauty ? d.beauty : { indent_size: 4 }
                    )
                    fs.writeFileSync(path.join(path.resolve(dirName), name), template)
                  } else {
                    // 默认创建文件
                    let name = ''
                    if (!autoTempalte.name) return
                    // 增加命名函数逻辑
                    if (Array.prototype.toString.call(autoTempalte.name) === '[object Function]') {
                      name = autoTempalte.name(path.resolve(dirName).split(path.sep).pop(), autoFile.getPath(dirName))
                    } else {
                      name = autoTempalte.name
                    }
                    // 创建文件夹
                    fs.mkdirSync(path.join(path.resolve(dirName), name))
                  }
                })(autoTempalte, dirName)
              })
            }
            // 创建文件数据
            autoFile.setFileData({
              // 文件名称
              key: autoFile.getPath(dirName),
              // 数据内容
              value: d.templateEach ? d.templateEach(path.resolve(dirName).split(path.sep).pop(), autoFile.getPath(dirName), kind) : ''
            })
            autoFile.write(d)
          }
        }
        // 删除
        const deleteFile = dirName => {
          autoFile.delete(autoFile.getPath(dirName))
          autoFile.write(d)
        }
        // 监听创建文件夹
        watcher.on('addDir', dirName => addFile(dirName, 'dir'))
        // 监听移除文件夹
        watcher.on('unlinkDir', dirName => deleteFile(dirName))
        // 是否需要监听文件
        if (d.useFile) {
          // 防止自己引用自己
          const sameFile = (p1, p2) => {
            return (path.resolve(p1) === path.resolve(p2))
          }
          // 监听创建文件夹
          watcher.on('add', dirName => {
            if (!sameFile(d.outPath, dirName)) addFile(dirName, 'file')
          })
          // 监听移除文件夹
          watcher.on('unlink', dirName => {
            if (!sameFile(d.outPath, dirName)) deleteFile(dirName)
          })
        }
        // 监听错误
        watcher.on('error', function(error) {
          console.error('webpack AutoCodePlugin Error happened: ', error)
        })
      })(d)
    })
  }
  // 应用函数
  apply(compiler) {
    // 判断环境
    let product = (process.env.NODE_ENV === 'production')
    // 可配置生产 || 测试环境 AutoCodePlugin.NODE_ENV = 'pro';
    if (this.NODE_ENV) product = (process.env.NODE_ENV === this.NODE_ENV)
    // 构建完成结束监听
    if (compiler.hooks.done) {
    // if (product && compiler.hooks.done) {
      // webpack4
      compiler.hooks.done.tap('done', () => {
        console.log('webpack done')
        this.watcher.forEach(d => d.close())
      })
    } else if (product) {
      // < webpack4
      compiler.plugin('done', () => {
        console.log('webpack done')

        this.watcher.forEach(d => d.close())
      })
    }
  }
}

module.exports = AutoCodePlugin
