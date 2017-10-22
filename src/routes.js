import React from 'react';
// import { AnimatedSwitch } from 'react-router-transition';
import { Route, Redirect, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import { PageService, PostService } from './services';
import { asyncLoad } from './helpers/routes';
// import { routeAnimation } from './helpers/routes';
import { URL_PREFIX, PAGE_TYPES } from './config';

// redux store
const store = createStore(rootReducer);

// route components
const Post = asyncLoad({ loader: () => import(`./components/Post`) });
const NotFound = asyncLoad({ loader: () => import(`./components/NotFound`) });
const Join = asyncLoad({ loader: () => import(`./components/Join`) });

// route animation helper
// const { bounceTransition, mapStyles } = routeAnimation;

// post listing page config
const mainPageIds = PageService.getMainPageIds();
const [firstPageId] = mainPageIds;
const postIds = PostService.getPostIds();

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

const specialPageRoutes = Object.values(PAGE_TYPES.SPECIAL).map(pageType => {
  return PageService.getSpecialPageTypeIds(pageType).map(pageTypeId => {
    return PageService.getSpecialPageIds(pageType, pageTypeId).map(pageId => {
      // default route format
      let path = `${URL_PREFIX}/${pageType}/${pageTypeId}/posts/${pageId}`;
      // special route format
      if (pageType === PAGE_TYPES.SPECIAL.authors) {
        path = `${URL_PREFIX}/@${pageTypeId}/posts/${pageId}`;
      }
      return (
        <Route
          exact
          key={pageId}
          component={asyncLoad({
            loader: () => import(`./components/PostList`)
          })}
          path={path}
        />
      );
    });
  });
});

const postRoutes = postIds.map(postId => {
  return (
    <Route
      exact
      key={postId}
      component={Post}
      path={`${URL_PREFIX}/post/${postId}`}
    />
  );
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
        {postRoutes}
        <Route component={Join} to="/join" />
        <Route component={NotFound} />
      </Switch>
      {/* </AnimatedSwitch> */}
    </App>
  </Provider>
);
