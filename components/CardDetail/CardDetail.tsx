import React, { ReactElement } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import theme from '../../constants/theme';
import { MdEdit } from 'react-icons/md';

const Wrapper = styled.div`
  padding: 10px 0;
  margin-bottom: 20px;

  border-top: 2px solid ${theme.color.primary};
`;

const Title = styled.p`
  display: flex;
  justify-content: ${({ withButton }): string => (withButton ? 'space-between' : 'flex-start')};
  align-items: center;

  margin: 0;
  margin-bottom: 10px;

  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.desktop.paragraphLG};
  font-weight: ${theme.fontStyle.semibold};

  color: ${theme.color.primary};

  a {
    color: ${theme.color.gray1};
  }
`;

type CardDetailType = {
  children: ReactElement;
  title?: string;
  pathButton?: string;
};

const CardDetail = ({ title, children, pathButton }: CardDetailType): ReactElement => {
  return (
    <Wrapper>
      {title && (
        <Title withButton={pathButton}>
          {title}{' '}
          {pathButton && (
            <Link href={pathButton} passHref>
              <a>
                <MdEdit />
              </a>
            </Link>
          )}
        </Title>
      )}
      {children}
    </Wrapper>
  );
};

export default CardDetail;
