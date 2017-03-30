export function persistentSet(key, value) {
  return {
    type: 'PERSISTENT@SET',
    key,
    value
  }
}

export function persistentRemove(key, value) {
  return {
    type: 'PERSISTENT@REMOVE',
    key,
    value
  }
}

export function persistentClear() {
  return {
    type: 'PERSISTENT@CLEAR'
  }
}
