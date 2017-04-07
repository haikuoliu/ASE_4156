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
      url: new RegExp('http://localhost:8888/login'),
      type: 'normal',
      dalay: 1000,
      response: (url, config) => {
        console.log(url, config)
        return { status: 'succ', result: {
          username: config.formdata.get('username')
        } }
      }
    }, {
      // 返回结果－直接返回
      enabled: true,
      url: new RegExp('http://localhost:8888/register'),
      type: 'normal',
      dalay: 1000,
      response: (url, config) => {
        console.log(url, config)
        return { status: 'succ', result: {
          username: config.formdata.get('username')
        } }
      }
    }
  ]
}

export default mockAPIConfig
