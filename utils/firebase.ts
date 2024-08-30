import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1vsPys2weqYm1gTXXOckgU8AxOQ442Is",
  authDomain: "my-message-e0140.firebaseapp.com",
  projectId: "my-message-e0140",
  storageBucket: "my-message-e0140.appspot.com",
  messagingSenderId: "72195026155",
  appId: "1:72195026155:web:2a0b1251c66d46fa2ee2ae",
  measurementId: "G-MH76QNNHKC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
