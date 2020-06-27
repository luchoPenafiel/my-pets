import styled from 'styled-components';
import theme from '../../constants/theme';

const Container = styled.div`
  width: 100%;
  padding: 0 25px;

  box-sizing: border-box;

  @media screen and (min-width: ${theme.breakpoints.mobileLG}) {
    width: 100%;
    max-width: 768px;

    margin-right: auto;
    margin-left: auto;
  }
`;

export default Container;
