import { configureStore, Middleware } from '@reduxjs/toolkit';

import { studentApi } from '@fishing_cat/api/services/studentService';
import { translationApi } from '@fishing_cat/api/services/translationService';
import globalReducer from '@fishing_cat/redux/slices/globalSlice';
import translationReducer from '@fishing_cat/redux/slices/translationSlice';
import { authApi } from '@/api/services/authService';
import { lessonApi } from '@/api/services/lessonService';
import { quizApi } from '@/api/services/quizService';
import { roomApi } from '@/api/services/roomService';
import { taskApi } from '@/api/services/taskService';
import { toolApi } from '@/api/services/toolService';
import { assignmentApi } from '@/api/services/assignmentService';

import layoutReducer from './slices/layoutSlice';
import userReducer from './slices/userSlice';

const apiSlices = [
  authApi,
  roomApi,
  lessonApi,
  quizApi,
  taskApi,
  toolApi,
  translationApi,
  studentApi,
  assignmentApi,
] as const;

type ApiSlice = (typeof apiSlices)[number];

type ApiReducers = {
  [K in ApiSlice['reducerPath']]: Extract<ApiSlice, { reducerPath: K }>['reducer'];
};

const api = apiSlices.reduce<{
  reducers: ApiReducers;
  middlewares: Middleware[];
}>(
  (acc, crr) => {
    acc.reducers = { ...acc.reducers, [crr.reducerPath]: crr.reducer };
    acc.middlewares = [...acc.middlewares, crr.middleware];
    return acc;
  },
  {
    reducers: {} as ApiReducers,
    middlewares: [] as Middleware[],
  },
);

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    layout: layoutReducer,
    globalStore: globalReducer,
    translationStore: translationReducer,
    ...api.reducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([...api.middlewares]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
