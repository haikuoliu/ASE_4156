import fetchPro from 'SRC/utils/fetchPro'
import { CENTERS } from 'SRC/constants/action_const'
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

export function loadNeighCenters() {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('centers:getNeighCenters'))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('centers:getNeighCenters'), json.result.msg)
          return
        }
        dispatch({
          type: CENTERS.LOAD_NEIGH_CENTERS,
          result: json.result
        })
      })
  )
}
