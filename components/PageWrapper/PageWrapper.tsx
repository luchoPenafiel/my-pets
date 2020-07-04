import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 30px;

  width: 100%;

  background: white;

  box-sizing: border-box;
`;

type PageWrapperType = {
  children: ReactElement;
  titleLine1?: string;
  titleline2?: string;
  footer?: ReactElement;
};

const PageWrapper = ({ children }: PageWrapperType): ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

export default PageWrapper;
