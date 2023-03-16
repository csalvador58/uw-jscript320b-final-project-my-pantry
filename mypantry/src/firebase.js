import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "my-pantry-5bfbc.firebaseapp.com",
  projectId: "my-pantry-5bfbc",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInAccount = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    // console.log('user');
    // console.log(user);
    console.log('Saving UID to local storage');
    const saveUID = JSON.stringify(user.uid);
    localStorage.setItem('myPantryUser', saveUID);

    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    alert(err.message);
  }
};


const logout = () => {
  signOut(auth);
  const clearUID = '';
  localStorage.setItem('myPantryUser', clearUID);
};

export {
  auth,
  db,
  signInAccount,
  logout,
};
