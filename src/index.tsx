/** @jsx jsx */
import { jsx } from '@emotion/core';
import { injectGlobal } from 'emotion';
import { mount, route } from 'navi';
import { Suspense, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Router, View } from 'react-navi';
import MainLayout from './Layouts/Main';
import TabManagerOrganism from './organisms/TabManager';
import PrimaryNavOrganism from './organisms/PrimaryNav';

// Define routes using mount(), route(), and other middleware.
export const routes = mount({
  '/': route({
    view: () => <Fragment>dashboard</Fragment>,
    title: 'Dashboard',
  }),
  '/requests/:requestId': route(({ params: { requestId } }) => {
    return {
      view: () => <Fragment>request {requestId}</Fragment>,
      title: `Request ${requestId}`,
    };
  }),
  '/requests': route({
    view: () => <Fragment>requests</Fragment>,
    title: 'Requests',
  }),
});

injectGlobal({
  '*, *::after, *::before': {
    boxSizing: 'border-box'
  }
})

const App = () => {
  console.log('top level render?')
  return <Router routes={routes}>
  <MainLayout nav={<PrimaryNavOrganism />}>
    <TabManagerOrganism>
      <Suspense fallback={'loading...'}>
        <View />
      </Suspense>
    </TabManagerOrganism>
  </MainLayout>
</Router>}

// Then pass your routes to a `<Router>`, and render them with `<View>`.
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
