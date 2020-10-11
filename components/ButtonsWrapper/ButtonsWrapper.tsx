import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    margin-bottom: 15px;
  }
`;

type ButtonsWrapperType = {
  children: ReactElement[];
};

const ButtonsWrapper = ({ children }: ButtonsWrapperType): ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

export default ButtonsWrapper;
