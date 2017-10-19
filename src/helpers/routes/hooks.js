import { PAGE_TYPES } from '../../config';
import actions from '../../actions';

const SPECIAL_PAGES = PAGE_TYPES.SPECIAL;

const tagPostList = {
  onEnter: (dispatch, tagId) => {
    return dispatch(actions.showTagInfoWidget(tagId));
  },
  onLeave: dispatch => {
    return dispatch(actions.hideTagInfoWidget());
  }
};
const authorPostList = {
  onEnter: (dispatch, authorId) => {
    return dispatch(actions.showAuthorInfoWidget(authorId));
  },
  onLeave: dispatch => {
    return dispatch(actions.hideAuthorInfoWidget());
  }
};
const Post = {
  onEnter: (dispatch, postId) => {
    return dispatch(actions.showRefWidget(postId));
  },
  onLeave: dispatch => {
    return dispatch(actions.hideRefWidget());
  }
};

export default {
  // route based within same component
  [SPECIAL_PAGES.tags]: tagPostList,
  [SPECIAL_PAGES.authors]: authorPostList,
  // based on Post component mount/unmount
  post: Post
};
