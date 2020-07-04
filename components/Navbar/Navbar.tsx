import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { IoIosMenu, IoIosArrowBack } from 'react-icons/io';
import theme from '../../constants/theme';

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

const Button = styled.button`
  padding: 0;
  width: 30px;
  height: 30px;

  appearance: none;
  border: none;
  background: none;
`;

type NavbarType = {
  backButton?: boolean;
  bgColor?: string;
};

const Navbar = ({ backButton, bgColor = 'white' }: NavbarType): ReactElement => {
  return (
    <Wrapper bgColor={bgColor} backButton={backButton}>
      {backButton && (
        <Button>
          <IoIosArrowBack size={30} color={theme.color.gray1} />
        </Button>
      )}
      <Button>
        <IoIosMenu size={30} color={theme.color.gray1} />
      </Button>
    </Wrapper>
  );
};

export default Navbar;
