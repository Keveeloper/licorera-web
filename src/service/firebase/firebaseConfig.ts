import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC7YeM_lFND0ftHHCOrNB6PsFk0xIM_Xs8",
    authDomain: "licorera-3jjjs-12d7e.firebaseapp.com",
    databaseURL: "https://licorera-3jjjs-12d7e.firebaseio.com",
    projectId: "licorera-3jjjs-12d7e",
    storageBucket: "licorera-3jjjs-12d7e.appspot.com",
    messagingSenderId: "648554160671",
    appId: "1:648554160671:web:90d620458d23b7463a2b2a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();