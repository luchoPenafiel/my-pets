import styled from 'styled-components';
import theme from '../../constants/theme';

const ErrorText = styled.p`
  color: ${theme.color.error};
  text-align: center;
  font-family: ${theme.fontFamily.primary};
  font-size: 18px;
  font-weight: ${theme.fontStyle.regular};
`;

export default ErrorText;
