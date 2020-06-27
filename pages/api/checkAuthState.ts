import firebaseConfig from '../../constants/firebaseConfig';
import firebase from 'firebase/app';
require('firebase/auth');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (req, res) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const user = firebase.auth().currentUser;

  if (user) {
    res.json({
      ok: true,
      auth: true,
      user,
    });
  } else {
    res.json({
      ok: true,
      auth: false,
    });
  }
};
