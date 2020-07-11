import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

const getVeterinaria = (vetId: string): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('veterinarias')
      .doc(vetId)
      .get()
      .then((querySnapshot) => {
        resolve(querySnapshot.data());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getVeterinaria;
