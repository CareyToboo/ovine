/**
 * babel-loader 配置文件
 */

const { NODE_ENV = 'development' } = process.env

const importPlugin = (moduleName, dirName = '') => [
  'babel-plugin-import',
  {
    libraryName: moduleName,
    libraryDirectory: '',
    camel2DashComponentName: false,
  },
  dirName,
]

const styledComponents = {
  development: {
    displayName: true,
  },
  production: {
    minify: true,
    pure: true,
    displayName: false,
  },
}

const styledConfig = {
  styledComponents: styledComponents[NODE_ENV] || styledComponents.development,
}

// babel 配置列表选项 https://babeljs.io/docs/en/options#sourcetype
const babelConfig = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'react-hot-loader/babel',
    ['babel-plugin-styled-components', styledConfig],
    '@babel/plugin-syntax-dynamic-import',
    importPlugin('lodash'),
  ],
}

export default babelConfig
