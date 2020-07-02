import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 60px;
`;

type PageWrapperType = {
  children: ReactElement;
};

const PageWrapper = ({ children }: PageWrapperType): ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

export default PageWrapper;
