import { mount, route } from 'navi';
import React, { Suspense, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Router, View } from 'react-navi';
import MainLayout from './Layouts/Main';

// Define routes using mount(), route(), and other middleware.
const routes = mount({
  '/': route({
    view: () => <Fragment>root</Fragment>,
  }),
});

// Then pass your routes to a `<Router>`, and render them with `<View>`.
ReactDOM.render(
  <Router routes={routes}>
    <MainLayout nav={<Fragment>hi</Fragment>}>
      <Suspense fallback={'loading...'}>
        <View />
      </Suspense>
    </MainLayout>
  </Router>,
  document.getElementById('root')
);
