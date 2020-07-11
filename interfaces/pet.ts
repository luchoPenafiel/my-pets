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
  carnetSanitario?: {
    vacAntirrabica?: {
      fecha?: string;
      proximaDosis?: string;
    };
    otrasVacunas?: [
      {
        nombre?: string;
        fecha?: string;
        proximaDosis?: string;
      },
    ];
  };
};

export default IPet;
