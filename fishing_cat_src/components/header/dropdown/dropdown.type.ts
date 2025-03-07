import React from 'react';

export interface HeaderDropdownProps {
  user: {
    seatNumber?: string;
    name?: string;
    auth: boolean;
    serialNumber?: number;
    userId?: string;
  };
  loginUser: {
    userId?: string;
    defaultDisplayName?: string;
    email?: string;
  };
  isClassroomPath: boolean;
  setIsLeaveOpen: Function;
  setShareQrCodeOpen: Function;
  setIsLangOpen: Function;
  setIsReselectOpen: Function;
  setIsAvatarDialogOpen: Function;
}
export interface DropdownItem {
  key: string;
  img: React.ReactNode;
  text: string;
  onClick: () => void;
}
