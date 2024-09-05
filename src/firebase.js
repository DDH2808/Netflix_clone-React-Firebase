import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAcu_yRt6mzbNtJzz3zdTwtCYvS7lFn4SU",
  authDomain: "netflix-clone-a9b07.firebaseapp.com",
  projectId: "netflix-clone-a9b07",
  storageBucket: "netflix-clone-a9b07.appspot.com",
  messagingSenderId: "793620655295",
  appId: "1:793620655295:web:aa748ed4fe012c6d5aaa0a"
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
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };