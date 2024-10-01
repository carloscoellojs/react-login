import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    login: {},
    register: {},
    user: {}
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.login = {
        success: action.payload.success,
        message: action.payload.message
      };
    },
    loginUserError: (state, action) => {
      state.isAuthenticated = false;
      state.login = action.payload;
    },
    registerUser: (state, action) => {
      state.register = {
        success: action.payload.success,
        message: action.payload.message
      };
    },
    registerUserError: (state, action) => {
      state.register = action.payload;
    },
    fetchUser: (state, action) => {
      state.user = action.payload;
    },
    fetchUserError: (state) => {
      state.user = {
        success: false,
        message:
          "Your account info was not fetched. Log Out and Log back in please"
      };
    },
    logUserOut: (state) => {
      state.isAuthenticated = false;
      state.login = {};
      state.register = {};
      state.user = {};
    },
    cleanUp: (state, action) => {
      state[action.payload] = {};
    }
  }
});

export const {
  loginUser,
  loginUserError,
  registerUser,
  registerUserError,
  fetchUser,
  fetchUserError,
  logUserOut,
  cleanUp
} = userSlice.actions;

export default userSlice.reducer;
