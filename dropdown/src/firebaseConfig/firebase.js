import { initializeApp } from "firebase/app";

import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCpIfJYuLvnLxPkGIlWunBWXF4KCc8aYeg",
  authDomain: "tugerente-42169.firebaseapp.com",
  projectId: "tugerente-42169",
  storageBucket: "tugerente-42169.appspot.com",
  messagingSenderId: "145632179756",
  appId: "1:145632179756:web:06afa70b238c8348db4389"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)