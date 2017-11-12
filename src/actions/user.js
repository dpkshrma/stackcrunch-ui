import { userActions as ua } from '../constants';
import { fetchProfile, updateProfile } from '../api/profile';

export const getProfile = () => {
  return (dispatch, getState) => {
    return fetchProfile()
      .then(user => {
        dispatch({ type: ua.LOAD_PROFILE_SUCCESS, user });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: ua.LOAD_PROFILE_FAILURE });
      });
  };
};

export const setProfile = profile => {
  return (dispatch, getState) => {
    return updateProfile(profile)
      .then(user => {
        dispatch({ type: ua.LOAD_PROFILE_SUCCESS, user });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: ua.LOAD_PROFILE_FAILURE });
      });
  };
};
