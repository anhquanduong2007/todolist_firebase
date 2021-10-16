import { initializeApp } from "firebase/app";
import { getAuth,connectAuthEmulator  } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBQCxoCiJaGyksWvFmy_9-C8wjPvbDzOIY",
  authDomain: "tutorial-09-sdk-5a1ce.firebaseapp.com",
  projectId: "tutorial-09-sdk-5a1ce",
  storageBucket: "tutorial-09-sdk-5a1ce.appspot.com",
  messagingSenderId: "129660140375",
  appId: "1:129660140375:web:dba40f9cf7e9b5f078dc12",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// connectAuthEmulator(auth, "http://localhost:9099");
// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }
export { auth,db };
