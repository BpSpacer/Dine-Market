import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDTK32zic7PR6ag1u6yORxXeShDu4uhXS4",
  authDomain: "dinemarket-1a469.firebaseapp.com",
  projectId: "dinemarket-1a469",
  storageBucket: "dinemarket-1a469.appspot.com",
  messagingSenderId: "882105190135",
  appId: "1:882105190135:web:7e30ff4713b90a9ebe35f2"
};

const app = initializeApp(firebaseConfig);
export const auth =  getAuth();