import { Socket } from 'socket.io-client';

export interface SocketProviderProps {
  children: React.ReactNode;
}

type SocketLike<T extends Socket = Socket> = T & {
  namespaceKey: string;
};

export interface SocketContextType {
  socket: SocketLike;
  isConnected: boolean;
  joinLesson: (accessToken?: string) => void;
}
