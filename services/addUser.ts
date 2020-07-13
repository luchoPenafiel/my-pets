import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

type addUserType = {
  nombre: string;
  email: string;
  uid: string;
};

const addUser = ({ nombre, email, uid }: addUserType): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    if (!nombre) {
      reject(new Error('El nombre es obligatorio.'));
    }

    if (!email) {
      reject(new Error('El email es obligatorio.'));
    }

    if (!uid) {
      reject(new Error('El uid es obligatorio.'));
    }

    firebase
      .firestore()
      .collection('tutores')
      .add({
        nombre: nombre,
        email: email,
        uid: uid,
      })
      .then((ref) => {
        resolve({
          id: ref.id,
          nombre: nombre,
          email: email,
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export default addUser;
