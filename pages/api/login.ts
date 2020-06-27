import firebaseConfig from '../../constants/firebaseConfig';
import firebase from 'firebase/app';
require('firebase/auth');

export default (req, res) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const { email, password } = req.query;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      firebase
        .firestore()
        .collection('tutores')
        .where('uid', '==', user.user.uid)
        .get()
        .then(async (querySnapshot) => {
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
            return res.status(400).json({ message: 'Usuario o contraseña incorrecta.' });
          } else {
            return res.json(tutor[0]);
          }
        })
        .catch((err) => {
          return res.status(400).json({ error: err, message: 'Usuario o contraseña incorrecta.' });
        });
    })
    .catch((err) => {
      return res.status(400).json({ error: err, message: 'Usuario o contraseña incorrecta' });
    });
};
