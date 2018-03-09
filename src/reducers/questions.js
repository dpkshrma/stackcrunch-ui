import update from 'immutability-helper';
import { success } from '../helpers/reducer';
import { questionActions as qa } from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case success(qa.ADD_QUESTION):
      const { question } = action.payload || {};
      const { question_id: questionId } = question || {};
      if (!questionId) return state;
      return update(state, { $merge: { [questionId]: question } });
    default:
      return state;
  }
};
