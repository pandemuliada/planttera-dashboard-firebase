import firebase from 'firebase'
import config from './config'

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export {
  auth,
  firebase
}