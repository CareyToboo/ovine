import chalk = require('chalk')
import fs from 'fs-extra'
import path from 'path'
import { Configuration } from 'webpack'
import merge from 'webpack-merge'

import { loadContext } from '../config'
import { dllDirName } from '../constants'
import { BuildCliOptions, Props } from '../types'
import { compileWebpack } from '../utils'
import { createDllConfig } from '../webpack/dll'

export async function build(
  siteDir: string,
  cliOptions: Partial<BuildCliOptions> = {}
): Promise<void> {
  process.env.BABEL_ENV = 'production'
  process.env.NODE_ENV = 'production'
  console.log(chalk.blue('Creating an optimized production build...'))

  const props: Props = loadContext(siteDir)

  const dllConfig: Configuration = createDllConfig({ ...props, ...cliOptions })

  let realDllConfig = dllConfig
  const userDllConfigFile = `${siteDir}/webpack.dll.js`

  if (fs.existsSync(userDllConfigFile)) {
    realDllConfig = merge(dllConfig, require(userDllConfigFile))
  }

  await compileWebpack(realDllConfig)

  const relativeDir = path.relative(process.cwd(), dllDirName)
  console.log(`\n${chalk.green('Success!')} Generated dll files in ${chalk.cyan(relativeDir)}.\n`)
}
