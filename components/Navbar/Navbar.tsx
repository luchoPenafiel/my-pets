import React, { ReactElement, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { IoIosMenu, IoIosArrowBack, IoIosClose } from 'react-icons/io';
import { Logo } from '../Icons';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import theme from '../../constants/theme';
import Router from 'next/router';

const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ backButton }): string => (backButton ? 'space-between' : 'flex-end')};
  align-items: center;

  width: 100%;
  height: 60px;
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
  outline: none;

  cursor: pointer;
`;

const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  height: 100%;
  width: 80vw;
  max-width: 500px;
  padding: 20px;
  padding-bottom: 40px;

  background: ${theme.color.primary};
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 100%;
`;

const DrawerNavigation = styled.nav`
  width: 100%;

  a {
    display: block;

    padding: 50px 0;

    color: ${theme.color.white};
    font-family: ${theme.fontFamily.primary};
    font-weight: ${theme.fontStyle.semibold};
    font-size: ${theme.fontSize.mobile.h2};
    text-decoration: none;
    text-align: right;

    border-bottom: 1px solid ${theme.color.white};

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

type NavbarType = {
  bgColor?: string;
  color?: string;
  previusScreen?: string;
  withDrawer?: boolean;
};

const Navbar = ({ bgColor = 'white', color, previusScreen, withDrawer = true }: NavbarType): ReactElement => {
  const [isOpenDrawe, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(open);
  };

  const handleBackButton = () => {
    Router.replace(`/${previusScreen}`);
  };

  return (
    <>
      <Wrapper bgColor={bgColor} backButton={previusScreen}>
        {previusScreen && (
          <Button onClick={handleBackButton}>
            <IoIosArrowBack size={30} color={color ? color : theme.color.gray1} />
          </Button>
        )}
        {withDrawer && (
          <Button onClick={toggleDrawer(true)}>
            <IoIosMenu size={30} color={color ? color : theme.color.gray1} />
          </Button>
        )}
      </Wrapper>
      {withDrawer && (
        <SwipeableDrawer anchor="right" open={isOpenDrawe} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          <DrawerWrapper>
            <DrawerContent>
              <Button onClick={toggleDrawer(false)}>
                <IoIosClose color={theme.color.white} size={40} />
              </Button>
              <DrawerNavigation>
                <Link href="/">
                  <a>Mis mascotas</a>
                </Link>
                <Link href="/mi-veterinaria">
                  <a>Mis veterinaria</a>
                </Link>
                <Link href="/ajustes">
                  <a>Ajustes</a>
                </Link>
              </DrawerNavigation>
            </DrawerContent>
            <Logo size={80} color={theme.color.white} />
          </DrawerWrapper>
        </SwipeableDrawer>
      )}
    </>
  );
};

export default Navbar;
