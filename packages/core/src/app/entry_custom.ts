/**
 * app.custom Ovine 自定义入口
 */

import './includes'

import '~/app.custom'

// Hot Module Replacement API
const { hot } = module as any
if (hot) {
  hot.accept((err: Error) => {
    // eslint-disable-next-line
    console.error('An error occurred when hot reload.', err)
  })
}
