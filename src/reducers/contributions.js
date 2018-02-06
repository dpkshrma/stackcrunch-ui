import { success } from '../helpers/reducer';
import { postActions as pa } from '../constants';

const initialState = {
  published: [],
  drafts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case success(pa.LOAD_USER_PUBLISHED_POSTS):
      return Object.assign({}, state, {
        published: action.payload
      });
    case success(pa.LOAD_DRAFTS):
      return Object.assign({}, state, {
        drafts: action.payload
      });
    default:
      return state;
  }
};
