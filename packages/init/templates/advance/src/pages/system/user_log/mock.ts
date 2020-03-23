import { uuid } from 'amis/lib/utils/helper'
import { times } from 'lodash'

const getItem = (i) => ({
  id: i,
  key: uuid(),
  cat: 'test',
  desc:
    '描述文案一大堆，描述文案一大堆描述文案一大堆描述文案一大堆描述文案一大堆描述文案一大堆描述文案一大堆',
  token: 'k64qsgk9k64qsgk9k64qsgk9k64qsgk9',
  update_at: '2020-02-03 10:00:00',
  create_at: '2020-02-03 10:00:00',
  ip: '',
})

export const mockSource = {
  'GET api/v1/adm_operate_log': () => {
    return {
      data: {
        items: times(10, getItem),
        total: 10,
      },
    }
  },
}
