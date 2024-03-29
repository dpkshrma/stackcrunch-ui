import update from 'immutability-helper';
import { WIDGET_TYPES } from '../config';

const INITIAL_STATE = {
  visible: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_SUBSCRIBE_WIDGET':
      return update(state, {
        visible: {
          $merge: {
            [WIDGET_TYPES.subscribe]: {}
          }
        }
      });
    case 'HIDE_SUBSCRIBE_WIDGET':
      return update(state, {
        visible: {
          $unset: [WIDGET_TYPES.subscribe]
        }
      });
    case 'SHOW_TAG_INFO_WIDGET':
      return update(state, {
        visible: {
          $merge: {
            [WIDGET_TYPES.tagInfo]: {
              tagId: action.tagId
            }
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
            [WIDGET_TYPES.authorInfo]: {
              authorId: action.authorId
            }
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
            [WIDGET_TYPES.ref]: {
              refs: action.refs
            }
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
