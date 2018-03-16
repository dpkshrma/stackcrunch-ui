import { userActions as ua } from '../constants';
import { profileAPI } from '../api/user';
import { success } from '../helpers/reducer';

export const fetchProfile = username => {
  return (dispatch, getState) => {
    // TODO: return user if exists in store?? (cache first)
    let type = ua.LOAD_LOGGED_IN_PROFILE;
    if (username) type = ua.LOAD_PROFILE;
    return dispatch({
      type,
      payload: profileAPI.fetch(username)
    });
  };
};

export const updateRemoteProfile = profile => {
  return (dispatch, getState) => {
    return dispatch({
      type: ua.UPDATE_PROFILE,
      payload: profileAPI.update(profile)
    });
  };
};

export const uploadPhoto = file => {
  return (dispatch, getState) => {
    return dispatch({
      type: ua.UPDATE_PROFILE,
      payload: profileAPI.uploadPhoto(file)
    });
  };
};

export const updateProfile = user => {
  return {
    type: success(ua.UPDATE_PROFILE),
    payload: user
  };
};
