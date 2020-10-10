import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

const addVacunControl = (data): Promise<any> => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('vacunas')
      .add(data)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

type updateCarnetType = {
  petId: string;
  petName: string;
  tutorData: {
    email: string;
    nombre: string;
    id: string;
  };
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
  vacunControl?: {
    nombre?: string;
    fecha?: string;
    proximaDosis?: string;
  };
};

const addVacuna = ({ petId, petName, tutorData, carnetSanitario, vacunControl }: updateCarnetType): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise(async (resolve, reject) => {
    if (!petId) {
      reject(new Error('El petId es obligatorio.'));
    }

    if (!carnetSanitario) {
      reject(new Error('El carnet sanitario es obligatorio.'));
    }

    const vacunShareData = {
      mascotaId: petId,
      mascotaNombre: petName,
      tutorData: {
        email: tutorData.email,
        nombre: tutorData.nombre,
      },
      tutorId: tutorData.id,
    };

    if (vacunControl.nombre && vacunControl.proximaDosis) {
      const date = new Date(vacunControl.proximaDosis);
      const correctDate = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000).setHours(23, 59, 59, 0);

      await addVacunControl({
        ...vacunShareData,
        vacunaNombre: vacunControl.nombre,
        vacunaFecha: firebase.firestore.Timestamp.fromDate(new Date(correctDate)),
      });
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
