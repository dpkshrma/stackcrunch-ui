import { questionActions as qa } from '../constants';
import { questionApi } from '../api/question';

export const fetchQuestion = url => {
  return (dispatch, getState) => {
    // TODO: return user if exists in store?? (cache first)
    return dispatch({
      type: qa.ADD_QUESTION,
      payload: questionApi.fetch(url)
    });
  };
};
