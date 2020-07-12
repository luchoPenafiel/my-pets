/* eslint-disable react/prop-types */
import React, { createContext, ReactElement, useState } from 'react';

export const PetContext = createContext({
  pet: null,
  changeStatePet: null,
});

type PetProviderType = {
  children: ReactElement;
};

export const PetProvider = ({ children }: PetProviderType): ReactElement => {
  const [pet, setPet] = useState({
    id: '',
    nombre: '',
    profDeriva: '',
    provincia: '',
    resena: {
      especie: '',
      fechaCastracion: '',
      fechaNacimiento: '',
      pelaje: '',
      raza: '',
      sexo: '',
      situacionReproductiva: '',
    },
    tutor: '',
    veterinaria: '',
  });

  const changeStatePet = (newState): void => {
    setPet({ ...newState });
  };

  return <PetContext.Provider value={{ pet, changeStatePet }}>{children}</PetContext.Provider>;
};

export default { PetContext, PetProvider };
