import React, { ReactElement } from 'react';
import styled from 'styled-components';
import theme from '../../constants/theme';
import { IoIosArrowForward } from 'react-icons/io';
import { Canino, Felino } from '../Icons';
import { FaOptinMonster } from 'react-icons/fa';

const Subtitle = styled.p`
  width: 90%;

  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.mobile.h5};
  text-overflow: ellipsis;

  overflow: hidden;
  white-space: nowrap;
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

const Wrapper = styled.button`
  display: block;

  width: 100%;

  padding: 50px 15px 20px 15px;
  margin-bottom: 10px;

  position: relative;

  text-decoration: none;
  text-align: left;
  color: ${theme.color.fonts};

  border-radius: 15px;
  background: ${theme.color.gray2};
  border: none;
  appearance: none;
  outline: none;

  cursor: pointer;

  transition: all 0.1s linear;

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

  ${Subtitle} {
    margin-bottom: 5px;
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
  icon?: string;
  onClick: any;
};

const CardActionable = ({ title, subtitle, icon, onClick }: CardActionableType): ReactElement => {
  return (
    <Wrapper onClick={onClick}>
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
  );
};

export default CardActionable;
