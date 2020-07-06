import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

const Consultas = (): ReactElement => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
};

export default Consultas;
