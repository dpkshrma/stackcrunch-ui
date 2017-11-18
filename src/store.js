import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { STORE_STATE_ID, PROMISE_TYPE_SUFFIXES } from './config';

// initialState
const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORE_STATE_ID);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORE_STATE_ID, serializedState);
  } catch (e) {
    // TODO: log errors??
  }
};
const initialState = loadState();

// middlewares
const middlewares = [
  promiseMiddleware({
    promiseTypeSuffixes: PROMISE_TYPE_SUFFIXES
  }),
  thunk
];
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger();
  if (logger) {
    middlewares.push(logger);
  }
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

store.subscribe(() => {
  const { user, posts, post } = store.getState();
  saveState({
    user,
    posts,
    post
  });
});

export default store;
