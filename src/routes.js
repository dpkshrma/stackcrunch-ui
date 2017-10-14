import React from 'react';
// import { AnimatedSwitch } from 'react-router-transition';
import { Route, Redirect, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import { PostService } from './services';
import { asyncLoad } from './helpers';
// import { routeAnimation } from './helpers';
import { URL_PREFIX } from './config';

// redux store
const store = createStore(rootReducer);

// route components
const Post = asyncLoad({ loader: () => import(`./components/Post`) });
const NotFound = asyncLoad({ loader: () => import(`./components/NotFound`) });

// route animation helper
// const { bounceTransition, mapStyles } = routeAnimation;

// post listing page config
const pageIds = PostService.getMainPageIds();
const [firstPageId] = pageIds;

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
        {pageIds.map(pageId => (
          <Route
            exact
            key={pageId}
            component={asyncLoad({
              loader: () => import(`./components/PostList`)
            })}
            path={`${URL_PREFIX}/posts/${pageId}`}
          />
        ))}
        {PostService.getTags().map(tag => {
          return PostService.getTaggedPageIds(tag).map(pageId => (
            <Route
              exact
              key={pageId}
              component={asyncLoad({
                loader: () => import(`./components/PostList`)
              })}
              path={`${URL_PREFIX}/tags/${tag}/posts/${pageId}`}
            />
          ));
        })}
        <Route exact component={Post} path={`${URL_PREFIX}/post/:postId`} />
        <Route component={NotFound} />
      </Switch>
      {/* </AnimatedSwitch> */}
    </App>
  </Provider>
);
