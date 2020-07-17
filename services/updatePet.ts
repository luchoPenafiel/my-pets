import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

type updatePetType = {
  petId: string;
  nombre: string;
  resena: {
    especie: 'Canino' | 'Felino' | 'Otros';
    raza: string;
    pelaje?: string;
    sexo?: string;
    fechaNacimiento?: string;
  };
};

const updatePet = ({ petId, nombre, resena }: updatePetType): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    if (!petId) {
      reject(new Error('El petId es obligatorio.'));
    }

    if (!nombre) {
      reject(new Error('El nombre es obligatorio.'));
    }

    if (!resena.especie) {
      reject(new Error('La especie es obligatoria.'));
    }

    if (!resena.raza) {
      reject(new Error('La raza es obligatoria.'));
    }

    firebase
      .firestore()
      .collection('mascotas')
      .doc(petId)
      .update({
        nombre: nombre,
        resena: {
          ...resena,
        },
      })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export default updatePet;
