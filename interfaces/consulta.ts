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
};

export default IConsulta;
