import update from 'immutability-helper';
import { success } from '../helpers/reducer';
import { userActions as ua } from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case success(ua.LOAD_PROFILE):
      const { username } = action.payload;
      return update(state, {
        $merge: {
          [username]: action.payload
        },
      })

    default:
      return state;
  }
};
