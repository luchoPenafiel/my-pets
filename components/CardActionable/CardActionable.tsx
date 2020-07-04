import React, { ReactElement } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import theme from '../../constants/theme';
import { IoIosArrowForward } from 'react-icons/io';
import { Canino, Felino } from '../Icons';
import { FaOptinMonster } from 'react-icons/fa';

const Subtitle = styled.p`
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.mobile.h5};
`;

const Title = styled.p`
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.mobile.h3};
  font-weight: ${theme.fontStyle.bold};
`;

const Chevron = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
`;

const IconWraper = styled.div`
  position: absolute;
  right: 15px;
  bottom: 10px;
`;

const Wrapper = styled.a`
  display: block;

  padding: 40px 15px 20px 15px;
  margin-bottom: 10px;

  position: relative;

  text-decoration: none;
  color: ${theme.color.fonts};

  border-radius: 15px;
  background: ${theme.color.gray2};

  &:active,
  &:focus {
    color: ${theme.color.white};
    background: ${theme.color.primary};

    svg {
      fill: ${theme.color.white};
    }
  }

  p {
    margin: 0;
  }
`;

type IconType = {
  icontype: string;
};

const Icon = ({ icontype }: IconType): ReactElement => {
  switch (icontype) {
    case 'Felino':
      return <Felino size={60} />;

    case 'Canino':
      return <Canino size={60} />;

    default:
      return <FaOptinMonster size={60} color={theme.color.gray3} />;
  }
};

type CardActionableType = {
  title: string;
  subtitle: string;
  href: string;
  icon?: string;
};

const CardActionable = ({ title, subtitle, href, icon }: CardActionableType): ReactElement => {
  return (
    <Link href={href} passHref>
      <Wrapper>
        <Chevron>
          <IoIosArrowForward size={22} color={theme.color.gray1} />
        </Chevron>
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
        {icon && (
          <IconWraper>
            <Icon icontype={icon} />
          </IconWraper>
        )}
      </Wrapper>
    </Link>
  );
};

export default CardActionable;
