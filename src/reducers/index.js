import { combineReducers } from 'redux';
import widgets from './widgets';
import user from './user';
import posts from './posts';
import post from './post';

const rootReducer = combineReducers({
  widgets,
  user,
  posts,
  post
});

export default rootReducer;
