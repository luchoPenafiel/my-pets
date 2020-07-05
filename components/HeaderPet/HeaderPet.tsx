import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 180px;
  width: 100%;

  overflow: hidden;
  position: sticky;
  top: 0;

  background-image: url('/images/bg-pet.svg');
  background-repeat: none;
  background-position: center;
  background-size: cover;
`;

const PetAvatar = styled.img`
  display: block;
  height: 170px;

  margin: 0 auto;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
      <Image especie={especie} />
    </Wrapper>
  );
};

export default HeaderPet;
