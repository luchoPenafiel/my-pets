import React, { ReactElement } from 'react';
import styled from 'styled-components';
import theme from '../../constants/theme';

const Wrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 60px;

  z-index: 2;

  background: ${theme.color.white};
  border-bottom: 10px solid ${theme.color.white};
  box-sizing: border-box;
`;

type StickyTitlesType = {
  children: ReactElement;
};

const StickyTitles = ({ children }: StickyTitlesType): ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

export default StickyTitles;
