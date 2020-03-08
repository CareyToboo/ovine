/**
 * 页面渲染错误处理
 */

import { uuid } from 'amis/lib/utils/helper'
import React from 'react'

import logger from '@/utils/logger'

import { StyledErrorPage } from './styled'

type Props = {
  type?: 'page' | 'component' | 'entry'
  children: any
}
type State = {
  hasError: boolean
  online: boolean
}

const refreshPage = () => {
  const hash = uuid()
  const url = window.location.href
  const refreshUrl =
    url.indexOf('_refresh=') > -1
      ? `${url.split('_refresh=')[0]}_refresh=${hash}` // 存在 _refresh 直接替换
      : `${url}${url.indexOf('?') === -1 ? '?' : '&'}_refresh=${uuid()})}` // 否则添加一个刷新值

  window.location.href = refreshUrl
}

const log = logger.getLogger('lib:components:ErrorBoundary')

class ErrorBoundary extends React.Component<Props, State> {
  public static getDerivedStateFromError(error: any) {
    log.error('getDerivedStateFromError:', error)
    return { hasError: true }
  }

  constructor(props: any) {
    super(props)
    this.state = { hasError: false, online: true }
  }

  public componentDidMount() {
    window.addEventListener('online', () => {
      this.setState({
        online: true,
      })
    })
    window.addEventListener('offline', () => {
      this.setState({
        online: false,
      })
    })
  }

  public componentDidCatch(error: any, errorInfo: any) {
    log.error('componentDidCatch:', error, errorInfo)
  }

  // 页面内组件加载错误
  private renderCompError() {
    return <div>组件错误</div>
  }

  // 页面加载错误
  private renderPageError() {
    return (
      <StyledErrorPage>
        <div className="inner">
          <div />
          <p>
            <span>当前页面发生错误</span>
            {this.state.online && <span onClick={refreshPage}>刷新页面</span>}
          </p>
        </div>
      </StyledErrorPage>
    )
  }

  public render() {
    const { children, type = 'component' } = this.props
    const { hasError } = this.state

    if (hasError) {
      switch (type) {
        case 'page':
          return this.renderPageError()
        default:
          return this.renderCompError()
      }
    }

    return children
  }
}

export default ErrorBoundary
