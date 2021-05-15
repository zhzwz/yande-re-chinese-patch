const path = require('path')
const config = require('./package.json')
const { BannerPlugin } = require('webpack')

const banner = `
`

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: `index.user.js`,
  },
  module: {
    rules: [
      { test: /\.css$/, use: './css_text_loader.js' },
    ],
  },
  plugins: [
    new BannerPlugin({ banner, raw: true, entryOnly: true }),
  ],
  optimization: {
    minimize: true,
    minimizer: [],
  },
}
