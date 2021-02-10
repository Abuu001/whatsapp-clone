import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAbWfhJEv030vkb0YjhgVMQJQ_Ywd4k_Lg",
    authDomain: "whatsappYoclone.firebaseapp.com",
    projectId: "whatsappyoclone",
    storageBucket: "whatsappyoclone.appspot.com",
    messagingSenderId: "30472321078",
    appId: "1:30472321078:web:221ce3cece3893d9180097",
    measurementId: "G-1NXDECZ8LV"
};

const app = firebase.initializeApp({
    apiKey: "AIzaSyAbWfhJEv030vkb0YjhgVMQJQ_Ywd4k_Lg",
    authDomain: "whatsappyoclone.firebaseapp.com",
    projectId: "whatsappyoclone",
    storageBucket: "whatsappyoclone.appspot.com",
    messagingSenderId: "30472321078",
    appId: "1:30472321078:web:221ce3cece3893d9180097",
    measurementId: "G-1NXDECZ8LV"
})
const auth= app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
  
export   {
    firebaseConfig,
    provider,
    auth
};