import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut} from "firebase/auth";
import { 
  addDoc, 
  collection, 
  getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBy3QgTb02X0E_593cXvMWRvAuwWdu4nCk",
  authDomain: "netflix-clone-d11c2.firebaseapp.com",
  projectId: "netflix-clone-d11c2",
  storageBucket: "netflix-clone-d11c2.firebasestorage.app",
  messagingSenderId: "839691312338",
  appId: "1:839691312338:web:cdfb1aa10858832c78e10b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));;
  }
}

const logout = () => {
  signOut(auth);
}

export {auth, db, login, signup, logout};