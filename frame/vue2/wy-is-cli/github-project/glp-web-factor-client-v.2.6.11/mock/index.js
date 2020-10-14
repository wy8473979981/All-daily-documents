/* eslint-disable no-path-concat */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockServer = require('@pat-fet/mock-server')

// 导入初始化数据
MockServer.Controller.inits = MockServer.requireAll({ dirname: __dirname + '/inits' })

// 导入控制器
MockServer.requireAll({ dirname: __dirname + '/controllers' })

const proxyUrl = 'http://172.16.6.124:8098/ext-gateway/forward/factor'

// 配置
const config = {
  port: 3000,
  auth: {
    enabled: false
  },
  transform: ({ code, data, msg }) => {
    return {
      data: data,
      code: code,
      message: msg
    }
  },
  successCode: 200,
  errorCode: 500,
  // cors: {
  //   allowHeaders: 'Content-Type,appId,ticket,userNo'
  // },
  proxy: {
    '/': {
      target: proxyUrl,
      options: {
        proxyReqPathResolver: function (req) {
          return proxyUrl + req.url
        }
      }
    }
  }
}

const server = new MockServer(config)

server.run()
