import React, { ReactElement } from 'react';
import styled from 'styled-components';
import theme from '../../constants/theme';

const Subtitle = styled.p`
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.mobile.h5};
`;

const Title = styled.p`
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.mobile.h3};
  font-weight: ${theme.fontStyle.bold};
`;

const Wrapper = styled.div`
  display: block;

  width: 100%;

  padding: 50px 15px 20px 15px;
  margin-top: -60px;
  margin-bottom: 40px;

  position: relative;

  text-decoration: none;
  text-align: left;
  color: ${theme.color.fonts};

  box-sizing: border-box;
  position: relative;
  z-index: 3;

  border-radius: 15px;
  background: ${theme.color.gray2};
  border: none;
  appearance: none;
  outline: none;

  transition: all 0.1s linear;

  p {
    margin: 0;
  }
`;

type CardTitleType = {
  title: string;
  subtitle: string;
};

const CardTitle = ({ title, subtitle }: CardTitleType): ReactElement => {
  return (
    <Wrapper>
      <Subtitle>{subtitle}</Subtitle>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default CardTitle;
