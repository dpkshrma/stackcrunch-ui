import { userActions as ua } from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ua.LOAD_PROFILE_SUCCESS:
      return action.user;
    case ua.LOAD_PROFILE_FAILURE:
      // TODO: ???
      return state;
    default:
      return state;
  }
};
