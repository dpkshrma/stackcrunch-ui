import { success } from '../helpers/reducer';
import { postActions as pa } from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case success(pa.LOAD_POSTS):
      return action.payload;
    default:
      return state;
  }
};
