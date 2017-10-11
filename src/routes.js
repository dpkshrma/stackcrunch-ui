import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import { asyncLoad } from './helpers';

const store = createStore(rootReducer);
const urlPrefix = process.env.PUBLIC_URL || '';

const Post = asyncLoad({
  loader: () => import(`./components/Post`)
});
const PostList = asyncLoad({
  loader: () => import(`./components/PostList`)
});
const NotFound = asyncLoad({
  loader: () => import(`./components/NotFound`)
});

export default (
  <Provider store={store}>
    <App>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/posts" />} />
        <Route exact component={PostList} path={`${urlPrefix}/posts/:page?`} />
        <Route exact component={Post} path={`${urlPrefix}/post/:postId`} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Provider>
);
