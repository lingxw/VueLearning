const Mock = require('mockjs')
const { msgs, roles }  = require('./common')

const vips = []
const users = []

for (let i = 0; i < 3; i++) {
    vips.push(Mock.mock({
        name: '@first',
        role: roles[2],
        summary: '@title(5, 10)'
    }))
  }

for (let i = 0; i < 5; i++) {
    users.push(Mock.mock({
        name: '@first',
        role: roles[3],
        summary: '@title(8, 16)'
    }))
  }
  
module.exports = [
    {
        url: '/user/list',
        type: 'get',
        response: config => {
            const { role } = config.query
            
            if(role == 2) {
                return {
                    code: msgs.success.code,
                    nodeChilds: vips
                }
            } else if(role == 3) {
                return {
                    code: msgs.success.code,
                    nodeChilds: users
                }
            } else {
                return {
                    code: msgs.user_fetch_error.code,
                    message: msgs.user_fetch_error.message,
                    nodeChilds:[]
                }
            }
        }
    }
]
  