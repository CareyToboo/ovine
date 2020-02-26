/**
 * dev command for webpack dev server
 */

import chalk = require('chalk')
import chokidar from 'chokidar'
import express from 'express'
import _ from 'lodash'
import path from 'path'
import portfinder from 'portfinder'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import evalSourceMapMiddleware from 'react-dev-utils/evalSourceMapMiddleware'
import openBrowser from 'react-dev-utils/openBrowser'
import { prepareUrls } from 'react-dev-utils/WebpackDevServerUtils'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import HotModuleReplacementPlugin from 'webpack/lib/HotModuleReplacementPlugin'

import { loadContext } from '../config'
import { configFileName, defaultPort, staticDirName } from '../constants'
import { DevCliOptions } from '../types'
import { normalizeUrl } from '../utils'
import { createBaseConfig } from '../webpack/base'

function getHost(reqHost: string | undefined): string {
  return reqHost || 'localhost'
}

async function getPort(reqPort: string | undefined): Promise<number> {
  const basePort = reqPort ? parseInt(reqPort, 10) : defaultPort
  const port = await portfinder.getPortPromise({ port: basePort })
  return port
}

export async function dev(siteDir: string, cliOptions: Partial<DevCliOptions> = {}): Promise<void> {
  process.env.NODE_ENV = 'development'
  process.env.BABEL_ENV = 'development'
  console.log(chalk.blue('Starting the development server...'))

  // Process all related files as a prop.
  const props = await loadContext(siteDir)

  // Reload files processing.
  const reload = () => {
    loadContext(siteDir)
  }

  const fsWatcher = chokidar.watch([configFileName], {
    cwd: siteDir,
    ignoreInitial: true,
  })
  ;['add', 'change', 'unlink', 'addDir', 'unlinkDir'].forEach((event) =>
    fsWatcher.on(event, reload)
  )

  const protocol: string = process.env.HTTPS === 'true' ? 'https' : 'http'
  const port: number = await getPort(cliOptions.port)
  const host: string = getHost(cliOptions.host)
  const { publicPath } = props

  const urls = prepareUrls(protocol, host, port)
  const openUrl = normalizeUrl([urls.localUrlForBrowser, publicPath])

  const config: webpack.Configuration = merge(createBaseConfig({ ...props, ...cliOptions }), {
    plugins: [
      // This is necessary to emit hot updates for webpack-dev-server.
      new HotModuleReplacementPlugin(),
    ],
  })

  // https://webpack.js.org/configuration/dev-server
  const devServerConfig: WebpackDevServer.Configuration = {
    host,
    compress: true,
    clientLogLevel: 'error',
    hot: true,
    hotOnly: false,
    quiet: true,
    headers: {
      'access-control-allow-origin': '*',
    },
    publicPath,
    watchOptions: {
      ignored: /node_modules/,
    },
    historyApiFallback: {
      rewrites: [{ from: /\/*/, to: publicPath }],
    },
    disableHostCheck: true,
    // Disable overlay on browser since we use CRA's overlay error reporting.
    overlay: false,
    before: (app, server) => {
      app.use(publicPath, express.static(path.resolve(siteDir, staticDirName)))

      // This lets us fetch source contents from webpack for the error overlay.
      app.use(evalSourceMapMiddleware(server))
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware())

      // TODO: add plugins beforeDevServer and afterDevServer hook
    },
  }

  const compiler = webpack(config)
  const devServer = new WebpackDevServer(compiler, devServerConfig)

  devServer.listen(port, host, (err) => {
    if (err) {
      console.log(err)
    }
    if (cliOptions.open) {
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
