import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

const getPet = (ownerId: string): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('mascotas')
      .where('tutor', '==', ownerId)
      .get()
      .then((querySnapshot) => {
        const mascotas = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        resolve(mascotas);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getPet;
