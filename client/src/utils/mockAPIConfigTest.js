/**
 * mockAPIConfig = {
 * 	rules: [{
 * 		url: RegExp 检测请求链接是否match,
 * 	}]
 * }
 */

/* eslint-disable quote-props, quotes, arrow-body-style */
export const mockAPIConfig = {
  enabled: true,
  rules: [
    {
      // 返回结果－直接返回
      enabled: true,
      url: new RegExp('http://localhost:8888/user/login'),
      type: 'normal',
      dalay: 1000,
      response: (url, config) => {
        // console.log(url, config)
        return { status: 'succ', result: {
          username: config.formdata.get('username')
        } }
      }
    }, {
      // 返回结果－直接返回
      enabled: true,
      url: new RegExp('http://localhost:8888/user/register'),
      type: 'normal',
      dalay: 1000,
      response: (url, config) => {
        // console.log(url, config)
        return { status: 'succ', result: {
          username: config.formdata.get('username')
        } }
      }
    }, {
      // 返回结果－直接返回
      enabled: true,
      url: new RegExp('http://localhost:8888/user/getBasicInfo\\?username=[^&]*'),
      type: 'normal',
      dalay: 1000,
      response: (url, config) => ({
        status: 'succ',
        result: {
          username: url.replace(/http:\/\/localhost:8888\/user\/getBasicInfo\?username=([^&]*)/, '$1')
        }
      })
    }, {
      // 返回结果－直接返回
      enabled: true,
      url: new RegExp('http://localhost:8888/getPetsInfo\\?username=[^&]*'),
      type: 'normal',
      dalay: 1000,
      response: {
        status: 'succ',
        result: {
          petsInfo: [{
            species: 'big dog',
            birth: '2000'
          }]
        }
      }
    }
  ]
}

export default mockAPIConfig
