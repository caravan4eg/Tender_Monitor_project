const withImages = require('next-images')
const path = require('path')

module.exports = withImages({
  target: 'serverless',
  webpack(config) {
    const listOfRootAliases = ['static', 'pages']
    const listOfClientAliases = ['components', 'services', 'utils']

    listOfClientAliases.forEach((value) => {
      config.resolve.alias[value] = path.join(__dirname, `src/${value}`)
    })

    listOfRootAliases.forEach((value) => {
      config.resolve.alias[value] = path.join(__dirname, `${value}/`)
    })

    return config
  },
})
