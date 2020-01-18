import firebase from 'firebase'
import config from './config'

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {
  auth,
  firebase,
  db,
  storage
}