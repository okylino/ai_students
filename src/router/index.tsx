import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Home from '@fishing_cat/pages/home';
import App from '@/App';
import LessonList from '@/pages/LessonList';
import MyClass from '@/pages/MyClass';
import { Assignment } from '@/pages/Assignment';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/my',
        element: <MyClass />,
      },
      {
        path: '/assigment',
        element: <Assignment />,
      },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
