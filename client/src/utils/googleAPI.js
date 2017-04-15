let googleAPIKey = 'AIzaSyBkQavz-W7ZqmVOOtyUFYOh-1SxJ6e6eKg' // eslint-disable-line
// import logger from 'SRC/utils/logger'

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const timeout = setTimeout(() => {
        reject(new Error('Get geolocation timeout!'))
      }, 10000)
      navigator.geolocation.getCurrentPosition((pos) => {
        clearTimeout(timeout)
        resolve({
          lng: pos.coords.longitude,
          lat: pos.coords.latitude
        })
      })
    } else {
      reject(new Error('Current Browser doesn\'t support GeoLocation Function!'))
    }
  })
}

if (process.env.NODE_ENV === 'production') {
  googleAPIKey = 'AIzaSyBkQavz-W7ZqmVOOtyUFYOh-1SxJ6e6eKg'
} else if (process.env.NODE_ENV === 'test') {
  googleAPIKey = 'AIzaSyBkQavz-W7ZqmVOOtyUFYOh-1SxJ6e6eKg'
}

export default googleAPIKey
