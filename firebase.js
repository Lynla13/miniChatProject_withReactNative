import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxZVO2l_ndP-k-DZqKoMwmLsQWIo0jd2c",
  authDomain: "chatapp2-52681.firebaseapp.com",
  projectId: "chatapp2-52681",
  storageBucket: "chatapp2-52681.appspot.com",
  messagingSenderId: "160330996344",
  appId: "1:160330996344:web:704f87488608c83606ab8d",
  measurementId: "G-KK202QHRGT"
};

// Use this to initialize the firebase App
const firebaseApp =firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };


// apiKey: "AIzaSyCbFjY8x43vUfMchrsDtll8dcdWHJHGEPM",
//     authDomain: "littlechatroom-f52b7.firebaseapp.com",
//     projectId: "littlechatroom-f52b7",
//     storageBucket: "littlechatroom-f52b7.appspot.com",
//     messagingSenderId: "927281307124",
//     appId: "1:927281307124:web:e019a60eab7e2b827beda1",
//     measurementId: "G-Z9HPMZW53P"