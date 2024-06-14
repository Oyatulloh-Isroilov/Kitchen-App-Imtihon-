import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXS2lTbPHsuBY-O3DEYaS3dRdNC2ALBG8",
    authDomain: "imtihon-40ca6.firebaseapp.com",
    projectId: "imtihon-40ca6",
    storageBucket: "imtihon-40ca6.appspot.com",
    messagingSenderId: "251215998067",
    appId: "1:251215998067:web:c0b1ec5306ae22d2004e06",
    measurementId: "G-LSV5VZR2SM"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
