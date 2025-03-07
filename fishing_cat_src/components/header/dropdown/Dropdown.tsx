import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import api from '@fishing_cat/api';
import ClassListIcon from '@fishing_cat/assets/svgr/icons/class-list.svg';
import GlobeIcon from '@fishing_cat/assets/svgr/icons/globe.svg';
import QrCodeIcon from '@fishing_cat/assets/svgr/icons/qr-code.svg';
import SignOutFilledIcon from '@fishing_cat/assets/svgr/icons/sign-out-filled.svg';
import SignOutOutlinedIcon from '@fishing_cat/assets/svgr/icons/sign-out-outlined.svg';
import UserArrowLeftIcon from '@fishing_cat/assets/svgr/icons/user-arrow-left.svg';
import UserOutlinedIcon from '@fishing_cat/assets/svgr/icons/user-outlined.svg';
import Tooltip from '@fishing_cat/components/prototypes/Tooltip';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { AVATAR_BACKGROUND } from '@fishing_cat/enums/avatarBackground';
import { LESSON_STATUS } from '@fishing_cat/enums/lessonStatus';
import { STUDENT_STATUS } from '@fishing_cat/enums/studentStatus';
import { useAppSelector } from '@fishing_cat/redux/hook';
import { oidcService } from '@/service/oidcService';
import { clearLoginData } from '@/utils/authUtils';

import * as $ from './dropdown.style';
import { DropdownItem, HeaderDropdownProps } from './dropdown.type';

const MENU_ITEM = {
  CLASS_LIST: 'classList',
  LEAVE_LESSON: 'leaveLesson',
  QR_CODE: 'qrCode',
  LANGUAGE: 'language',
  RESELECT: 'reselect',
};

// Reference: https://www.figma.com/design/ljKsHIvyUaHfm1UxyRFc45/%E2%9C%85-ClassSwift-Participant-Release-File?node-id=3722-16064&m=dev
// in class 未來會涵蓋其他頁面(待開發)，到時要確認單純用 isClassroomPath = location.pathname.includes('classroom') 能不能處理
const outOfClassItems = [MENU_ITEM.LANGUAGE];
const inLessonByStudentItems = [MENU_ITEM.QR_CODE, MENU_ITEM.LEAVE_LESSON, MENU_ITEM.LANGUAGE];
const inLessonByGuestItems = [MENU_ITEM.QR_CODE, MENU_ITEM.RESELECT, MENU_ITEM.LANGUAGE];
const inClassItems = [MENU_ITEM.CLASS_LIST, MENU_ITEM.LANGUAGE];

const HeaderDropdown = ({
  user,
  loginUser,
  isClassroomPath,
  setIsLeaveOpen,
  setShareQrCodeOpen,
  setIsLangOpen,
  setIsReselectOpen,
  setIsAvatarDialogOpen,
}: HeaderDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const userAvatar = useAppSelector((state) => state.userStore.avatar);

  const { lessonId, lessonStatus } = useContext(LessonContext);
  const queryParams = new URLSearchParams(window.location.search);
  const roomId = queryParams.get('roomId');

  const navigate = useNavigate();

  const displayName = loginUser?.defaultDisplayName ?? user.name;

  const handleSignIn = () => {
    oidcService.signIn({ roomId, serialNumber: user.serialNumber, userId: user.userId });
  };

  const handleSignOut = async () => {
    if (lessonId && user.auth && loginUser?.userId)
      await api.student.putStudentStatus({
        lessonId,
        studentId: loginUser.userId,
        status: STUDENT_STATUS.ABSENT,
      });
    await oidcService.signOut();
    clearLoginData();
  };

  const menuItems = [
    { key: MENU_ITEM.CLASS_LIST, img: <ClassListIcon />, text: t('myClass'), onClick: () => setIsLeaveOpen(true) },
    {
      key: MENU_ITEM.QR_CODE,
      img: <QrCodeIcon />,
      text: t('classQRCode'),
      onClick: () => {
        setShareQrCodeOpen(true);
      },
    },
    {
      key: MENU_ITEM.LEAVE_LESSON,
      img: <SignOutFilledIcon />,
      text: t('headerLeaveClass'),
      onClick: () => setIsLeaveOpen(true),
    },
    {
      key: MENU_ITEM.RESELECT,
      img: <UserArrowLeftIcon />,
      text: t('reselectNumber'),
      onClick: () => setIsReselectOpen(true),
    },
    {
      key: MENU_ITEM.LANGUAGE,
      img: <GlobeIcon />,
      text: t('headerLanguage'),
      onClick: () => {
        setIsLangOpen(true);
      },
    },
  ];

  const isLoggedIn = Boolean(loginUser?.userId);
  const isInLesson =
    lessonStatus === LESSON_STATUS.IN_CLASS ||
    lessonStatus === LESSON_STATUS.POST_CLASS ||
    lessonStatus === LESSON_STATUS.PRE_CLASS;
  const isAvatarPage = window.location.pathname.includes('/avatar');

  const currentAvatar =
    typeof userAvatar.icon === 'number' ? `https://media.universe-vs-dev.com/avatar/${userAvatar.icon}.svg` : ''; // value 會有 0，不能單純用 falsy 判斷
  const currentAvatarBackground = AVATAR_BACKGROUND[userAvatar.background as keyof typeof AVATAR_BACKGROUND];

  const handleMenuItem = () => {
    if (isInLesson) {
      if (isLoggedIn) return inLessonByStudentItems;

      return inLessonByGuestItems;
    }
    if (isClassroomPath) {
      return inClassItems;
    }

    return outOfClassItems;
  };

  const itemsToShow = handleMenuItem();

  const handleItemClick = (item: DropdownItem) => {
    item.onClick();
    setIsOpen(false);
  };

  const handleAvatarClick = () => {
    if (isAvatarPage || !isLoggedIn) return;

    if (isClassroomPath) {
      setIsAvatarDialogOpen(true);
    } else {
      navigate('/avatar', { state: { pathName: window.location.pathname, params: window.location.search } });
    }

    setIsOpen(false);
  };

  return (
    <$.Dropdown>
      <$.DropdownBtn onClick={() => setIsOpen(!isOpen)}>
        <$.SmallAvatar $background={currentAvatarBackground}>
          {currentAvatar && <$.SamllAvatarIcon src={currentAvatar} />}
        </$.SmallAvatar>
      </$.DropdownBtn>
      {isOpen && (
        <$.DropdownList>
          <>
            <$.InfoWrapper>
              <Tooltip title={t('avatarTooltip')} placement='right' disableHoverListener={isLoggedIn}>
                <$.Avatar
                  $background={currentAvatarBackground}
                  $isAvatarPage={isAvatarPage}
                  onClick={handleAvatarClick}
                >
                  <$.AvatarIcon src={currentAvatar} />
                </$.Avatar>
              </Tooltip>
              <$.Info>
                <$.SeatTag>{user.seatNumber || '-'}</$.SeatTag>
                {displayName && <$.Name>{displayName} </$.Name>}
                {loginUser?.email && <$.Email>{loginUser?.email}</$.Email>}
              </$.Info>
            </$.InfoWrapper>
            <$.Divider />
            {menuItems
              .filter((item) => itemsToShow.includes(item.key))
              .map((item) => (
                <$.Item onClick={() => handleItemClick(item)} key={item.key}>
                  {item.img}
                  {item.text}
                </$.Item>
              ))}
            <$.Divider $isBottom />
            <$.SignItem onClick={isLoggedIn ? handleSignOut : handleSignIn}>
              {isLoggedIn ? <SignOutOutlinedIcon /> : <UserOutlinedIcon />}
              {isLoggedIn ? t('signOut') : t('signIn')}
            </$.SignItem>
          </>
        </$.DropdownList>
      )}
    </$.Dropdown>
  );
};

export default HeaderDropdown;
