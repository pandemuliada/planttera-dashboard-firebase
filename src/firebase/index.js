import firebase from 'firebase'
import config from './config'

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()

export {
  auth,
  firebase,
  db,
}