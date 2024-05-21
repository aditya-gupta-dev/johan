import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// Paste your credentials

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);

export const signIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch {
    alert('Auth failed')
  }
}

export async function addSearchedUrl(url: string) {
  let user = auth.currentUser;
  let ref = collection(firestore, `users/${user?.uid}/history`)
  try {
    await addDoc(ref, {
      url: url,
      created_at: Date.now()
    })
  } catch {
    throw new Error('failed to save');
  }
}