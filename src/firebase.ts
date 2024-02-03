import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
      apiKey: "AIzaSyDVoOIslGQxAOs2ptg_IOCrShKANApDX5U",
      authDomain: "mern-ecommerce-a1155.firebaseapp.com",
      projectId: "mern-ecommerce-a1155",
      storageBucket: "mern-ecommerce-a1155.appspot.com",
      messagingSenderId: "158430031499",
      appId: "1:158430031499:web:da479881701bb8052dae8e"
    };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



