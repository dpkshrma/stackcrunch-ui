import { postActions as pa } from '../constants';
import postsAPI from '../api/post';

const formatPosts = p => {
  return p.then(posts => {
    return posts.map(post => {
      // assuming only 1 author
      const [author = {}] = post.authors;
      return Object.assign({}, post, {
        author: {
          name: author.name,
          img: author.avatarURL
        },
        tags: post.tags.map(({ name }) => ({
          text: name,
          id: name
        }))
      });
    });
  });
};

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

export const fetchAllPosts = dispatch => {
  return pageId => {
    return dispatch({
      type: pa.LOAD_POSTS,
      payload: formatPosts(postsAPI.fetchAll(pageId))
    });
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
