import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 30px;

  width: 100%;
  height: 100vh;

  overflow: scroll;
  position: fixed;
  top: 0;
  z-index: 1;

  background: white;

  box-sizing: border-box;
`;

const ScrollView = styled.div``;

type PageWrapperType = {
  children: ReactElement;
};

const PageWrapper = ({ children }: PageWrapperType): ReactElement => {
  return (
    <Wrapper>
      <ScrollView>{children}</ScrollView>
    </Wrapper>
  );
};

export default PageWrapper;
