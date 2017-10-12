import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import { PostService } from './services';
import { asyncLoad } from './helpers';
import { URL_PREFIX } from './config';

const store = createStore(rootReducer);

const Post = asyncLoad({
  loader: () => import(`./components/Post`)
});
const NotFound = asyncLoad({
  loader: () => import(`./components/NotFound`)
});

export default (
  <Provider store={store}>
    <App>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/posts/1" />} />
        <Route exact path="/posts" render={() => <Redirect to="/posts/1" />} />
        {PostService.getPageIds().map(pageId => (
          <Route
            exact
            key={pageId}
            component={asyncLoad({
              loader: () => import(`./components/PostList`)
            })}
            path={`${URL_PREFIX}/posts/${pageId}`}
          />
        ))}
        <Route exact component={Post} path={`${URL_PREFIX}/post/:postId`} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Provider>
);
