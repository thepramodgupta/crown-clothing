import firebase from 'firebase/app';
import 'firebase/firebase-firestore'
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBhR0yNYz9lncmGDzB4TALfAhdMelodozI",
    authDomain: "crown-db-f3c00.firebaseapp.com",
    projectId: "crown-db-f3c00",
    storageBucket: "crown-db-f3c00.appspot.com",
    messagingSenderId: "911013850912",
    appId: "1:911013850912:web:5e82ea44f4487df31e3145",
    measurementId: "G-TRGWHTHXV3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth)  return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;