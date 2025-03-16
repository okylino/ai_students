import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Home from '@fishing_cat/pages/home';
import App from '@/App';
import MyClass from '@/pages/MyClass';
import { Assignment } from '@/pages/Assignment';
import Classes from '@/pages/Classes';
import ClassDetail from '@/pages/ClassDetail';
import { PracticeZone } from '@/pages/PracticeZone/PracticeZone';

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
        path: '/assignment/:lessonId',
        element: <Assignment />,
      }, {
        path: '/classes',
        element: <Classes />,
      }, {
        path: '/classDetail',
        element: <ClassDetail />,
      },
      {
        path: '/assignment/:lessonId/practice/:assignmentId',
        element: <PracticeZone />
      },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
