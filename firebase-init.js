import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Firebase Initialized Globally"); // Mensaje para confirmar que se ejecuta primero
