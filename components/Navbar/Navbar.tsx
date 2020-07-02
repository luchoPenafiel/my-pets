import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0 25px;

  position: fixed;
  top: 0;
  left: 0;

  background: white;

  box-sizing: border-box;
`;

const Navbar = (): ReactElement => {
  return (
    <Wrapper>
      <button>back</button>
      <button>menu</button>
    </Wrapper>
  );
};

export default Navbar;
