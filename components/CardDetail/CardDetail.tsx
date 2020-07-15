import React, { ReactElement } from 'react';
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

  button {
    color: ${theme.color.gray1};

    border: none;
    background: none;
    box-shadow: none;
    appearance: none;

    outline: none;
  }
`;

type CardDetailType = {
  children: ReactElement;
  title?: string;
  onClick?: any;
};

const CardDetail = ({ title, children, onClick }: CardDetailType): ReactElement => {
  return (
    <Wrapper>
      {title && (
        <Title withButton={onClick}>
          {title}{' '}
          {onClick && (
            <button onClick={onClick}>
              <MdEdit />
            </button>
          )}
        </Title>
      )}
      {children}
    </Wrapper>
  );
};

export default CardDetail;
