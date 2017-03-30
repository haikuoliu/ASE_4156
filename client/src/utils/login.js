import fetchPro from './fetchPro'
import logger from './logger'
import api from 'SRC/apis'

export function userLogin(args) {
  const formData = new FormData()
  formData.append('username', args.username)
  formData.append('password', args.password)
  return fetchPro(api('account:login'), {
    method: 'post',
    body: formData
  }).then(response => response.json())
    .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
    .then(json => {
      if (json.status === 'fail') {
        logger.error(api('account:login'), json.result.msg)
      }
      return json
    })
}

export function userRegister(args) {
  const formData = new FormData()
  formData.append('username', args.username)
  formData.append('email', args.email)
  formData.append('password', args.password)
  formData.append('birth', args.birth.format('YYYY-MM-DD'))
  formData.append('gender', args.gender)
  formData.append('phone', args.phone)
  return fetchPro(api('account:register'), {
    method: 'post',
    body: formData
  }).then(response => response.json())
    .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
    .then(json => {
      if (json.status === 'fail') {
        logger.error(api('account:register'), json.result.msg)
      }
      return json
    })
}
