import * as firebase from 'firebase'
import 'firebase/auth' 
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCbFjY8x43vUfMchrsDtll8dcdWHJHGEPM",
    authDomain: "littlechatroom-f52b7.firebaseapp.com",
    projectId: "littlechatroom-f52b7",
    storageBucket: "littlechatroom-f52b7.appspot.com",
    messagingSenderId: "927281307124",
    appId: "1:927281307124:web:e019a60eab7e2b827beda1",
    measurementId: "G-Z9HPMZW53P"
  };

let app;

if (firebase.apps.length ==0) {
    app = initializeApp(firebaseConfig);
}else {
    app = firebase.app ();
}

const db = app.firestore ();
const auth = firebase.auth();

export {db,auth};