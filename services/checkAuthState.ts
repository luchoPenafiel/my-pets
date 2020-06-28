import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const checkAuthState = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    if (user) {
      resolve({
        ok: true,
        auth: true,
        user,
      });
    } else {
      reject({
        ok: true,
        auth: false,
      });
    }
  });
};

export default checkAuthState;
