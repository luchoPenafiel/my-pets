import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Button as MUIButton } from '@material-ui/core';
import theme from '../../constants/theme';

const Wrapper = styled.div`
  & > button,
  & > a {
    padding: 6px 24px;
    min-width: 200px;

    font-size: 20px;

    border-radius: 26px;
    span {
      text-transform: none;

      font-weight: ${theme.fontStyle.semibold};
    }
  }
`;

type ButtonType = {
  children: ReactElement;
  onClick?: any;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  href?: string;
};
const Button = ({
  children,
  onClick,
  variant = 'contained',
  color = 'primary',
  type = 'button',
  href,
}: ButtonType): ReactElement => {
  return (
    <Wrapper>
      <MUIButton type={type} variant={variant} color={color} onClick={onClick} href={href}>
        {children}
      </MUIButton>
    </Wrapper>
  );
};

export default Button;
