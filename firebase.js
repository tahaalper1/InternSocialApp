import firebase from 'firebase/compat';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBr21BbYXe8XlZWOpl0LDT6l6qP21QB6ao",
    authDomain: "finalapp-c2598.firebaseapp.com",
    projectId: "finalapp-c2598",
    storageBucket: "finalapp-c2598.appspot.com",
    messagingSenderId: "583303425395",
    appId: "1:583303425395:web:d3944c3d5647495c636906"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
