import { success } from '../helpers/reducer';
import { postActions as pa } from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case success(pa.LOAD_POSTS):
      return action.payload.posts;
    case success(pa.LOAD_MORE_POSTS):
      const { posts } = action.payload;
      return [...state, ...posts];
    case success(pa.DELETE_POST):
      const { slug } = action.payload;
      if (slug) {
        return state.filter(post => post.slug !== slug);
      }
      return state;
    default:
      return state;
  }
};
