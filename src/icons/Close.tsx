import React, { FunctionComponent, SVGProps } from 'react';

const CloseIcon: FunctionComponent<SVGProps<SVGSVGElement>> = props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
  </svg>
);

export default CloseIcon;
