import firebaseConfig from '../constants/firebaseConfig';
import firebase from 'firebase/app';
require('firebase/auth');

const loginService = async (email: string, password: string): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        firebase
          .firestore()
          .collection('tutores')
          .where('uid', '==', user.user.uid)
          .get()
          .then((querySnapshot) => {
            const tutor = querySnapshot.docs.map((d) => {
              return {
                id: d.id,
                nombre: d.data().nombre,
                email: d.data().email,
                celular: d.data().celular,
                direccion: d.data().direccion,
                telFijo: d.data().telFijo,
                veterinaria: d.data().veterinaria,
              };
            });

            if (!tutor.length) {
              reject({ tutor: tutor, message: 'Usuario o contraseña incorrecta.' });
            } else {
              resolve(tutor[0]);
            }
          })
          .catch((err) => {
            reject({ error: err, message: 'Usuario o contraseña incorrecta.' });
          });
      })
      .catch((err) => {
        reject({ error: err, message: 'Usuario o contraseña incorrecta' });
      });
  });
};

export default loginService;
