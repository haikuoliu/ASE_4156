let hostname // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  hostname = () => `http://${window.location.host}`
} else if (process.env.NODE_ENV === 'test') {
  hostname = () => 'http://localhost:8888'
} else {
  hostname = () => 'http://localhost:3000'
  // hostname = () => 'http://192.168.0.6:8080'
}

export default hostname
