import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

export const initialCounterState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    // increment, decrement, reset zero
    incremented(state) {
      state.value++;
    },
  },
});

export const { incremented } = counterSlice.actions;

export default counterSlice.reducer;
