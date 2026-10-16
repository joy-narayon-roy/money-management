import { createSlice } from "@reduxjs/toolkit";

export interface BusinessState {
  loading: boolean;
  error: string | null;
  total: number;
  offset: number;
  // TODO: add infos
}
const initialState: BusinessState = {
  loading: true,
  error: null,
  offset: 0,
  total: 0,
};

const businessReducer = createSlice({
  name: "business",
  initialState,
  reducers: {},
});
export default businessReducer.reducer;
