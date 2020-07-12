import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Title1 } from '../Types/Titles/Titles';
import theme from '../../constants/theme';

const Wrapper = styled.div`
  margin-top: 100px;

  text-align: center;
`;

const Title = styled(Title1)`
  color: ${theme.color.primary};
`;

type EmptyStateType = {
  children: ReactElement;
  title?: string;
};

const EmptyState = ({ children, title = 'Oops' }: EmptyStateType): ReactElement => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};

export default EmptyState;
