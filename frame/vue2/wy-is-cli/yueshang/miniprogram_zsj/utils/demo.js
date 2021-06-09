var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = 'wx3fd143c07a7bde65'
var sessionKey = 'lPvG4TmWZ7/7wzxbIvgbEA=='
var encryptedData = "mWP2LPlC79rmqPk7ZE2pahoiAMHnvIHV3FW7H99zvtszq1BCVjvG7dyQVg17kUOhyDZdp1RiRuy6ChvoDTmf2uZqTBiXf749w4WcRECYLXM6sKOayUE/fZ/ZPmWQGzHYFIEvMTo/KFjjvAvQSdAqApw5I0JjitvUOktaTc48i6AntrJXB0zIZUATqdfHdkaG1+nQYM6pZU/GEPcNOymc/9rgr5XDde/3ZRI/bCDgWmbyzuacdoFGtn16MTzGOLoG64kdm0jqeR4DnDEmNldH43694FF9CUHOs+Dy499tti5UmGIwBNRFIHvQcd8b8vQmG7+8GNGwOykYmB5k9T6uui2paH5N7+0Ec5Mi9qf3NWISHURWicfUTPAruR3oqH+Pjnd7iLLxjnyPXDJ/C+9s8gRZxQKVg69A8+6JC8kw55hKX0CCTYuWurtMz7qfSHKcTYVQ5iXW/8K0h6iFApWdpLZhZ1B8WJA/la7J08bHZFU="
var iv = "S4I1Qp5405EUdZ8dAhVaEw=="

var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData , iv)

console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
