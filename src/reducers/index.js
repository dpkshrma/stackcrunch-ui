import { combineReducers } from 'redux';
import widgets from './widgets';
import user from './user';
import posts from './posts';
import post from './post';
import contributions from './contributions';
import questions from './questions';

const rootReducer = combineReducers({
  widgets,
  user,
  posts,
  post,
  contributions,
  questions
});

export default rootReducer;
