import fetchPro from 'SRC/utils/fetchPro'
import { CENTERS, ORDER } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

export function changeSearchCenter(loc) {
  return {
    type: CENTERS.CHANGE_SEARCH_CENTER,
    result: loc
  }
}
/**

  Async Actions

*/

export function loadNeighCenters(loc) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('rest:neighCenters_get', loc.lat, loc.lng, loc.zipcode))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('rest:neighCenters_get', loc.lat, loc.lng, loc.zipcode), json.result.msg)
          return
        }
        dispatch({
          type: CENTERS.LOAD_NEIGH_CENTERS,
          result: json.result
        })
      })
  )
}

export function postOrder(orderInfo) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const formData = new FormData()
    formData.append('username', orderInfo.username)
    formData.append('cid', orderInfo.cid)
    formData.append('msg', orderInfo.msg)
    return fetchPro(api('rest:ordersInfo_post'), {
      method: 'post',
      body: formData
    })
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('rest:ordersInfo_post'), json.result.msg)
          return
        }
        dispatch({
          type: ORDER.CREATE_ORDER,
          result: json.result
        })
      })
  }
}

export function searchAddress(address) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('rest:searchAddress', address))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('rest:searchAddress', address), json.result.msg)
          return
        }
        const loc = {
          lat: json.result.coordinate.lat,
          lng: json.result.coordinate.lng,
          zipcode: json.result.zipcode
        }
        dispatch({
          type: CENTERS.SEARCH_CENTER_ADDRESS,
          result: loc
        })
        loadNeighCenters(loc)(dispatch, getState)
      })
  )
}
