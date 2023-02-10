import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovieCard } from "types";

export interface IFollowState {
  follows: IMovieCard[];
}

const initialState: IFollowState = {
  follows: []
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollows: (state, action: PayloadAction<IMovieCard[]>) => {
      state.follows = action.payload;
    }
  }
});

export const { setFollows } = followSlice.actions;
export default followSlice.reducer;
