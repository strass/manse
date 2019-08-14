/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core';
import { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { unstyleList } from 'abc-react/dist/styles/list';
import { primaryWhite, primaryBlue, neutral40, neutral70 } from 'abc-react/dist/styles/colors/abbvie';
import { Top, Fill, Left } from 'react-spaces';
import { useLinkProps, useHistory, useActive, useNavigation } from 'react-navi';
import qs from 'query-string';
import FilterOrganism from './Filter';
import { UseLinkPropsOptions } from 'react-navi/dist/types/Link';
import { routes } from '..';
import { resolve } from 'navi';
import RefreshIcon from '../icons/Refresh';
import CloseIcon from '../icons/Close';
import { without } from 'lodash'

// TODO: Move this
const spin = keyframes(`{
  from {
      transform:rotate(0deg);
  }
  to {
      transform:rotate(360deg);
  }
}`);
const TAB_NAVBAR_HEIGHT = 32;

const Tab: FunctionComponent<UseLinkPropsOptions & { removeTab: () => void }> = ({ children, removeTab, href, ...rest }) => {
  const [title, setTitle] = useState<string | undefined>();
  const link = useLinkProps({ href, ...rest });
  const active = useActive(href, { exact: true });

  useEffect(() => {
    console.log(`Resolving title for ${typeof href === 'string' ? href : href.pathname}`);
    resolve({ url: href, routes }).then(r => {
      console.log(`Resolved ${typeof href === 'string' ? href : href.pathname}`);
      setTitle(r.title);
    });
  }, [href]);

  return (
    <li
      {...link as (Omit<typeof link, 'onClick'>)}
      css={[
        {
          border: '1px solid',
          borderColor: neutral70.hex(),
          borderBottomColor: 'transparent',
          borderBottomWidth: 0,
          padding: 4,
          margin: 2,
          marginBottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignIitems: 'center',
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          background: neutral40.hex(),
        },
        active && { fontWeight: 'bold', background: primaryWhite.hex() ,
        position:'relative',
        // This element covers up the grey borderBottom of the nav tab bar
        '::after': {
          position: 'absolute',
          left:0,
          right:0,
          bottom:-1,
          height: 1,
          content: '""',
          background: primaryWhite.hex(),
        }},
      ]}
    >
      <span>{title || <RefreshIcon css={{ animation: `${spin} 1s infinite linear` }} />}</span>
      <button css={{ border: 'none', margin: 0, padding: 0, appearance: 'none' , background:'transparent'}} disabled={link.disabled} onClick={e => { e.stopPropagation(); removeTab(); }}>
        <CloseIcon height={16} width={16} />
      </button>
    </li>
  );
};

// TODO: look into using routes to have all the URLs mounted
// resolve({ urls: tabs.map(t => t.href), routes })
const TabManagerOrganism: FunctionComponent = ({ children }) => {
  const { location, listen } = useHistory();
  const { navigate } = useNavigation()

  const { filter } = qs.parse(location.search);

  const [tabs, setTabs] = useState<UseLinkPropsOptions[]>([
    // On app load, start with a tab corresponding to the current location
    { href: location },
  ]);

  useEffect(() => {
    console.log('Creating History Listener');
    return listen(newLoc => {
      console.log('detected history change:', newLoc);
      if (
        !tabs.find(t => {
          const tabPath = typeof t.href === 'string' ? t.href : t.href.pathname;
          return newLoc.pathname === tabPath;
        })
      ) {
        console.log(`Could not detect location ${newLoc.pathname} in tabs, creating`);
        setTabs([...tabs, { href: newLoc }]);
      }
    });
  }, [listen, tabs]);

  return (
    <Fragment>
      {filter && (
        <Left
          size={200}
          as="nav"
          css={{
            background: primaryWhite.hex(),
            borderRight: '1px solid',
            borderRightColor: primaryBlue.alpha(0.3).hex(),
          }}
        >
          <FilterOrganism filter={filter as string} />
        </Left>
      )}
      <Fill scrollable={false}>
        <Top as="nav" size={TAB_NAVBAR_HEIGHT}>
          <ol css={[unstyleList, { display: 'flex', height: TAB_NAVBAR_HEIGHT, justifyContent: 'flex-start', alignItems: 'flex-end', borderBottom: `1px solid ${neutral40.hex()}` }]}>
            {tabs.map((t, i) => (
              <Tab key={i} removeTab={() => {
                const newTabs = without(tabs, t);
                if (newTabs.length > 0) {
                  setTabs(newTabs)
                } else {
                  setTabs(newTabs.length > 0 ? newTabs : [{ href: { pathname: '/' } }])
                  try {
                    navigate({ pathname: '/' })

                  } catch(ex) {
                    console.error('Caught failed navigate event https://github.com/frontarm/navi/issues/98#issuecomment-520600240')
                  }
                  console.log(navigate)
                }
              }
              } {...t} />
            ))}
          </ol>
        </Top>
        <Fill css={{ background: primaryWhite.hex() }} scrollable>
          {children}
        </Fill>
      </Fill>
    </Fragment>
  );
};

export default TabManagerOrganism;
