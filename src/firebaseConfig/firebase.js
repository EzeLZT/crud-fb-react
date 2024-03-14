import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDmT937SpPbctkWZEetgHB93omuqXAkKm4",
  authDomain: "crud-fire-react-4cf82.firebaseapp.com",
  projectId: "crud-fire-react-4cf82",
  storageBucket: "crud-fire-react-4cf82.appspot.com",
  messagingSenderId: "797744499745",
  appId: "1:797744499745:web:b9dbe826b737bb8de72760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)