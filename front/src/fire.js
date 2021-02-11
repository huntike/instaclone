import firebase from 'firebase';

const  firebaseConfig = {
    apiKey: "AIzaSyAXFah7Oj-5Ba6r-R1OERmwVx0O839VmY8",
    authDomain: "instaclone-95177.firebaseapp.com",
    projectId: "instaclone-95177",
    storageBucket: "instaclone-95177.appspot.com",
    messagingSenderId: "258119022375",
    appId: "1:258119022375:web:9ad2f7d433b3e1b7a21b02"

};
try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  const fire = firebase;
  export default fire;
