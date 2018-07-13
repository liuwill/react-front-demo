// var path = require('path')
var packageConfig = require('../package.json')

const version = packageConfig['version']
const currentTime = (new Date()).toLocaleString()

module.exports = {
  currentTime: currentTime,
  version: version,
}
