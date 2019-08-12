/** @jsx jsx */
import { jsx } from '@emotion/core';
// import styled from '@emotion/styled/macro'
// import css from '@emotion/css/macro'
import { FunctionComponent, ReactNode } from 'react';
import { ViewPort, Left, Fill } from 'react-spaces';
import { primaryBlue, primaryWhite, neutral10 } from 'abc-react/dist/styles/colors/abbvie';

const MainLayout: FunctionComponent<{ nav: ReactNode }> = ({ nav, children }) => {
  return (
    <ViewPort css={{ background: neutral10.hex() }}>
      <Left as="nav" size={50} css={{ background: primaryBlue.hex(), color: primaryWhite.hex() }}>
        {nav}
      </Left>
      <Fill as="main" css={{ display: 'flex', flexDirection: 'column' }} scrollable={false}>
        {children}
      </Fill>
    </ViewPort>
  );
};

export default MainLayout;
