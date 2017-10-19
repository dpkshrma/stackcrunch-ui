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
    default:
      return state;
  }
};
