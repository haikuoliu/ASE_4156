let hostname // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  hostname = () => `http://${window.location.host}`
} else {
  hostname = () => 'http://localhost:8080'
  // hostname = () => 'http://192.168.0.6:8080'
}

export default hostname
