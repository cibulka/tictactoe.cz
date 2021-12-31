import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ErrorHandler } from 'src/types/error';
import { User } from 'src/types/user';

/*
const firebaseConfig = {
  apiKey: 'AIzaSyBjg8eGZEyzAaknI5IQOpLp8SWE3vYsL6Y',
  authDomain: 'tic-tac-toe-800d2.firebaseapp.com',
  projectId: 'tic-tac-toe-800d2',
  storageBucket: 'tic-tac-toe-800d2.appspot.com',
  messagingSenderId: '208217474034',
  appId: '1:208217474034:web:09875510dfe806bdda216b',
  measurementId: 'G-3M1TYL9SK3',
};
*/

/*
const firebaseConfig = {
  apiKey: 'AIzaSyAFXtmsJg60pSFE7jwKd8JwAFwMr12EWBg',
  authDomain: 'tic-tac-toe-cibulka.firebaseapp.com',
  projectId: 'tic-tac-toe-cibulka',
  storageBucket: 'tic-tac-toe-cibulka.appspot.com',
  messagingSenderId: '529823109841',
  appId: '1:529823109841:web:22475a679883e9f850abf0',
  measurementId: 'G-2J27LJ1YQ0',
};
*/

const firebaseConfig = {
  apiKey: 'AIzaSyCeT_HqT-e8ihBBKIvdghLOtm_47Yqzuqg',
  authDomain: 'tictactoe-cz.firebaseapp.com',
  projectId: 'tictactoe-cz',
  storageBucket: 'tictactoe-cz.appspot.com',
  messagingSenderId: '142976204934',
  appId: '1:142976204934:web:f6ea023c2984bc45a01107',
  measurementId: 'G-VFKSP8BDZ6',
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore();

export function handleSignin(params: { onError: ErrorHandler; onSuccess?: () => void }): void {
  const googleAuthProvider = new GoogleAuthProvider();

  googleAuthProvider.addScope('profile');
  googleAuthProvider.addScope('email');

  signInWithPopup(auth, googleAuthProvider)
    .then(() => {
      if (params.onSuccess) params.onSuccess();
    })
    .catch(params.onError);
}

export const useAuth = (): [User | null | undefined, boolean, Error | undefined] => {
  return useAuthState(auth);
};

export function handleLogout(params: { onError: ErrorHandler; onSuccess?: () => void }) {
  auth
    .signOut()
    .then(() => {
      if (params.onSuccess) params.onSuccess();
    })
    .catch(params.onError);
}
