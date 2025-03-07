import { Outlet } from 'react-router-dom';

import FishingCatToast from '@fishing_cat/components/toast/Toast';
import { LessonProvider } from '@fishing_cat/context/lessonContext/LessonContext';
import { PointToastProvider } from '@fishing_cat/context/pointToastContext/PointToastContext';
import { SocketProvider } from '@fishing_cat/context/socketContext/SocketContext';
import { UserProvider } from '@fishing_cat/context/userContext/UserContext';
import Header from '@fishing_cat/layouts/header/Header';
import Toast from '@/components/prototypes/Toast';

import * as $ from './App.style';

// TODO: refactor provider
// The user provider and socket provider should be in `InClassLayout` to prevent unnecessary renders

// TODO: refactor Toast
// Merge the two Toast implementations and standardize them into a single component

function App() {
  return (
    <PointToastProvider>
      <LessonProvider>
        <SocketProvider>
          <UserProvider>
            <$.AppLayout>
              <Header />
              <Toast />
              <FishingCatToast />
              <Outlet />
            </$.AppLayout>
          </UserProvider>
        </SocketProvider>
      </LessonProvider>
    </PointToastProvider>
  );
}

export default App;
