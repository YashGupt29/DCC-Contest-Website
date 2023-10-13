import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: true,
  isLoading: true,
  role: undefined,
  username: "Anurag",
  profile_pic: "https://ik.imagekit.io/pqymxdgbi/avtar.png",
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser(state, actions) {
      state.loggedIn = true;
      state.isLoading = false;
      state.role = actions.payload.role;
      state.username = actions.payload.username;
      if (actions.payload.profile_pic)
        state.profile_pic = actions.payload.profile_pic;
    },
    logoutUser(state) {
      state.loggedIn = false;
      state.isLoading = false;
      state.role = undefined;
      state.username = undefined;
      localStorage.removeItem("token");
    },
    setLoading(state, actions) {
      state.isLoading = actions.payload;
    },
    setProfilePic(state, actions) {
      if (actions.payload.profile_pic)
        state.profile_pic = actions.payload.profile_pic;
    },
  },
});

export const { loginUser, logoutUser, setLoading, setProfilePic } =
  login.actions;
export default login.reducer;
