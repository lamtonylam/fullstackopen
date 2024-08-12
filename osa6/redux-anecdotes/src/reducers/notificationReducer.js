import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    }
  }
});

export const { updateNotification } = notificationSlice.actions;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(updateNotification(message));
    setTimeout(() => {
      dispatch(updateNotification(''));
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
