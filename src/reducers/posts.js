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

    case success(pa.INC_POST_VIEWS):
      const { post: { slug: updatedPostSlug, views } } = action.payload;

      const newState = state.map(post => {
        if (post.slug !== updatedPostSlug) return post;
        return Object.assign({}, post, { views });
      });

      return newState;

    default:
      return state;
  }
};
