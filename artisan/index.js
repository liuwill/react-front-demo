var qiniu = require('qiniu')

var params = process.argv

if (params.length < 5) {
  console.log('缺乏必要的参数')
  return
}

var bucket = params[2]
var accessKey = params[3]
var secretKey = params[4]
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

// 自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
var currentTime = parseInt(Date.now() / 1000) + 3600
var options = {
  scope: `${bucket}`,
  // scope: `${bucket}:upload/avatar/`,
  expires: 3600,
  // isPrefixalScope: '1',
  mimeLimit: 'image/*',
  fsizeLimit: 10485760,
  deadline: currentTime,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)","w": $(imageInfo.width), "h": $(imageInfo.height)}}'
}

console.log(accessKey, secretKey, options)
var putPolicy = new qiniu.rs.PutPolicy(options)
var uploadToken = putPolicy.uploadToken(mac)
console.log(uploadToken)
