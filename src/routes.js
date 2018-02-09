import React from 'react';
// import { AnimatedSwitch } from 'react-router-transition';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { PageService } from './services';
import { asyncLoad } from './helpers/routes';
import store from './store';
// import { routeAnimation } from './helpers/routes';
import { URL_PREFIX, PAGE_TYPES } from './config';

// route components
const Post = asyncLoad({ loader: () => import(`./components/Post`) });
const PostList = asyncLoad({ loader: () => import(`./components/PostList`) });
const NotFound = asyncLoad({ loader: () => import(`./components/NotFound`) });
const Join = asyncLoad({ loader: () => import(`./components/Join`) });
const Profile = asyncLoad({ loader: () => import(`./components/Profile`) });
const PostInput = asyncLoad({ loader: () => import(`./components/PostInput`) });
const Contributions = asyncLoad({
  loader: () => import(`./components/Contributions`)
});

// route animation helper
// const { bounceTransition, mapStyles } = routeAnimation;

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
        <Route exact path="/" render={() => <Redirect to="/posts" />} />
        {specialPageRoutes}
        <Route exact component={PostList} path="/posts/" />
        <Route exact component={Post} path="/post/:slug" />
        <Route exact component={Profile} path="/profile" />
        <Route exact component={Join} path="/join" />
        <Route exact component={PostInput} path="/write/:slug?" />
        <Route exact component={Contributions} path="/contributions" />
        <Route component={NotFound} />
      </Switch>
      {/* </AnimatedSwitch> */}
    </App>
  </Provider>
);
