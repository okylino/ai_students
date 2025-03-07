import React, { useState } from 'react';

const UserContext = React.createContext({ name: '', auth: false });

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ name: '', userId: '', seatNumber: '', serialNumber: '', auth: false });

  // Login updates the user data with a name parameter
  const login = (name, userId, seatNumber, serialNumber) => {
    console.log('login', seatNumber);
    setUser(() => ({
      name,
      userId,
      seatNumber,
      serialNumber,
      auth: true,
    }));
  };

  const logout = () => {
    setUser({ name: '', userId: '', seatNumber: '', serialNumber: '', auth: false });
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export default UserContext;
