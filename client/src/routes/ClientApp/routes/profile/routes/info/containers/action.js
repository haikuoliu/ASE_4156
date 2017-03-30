import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

import { profileUserInfoUpdate, loadUserInfo } from '../../../containers/action'

// import * as PersistentActions from 'SRC/action'

/**

  Async Actions

*/

export function switchFollow(myId, otherId, type = 'follow') {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('users:switchFollow', myId, otherId, type === 'follow' ? 1 : 0))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('users:switchFollow', myId, otherId, type === 'follow' ? 1 : 0), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch(profileUserInfoUpdate('isFollow', type === 'follow'))
        dispatch(loadUserInfo(myId, otherId))
      })
  )
}
