import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import modul Realtime Database
import AsyncStorage from "@react-native-async-storage/async-storage";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9W61IIWRMEybI5csI4V0YVbKYBtiZF3M",
  authDomain: "rentcamera-62560.firebaseapp.com",
  databaseURL: "https://rentcamera-62560-default-rtdb.firebaseio.com",
  projectId: "rentcamera-62560",
  storageBucket: "rentcamera-62560.firebasestorage.app",
  messagingSenderId: "406709257951",
  appId: "1:406709257951:web:9da736bac78eb6318dcb6a",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Auth dengan persistence menggunakan AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inisialisasi Realtime Database
const database = getDatabase(app);

export { auth, database };
