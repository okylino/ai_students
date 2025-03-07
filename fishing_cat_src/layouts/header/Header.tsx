import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import api from '@fishing_cat/api';
import { getStudentPoints } from '@fishing_cat/api/services/studentService';
import IconImage from '@fishing_cat/assets/svgr/header/ClassSwift_Icon.svg';
import LogoImage from '@fishing_cat/assets/svgr/header/ClassSwift_Logo.svg';
import GlobalIcon from '@fishing_cat/assets/svgr/icons/globe.svg';
import StarIcon from '@fishing_cat/assets/svgr/icons/star.svg';
import AvatarDialog from '@fishing_cat/components/dialog/AvatarDialog';
import LanguageDialog from '@fishing_cat/components/dialog/languageDialog/LanguageDialog';
import LeaveRoomDialog from '@fishing_cat/components/dialog/leaveRoomDialog/LeaveRoomDialog';
import ReselectNumberDialog from '@fishing_cat/components/dialog/reselectNumberDialog/ReselectNumberDialog';
import Dropdown from '@fishing_cat/components/header/dropdown';
import ShareQrCode from '@fishing_cat/components/shareQrCode/ShareQrCode';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { PointToastContext } from '@fishing_cat/context/pointToastContext/PointToastContext';
import { useSocketContext } from '@fishing_cat/context/socketContext/SocketContext';
import UserContext from '@fishing_cat/context/userContext/UserContext';
import * as $ from '@fishing_cat/layouts/header/header.style';
import { PointsProps } from '@fishing_cat/layouts/header/Header.type';
import { useAppDispatch, useAppSelector } from '@fishing_cat/redux/hook';
import { getUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';
import { setAvatar } from '@/redux/slices/userSlice';

const Points = ({ points }: PointsProps) => (
  <$.Points>
    <StarIcon />
    {points > 99 ? '99+' : points}
  </$.Points>
);

const Header = () => {
  const { user } = useContext(UserContext);
  const { isConnected } = useSocketContext();
  const { lessonId } = useContext(LessonContext);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isReselectOpen, setIsReselectOpen] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerWidth, setHeaderWidth] = useState(0);
  const { points, setPoints } = useContext(PointToastContext);
  const [isShareQrCodeOpen, setShareQrCodeOpen] = useState(false);
  const location = useLocation();
  const loginUser = useAppSelector((state) => state.userStore.user);

  const dispatch = useAppDispatch();

  const isClassroomPath = location.pathname.includes('classroom');

  const userId = getUserIdByLessonId({ lessonId });

  useEffect(() => {
    const handleUpdateWidth = () => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      setHeaderWidth(rect.width);
    };

    handleUpdateWidth();
    window.addEventListener('resize', handleUpdateWidth);
    return () => {
      window.removeEventListener('resize', handleUpdateWidth);
    };
  }, []);

  useEffect(() => {
    const initPoints = async () => {
      if (userId) {
        const newPoints = await getStudentPoints({ lessonId, userId });
        setPoints(newPoints);
      }
    };

    if (isConnected && user.auth && lessonId) {
      initPoints();
    }
  }, [user.auth, lessonId, isConnected, setPoints]);

  useEffect(() => {
    const getUserAvatarData = async () => {
      const data = await api.user.getUserAvatar({ userId });

      dispatch(setAvatar(data));
    };

    if (userId) {
      getUserAvatarData();
    }
  }, [userId, dispatch]);

  return (
    <>
      <$.Header ref={headerRef}>
        {headerWidth < 414 ? <IconImage /> : <LogoImage />}
        <$.ActionWrapper>
          {loginUser?.userId || isClassroomPath ? (
            <>
              {isClassroomPath && <Points points={points} />}
              <Dropdown
                isClassroomPath={isClassroomPath}
                user={user}
                loginUser={loginUser}
                setIsLangOpen={setIsLangOpen}
                setIsLeaveOpen={setIsLeaveOpen}
                setShareQrCodeOpen={setShareQrCodeOpen}
                setIsReselectOpen={setIsReselectOpen}
                setIsAvatarDialogOpen={setIsAvatarDialogOpen}
              />
            </>
          ) : (
            <$.Button onClick={() => setIsLangOpen(true)} type='button'>
              <GlobalIcon />
            </$.Button>
          )}
        </$.ActionWrapper>
      </$.Header>

      {isShareQrCodeOpen && <ShareQrCode setIsShareQrCodeOpen={setShareQrCodeOpen} />}

      <LanguageDialog isOpen={isLangOpen} setIsOpen={setIsLangOpen} />

      <ReselectNumberDialog isOpen={isReselectOpen} setIsOpen={setIsReselectOpen} />

      <LeaveRoomDialog isOpen={isLeaveOpen} setIsOpen={setIsLeaveOpen} />

      <AvatarDialog isOpen={isAvatarDialogOpen} setIsOpen={setIsAvatarDialogOpen} />
    </>
  );
};

export default Header;
