import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type CenterButtonType = {
  children: ReactElement;
};

const CenterButton = ({ children }: CenterButtonType): ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

export default CenterButton;
