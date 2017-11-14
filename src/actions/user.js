import { userActions as ua } from '../constants';
import {
  fetchProfile,
  updateProfile,
  uploadProfilePhoto
} from '../api/profile';

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

export const setProfilePhoto = file => {
  return (dispatch, getState) => {
    return uploadProfilePhoto(file)
      .then(({ avatarURL }) => {
        dispatch({ type: ua.LOAD_PROFILE_PHOTO_SUCCESS, avatarURL });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: ua.LOAD_PROFILE_PHOTO_FAILURE });
      });
  };
};
