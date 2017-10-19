import update from 'immutability-helper';
import { WIDGET_TYPES } from '../config';

const INITIAL_STATE = {
  visible: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_TAG_INFO_WIDGET':
      return update(state, {
        visible: {
          $merge: {
            [WIDGET_TYPES.tagInfo]: action.tagId
          }
        }
      });
    case 'HIDE_TAG_INFO_WIDGET':
      return update(state, {
        visible: {
          $unset: [WIDGET_TYPES.tagInfo]
        }
      });
    case 'SHOW_AUTHOR_INFO_WIDGET':
      return update(state, {
        visible: {
          $merge: {
            [WIDGET_TYPES.authorInfo]: action.authorId
          }
        }
      });
    case 'HIDE_AUTHOR_INFO_WIDGET':
      return update(state, {
        visible: {
          $unset: [WIDGET_TYPES.authorInfo]
        }
      });
    case 'SHOW_REF_WIDGET':
      return update(state, {
        visible: {
          $merge: {
            [WIDGET_TYPES.ref]: action.postId
          }
        }
      });
    case 'HIDE_REF_WIDGET':
      return update(state, {
        visible: {
          $unset: [WIDGET_TYPES.ref]
        }
      });
    default:
      return state;
  }
};
