declare module '*.json'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '~/assets/*'
declare module 'classnames'

declare module 'react-dom' {
  export const render: any
  export const createPortal: any
  export const setHotElementComparator: any
}
declare module 'react-hot-loader/root' {
  export const hot: any
}
declare const $: any
