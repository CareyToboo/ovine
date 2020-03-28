/**
 * dev command for webpack dev server
 */

import chokidar from 'chokidar'
import express from 'express'
import _ from 'lodash'
import path from 'path'
import portfinder from 'portfinder'
import { prepareUrls } from 'react-dev-utils/WebpackDevServerUtils'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import evalSourceMapMiddleware from 'react-dev-utils/evalSourceMapMiddleware'
import openBrowser from 'react-dev-utils/openBrowser'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import HotModuleReplacementPlugin from 'webpack/lib/HotModuleReplacementPlugin'

import { loadContext } from '../config'
import {
  configFileName,
  defaultPort,
  staticDirName,
  webpackConfFileName,
  babelConfigFileName,
} from '../constants'
import { DevCliOptions } from '../types'
import { normalizeUrl, globalStore } from '../utils'
import { createBaseConfig } from '../webpack/base'

import chalk = require('chalk')

type Options = Partial<DevCliOptions> & {
  isReload?: boolean
}
export async function dev(siteDir: string, options: Options = {}): Promise<void> {
  process.env.NODE_ENV = 'development'
  process.env.BABEL_ENV = 'development'
  globalStore('set', 'isProd', false)

  if (options.isReload) {
    console.log(chalk.blue('\nConfig changed restart the development server...'))
  } else {
    console.log(chalk.blue('\nStarting the development server...'))
  }

  // get all config context.
  const context = loadContext(siteDir)

  const { siteConfig, publicPath } = context

  const protocol: string = process.env.HTTPS === 'true' ? 'https' : 'http'
  const port: number = await getPort(options.port)
  const host: string = getHost(options.host)

  const urls = prepareUrls(protocol, host, port)
  const openUrl = normalizeUrl([urls.localUrlForBrowser, publicPath])

  const config: webpack.Configuration = merge(createBaseConfig({ ...context, ...options }), {
    plugins: [
      // This is necessary to emit hot updates for webpack-dev-server.
      new HotModuleReplacementPlugin(),
    ],
  })

  // https://webpack.js.org/configuration/dev-server
  const devServerConfig: WebpackDevServer.Configuration = {
    host,
    publicPath,
    compress: true,
    clientLogLevel: 'error',
    hot: true,
    hotOnly: false,
    quiet: true,
    proxy: siteConfig.devServerProxy,
    headers: {
      'access-control-allow-origin': '*',
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    historyApiFallback: {
      rewrites: [{ from: /\/*/, to: publicPath }],
    },
    disableHostCheck: true,
    overlay: false,
    before: (app, server) => {
      app.use(publicPath, express.static(path.resolve(siteDir, staticDirName)))

      app.use(evalSourceMapMiddleware(server))
      app.use(errorOverlayMiddleware())
    },
  }

  const compiler = webpack(config)
  const devServer = new WebpackDevServer(compiler, devServerConfig)

  reloadDevServer({ devServer, siteDir, cliOptions: options })

  devServer.listen(port, host, (err) => {
    if (err) {
      console.log(err)
    }
    console.log(chalk.yellow(`\nurl: ${openUrl}\nenv: ${options.env}\nmock: ${options.mock}\n`))
    if (options.open) {
      openBrowser(openUrl)
    }
  })
  ;['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig as NodeJS.Signals, () => {
      devServer.close()
      process.exit()
    })
  })
}

function getHost(reqHost: string | undefined): string {
  return reqHost || 'localhost'
}

async function getPort(reqPort: string | undefined): Promise<number> {
  const basePort = reqPort ? parseInt(reqPort, 10) : defaultPort
  const port = await portfinder.getPortPromise({ port: basePort })
  return port
}

function reloadDevServer(options: any) {
  const { siteDir, devServer, cliOptions } = options
  const fsWatcher = chokidar.watch([configFileName, webpackConfFileName, babelConfigFileName], {
    cwd: siteDir,
    ignoreInitial: true,
  })
  ;['add', 'change', 'unlink', 'addDir', 'unlinkDir'].forEach((event) => {
    fsWatcher.on(
      event,
      _.throttle(() => {
        fsWatcher.close().then(() => {
          devServer.close(() => {
            dev(siteDir, { ...cliOptions, isReload: true })
          })
        })
      }, 1200)
    )
  })
}
