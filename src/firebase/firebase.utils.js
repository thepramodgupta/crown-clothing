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

firebase.initializeApp(config);

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();  
        console.log(newDocRef);
        batch.set(newDocRef,obj);
    });

    return await batch.commit();
};

export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(
        doc => {
            const {title, items} = doc.data();

            return {
                routeName: encodeURI(title.toLowerCase()),
                id: doc.id,
                title,
                items
            }
        }
    );

   // console.log(transformedCollection);
   return transformedCollection.reduce((accumulator, collection) => {
       accumulator[collection.title.toLowerCase()] = collection
       return accumulator;
   },{})
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject)=> {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        },reject)
    });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;