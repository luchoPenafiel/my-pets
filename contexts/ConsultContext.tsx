/* eslint-disable react/prop-types */
import React, { createContext, ReactElement, useState } from 'react';

export const ConsultContext = createContext({
  consult: null,
  changeStateConsult: null,
});

type ConsultProviderType = {
  children: ReactElement;
};

export const ConsultProvider = ({ children }: ConsultProviderType): ReactElement => {
  const [consult, setConsult] = useState({
    controlEn: '',
    controlID: '',
    diagnostico: '',
    doctor: '',
    fecha: '',
    id: '',
    motivo: '',
    tratamiento: {
      domicilio: '',
    },
  });

  const changeStateConsult = (newState): void => {
    setConsult({ ...consult, ...newState });
  };

  return <ConsultContext.Provider value={{ consult, changeStateConsult }}>{children}</ConsultContext.Provider>;
};

export default { ConsultContext, ConsultProvider };
