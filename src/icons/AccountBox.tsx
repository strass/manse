import React, { FunctionComponent, SVGProps } from 'react';

const AccountBoxIcon: FunctionComponent<SVGProps<SVGSVGElement>> = props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M3 5v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5a2 2 0 00-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" />
  </svg>
);

export default AccountBoxIcon;
