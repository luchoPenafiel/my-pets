import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { IoIosAddCircle } from 'react-icons/io';
import theme from '../../constants/theme';

const Button = styled.button`
  display: flex;
  align-items: center;

  padding: 0;

  font-family: ${theme.fontFamily.primary};
  font-weight: ${theme.fontStyle.regular};

  appearance: none;
  background: none;
  border: none;

  cursor: pointer;

  span {
    display: block;

    margin-left: 5px;
  }
`;

type AddButtonType = {
  text: string;
  onTap?: any;
};

const AddButton = ({ text, onTap }: AddButtonType): ReactElement => {
  return (
    <Button onClick={onTap}>
      <IoIosAddCircle size={32} color={theme.color.secondary} /> <span>{text}</span>
    </Button>
  );
};

export default AddButton;
