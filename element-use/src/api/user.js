import request from '@/utils/request'

export function fetchListByRole(role) {
    return request({
        url: '/user/list',
        method: 'get',
        params:{ role }
      })
}