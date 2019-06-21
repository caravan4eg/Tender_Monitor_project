const path = require('path')

module.exports = {
  target: 'serverless',
  webpack(config) {
    config.resolve.alias['src'] = path.join(__dirname, 'src')
    return config
  },
}
