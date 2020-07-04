type IPet = {
  id: string;
  nombre: string;
  profDeriva?: string;
  provincia?: string;
  resena?: {
    especie?: string;
    fechaCastracion?: string;
    fechaNacimiento?: string;
    pelaje?: string;
    raza?: string;
    sexo?: string;
    situacionReproductiva?: string;
  };
  tutor: string;
  veterinaria: string;
};

export default IPet;
