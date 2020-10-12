import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

const getVeterinarias = (): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('veterinarias')
      .where('status', '==', 'active')
      .get()
      .then((querySnapshot) => {
        const veterinarias = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        resolve(veterinarias);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getVeterinarias;
