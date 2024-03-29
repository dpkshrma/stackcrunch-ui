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
      const { post: { slug: viewedPostSlug, views } } = action.payload;

      return state.map(post => {
        if (post.slug !== viewedPostSlug) return post;
        return Object.assign({}, post, { views });
      });

    case success(pa.LIKE_POST):
      const { post: { slug: likedPostSlug } } = action.payload;

      return state.map(post => {
        if (post.slug !== likedPostSlug) return post;
        return Object.assign({}, post, { likes: post.likes + 1 });
      });

    case success(pa.UNLIKE_POST):
      const { post: { slug: unlikedPostSlug } } = action.payload;

      return state.map(post => {
        if (post.slug !== unlikedPostSlug) return post;
        return Object.assign({}, post, { likes: post.likes - 1 });
      });

    default:
      return state;
  }
};
