const withImages = require('next-images')

module.exports = withImages({
  target: 'serverless',
  webpack(config, options) {
    return config
  },
})
