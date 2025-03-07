import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { IoProvider, useSocket } from 'socket.io-react-hook';

import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { SocketContextType, SocketProviderProps } from '@fishing_cat/context/socketContext/SocketContext.type';
import { JoinLessonReq } from '@fishing_cat/socket/models/lesson';
import { getUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';

const SocketContext = createContext<SocketContextType | null>(null);

const Provider = ({ children }: SocketProviderProps) => {
  const { lessonId } = useContext(LessonContext);
  const { socket, connected: isConnected } = useSocket(`${import.meta.env.VITE_RESTFUL_API_DOMAIN}/participant`, {
    transports: ['websocket', 'polling', 'flashsocket'],
    path: '/sockets',
    query: {
      role: 'student',
    },
    reconnectionDelay: 1000,
    reconnectionAttempts: 20,
  });

  const joinLesson = useCallback(
    (accessToken: string = '') => {
      if (!lessonId) return;
      const userId = getUserIdByLessonId({ lessonId });

      const joinLessonData: JoinLessonReq = {
        user_id: userId,
        lesson_id: lessonId,
        role: 'student',
      };
      const token = accessToken || localStorage.getItem('accessToken');
      if (token) joinLessonData.access_token = token;
      socket.emit('join_lesson', joinLessonData);
    },
    [socket, lessonId],
  );

  useEffect(() => {
    if (isConnected) joinLesson();
  }, [isConnected, joinLesson]);

  const value = useMemo(
    () => ({
      socket,
      isConnected,
      joinLesson,
    }),
    [socket, isConnected, joinLesson],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const SocketProvider = ({ children }: SocketProviderProps) => (
  <IoProvider>
    <Provider>{children}</Provider>
  </IoProvider>
);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};
