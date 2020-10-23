import firebaseConfig from '../constants/firebaseConfig';
import * as firebase from 'firebase';

type addConsultType = {
  petID: string;
  ownerData: { [key: string]: any };
  petName: string;
  consultData: { [key: string]: any };
  petResena: { [key: string]: any };
};

const addConsult = ({ petID, ownerData, petName, consultData, petResena }: addConsultType): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return new Promise((resolve, reject) => {
    if (!petID) {
      reject(new Error('El ID de la mascota es necesario.'));
    }

    if (!consultData) {
      reject(new Error('La información de la consulta es necesaria'));
    }

    const date = new Date(consultData.controlEn);
    const correctDate = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000).setHours(23, 59, 59, 0);

    if (consultData.controlEn) {
      const control = {
        tutor: ownerData.id,
        tutorData: ownerData,
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
            .add({ ...consultData, controlID: querySnapshot.id })
            .then(() => {
              if (!!consultData.eog.peso) {
                firebase
                  .firestore()
                  .collection('mascotas')
                  .doc(petID)
                  .update({
                    resena: {
                      ...petResena,
                      ultimoPeso: consultData.eog.peso,
                    },
                  })
                  .then(() => {
                    resolve(true);
                  })
                  .catch((error) => {
                    reject(new Error(error));
                  });
              } else {
                resolve(true);
              }
            })
            .catch((error) => {
              reject(new Error(error));
            });
          resolve(true);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else {
      firebase
        .firestore()
        .collection(`mascotas/${petID}/consultas`)
        .add(consultData)
        .then(() => {
          if (!!consultData.eog?.peso) {
            firebase
              .firestore()
              .collection('mascotas')
              .doc(petID)
              .update({
                resena: {
                  ...petResena,
                  ultimoPeso: consultData.eog.peso,
                },
              })
              .then(() => {
                resolve(true);
              })
              .catch((error) => {
                reject(new Error(error));
              });
          } else {
            resolve(true);
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    }
  });
};

export default addConsult;
