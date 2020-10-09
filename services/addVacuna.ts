import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

type addVacunaType = {
  petId: string;
  carnetSanitario?: {
    vacAntirrabica?: {
      fecha?: string;
      proximaDosis?: string;
    };
    otrasVacunas?: {
      nombre: string;
      fecha?: string;
      proximaDosis?: string;
    }[];
  };
};

const addVacuna = ({ petId, carnetSanitario }: addVacunaType): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    if (!petId) {
      reject(new Error('El petId es obligatorio.'));
    }

    if (!carnetSanitario) {
      reject(new Error('El nombre es obligatorio.'));
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

export default addVacuna;
