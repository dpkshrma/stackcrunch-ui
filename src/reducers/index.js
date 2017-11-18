import { combineReducers } from 'redux';
import widgets from './widgets';
import user from './user';
import posts from './posts';

const rootReducer = combineReducers({
  widgets,
  user,
  posts
});

export default rootReducer;
