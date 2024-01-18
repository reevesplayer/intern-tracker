import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCwKp8Fnm5lvo2WzygBEwkHNuzxfIprDWY",
  authDomain: "intern-app-tracker-404dc.firebaseapp.com",
  databaseURL: "https://intern-app-tracker-404dc-default-rtdb.firebaseio.com",
  projectId: "intern-app-tracker-404dc",
  storageBucket: "intern-app-tracker-404dc.appspot.com",
  messagingSenderId: "4332158854",
  appId: "1:4332158854:web:5e0f447cd085d5e0d63607",
  measurementId: "G-612F92T5DB"
};
firebase.initializeApp(firebaseConfig);

const dataRef = firebase.database().ref('data');

export const fetchDataFromFirebase = (callback) => {
  dataRef.on('value', (snapshot) => {
    const dataFromFirebase = snapshot.val();

    // Convert the data to an array for easier mapping
    const dataArray = Object.entries(dataFromFirebase).map(([key, value]) => ({
      id: key,
      jobTitle: value.jobTitle,
      jobCompany: value.jobCompany,
      jobStatus: value.jobStatus,
    }));

    callback(dataArray);
  });
};

export const stopListeningToFirebase = () => {
  dataRef.off('value');
};