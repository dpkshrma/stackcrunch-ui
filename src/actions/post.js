import { postActions as pa } from '../constants';
import postsAPI from '../api/post';

const formatPost = p => {
  return p.then(post => {
    if (post && post.meta) {
      // assuming only 1 author
      const [author = {}] = post.meta.authors;
      return Object.assign({}, post, {
        meta: Object.assign({}, post.meta, {
          author: {
            name: author.name,
            img: author.avatarURL
          }
        })
      });
    }
    return {};
  });
};

export const fetchPosts = dispatch => {
  return (page, opts={}) => {
    let type = pa.LOAD_POSTS;
    if (page) type = pa.LOAD_MORE_POSTS;

    const q = Object.assign({}, { page }, (opts || {}));
    return dispatch({ type, payload: postsAPI.fetchAll(q) });
  };
};

export const fetchPost = dispatch => {
  return slug => {
    return dispatch({
      type: pa.LOAD_POST,
      payload: formatPost(postsAPI.fetchOne(slug))
    });
  };
};

export const fetchDrafts = page => {
  return (dispatch, getState) => {
    let type = pa.LOAD_DRAFTS;
    if (page) {
      type = pa.LOAD_MORE_DRAFTS;
    }
    const { user: { username } } = getState();
    return dispatch({
      type,
      payload: postsAPI.fetchAll({ username, page, isDraft: true })
    });
  };
};

export const fetchUserPublishedPosts = page => {
  return (dispatch, getState) => {
    let type = pa.LOAD_USER_PUBLISHED_POSTS;
    if (page) {
      type = pa.LOAD_MORE_USER_PUBLISHED_POSTS;
    }
    const { user: { username } } = getState();
    return dispatch({ type, payload: postsAPI.fetchAll({ username, page }) });
  };
};
