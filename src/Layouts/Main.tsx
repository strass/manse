import React, { FunctionComponent, ReactNode } from 'react';
import { ViewPort, Left, Fill } from 'react-spaces';

const MainLayout: FunctionComponent<{ nav: ReactNode }> = ({ nav, children }) => {
  return (
    <ViewPort>
      <Left as="nav" size={50}>
        {nav}
      </Left>
      <Fill as="main">{children}</Fill>
    </ViewPort>
  );
};

export default MainLayout;
