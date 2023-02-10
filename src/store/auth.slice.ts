import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUser } from "types";
import { signOut } from "firebase/auth";
import { auth } from "libs/firebase-app";

export interface IUserState {
  currentUser: ICurrentUser | null;
}

const initialState: IUserState = {
  currentUser: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<ICurrentUser | null>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      signOut(auth);
      state.currentUser = null;
    }
  }
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
