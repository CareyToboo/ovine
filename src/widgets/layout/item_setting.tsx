/**
 * APP 系统设置
 */

import { Drawer } from 'amis'
import map from 'lodash/map'
import React from 'react'

import { withAppTheme } from '~/app'
import '~/assets/styles/themes/default.css'
import themes from '~/constants/themes'
import { useImmer } from '~/utils/hooks'

import { Amis } from '../amis/schema'

import { LayoutCommProps } from './common'
import HeadItem from './head_item'

type SettingProps = LayoutCommProps & {
  theme: string
}

// TODO: 需要定义 styled-themes 主题
// 将 amis 某些核心 变量重新定义
const getSettingSchema = (option: SettingProps) => {
  const { theme } = option

  return {
    type: 'wrapper',
    body: [
      {
        type: 'html',
        html: `<h5 class="login-title m-t-xs m-b-lg">系统设置</h5>`,
      },
      {
        type: 'form',
        mode: 'horizontal',
        horizontal: { left: 'col-sm-4', right: 'col-sm-8' },
        wrapWithPanel: false,
        controls: [
          {
            type: 'select',
            name: 'select',
            label: '选择主题',
            value: theme,
            options: map(themes, ({ text }, key) => ({
              label: text,
              value: key,
            })),
          },
        ],
      },
    ],
  }
}

type Props = LayoutCommProps

type State = {
  settingVisible: boolean
}
const initState = {
  settingVisible: false,
}

export default withAppTheme<Props>((props) => {
  const [state, setState] = useImmer<State>(initState)
  const { theme = '' } = props

  const { settingVisible } = state

  const toggleSetting = () => {
    setState((d) => {
      d.settingVisible = !d.settingVisible
    })
  }

  return (
    <>
      <Drawer theme={theme} size="sm" onHide={toggleSetting} show={settingVisible} position="right">
        <Amis schema={getSettingSchema({ theme, ...props })} />
      </Drawer>
      <HeadItem faIcon="cog" tip="设置" onClick={toggleSetting} />
    </>
  )
})
