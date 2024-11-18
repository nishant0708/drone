import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBEBhBv7AcPhmWS1JwfXijBEarDjsz16xM",
    authDomain: "lupo-7ba5f.firebaseapp.com",
    databaseURL: "https://lupo-7ba5f-default-rtdb.firebaseio.com",
    projectId: "lupo-7ba5f",
    storageBucket: "lupo-7ba5f.appspot.com",
    messagingSenderId: "418172032930",
    appId: "1:418172032930:web:b28842c67139e5c0e6c4fb",
    measurementId: "G-1NVNFSWR1M"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
