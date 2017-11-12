import { combineReducers } from 'redux';
import widgets from './widgets';
import user from './user';

const rootReducer = combineReducers({
  widgets,
  user
});

export default rootReducer;
