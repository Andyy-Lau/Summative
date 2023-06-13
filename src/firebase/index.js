import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1ZRHBYRS-4wjp3RjylnWRvGdxmTkQ2vY",
  authDomain: "summative-d5974.firebaseapp.com",
  projectId: "summative-d5974",
  storageBucket: "summative-d5974.appspot.com",
  messagingSenderId: "1019483152388",
  appId: "1:1019483152388:web:c6c99592cd3b26245a1551",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
