import React from 'react';
// import { AnimatedSwitch } from 'react-router-transition';
import { Route, Redirect, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import { PageService } from './services';
import { asyncLoad } from './helpers';
// import { routeAnimation } from './helpers';
import { URL_PREFIX, PAGE_TYPES } from './config';

// redux store
const store = createStore(rootReducer);

// route components
const Post = asyncLoad({ loader: () => import(`./components/Post`) });
const NotFound = asyncLoad({ loader: () => import(`./components/NotFound`) });

// route animation helper
// const { bounceTransition, mapStyles } = routeAnimation;

// post listing page config
const mainPageIds = PageService.getMainPageIds();
const [firstPageId] = mainPageIds;

// Routes
const mainPageRoutes = mainPageIds.map(pageId => (
  <Route
    exact
    key={pageId}
    component={asyncLoad({
      loader: () => import(`./components/PostList`)
    })}
    path={`${URL_PREFIX}/posts/${pageId}`}
  />
));

const specialPageRoutes = PAGE_TYPES.SPECIAL.map(pageType => {
  return PageService.getSpecialPageTypeIds(pageType).map(pageTypeId => {
    return PageService.getSpecialPageIds(pageType, pageTypeId).map(pageId => {
      return (
        <Route
          exact
          key={pageId}
          component={asyncLoad({
            loader: () => import(`./components/PostList`)
          })}
          path={`${URL_PREFIX}/${pageType}/${pageTypeId}/posts/${pageId}`}
        />
      );
    });
  });
});

export default (
  <Provider store={store}>
    <App>
      {/* <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
      > */}
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to={`/posts/${firstPageId}`} />}
        />
        <Route
          exact
          path="/posts"
          render={() => <Redirect to={`/posts/${firstPageId}`} />}
        />
        {mainPageRoutes}
        {specialPageRoutes}
        <Route exact component={Post} path={`${URL_PREFIX}/post/:postId`} />
        <Route component={NotFound} />
      </Switch>
      {/* </AnimatedSwitch> */}
    </App>
  </Provider>
);
