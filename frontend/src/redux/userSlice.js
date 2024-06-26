import { createSlice } from "@reduxjs/toolkit";

// Get initial state from local storage or use the default initial state
const initialState = JSON.parse(localStorage.getItem("usersession")) || {
  email: "",
  firstName: "",
  lastName: "",
  image: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data);
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.email = action.payload.data.email;
      state.image = action.payload.data.image;
console.log(state);
     
      localStorage.setItem("usersession", JSON.stringify(state));
    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";

      // Clear user data from local storage on logout
      localStorage.removeItem("usersession");
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
