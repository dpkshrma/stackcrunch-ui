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
        published: action.payload.posts
      });
    case success(pa.LOAD_DRAFTS):
      return Object.assign({}, state, {
        drafts: action.payload.posts
      });
    case success(pa.LOAD_MORE_USER_PUBLISHED_POSTS):
      return Object.assign({}, state, {
        published: [...state.published, ...action.payload.posts]
      });
    case success(pa.LOAD_MORE_DRAFTS):
      return Object.assign({}, state, {
        drafts: [...state.drafts, ...action.payload.posts]
      });
    default:
      return state;
  }
};
