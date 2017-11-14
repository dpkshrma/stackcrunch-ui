import { userActions as ua } from '../constants';
import { profileAPI } from '../api/user';

export const fetchProfile = () => {
  return (dispatch, getState) => {
    // TODO: return user if exists in store?? (cache first)
    return profileAPI
      .fetch()
      .then(({ user }) => {
        dispatch({ type: ua.LOAD_PROFILE_SUCCESS, user });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: ua.LOAD_PROFILE_FAILURE });
      });
  };
};

export const updateRemoteProfile = profile => {
  return (dispatch, getState) => {
    return profileAPI
      .update(profile)
      .then(({ user }) => {
        dispatch({ type: ua.UPDATE_PROFILE_SUCCESS, user });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: ua.UPDATE_PROFILE_FAILURE });
      });
  };
};

export const uploadPhoto = file => {
  return (dispatch, getState) => {
    return profileAPI
      .uploadPhoto(file)
      .then(({ avatarURL }) => {
        dispatch({ type: ua.UPDATE_PROFILE_SUCCESS, user: { avatarURL } });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: ua.UPDATE_PROFILE_FAILURE });
      });
  };
};

export const updateProfile = user => {
  return {
    type: ua.UPDATE_PROFILE_SUCCESS,
    user
  };
};
