import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/redux/hook';

const AuthLayout = () => {
  const user = useAppSelector((state) => state.userStore.user);
  const isAuth = user && Object.keys(user).length > 0;

  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default AuthLayout;
