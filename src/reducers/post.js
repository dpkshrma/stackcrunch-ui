import { success } from '../helpers/reducer';
import { postActions as pa } from '../constants';
import update from 'immutability-helper';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case success(pa.LOAD_POST):
      return action.payload;

    case success(pa.LIKE_POST):
      const { post: { slug: likedPostSlug } } = action.payload;
      if (state.meta.slug !== likedPostSlug) return state;
      return update(state, {
        $merge: {
          meta: {
            liked: true
          }
        }
      });

    case success(pa.UNLIKE_POST):
      const { post: { slug: unlikedPostSlug } } = action.payload;
      if (state.meta.slug !== unlikedPostSlug) return state;
      return update(state, {
        $merge: {
          meta: {
            liked: false
          }
        }
      });

    default:
      return state;
  }
};
