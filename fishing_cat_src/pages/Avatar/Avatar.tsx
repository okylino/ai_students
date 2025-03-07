import api from '@fishing_cat/api';
import { AvatarData } from '@fishing_cat/api/models/user/userAvatarList';
import AvatarTabs from '@fishing_cat/components/pages/avatar/AvatarTabs';
import { useAppSelector } from '@fishing_cat/redux/hook';
import { useEffect, useState } from 'react';

const Avatar = () => {
  const [avatarList, setAvatarList] = useState<AvatarData[]>([]);

  const { icon, background } = useAppSelector((state) => state.userStore.avatar);

  useEffect(() => {
    const getUserAvatarList = async () => {
      const result = await api.user.getUserAvatarList();

      setAvatarList(result.data);
    };

    getUserAvatarList();
  }, []);

  if (icon === null || background === null || avatarList.length === 0) return null;

  return <AvatarTabs avatarList={avatarList} icon={icon} background={background} />;
};

export default Avatar;
