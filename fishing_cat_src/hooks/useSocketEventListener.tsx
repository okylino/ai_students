import { useEffect } from 'react';

import { useSocketContext } from '@fishing_cat/context/socketContext/SocketContext';

const useSocketEventListener = <T, C>(eventName: string, listener: (msg: T, callback: (params: C) => void) => void) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on(eventName, listener);

      return () => {
        socket.off(eventName, listener);
      };
    }
    return () => {};
  }, [socket, eventName, listener]);
};

export default useSocketEventListener;
