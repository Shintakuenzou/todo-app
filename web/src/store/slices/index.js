import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const URL = "http://localhost:3003/api/todos";

export const updateLists = createAsyncThunk("todo/axiosData", async () => {
  const response = await axios.get(`${URL}?sort=-createdAt`);
  return response.data;
});

const initialState = {
  lists: [],
};
const todoDataslice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateLists.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
  },
});

export const { setLists } = todoDataslice.actions;

export default todoDataslice.reducer;
