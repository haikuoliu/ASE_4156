/**
 * mockAPIConfig = {
 * 	rules: [{
 * 		url: RegExp 检测请求链接是否match,
 * 	}]
 * }
 */

/* eslint-disable quote-props, quotes */
export const mockAPIConfig = {
  enabled: true,
  rules: [
    {
      // 返回结果－直接返回
      enabled: true,
      url: new RegExp('http://localhost:3000/centers/getNeighCenters'),
      type: 'normal',
      dalay: 1000,
      response: {
        status: 'succ',
        result: {
          centersList: [
            { location: { lat: 40.809322, lng: -73.9612294 }, description: 'Center1' },
            { location: { lat: 40.810877, lng: -73.957235 }, description: 'Center2' },
            { location: { lat: 40.807629, lng: -73.966097 }, description: 'Center3' }
          ]
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
