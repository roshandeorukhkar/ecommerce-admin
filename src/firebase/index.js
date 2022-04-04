import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNncDewqpQoSd_VrrQKW0MLi5i7PuJRqY",
  authDomain: "fir-react-upload-821e0.firebaseapp.com",
  projectId: "fir-react-upload-821e0",
  storageBucket: "fir-react-upload-821e0.appspot.com",
  messagingSenderId: "930253273727",
  appId: "1:930253273727:web:8bb8b4a832f55a786b1d4a",
  measurementId: "G-P1S7QWCEEC"

  // apiKey: "AIzaSyAjfwHWDhzjnY8DCn7q3Q9E59pMmy95C2Y",
  // authDomain: "keastore-b6099.firebaseapp.com",
  // projectId: "keastore-b6099",
  // storageBucket: "keastore-b6099.appspot.com",
  // messagingSenderId: "470309241646",
  // appId: "1:470309241646:web:fcaa8149a38972c7db30bf"
};

export const app = initializeApp(firebaseConfig)
export const  storage = getStorage(app);