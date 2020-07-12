import firebaseConfig from '../constants/firebaseConfig';
import firebase from 'firebase/app';
require('firebase/auth');

const passwordResetEmail = (email: string): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    if (!email) {
      reject(new Error('El email de la veterinaria es requerido'));
    }

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default passwordResetEmail;
