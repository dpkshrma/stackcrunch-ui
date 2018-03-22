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
    case success(pa.DELETE_POST):
      const { slug } = action.payload;
      if (slug) {
        return {
          published: state.published.filter(post => post.slug !== slug),
          drafts: state.drafts.filter(post => post.slug !== slug)
        };
      }
      return state;

    case success(pa.LIKE_POST):
      const { post: { slug: likedPostSlug } } = action.payload;

      const updatePostLike = post => {
        if (post.slug !== likedPostSlug) return post;
        return Object.assign({}, post, { likes: post.likes + 1 });
      };
      return {
        published: state.published.map(updatePostLike),
        drafts: state.drafts.map(updatePostLike)
      };

    default:
      return state;
  }
};
