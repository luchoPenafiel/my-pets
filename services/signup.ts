import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

type signupType = {
  email: string;
  password: string;
};

const signup = ({ email, password }: signupType): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    if (!email) {
      reject(new Error('El email es obligatorio.'));
    }

    if (!password) {
      reject(new Error('La contraseña es obligatoria.'));
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response.user.uid);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default signup;
