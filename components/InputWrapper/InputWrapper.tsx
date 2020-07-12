import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 30px;
`;
type InputWrapperType = {
  children: ReactElement;
};

const InputWrapper = ({ children }: InputWrapperType): ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

export default InputWrapper;
