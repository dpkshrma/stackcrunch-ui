import update from 'immutability-helper';
import { success } from '../helpers/reducer';
import { userActions as ua } from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case success(ua.LOAD_PROFILE):
      return action.payload;

    case success(ua.UPDATE_PROFILE):
      return update(state, { $merge: action.payload });

    default:
      return state;
  }
};
