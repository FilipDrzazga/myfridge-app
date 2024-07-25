import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1VH6Tqigh7yO30GybaKtSo6Mv_k8AKNc",
  authDomain: "fridge-40fa7.firebaseapp.com",
  projectId: "fridge-40fa7",
  storageBucket: "fridge-40fa7.appspot.com",
  messagingSenderId: "536779864664",
  appId: "1:536779864664:web:fd0f6fe0bd43b9e6cc682d",
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export { FIREBASE_AUTH, createUserWithEmailAndPassword, setPersistence };
