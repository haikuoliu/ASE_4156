import Immutable from 'immutable'

import { CLIENT_EVENTS } from 'SRC/constants/action_const'

const initialState = Immutable.fromJS({
  eventsList: []
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_EVENTS.LOAD_USER_POSTS]: (state, action) => {
    return state.set('eventsList', Immutable.fromJS(action.result))
  },
  [CLIENT_EVENTS.SWITCH_LIKE]: (state, action) => {
    const index = state.get('eventsList').findIndex(
      Value => Value.get('eid') === action.eid
    )
    if (index < 0) return state
    return state.update('eventsList', oldList => (
      oldList.update(index, V =>
        V.merge(Immutable.fromJS({
          islike: action.isLike,
          likes: V.get('likes') + (action.isLike ? 1 : -1)
        }))
      )
    ))
  }
}

export default function userInfo(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
