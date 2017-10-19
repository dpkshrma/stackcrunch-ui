import { PAGE_TYPES } from '../../config';
import actions from '../../actions';

const SPECIAL_PAGES = PAGE_TYPES.SPECIAL;

const tagPostList = {
  onEnter: (dispatch, tagId) => {
    return dispatch(actions.showTagWidget(tagId));
  }
};

export default {
  [SPECIAL_PAGES.tags]: tagPostList
};
