import * as type from "../../constants/constants";

export const signIn = (email, password) => ({
  type: type.SIGNIN,
  payload: {
    email,
    password,
  },
});

export const signUp = (user) => ({
  type: type.SIGNUP,
  payload: user,
});

export const signInSuccess = (auth) => ({
  type: type.SIGNIN_SUCCESS,
  payload: auth,
});

export const signOut = (history) => ({
  type: type.SIGNOUT,
  payload: {
    history,
  }
});

export const signOutSuccess = () => ({
  type: type.SIGNOUT_SUCCESS,
});

export const onAuthStateSuccess = (user) => ({
  type: type.ON_AUTHSTATE_SUCCESS,
  payload: user,
});

export const onAuthStateFail = (error) => ({
  type: type.ON_AUTHSTATE_FAIL,
  payload: error,
});

export const resetPassword = (email) => ({
  type: type.RESET_PASSWORD,
  payload: email,
});
