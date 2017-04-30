import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './action'
import {PROFILE} from 'SRC/constants/action_const'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import Immutable from 'immutable'
import reducer from './reducer'

/* global it, expect*/
it('loadBasicInfo', () => {
  const expectedActions = [
    {
      type: PROFILE.LOAD_BASIC_INFO,
      result: {
        isSelf: false,
        username: 'MyName'
      }
    }
  ]
  const store = mockStore({})
  return store.dispatch(actions.loadBasicInfo('dddd', 'MyName')).then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})

it('loadPetsInfo', () => {
  const expectedActions = [
    {
      type: PROFILE.LOAD_PETS_INFO,
      result: {
        petsInfo: [
          {
            species: 'big dog',
            birth: '2000'
          }
        ]
      }
    }
  ]
  const store = mockStore({})
  return store.dispatch(actions.loadPetsInfo('MyName')).then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})

const initialState = Immutable.fromJS({
  basicInfo: {
    birth: 1478236926748,
    email: 'example@gmail.com',
    gender: 'Male',
    isSelf: true,
    phone: '3471345678',
    userName: 'Unkown'
  },
  centersList: [],
  history: [],
  petsList: []
})

it('should return the initial state', () => {
  expect(reducer(undefined, {}).toJS()).toEqual(initialState.toJS())
})

it('reducer load pets info', () => {
  expect(reducer(initialState, {
    type: PROFILE.LOAD_PETS_INFO,
    result: {
      petsInfo: [
        {
          species: 'big dog',
          birth: '2000'
        }
      ]
    }
  }).toJS()).toEqual({
    basicInfo: {
      userName: 'Unkown',
      gender: 'Male',
      birth: 1478236926748,
      email: 'example@gmail.com',
      phone: '3471345678',
      isSelf: true
    },
    history: [],
    petsList: [
      {
        species: 'big dog',
        birth: '2000'
      }
    ],
    centersList: []
  })
})
