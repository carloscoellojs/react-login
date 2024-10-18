import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    login: {},
    register: {},
    member: {}
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.login = action.payload;
    },
    loginUserError: (state, action) => {
      state.login = action.payload;
    },
    registerUser: (state, action) => {
      state.register = action.payload;
    },
    registerUserError: (state, action) => {
      state.register = action.payload;
    },
    fetchUser: (state, action) => {
      state.member = action.payload;
    },
    fetchUserError: (state) => {
      state.member = {
        success: false,
        message:
          "Your account info was not fetched. Log Out and Log back in please"
      };
    },
    logUserOut: (state) => {
      state.isAuthenticated = false;
      state.login = {};
      state.register = {};
      state.member = {};
    },
    cleanUp: (state) => {
      state.login = {};
      state.register = {};
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
