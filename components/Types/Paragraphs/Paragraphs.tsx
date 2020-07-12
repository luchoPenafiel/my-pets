import styled from 'styled-components';
import theme from '../../../constants/theme';

const ParagraphSM = styled.p`
  margin: 10px 0;

  color: ${theme.color.fonts};
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.desktop.paragraphSM};
  line-height: 1.4;
`;

const ParagraphMD = styled.p`
  margin: 10px 0;

  color: ${theme.color.fonts};
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.desktop.paragraphMD};
  line-height: 1.4;
`;

export { ParagraphMD, ParagraphSM };
