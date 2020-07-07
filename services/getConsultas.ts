import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

const getConsultas = (petId: string): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection(`mascotas/${petId}/consultas`)
      .orderBy('fecha', 'desc')
      .get()
      .then((querySnapshot) => {
        const consultas = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        resolve(consultas);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getConsultas;
