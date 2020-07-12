import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

const getUserData = (tutorId: string): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('tutores')
      .doc(tutorId)
      .get()
      .then((querySnapshot) => {
        resolve({ id: querySnapshot.id, ...querySnapshot.data() });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getUserData;
