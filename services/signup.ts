import firebaseConfig from '../constants/firebaseConfig';
import firebase from 'firebase/app';
require('firebase/auth');

type signupType = {
  nombre: string;
  email: string;
  password: string;
};

const signup = ({ nombre, email, password }: signupType): Promise<any> => {
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

    if (!password) {
      reject(new Error('La contraseña es obligatoria.'));
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response.user.uid) {
          firebase
            .firestore()
            .collection('tutores')
            .add({
              celular: '',
              direccion: '',
              telFijo: '',
              veterinaria: '',
              nombre,
              email,
              uid: response.user.uid,
            })
            .then((ref) => {
              // TODO: enviar un correo al tutor de confirmación de alta
              resolve({
                celular: '',
                direccion: '',
                telFijo: '',
                veterinaria: '',
                nombre,
                email,
                id: ref.id,
              });
            })
            .catch((error) => {
              reject(new Error(error));
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default signup;
