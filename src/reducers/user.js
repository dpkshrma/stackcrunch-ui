import update from 'immutability-helper';
import { success } from '../helpers/reducer';
import { userActions as ua, postActions as pa } from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case success(ua.LOAD_LOGGED_IN_PROFILE):
      return action.payload;

    case success(ua.UPDATE_PROFILE):
      return update(state, { $merge: action.payload });

    case success(pa.INC_POST_VIEWS):
      const { user: { viewedPosts } } = action.payload;
      return Object.assign({}, state, { viewedPosts });

    default:
      return state;
  }
};
