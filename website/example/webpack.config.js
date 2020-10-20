const path = require('path')

const { DEV_LIB } = process.env

module.exports = {
  resolve: {
    alias:
      DEV_LIB !== 'true'
        ? {}
        : {
            qs: path.resolve(__dirname, '../../node_modules/qs/dist/qs'),
            react: path.resolve(__dirname, '../../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../../node_modules/@hot-loader/react-dom'),
            '@ovine/core': path.resolve(__dirname, '../../packages/core'),
            '@ovine/craft': path.resolve(__dirname, '../../packages/craft'),
            '@ovine/editor': path.resolve(__dirname, '../../packages/editor'),
          },
  },
}
