import styled from 'styled-components';
import theme from '../../../constants/theme';

const Title1 = styled.h1`
  margin: 0;

  color: ${theme.color.fonts};
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.mobile.h1};
  font-weight: ${theme.fontStyle.bold};
  line-height: 1;

  @media screen and (min-width: ${theme.breakpoints.mobileLG}) {
    font-size: ${theme.fontSize.desktop.h1};
  }
`;

export { Title1 };
