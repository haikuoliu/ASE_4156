/**
 * mockAPIConfig = {
 * 	rules: [{
 * 		url: RegExp 检测请求链接是否match,
 * 	}]
 * }
 */

/* eslint-disable quote-props, quotes */
export const mockAPIConfig = {
  enabled: false,
  rules: [
    {
      // 返回结果－直接返回
      enabled: true,
      url: new RegExp('http://localhost:8080/api/users/view_profile\\?myid=2&otherid=2'),
      type: 'normal',
      dalay: 1000,
      response: {
        status: 'succ',
        result: {
          "uid": 2,
          "email": "ZehaoSong@gmail.com",
          "birth": "2000-02-13",
          "sex": "male",
          "name": "ZehaoSong",
          "follows": 123
        }
      }
    }, {
      // 返回结果－函数返回
      enabled: true,
      url: new RegExp('http://localhost:8080/api/event/create'),
      type: 'normal',
      delay: 1000,
      response: (url, config) => {
        if (config.eid < 0) {
          return { status: 'succ', result: { "eid": 1021 } }
        }
        return { status: 'succ', result: { "eid": config.eid } }
      }
    }, {
      // 返回结果－直接返回
      enabled: true,
      url: new RegExp('http://host.name.com/[\\d]+/[\\w+]'),
      type: 'normal',
      dalay: 1000,
      response: {
        status: 'succ',
        result: []
      }
    }, {
      // 返回结果－函数返回
      enabled: true,
      url: new RegExp('http://host.name.com/[\\d]+/[\\w+]'),
      type: 'normal',
      delay: 1000,
      response: (url, config) => {
        return { status: 'succ', result: [] }
      }
    }, {
      // 抛出异常－函数返回
      enabled: false,
      url: new RegExp('http://host.name.com/[\\d]+/[\\w+]'),
      type: 'error',
      delay: 1000,
      error: 'Error Message...'
    }
  ]
}

export default mockAPIConfig
