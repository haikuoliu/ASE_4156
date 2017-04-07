import { userLogin, userRegister } from 'SRC/utils/login'
import moment from 'moment'

test('login', () => {
  const data = {
    username: 'test1',
    password: '123'
  }
  userLogin(data).then((json) => {
    expect(json).toEqual({
      status: 'succ', result: {
        username: 'test1'
      }
    })
  })
})

test('register', () => {
  const data = {
    username: 'NewUser',
    birth: moment(),
    gender: 'male',
    email: 'aaa@gmail.com',
    phone: '123244',
    password: '1111'
  }
  userRegister(data).then((json) => {
    expect(json).toEqual({
      status: 'succ', result: {
        username: 'NewUser'
      }
    })
  })
})
