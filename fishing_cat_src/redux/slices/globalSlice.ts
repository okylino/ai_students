import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { toastType } from '@fishing_cat/enums/toastType';

const initialState = {
  toastSettings: {
    openToast: false,
    message: '',
    type: toastType.SUCCESS,
    duration: 3000,
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openToastWithMessage: (state, action) => {
      state.toastSettings.message = action.payload.message ?? '';
      state.toastSettings.duration = action.payload.duration ?? 3000;
      state.toastSettings.type = action.payload.type ?? toastType.SUCCESS;
      state.toastSettings.openToast = true;
    },
    closeToast: (state) => {
      state.toastSettings.openToast = false;
    },
  },
});

export const { openToastWithMessage, closeToast } = globalSlice.actions;

export default globalSlice.reducer;
