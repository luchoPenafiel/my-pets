import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ backButton }): string => (backButton ? 'space-between' : 'flex-end')};
  align-items: center;

  width: 100%;
  height: 40px;
  padding: 0 25px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  background: ${({ bgColor }): string => bgColor};

  box-sizing: border-box;
`;

type NavbarType = {
  backButton?: boolean;
  bgColor?: string;
};

const Navbar = ({ backButton, bgColor = 'white' }: NavbarType): ReactElement => {
  return (
    <Wrapper bgColor={bgColor} backButton={backButton}>
      {backButton && <button>back</button>}
      <button>menu</button>
    </Wrapper>
  );
};

export default Navbar;
