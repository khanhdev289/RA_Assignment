import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBFxdcCi0l5NojurI4L9GBU3Dl5QQwFwI0",
  authDomain: "scal-58512.firebaseapp.com",
  projectId: "scal-58512",
  storageBucket: "scal-58512.appspot.com",
  messagingSenderId: "163172225487",
  appId: "1:163172225487:web:111c02086cda739bdac2ba",
  measurementId: "G-2VMMGEN0J5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
