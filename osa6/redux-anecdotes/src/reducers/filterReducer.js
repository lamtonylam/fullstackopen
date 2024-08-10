import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    // action.payload is the value that is passed to setFilter
    setFilter: (state, action) => action.payload
  }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
