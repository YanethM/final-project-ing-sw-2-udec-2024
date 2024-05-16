import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  user_name: "",
  last_name: "",
  avatar: "",
  active_user: false,
  current_password: "",
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {
        email,
        user_name,
        last_name,
        avatar,
        active_user,
        current_password,
      } = action.payload;
      console.log(action.payload);

      state.email = email;
      state.user_name = user_name;
      state.last_name = last_name;
      state.avatar = avatar;
      state.active_user = active_user;
      state.current_password = current_password;

    },

    getUsers: (state, action) => {
      state.users = action.payload;
    },

    getUserById: (state, action) => {
      console.log("getUserById action triggered with id:", action.payload);
    },

    editUserById: (state, action) => {
      const { updatedUserData } = action.payload;
      return {
        ...state,
        ...updatedUserData, 
      };
    },

    deleteUserById: (state, action) => {
      return initialState;
    },
  },
});

export const {addUser, getUserById, editUserById, deleteUserById, getUsers} = userSlice.actions;
export default userSlice.reducer;
