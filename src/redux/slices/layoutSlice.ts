import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TOAST_TYPE } from '@/enums/toastType';

const initialState = {
  toastSettings: {
    openToast: false,
    message: '',
    type: TOAST_TYPE.SUCCESS,
    duration: 3000,
  },
};

export const layoutSlice = createSlice({
  name: `layout`,
  initialState,
  reducers: {
    openToastWithMessage: (state, action: PayloadAction<{ message: string; duration?: number; type?: TOAST_TYPE }>) => {
      state.toastSettings.message = action.payload.message ?? '';
      state.toastSettings.duration = action.payload.duration ?? 1000;
      state.toastSettings.type = action.payload.type ?? TOAST_TYPE.SUCCESS;
      state.toastSettings.openToast = true;
    },
    closeToast: (state) => {
      state.toastSettings.openToast = false;
    },
  },
});

export const { openToastWithMessage, closeToast } = layoutSlice.actions;

export default layoutSlice.reducer;
