import { PAGE_TYPES } from '../../config';
import actions from '../../actions';

const SPECIAL_PAGES = PAGE_TYPES.SPECIAL;

const mainPostList = {
  onEnter: dispatch => {
    dispatch(actions.showSubscribeWidget());
  },
  onLeave: dispatch => {
    dispatch(actions.hideSubscribeWidget());
  }
};
const tagPostList = {
  onEnter: dispatch => {
    dispatch(actions.showSubscribeWidget());
  },
  onLeave: dispatch => {
    dispatch(actions.hideSubscribeWidget());
  }
};
const authorPostList = {
  onEnter: (dispatch, authorId) => {
    dispatch(actions.showAuthorInfoWidget(authorId));
    dispatch(actions.showSubscribeWidget());
  },
  onLeave: dispatch => {
    dispatch(actions.hideAuthorInfoWidget());
    dispatch(actions.hideSubscribeWidget());
  }
};
const Post = {
  onEnter: (dispatch, refs = []) => {
    refs.length && dispatch(actions.showRefWidget(refs));
  },
  onLeave: dispatch => {
    dispatch(actions.hideRefWidget());
  }
};

export default {
  // route based within same component
  [PAGE_TYPES.MAIN]: mainPostList,
  [SPECIAL_PAGES.tags]: tagPostList,
  [SPECIAL_PAGES.authors]: authorPostList,
  // based on Post component mount/unmount
  post: Post
};
