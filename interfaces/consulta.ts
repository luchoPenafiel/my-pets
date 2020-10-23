type IConsulta = {
  controlEn: string;
  controlID: string;
  diagnostico: string;
  doctor: string;
  fecha: string;
  id: string;
  motivo: string;
  tratamiento: {
    domicilio: string;
  };
  eog?: {
    peso?: string;
  };
};

export default IConsulta;
