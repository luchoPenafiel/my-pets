import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

type addPetType = {
  nombre: string;
  resena: {
    especie: 'Canino' | 'Felino' | 'Otros';
    raza: string;
    pelaje?: string;
    sexo?: string;
    fechaNacimiento?: string;
  };
  tutor: string;
};

const addPet = ({ nombre, resena, tutor }: addPetType): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    if (!nombre) {
      reject(new Error('El nombre es obligatorio.'));
    }

    if (!tutor) {
      reject(new Error('El ID del tutor es obligatorio.'));
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
      .add({
        nombre: nombre,
        profDeriva: '',
        provincia: '',
        resena: {
          fechaCastracion: '',
          situacionReproductiva: '',
          ...resena,
        },
        carnetSanitario: {
          otrasVacunas: [],
          vacAntirrabica: {},
        },
        tutor: tutor,
        veterinaria: '',
      })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export default addPet;
