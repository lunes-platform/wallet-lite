const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = function override(config, env) {
  config.resolve = {
	extensions: [ '.ts', '.js','.tsx' ],
    fallback: {
      stream: require.resolve('stream-browserify'),
	  buffer: require.resolve('buffer'),
    },
  }
  config.plugins.push(new NodePolyfillPlugin())
  return config
}