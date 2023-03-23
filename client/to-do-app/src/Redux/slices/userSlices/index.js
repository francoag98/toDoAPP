import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  username: "",
  email: "",
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setData(state, action) {
      state.name = action.payload.Name;
      state.token = action.payload.token;
      state.email = action.payload.Email;
    },
    clearData(state) {
      state.name = "";
      state.token = "";
      state.email = "";
    },
  },
});

export default UserSlice.reducer;
export const { setData, clearData } = UserSlice.actions;
