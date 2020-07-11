type IVet = {
  nombre: string;
  direccion?: string;
  telefono?: string;
  ubicacion?: {
    latitude: number;
    longitude: number;
  };
};

export default IVet;
