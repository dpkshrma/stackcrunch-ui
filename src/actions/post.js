import { postActions as pa } from '../constants';
import postsAPI from '../api/post';

export const fetchPosts = dispatch => {
  return (page, opts = {}) => {
    let type = pa.LOAD_POSTS;
    if (page) type = pa.LOAD_MORE_POSTS;

    const q = Object.assign({}, { page }, opts || {});
    return dispatch({ type, payload: postsAPI.fetchAll(q) });
  };
};

export const fetchPost = dispatch => {
  return slug => {
    return dispatch({
      type: pa.LOAD_POST,
      payload: postsAPI.fetchOne(slug)
    });
  };
};

const likePostHelper = (slug, dispatch) => {
  postsAPI.like(slug);
  const post = { slug };
  return dispatch({
    type: pa.LIKE_POST,
    payload: Promise.resolve({ post })
  });
};
export const likePostDispatchLater = slug => {
  return dispatch => likePostHelper(slug, dispatch);
};
export const likePost = dispatch => {
  return slug => likePostHelper(slug, dispatch);
};

export const incViews = dispatch => {
  return slug => {
    return dispatch({
      type: pa.INC_POST_VIEWS,
      payload: postsAPI.incViews(slug)
    });
  };
};

export const deletePost = slug => {
  return dispatch => {
    return dispatch({
      type: pa.DELETE_POST,
      payload: postsAPI.delete(slug)
    });
  };
};

export const fetchDrafts = (page, opts) => {
  return dispatch => {
    let type = pa.LOAD_DRAFTS;
    if (page) {
      type = pa.LOAD_MORE_DRAFTS;
    }
    return dispatch({
      type,
      payload: postsAPI.fetchAll(
        Object.assign({}, { page, isDraft: true }, opts)
      )
    });
  };
};

export const fetchUserPublishedPosts = (page, opts) => {
  return dispatch => {
    let type = pa.LOAD_USER_PUBLISHED_POSTS;
    if (page) {
      type = pa.LOAD_MORE_USER_PUBLISHED_POSTS;
    }
    return dispatch({
      type,
      payload: postsAPI.fetchAll(Object.assign({}, { page }, opts))
    });
  };
};
