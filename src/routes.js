import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { App, PostList, Post, NotFoundPage } from './components';

const store = createStore(rootReducer);
const urlPrefix = process.env.PUBLIC_URL || '';

export default (
  <Provider store={store}>
    <App>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/posts" />} />
        <Route exact component={PostList} path={`${urlPrefix}/posts/:page?`} />
        <Route exact component={Post} path={`${urlPrefix}/post/:postId`} />
        <Route component={NotFoundPage} />
      </Switch>
    </App>
  </Provider>
);
