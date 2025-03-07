import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import api from '@fishing_cat/api';
import AccountImage from '@fishing_cat/assets/svgr/homepage/account.svg';
import GuestImage from '@fishing_cat/assets/svgr/homepage/guest.svg';
import { useAppSelector } from '@fishing_cat/redux/hook.ts';
import { ROUTE_PATH } from '@/enums/routePath';
import { oidcService } from '@/service/oidcService';

import UserAction from '../userAction';
import * as $ from './JoinContainer.style';

const JoinContainer = () => {
  const [roomName, setRoomName] = useState('');
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') || '';
  const login = searchParams.get('login') === 'true';
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userStore.user);

  useEffect(() => {
    if (roomId) {
      showRoomName();
    }
  }, [roomId]);

  useEffect(() => {
    // If the user returns from the product page after filling out the information,
    // they should log in directly.
    if (login) handleSignIn();
  }, [login]);

  useEffect(() => {
    // navigate if user already sign in
    user?.userId && navigate(roomId ? `/join?roomId=${roomId}` : ROUTE_PATH.MY_CLASS);
  }, [user, roomId]);

  const handleJoinAsGuest = () => {
    navigate(roomId ? `/join?roomId=${roomId}` : '/joinClass');
  };

  const handleSignIn = useCallback(() => {
    const { login, ...paramsObject } = Object.fromEntries(searchParams);
    oidcService.signIn(paramsObject);
  }, [roomId]);

  const showRoomName = async () => {
    const room = await api.room.getRoomInfo({ roomId });
    if (room) setRoomName(room.display_name);
  };

  const action = [
    {
      title: t('joinGuestTitle'),
      content: t('joinGuestContent'),
      img: <GuestImage />,
      onClick: handleJoinAsGuest,
    },
    {
      title: t('joinAccountTitle'),
      content: t('joinAccountContent'),
      img: <AccountImage />,
      onClick: handleSignIn,
    },
  ];

  return (
    <>
      {roomName && <$.RoomName>{roomName}</$.RoomName>}
      {action.map((actionItem, index) => (
        <UserAction
          key={index}
          title={actionItem.title}
          content={actionItem.content}
          img={actionItem.img}
          onClick={actionItem.onClick}
        />
      ))}
    </>
  );
};
export default JoinContainer;
