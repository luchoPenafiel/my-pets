import React, { ReactElement } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import theme from '../../constants/theme';

const Wrapper = styled.a`
  display: block;

  padding: 40px 15px 20px 15px;
  margin-bottom: 10px;

  text-decoration: none;
  color: ${theme.color.fonts};

  border-radius: 15px;
  background: ${theme.color.gray3};

  &:active,
  &:hover {
    color: ${theme.color.white};
    background: ${theme.color.primary};
  }

  p {
    margin: 0;
  }
`;

const Subtitle = styled.p`
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.mobile.h5};
`;

const Title = styled.p`
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.mobile.h3};
  font-weight: ${theme.fontStyle.bold};
`;

type CardActionableType = {
  title: string;
  subtitle: string;
  href: string;
};

const CardActionable = ({ title, subtitle, href }: CardActionableType): ReactElement => {
  return (
    <Link href={href} passHref>
      <Wrapper>
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
      </Wrapper>
    </Link>
  );
};

export default CardActionable;
