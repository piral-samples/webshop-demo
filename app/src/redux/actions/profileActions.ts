import {
  CLEAR_PROFILE,
  SET_PROFILE,
  UPDATE_EMAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
} from "../../constants/constants";

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});

export const setProfile = (user) => ({
  type: SET_PROFILE,
  payload: user,
});

export const updateEmail = (password, newEmail, history) => ({
  type: UPDATE_EMAIL,
  payload: {
    password,
    newEmail,
    history,
  },
});

export const updateProfile = (newProfile, history) => ({
  type: UPDATE_PROFILE,
  payload: {
    updates: newProfile.updates,
    files: newProfile.files,
    credentials: newProfile.credentials,
    history,
  },
});

export const updateProfileSuccess = (updates) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updates,
});
