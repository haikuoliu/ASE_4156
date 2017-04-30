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
      // 返回结果－直接返回
      enabled: false,
      url: new RegExp('^http://localhost:3000/centersInfoUser\\?username='),
      type: 'normal',
      dalay: 1000,
      // eslint-disable-next-line
      response: { "status":"succ", "result":{ "centersInfo":[ { "cid":"40380416-8206-4565-a112-efde3bd885d5", "title":"parallelism", "content":"Pellentesque eget nunc.", "size":95, "timestamp":20173687, "location":{ "street":" 326 W 47th St", "city": "New York", "state": "NY", "zip":10036, "lat":40.7608265, "lng":-73.9889803 } }, { "cid":"9c33d1dd-e6f0-4fed-9ef9-7a7bf9c98682", "title":"software", "content":"Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.", "size":186, "timestamp":20178115, "location":{ "street":"301 Elmside Drive", "zip":77042, "city": "New York", "state": "NY", "lat":29.7328935, "lng":-95.5431595 } } ] } }
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
