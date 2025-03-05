import { useAppSelector } from '@/redux/hook';
import { oidcService } from '@/service/oidcService';
import { localStorageUtils } from '@/utils/localStorageUtils';

import * as $ from './UserAuthToggle.style';

const UserAuthToggle = () => {
  const user = useAppSelector((state) => state.userStore.user);
  const isLogin = Object.keys(user || {})?.length > 0;

  const handleSignIn = () => {
    oidcService.signIn();
  };

  const handleSignOut = async () => {
    await oidcService.signOut();
    localStorageUtils.cleanAll();
  };

  return (
    <$.Wrapper>
      <div>Learning Platform</div>
      {isLogin ? (
        <>
          <u>{user?.email}</u>
          <$.Button onClick={handleSignOut} type='button'>
            Logout
          </$.Button>
        </>
      ) : (
        <$.Button onClick={handleSignIn} type='button'>
          Login
        </$.Button>
      )}
    </$.Wrapper>
  );
};

export default UserAuthToggle;
