import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

type updateConsultType = {
  petID: string;
  consultID: string;
  ownerID: string;
  tutorData: { [key: string]: any };
  petName: string;
  consultData: { [key: string]: any };
};

const updateConsult = ({
  petID,
  consultID,
  ownerID,
  petName,
  consultData,
  tutorData,
}: updateConsultType): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    if (!petID || !consultID) {
      reject(new Error('El ID de la mascota y de la consulta son necesarios.'));
    }

    if (!consultData) {
      reject(new Error('La infomación a actualizar de la consulta es necesaria.'));
    }

    const date = new Date(consultData.controlEn);
    const correctDate = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000).setHours(23, 59, 59, 0);

    // Update control data and then update consult data
    if (consultData.controlID && consultData.controlID !== '' && consultData.controlEn) {
      const control = {
        tutor: ownerID,
        tutorData: tutorData,
        nombreMascota: petName,
        mascotaId: petID,
        fecha: firebase.firestore.Timestamp.fromDate(new Date(correctDate)),
        motivo: consultData.motivo,
      };

      firebase
        .firestore()
        .collection('controles')
        .doc(consultData.controlID)
        .update(control)
        .then(() => {
          firebase
            .firestore()
            .collection(`mascotas/${petID}/consultas`)
            .doc(consultID)
            .update(consultData)
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(new Error(error));
            });
        })
        .catch((error) => {
          reject(new Error(error));
        });
    }

    // Delete control and then update consult data
    if (consultData.controlID && (!consultData.controlEn || consultData.controlEn === '')) {
      firebase
        .firestore()
        .collection('controles')
        .doc(consultData.controlID)
        .delete()
        .then(() => {
          firebase
            .firestore()
            .collection(`mascotas/${petID}/consultas`)
            .doc(consultID)
            .update({ ...consultData, controlID: '' })
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(new Error(error));
            });
        })
        .catch((error) => {
          reject(new Error(error));
        });
    }

    // Add new control and then update consult data
    if (!consultData.controlID && consultData.controlEn) {
      const control = {
        tutor: ownerID,
        tutorData: tutorData,
        nombreMascota: petName,
        mascotaId: petID,
        fecha: firebase.firestore.Timestamp.fromDate(new Date(correctDate)),
        motivo: consultData.motivo,
      };

      firebase
        .firestore()
        .collection('controles')
        .add(control)
        .then((querySnapshot) => {
          firebase
            .firestore()
            .collection(`mascotas/${petID}/consultas`)
            .doc(consultID)
            .update({ ...consultData, controlID: querySnapshot.id })
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(new Error(error));
            });
        })
        .catch((error) => {
          reject(new Error(error));
        });
    }

    // Just update consult data
    if (!consultData.controlID && !consultData.controlEn) {
      firebase
        .firestore()
        .collection(`mascotas/${petID}/consultas`)
        .doc(consultID)
        .update(consultData)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    }
  });
};

export default updateConsult;
