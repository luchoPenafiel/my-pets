import React, { ReactElement } from 'react';
import styled from 'styled-components';
import theme from '../../constants/theme';

const Wrapper = styled.div`
  height: 200px;
  position: relative;
`;

const BackgroundImage = styled.img`
  width: 110%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  transform: translateX(-5%);

  object-fit: cover;
`;

const PetAvatar = styled.img`
  display: block;
  height: 200px;

  margin: 0 auto;

  position: relative;
  z-index: 2;
`;

type HeaderPetType = {
  especie: string;
};

const Image = ({ especie }: HeaderPetType): ReactElement => {
  switch (especie) {
    case 'Canino':
      return <PetAvatar src="/images/perro.svg" alt={especie} />;

    case 'Felino':
      return <PetAvatar src="/images/gato.svg" alt={especie} />;

    default:
      return <PetAvatar src="/images/monster.png" alt={especie} />;
  }
};

const HeaderPet = ({ especie }: HeaderPetType): ReactElement => {
  return (
    <Wrapper>
      <BackgroundImage src="/images/bg-pet.svg" alt="Fondo" />
      <Image especie={especie} />
    </Wrapper>
  );
};

export default HeaderPet;
