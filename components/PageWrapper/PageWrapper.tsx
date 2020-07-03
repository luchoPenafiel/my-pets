import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Title1 } from '../Types/Titles/Titles';
import Container from '../Container/Container';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-top: 60px;

  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  z-index: 1;

  background: white;

  box-sizing: border-box;
`;

const ScrollView = styled.div`
  margin-top: 30px;
  margin-bottom: 5px;

  height: ${({ withFooter }): string => (withFooter ? 'calc(100vh - 240px)' : 'calc(100vh - 170px)')};
  max-height: 480px;

  overflow-y: scroll;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 70px;
`;

type PageWrapperType = {
  children: ReactElement;
  titleLine1: string;
  titleline2?: string;
  footer?: ReactElement;
};

const PageWrapper = ({ titleLine1, titleline2, children, footer }: PageWrapperType): ReactElement => {
  return (
    <Wrapper>
      <Container>
        <Title1>{titleLine1}</Title1>
        {titleline2 && <Title1>{titleline2}</Title1>}
      </Container>
      <ScrollView withFooter={footer ? true : false}>
        <div>{children}</div>
      </ScrollView>
      {footer && <Footer>{footer}</Footer>}
    </Wrapper>
  );
};

export default PageWrapper;
