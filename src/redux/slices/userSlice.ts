import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthLogin } from '@/api/models/auth/authLogin';
import { LOCAL_STORAGE_KEY } from '@/enums/localStorageKey';
import { localStorageUtils } from '@/utils/localStorageUtils';

interface UserState {
  user: AuthLogin | Record<string, never>;
  avatar: {
    icon: number | null;
    background: number | null;
  };
}

const initialState: UserState = {
  user: localStorageUtils.getItem(LOCAL_STORAGE_KEY.USER) || {},
  avatar: {
    icon: null,
    background: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthLogin>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {};
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setUser, resetUser, setAvatar } = userSlice.actions;

export default userSlice.reducer;
