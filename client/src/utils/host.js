let hostname // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  hostname = () => 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'test') {
  hostname = () => 'http://localhost:8888'
} else {
  hostname = () => 'http://localhost:3000'
}

export default hostname
