/* eslint-disable no-path-concat */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockServer = require('@pat-fet/mock-server')

// 导入初始化数据
MockServer.Controller.inits = MockServer.requireAll({ dirname: __dirname + '/inits' })

// 导入控制器
MockServer.requireAll({ dirname: __dirname + '/controllers' })

const factorUrl = 'http://172.16.6.212:8080/gateway/forward/factor'
const faeUrl = 'http://172.16.6.212:8080/gateway/forward/fae'

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
  cors: {
    allowHeaders: 'Content-Type,appId,ticket,userNo'
  },
  proxy: {
    '/': {
      target: factorUrl,
      options: {
        proxyReqPathResolver: function (req) {
          return (req.url.startsWith('/glp-fae') ? faeUrl : factorUrl) + req.url
        }
      }
    }
  }
}

const server = new MockServer(config)

server.run()
