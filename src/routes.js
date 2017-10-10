import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
        <Route exact component={PostList} path={`${urlPrefix}/`} />
        <Route exact component={Post} path={`${urlPrefix}/post/:postId`} />
        <Route component={NotFoundPage} />
      </Switch>
    </App>
  </Provider>
);
