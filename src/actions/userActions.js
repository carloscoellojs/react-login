import {
  loginUser,
  loginUserError,
  registerUser,
  registerUserError,
  fetchUser,
  fetchUserError,
  logUserOut,
  cleanUp
} from "../reducers/user/userReducer";

import axios from "axios";
import common from "../lib/common";
import { decode } from "jwt-js-decode";

/**
 * Method for dispatching an action when authenticating a user
 * @param {string} email
 * @param {string} password
 *
 */
export const loginUserAction = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`/user/login`, {
      email,
      password
    });
    const { token } = response.data;
    localStorage.setItem("token", token);
    common.authenticateWithHeaders(token);
    let decoded = decode(token);
    localStorage.setItem("id", decoded.payload.id);
    dispatch(loginUser({ ...response.data, status: response.status }));
  } catch (e) {
    dispatch(loginUserError({ ...e.response.data, status: e.response.status }));
  }
};

// method for loggin out a user
export const logUserOutAction = () => (dispatch) => {
  localStorage.removeItem("token");
  common.authenticateWithHeaders(false);
  dispatch(logUserOut());
};

/**
 * Method for regitering a user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
export const registerUserAction =
  (name, email, password) => async (dispatch) => {
    try {
      const response = await axios.post(`/user/add`, {
        name,
        email,
        password
      });
      dispatch(registerUser({ ...response.data, status: response.status }));
    } catch (e) {
      console.error(e);
      dispatch(registerUserError({ ...e.response.data, status: e.response.status }));
    }
  };

/**
 * Method for fecthing a specific user
 * @param {string} id
 */
export const fetchUserAction = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/get/${id}`);
    dispatch(fetchUser(response.data));
  } catch (e) {
    dispatch(fetchUserError(e.response.data));
  }
};

export const cleanUpAction = () => dispatch => {
    dispatch(cleanUp());
};
