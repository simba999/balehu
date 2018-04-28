import firebase from '@firebase/app';
import '@firebase/firestore';

const config = {
    apiKey: "AIzaSyAnd-jNVlSz5EmycS2yKtworWwUy7y5Ajk",
    authDomain: "https://crypto-tech.firebaseapp.com/",
    projectId: "crypto-tech"
};

firebase.initializeApp(config);

const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);

export default firebase;
export const db = firebase.firestore();
