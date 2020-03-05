import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { loadContext } from '../config'
import { outDirName } from '../constants'
import { BuildCliOptions } from '../types'
import { compileWebpack, globalStore, mergeWebpackConfig } from '../utils'
import { createBaseConfig } from '../webpack/base'

import chalk = require('chalk')

export async function build(
  siteDir: string,
  cliOptions: Partial<BuildCliOptions> = {}
): Promise<void> {
  process.env.BABEL_ENV = 'production'
  process.env.NODE_ENV = 'production'
  globalStore('set', 'isProd', true)

  console.log(chalk.blue('\nCreating an optimized production build...'))

  const context = loadContext(siteDir)
  const { bundleAnalyzer } = cliOptions

  const buildConfig: Configuration = mergeWebpackConfig(
    createBaseConfig({ ...context, ...cliOptions }),
    {
      optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: !bundleAnalyzer,
            terserOptions: {
              parse: {
                // we want uglify-js to parse ecma 8 code. However, we don't want it
                // to apply any minfication steps that turns valid ecma 5 code
                // into invalid ecma 5 code. This is why the 'compress' and 'output'
                // sections only apply transformations that are ecma 5 safe
                // https://github.com/facebook/create-react-app/pull/4234
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebook/create-react-app/issues/2488
                ascii_only: true,
              },
            },
          }),
          new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
          }),
        ],
      },
    }
  )

  if (bundleAnalyzer) {
    buildConfig.plugins?.push(new BundleAnalyzerPlugin())
  }

  await compileWebpack(buildConfig)

  console.log(
    `\n${chalk.green('Success!')} Generated bundle files in ${chalk.cyan(
      path.relative(siteDir, outDirName)
    )}.\n`
  )
}
