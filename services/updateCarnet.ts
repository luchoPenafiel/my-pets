import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

type updateCarnetType = {
  petId: string;
  carnetSanitario: {
    vacAntirrabica?: {
      fecha?: string;
      proximaDosis?: string;
    };
    otrasVacunas?: {
      nombre?: string;
      fecha?: string;
      proximaDosis?: string;
    }[];
  };
};

const updateCarnet = ({ petId, carnetSanitario }: updateCarnetType): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    if (!petId) {
      reject(new Error('El petId es obligatorio.'));
    }

    if (!carnetSanitario) {
      reject(new Error('El carnet sanitario es obligatorio.'));
    }

    firebase
      .firestore()
      .collection('mascotas')
      .doc(petId)
      .update({ carnetSanitario })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export default updateCarnet;
