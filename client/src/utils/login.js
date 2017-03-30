import fetchPro from './fetchPro'
import logger from './logger'
import api from 'SRC/apis'

export function userLogin(args) {
  const formData = new FormData()
  formData.append('email', args.email)
  formData.append('password', args.password)
  return fetchPro(api('users:userLogin'), {
    method: 'post',
    body: formData
  }).then(response => response.json())
    .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
    .then(json => {
      if (json.status === 'fail') {
        logger.error(api('users:userLogin'), json.result.msg)
      }
      return json
    })
}

export function userRegister(args) {
  const formData = new FormData()
  formData.append('email', args.email)
  formData.append('password', args.password)
  formData.append('birth', args.birth.format('YYYY-MM-DD'))
  formData.append('sex', args.sex)
  formData.append('name', args.nickname)
  return fetchPro(api('users:userRegister'), {
    method: 'post',
    body: formData
  }).then(response => response.json())
    .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
    .then(json => {
      if (json.status === 'fail') {
        logger.error(api('users:userRegister'), json.result.msg)
      }
      return json
    })
}
