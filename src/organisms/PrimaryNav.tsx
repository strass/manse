/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import DashboardIcon from '../icons/Dashboard';
import AccountBoxIcon from '../icons/AccountBox';
import { primaryWhite } from 'abc-react/dist/styles/colors/abbvie';
import { unstyleList } from 'abc-react/dist/styles/list';
import ExperimentIcon from '../icons/Experiment';
import { useLinkProps, useHistory } from 'react-navi';
import qs from 'query-string';

const PrimaryNavOrganism: FunctionComponent = () => {
  const { location } = useHistory();

  const url = qs.parseUrl(`${location.pathname}${location.search}${location.hash}`);
  const dashboardLink = useLinkProps({
    href: `/`,
  });
  const requestsLink = useLinkProps({
    href: `${url.url}?${qs.stringify({ ...url.query, filter: 'requests' })}${location.hash}`,
  });

  return (
    <ul
      css={[
        unstyleList,
        { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' },

        {
          li: {
            width: '100%',
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ':hover': {
              background: primaryWhite.alpha(0.25).hex(),
            },
            ':first-child': { marginBottom: 24 },
            ':last-child': { marginTop: 'auto' },
          },
        },
      ]}
    >
      <li {...dashboardLink as (Omit<typeof requestsLink, 'onClick'>)}>
        <DashboardIcon css={{ width: 32, height: 32, fill: primaryWhite.hex() }} />
      </li>
      <li {...requestsLink as (Omit<typeof requestsLink, 'onClick'>)}>
        <ExperimentIcon css={{ width: 32, height: 32, fill: primaryWhite.hex() }} />
      </li>
      <li>
        <AccountBoxIcon css={{ width: 32, height: 32, fill: primaryWhite.hex() }} />
      </li>
    </ul>
  );
};

export default PrimaryNavOrganism;
