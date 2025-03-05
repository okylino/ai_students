import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import api from '@fishing_cat/api';
import CaretLeftSmallIcon from '@fishing_cat/assets/svgr/icons/caret-left-small.svg';
import CheckIcon from '@fishing_cat/assets/svgr/icons/check.svg';
import { AVATAR_BACKGROUND } from '@fishing_cat/enums/avatarBackground';
import { toastType } from '@fishing_cat/enums/toastType';
import LegalAndVersionInfo from '@fishing_cat/layouts/legalAndVersionInfo/LegalAndVersionInfo';
import { useAppDispatch, useAppSelector } from '@fishing_cat/redux/hook';
import { openToastWithMessage } from '@fishing_cat/redux/slices/globalSlice';
import { ROUTE_PATH } from '@/enums/routePath';
import { setAvatar } from '@/redux/slices/userSlice';

import * as $ from './AvatarTabs.style';
import { AvatarTabsProps } from './AvatarTabsType';

const TAB = {
  AVATAR: 'avatar',
  BACKGROUND: 'background',
};

const avatarBackgroundList = Object.entries(AVATAR_BACKGROUND).map(([key, value]) => ({ id: Number(key), value }));

const AvatarTabs = ({ avatarList, icon, background }: AvatarTabsProps) => {
  const [currentTab, setCurrentTab] = useState(TAB.AVATAR);
  const [currentAvatar, setCurrentAvatar] = useState(icon);
  const [currentBackground, setCurrentBackground] = useState(background);

  const { defaultDisplayName } = useAppSelector((state) => state.userStore.user);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const location = useLocation();
  const { pathName, params } = location.state || {};
  const isBackLesson = pathName?.includes('/classroom') || pathName?.includes('/join');
  const backPath = isBackLesson ? pathName + params : ROUTE_PATH.MY_CLASS;

  const isAvatarTab = currentTab === TAB.AVATAR;
  const isBackgroundTab = currentTab === TAB.BACKGROUND;
  const avatarPath = `https://media.universe-vs-dev.com/avatar/${currentAvatar}.svg`;

  const handleTabItemClick = (tab: string) => setCurrentTab(tab);
  const handleAvatarIconClick = (id: number) => setCurrentAvatar(id);
  const handleAvatarBackgroundClick = (id: number) => setCurrentBackground(id);

  const isDisableSave = currentAvatar === icon && currentBackground === background;

  const handleSaveClick = async () => {
    if (isDisableSave) return;

    api.user
      .putUserAvatar({ icon: currentAvatar, background: currentBackground })
      .then((result) => {
        dispatch(setAvatar(result));

        dispatch(
          openToastWithMessage({
            message: t('saveSuccess'),
            type: toastType.SUCCESS,
          }),
        );

        return result;
      })
      .catch((error) => console.error('error', error));
  };

  const handleBackClick = () => navigate(backPath);

  return (
    <$.Wrapper>
      <$.ActionWrapper>
        <$.Back onClick={handleBackClick}>
          <CaretLeftSmallIcon />
          <span>{isBackLesson ? t('avatarBackLesson') : t('avatarBackClass')}</span>
        </$.Back>
        <$.Save $isDisableSave={isDisableSave} onClick={handleSaveClick}>
          <CheckIcon />
          <span>{t('avatarSave')}</span>
        </$.Save>
      </$.ActionWrapper>

      <$.AvatarWrapper>
        <$.Avatar $background={AVATAR_BACKGROUND[currentBackground]}>
          <img src={avatarPath} alt='avatar icon' />
        </$.Avatar>

        <$.Name>{defaultDisplayName}</$.Name>

        <$.Tab>
          <$.TabItem onClick={() => handleTabItemClick(TAB.AVATAR)} $isActived={isAvatarTab}>
            {t('avatarAvatarTab')}
          </$.TabItem>
          <$.TabItem onClick={() => handleTabItemClick(TAB.BACKGROUND)} $isActived={isBackgroundTab}>
            {t('avatarBackgroundTab')}
          </$.TabItem>
        </$.Tab>

        <$.List>
          {/* avatar */}
          {isAvatarTab &&
            avatarList.map((item) => (
              <$.ListItem
                key={item.id}
                onClick={() => handleAvatarIconClick(item.id)}
                $isActived={currentAvatar === item.id}
              >
                <img src={item.value} alt='avatar icon' />
              </$.ListItem>
            ))}

          {/* background */}
          {isBackgroundTab &&
            avatarBackgroundList.map((item) => (
              <$.ListItem
                key={item.id}
                $isActived={currentBackground === item.id}
                onClick={() => handleAvatarBackgroundClick(item.id)}
              >
                <$.BackgroundColor $background={item.value} />
              </$.ListItem>
            ))}
        </$.List>
      </$.AvatarWrapper>

      <$.LegalVersionWrapper>
        <LegalAndVersionInfo />
      </$.LegalVersionWrapper>
    </$.Wrapper>
  );
};

export default AvatarTabs;
