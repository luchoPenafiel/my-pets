import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  img {
    display: block;
    width: 100%;
    height: 100%;

    object-fit: contain;
  }
`;

const Splashscreen = (): ReactElement => {
  return (
    <Wrapper>
      <picture>
        <source media="(max-width: 320px)" srcSet="/splashscreens/iphone5_splash.png" />
        <source media="(max-width: 375px)" srcSet="/splashscreens/iphonex_splash.png" />
        <source media="(max-width: 414px)" srcSet="/splashscreens/iphonexsmax_splash.png" />
        <source media="(max-width: 621px)" srcSet="/splashscreens/iphoneplus_splash.png" />
        <source media="(max-width: 768px)" srcSet="/splashscreens/ipad_splash.png" />
        <source media="(max-width: 834px)" srcSet="/splashscreens/ipadpro1_splash.png" />

        <img src="/splashscreens/ipadpro2_splash.png" alt="Vetapp" />
      </picture>
    </Wrapper>
  );
};

export default Splashscreen;
