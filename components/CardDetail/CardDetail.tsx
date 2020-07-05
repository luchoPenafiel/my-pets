import React, { ReactElement } from 'react';
import styled from 'styled-components';
import theme from '../../constants/theme';

const Wrapper = styled.div`
  padding: 10px 0;
  margin-bottom: 20px;

  border-top: 2px solid ${theme.color.primary};
`;

const Title = styled.p`
  margin: 0;
  margin-bottom: 10px;

  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.desktop.paragraphLG};
  font-weight: ${theme.fontStyle.semibold};

  color: ${theme.color.primary};
`;

type CardDetailType = {
  children: ReactElement;
  title?: string;
};

const CardDetail = ({ title, children }: CardDetailType): ReactElement => {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {children}
    </Wrapper>
  );
};

export default CardDetail;
