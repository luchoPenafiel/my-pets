import React, { ReactElement } from 'react';
import LinkRouter from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';
import theme from '../../constants/theme';

const Wrapper = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;
  margin-bottom: 20px;

  border-top: 2px solid ${theme.color.primary};

  cursor: pointer;
`;

const Title = styled.p`
  margin: 0;
  margin-bottom: 10px;

  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.desktop.paragraphLG};
  font-weight: ${theme.fontStyle.semibold};

  color: ${theme.color.primary};
`;

type CardDetailActionableType = {
  children: ReactElement;
  title?: string;
  path: string;
};

const CardDetailActionable = ({ title, path, children }: CardDetailActionableType): ReactElement => {
  return (
    <LinkRouter href={path}>
      <Wrapper>
        <div>
          {title && <Title>{title}</Title>}
          {children}
        </div>
        <IoIosArrowForward color={theme.color.primary} size={30} />
      </Wrapper>
    </LinkRouter>
  );
};

export default CardDetailActionable;
