import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { LOCAL_STORAGE_KEY } from '@fishing_cat/enums/localStorageKey';
import { useAppDispatch } from '@fishing_cat/redux/hook.ts';
import { localStorageUtils } from '@fishing_cat/utils/localStorageUtils';
import { AuthLogin } from '@/api/models/auth/authLogin';
import { ROUTE_PATH } from '@/enums/routePath';
import { resetUser, setUser } from '@/redux/slices/userSlice';

const AuthorizationLayout = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const detail = localStorageUtils.getItem<AuthLogin>(LOCAL_STORAGE_KEY.USER);

  useEffect(() => {
    if (detail) {
      dispatch(setUser(detail));
      return;
    }
    localStorageUtils.removeItem(LOCAL_STORAGE_KEY.USER);
    dispatch(resetUser());
    if (pathname.includes(ROUTE_PATH.MY_CLASS) || pathname.includes('avatar')) window.location.replace('/');
  }, [dispatch, pathname]);

  return !detail && pathname.includes(ROUTE_PATH.MY_CLASS) ? <></> : <Outlet />;
};

export default AuthorizationLayout;
